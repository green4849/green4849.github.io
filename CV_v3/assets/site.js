// Section nav: the links work without this file; it adds the current-section mark
// and reopens a collapsed section when something inside it is linked to.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.sections a'));
  var sections = links.map(function (link) {
    return document.querySelector(link.getAttribute('href'));
  });
  var clicked = null; // keeps the clicked section marked while the page settles

  function mark(section) {
    links.forEach(function (link, i) {
      if (sections[i] === section) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  function update() {
    if (clicked) return mark(clicked);
    var line = window.innerHeight * 0.3;
    var current = null;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= line) current = section;
    });
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    mark(atBottom && current ? sections[sections.length - 1] : current);
  }

  function openTarget(hash) {
    var target = hash && document.querySelector(hash);
    var block = target && target.closest('details');
    if (block) block.open = true;
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href^="#"]');
    if (!link) return;
    var hash = link.getAttribute('href');
    openTarget(hash);
    clicked = links.indexOf(link) > -1 ? document.querySelector(hash) : null;
    update();
  });

  ['wheel', 'touchmove', 'keydown'].forEach(function (type) {
    window.addEventListener(type, function () { clicked = null; }, { passive: true });
  });

  window.addEventListener('hashchange', function () { openTarget(location.hash); });
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  openTarget(location.hash);
  update();
}());
