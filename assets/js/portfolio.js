// Progressive enhancement: all portfolio content and section links work without JS.
(function () {
  'use strict';

  const header = document.querySelector('.portfolio-header');
  const toggle = document.getElementById('mobile-menu-toggle');
  const links = document.getElementById('site-nav-links');
  const language = document.getElementById('lang-select');
  const themeButton = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  function savePreference(key, value) {
    try { localStorage.setItem(key, value); } catch (_) { /* Preferences are optional. */ }
  }

  function closeMenu(restoreFocus) {
    links.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) toggle.focus();
  }

  if (header && toggle && links) {
    toggle.hidden = false;
    header.classList.add('nav-ready');
    toggle.addEventListener('click', function () {
      const open = links.classList.toggle('active');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { closeMenu(false); });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && links.classList.contains('active')) closeMenu(true);
    });
    document.addEventListener('click', function (event) {
      if (!header.contains(event.target)) closeMenu(false);
    });
  }

  if (language) {
    language.value = document.documentElement.lang;
    language.addEventListener('change', function () {
      savePreference('lang', language.value);
      window.location.assign('/portfolio/' + language.value + '/' + window.location.hash);
    });
  }

  function updateThemeButton() {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (themeButton) themeButton.setAttribute('aria-pressed', String(dark));
    if (themeIcon) themeIcon.textContent = dark ? '◐' : '◑';
  }
  if (themeButton) {
    updateThemeButton();
    themeButton.addEventListener('click', function () {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      savePreference('theme', next);
      updateThemeButton();
    });
  }

  const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
  const sections = navLinks.map(function (link) { return document.querySelector(link.getAttribute('href')); });
  let scheduled = false;
  function updateCurrentSection() {
    scheduled = false;
    let current = -1;
    const offset = header ? header.offsetHeight + 36 : 36;
    sections.forEach(function (section, index) {
      if (section && section.getBoundingClientRect().top <= offset) current = index;
    });
    if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10) current = navLinks.length - 1;
    navLinks.forEach(function (link, index) {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function scheduleUpdate() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateCurrentSection); }
  }
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  updateCurrentSection();
})();
