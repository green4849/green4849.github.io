(() => {
 const button = document.querySelector('.color-toggle');
 const setTheme = dark => {
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  button?.setAttribute('aria-pressed', String(dark));
  button?.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
 };
 try { setTheme(localStorage.getItem('profile-theme') === 'dark'); } catch {}
 button?.addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme !== 'dark';
  setTheme(dark);
  try { localStorage.setItem('profile-theme', dark ? 'dark' : 'light'); } catch {}
 });
})();
