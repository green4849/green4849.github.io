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
  root.classList.replace('no-js', 'js');
})();
