'use strict';

// Native controls: no dependency on storage permission or a third-party bundle.
(() => {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const themeButton = document.querySelector('#theme-toggle');
  const preference = () => {
    try { return localStorage.getItem('theme'); } catch (error) { return null; }
  };
  const applyTheme = dark => {
    root.dataset.theme = dark ? 'dark' : 'light';
    if (themeButton) {
      themeButton.setAttribute('aria-pressed', String(dark));
      themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    }
  };
  const followSystem = () => {
    const value = preference();
    applyTheme(value === 'dark' || (value !== 'light' && media.matches));
  };
  followSystem();
  if (themeButton) {
    themeButton.hidden = false;
    themeButton.addEventListener('click', () => {
      const dark = root.dataset.theme !== 'dark';
      try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (error) {}
      applyTheme(dark);
    });
  }
  media.addEventListener('change', followSystem);
  window.addEventListener('storage', event => { if (event.key === 'theme' || event.key === null) followSystem(); });

  const nav = document.querySelector('.site-nav');
  const toggle = nav?.querySelector('.menu-toggle');
  const links = nav?.querySelector('#primary-navigation');
  const desktop = window.matchMedia('(min-width: 925px)');
  if (toggle && links) {
    let open = false;
    const renderMenu = () => {
      toggle.hidden = desktop.matches;
      links.hidden = !desktop.matches && !open;
      toggle.setAttribute('aria-expanded', String(open && !desktop.matches));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    };
    const closeMenu = restoreFocus => {
      open = false;
      renderMenu();
      if (restoreFocus && !desktop.matches) toggle.focus();
    };
    toggle.addEventListener('click', () => { open = !open; renderMenu(); });
    nav.addEventListener('keydown', event => {
      if (event.key === 'Escape' && open) { event.preventDefault(); closeMenu(true); }
    });
    document.addEventListener('click', event => { if (open && !nav.contains(event.target)) closeMenu(false); });
    links.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(false); });
    nav.addEventListener('focusout', event => { if (open && event.relatedTarget && !nav.contains(event.relatedTarget)) closeMenu(false); });
    desktop.addEventListener('change', () => {
      const wasFocused = links.contains(document.activeElement);
      closeMenu(wasFocused);
    });
    renderMenu();
  }
  // One-page home: highlight the nav item for the section in view, and let
  // "About"/brand scroll back to the top instead of reloading the page.
  const navLinks = links ? [...links.querySelectorAll('a')] : [];
  const sectionLinks = navLinks.filter(a => a.dataset.section && document.getElementById(a.dataset.section));
  if (sectionLinks.length && document.querySelector('.home-section')) {
    const aboutLink = navLinks.find(a => a.pathname === location.pathname && !a.hash);
    const sections = sectionLinks.map(a => document.getElementById(a.dataset.section));
    let current;
    const mark = link => {
      if (link === current) return;
      current = link;
      navLinks.forEach(a => a.removeAttribute('aria-current'));
      if (link) link.setAttribute('aria-current', link === aboutLink ? 'page' : 'location');
    };
    const update = () => {
      const line = window.innerHeight * 0.35;
      let active = aboutLink;
      sections.forEach((section, i) => { if (section.getBoundingClientRect().top <= line) active = sectionLinks[i]; });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) active = sectionLinks[sectionLinks.length - 1];
      mark(active);
    };
    let queued = false;
    window.addEventListener('scroll', () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; update(); });
    }, { passive: true });
    window.addEventListener('resize', update);
    update();

    document.querySelectorAll('a.site-nav__brand, #primary-navigation a').forEach(a => {
      if (a.pathname !== location.pathname || a.hash) return;
      a.addEventListener('click', event => {
        event.preventDefault();
        window.scrollTo({ top: 0 });
        history.replaceState(null, '', location.pathname);
      });
    });
  }

  root.classList.replace('no-js', 'js');
})();
