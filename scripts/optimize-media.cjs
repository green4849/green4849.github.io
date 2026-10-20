'use strict';
// Format/size conversion only: preserve the supplied portrait and its proportions.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const profile = JSON.parse(fs.readFileSync(path.join(root, '_data/profile.json'), 'utf8'));
const media = JSON.parse(fs.readFileSync(path.join(root, '_data/media.json'), 'utf8'));
const source = path.resolve(root, media.portrait_source);
if (!source.startsWith(path.join(root, 'images') + path.sep)) throw new Error('Portrait source must be inside images/');
const xml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&apos;'}[c]));
(async () => {
  const metadata = await sharp(source).rotate().metadata();
  const dimensions = metadata.autoOrient || metadata;
  for (const width of [160, 320, 480]) {
    await sharp(source).rotate().resize({width}).webp({quality:85}).toFile(path.join(root, `images/portrait-${width}.webp`));
  }
  await sharp(source).rotate().resize({width:320}).jpeg({quality:88}).toFile(path.join(root, 'images/portrait-320.jpg'));
  const portrait = await sharp(source).rotate().resize({width:220}).png().toBuffer();
  const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#fff"/><path d="M370 140v350" stroke="#e1e5e7"/><g fill="#41494e" font-family="Arial,sans-serif"><text x="430" y="265" font-size="62">${xml(profile.name)}</text><text x="433" y="325" font-size="28">${xml(profile.lab.role)}</text><text x="433" y="370" font-size="28">${xml(profile.lab.name)} · ${xml(profile.lab.institution)}</text><text x="433" y="455" font-size="22" fill="#276b80">green4849.github.io</text></g></svg>`);
  await sharp(svg).composite([{input:portrait,left:105,top:170}]).jpeg({quality:90}).toFile(path.join(root, media.social_image.replace(/^\//, '')));
  fs.writeFileSync(path.join(root, '_data/build_media.json'), JSON.stringify({portrait_width:dimensions.width, portrait_height:dimensions.height}, null, 2) + '\n');
  console.log('Prepared responsive portraits and share preview from supplied source.');
})();
