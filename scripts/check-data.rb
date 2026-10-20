# Validate editable data and references before Jekyll publishes it.
require 'json'
require 'yaml'
require 'date'
require 'uri'
ROOT = File.expand_path('..', __dir__)
errors = []
read_json = ->(path) { JSON.parse(File.read(File.join(ROOT, path))) }
check_id = ->(id, label) { errors << "#{label}: a stable lowercase ID is required" unless id.is_a?(String) && id.match?(/\A[a-z0-9]+(?:-[a-z0-9]+)*\z/) }
required = lambda do |item, keys, label|
  keys.each { |key| errors << "#{label}: #{key} is missing" if !item.key?(key) || item[key].nil? || item[key] == '' }
end
check_url = lambda do |url, label|
  begin
    uri = URI.parse(url)
    if url.start_with?('/') && !url.start_with?('//')
      path = url.split(/[?#]/).first
      if path.start_with?('/assets/', '/images/') && !File.file?(File.join(ROOT, path.sub(%r{\A/}, '')))
        errors << "#{label}: missing file #{path}"
      end
    elsif uri.scheme != 'https' || uri.host.nil? || uri.userinfo
      errors << "#{label}: use an absolute HTTPS URL or a site path"
    end
  rescue URI::InvalidURIError, TypeError
    errors << "#{label}: invalid URL"
  end
end
profile = read_json.call('_data/profile.json')
required.call(profile, %w[name name_ko email lab education research_interests], 'Profile')
ids = {}
%w[research awards scholarships activities].each do |category|
  ids[category] = []
  profile.fetch(category).each do |item|
    label = "#{category}/#{item['id'] || item['title']}"
    check_id.call(item['id'], label)
    fields = {'research' => %w[title period slug summary points], 'awards' => %w[title year organization detail category], 'scholarships' => %w[title year organization detail], 'activities' => %w[title period text label]}
    required.call(item, fields.fetch(category), label)
    errors << "#{label}: duplicate ID" if ids[category].include?(item['id'])
    ids[category] << item['id']
  end
end
registry = read_json.call('_data/portfolio_links.json')
errors << 'Link registry: expected schema_version 2' unless registry['schema_version'] == 2
seen = []
registry.fetch('entries').each do |entry|
  label = "Link #{entry['id']}"
  check_id.call(entry['id'], label)
  errors << "#{label}: duplicate ID" if seen.include?(entry['id'])
  seen << entry['id']
  errors << "#{label}: item_id does not point to an existing #{entry['category']} item" unless ids.fetch(entry['category'], []).include?(entry['item_id'])
  errors << "#{label}: invalid placement" unless %w[title context none].include?(entry['placement'])
  errors << "#{label}: missing status/check date" unless entry['status'].is_a?(String) && entry['checked_at'].to_s.match?(/\A\d{4}-\d{2}-\d{2}\z/)
  errors << "#{label}: visible link needs a URL" if entry['placement'] != 'none' && !entry['url']
  if entry['category'] == 'awards' && entry['status'] == 'verified_event' && entry['placement'] != 'context'
    errors << "#{label}: event-only evidence must use a context link"
  end
  check_url.call(entry['url'], label) if entry['url']
end
media = read_json.call('_data/media.json')
check_url.call('/' + media.fetch('portrait_source'), 'Portrait source')
check_url.call(media.fetch('social_image'), 'Share image')
permalinks = []
publication_ids = []
Dir[File.join(ROOT, '_publications/*.md')].each do |path|
  data = YAML.safe_load(File.read(path).split(/^---\s*$\n?/, 3)[1], permitted_classes: [Date, Time], aliases: false)
  label = File.basename(path)
  required.call(data, %w[id title venue authors type citation_date sort_order permalink], label)
  check_id.call(data['id'], label)
  errors << "#{label}: duplicate publication ID" if publication_ids.include?(data['id'])
  publication_ids << data['id']
  errors << "#{label}: invalid publication type" unless %w[journal paper poster].include?(data['type'])
  errors << "#{label}: authors must be a non-empty list" unless data['authors'].is_a?(Array) && !data['authors'].empty?
  errors << "#{label}: duplicate or invalid permalink" if permalinks.include?(data['permalink']) || !data['permalink'].to_s.start_with?('/publications/')
  permalinks << data['permalink']
  (data['resources'] || []).each do |resource|
    required.call(resource, %w[label url], label)
    check_url.call(resource['url'], label)
  end
end
related = YAML.safe_load(File.read(File.join(ROOT, '_data/award_publications.yml')))
related.each do |entry|
  errors << "Unknown related award #{entry['award_id']}" unless ids['awards'].include?(entry['award_id'])
  errors << "Unknown related publication #{entry['publication']}" unless permalinks.include?(entry['publication'])
end
unless errors.empty?
  warn errors.join("\n")
  exit 1
end
puts "Data valid: #{publication_ids.size} publications, #{seen.size} evidence records; stable ID references resolved."
