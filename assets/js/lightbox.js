// Minimal image lightbox for .post-content / .page-content images
(function () {
  'use strict';

  let overlay;
  let img;

  function ensureOverlay() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-hidden', 'true');
    img = document.createElement('img');
    img.className = 'lightbox-image';
    img.alt = '';
    overlay.appendChild(img);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', hide);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) hide();
    });
  }

  function show(src, alt) {
    ensureOverlay();
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
  }

  function hide() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
  }

  function attach() {
    document.querySelectorAll('.post-content img, .page-content img').forEach(el => {
      if (el.dataset.lbWired) return;
      el.dataset.lbWired = '1';
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', () => show(el.currentSrc || el.src, el.alt));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
})();
