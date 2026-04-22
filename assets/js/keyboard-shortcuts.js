// Global keyboard shortcuts: j/k scroll, [ / ] prev/next post, g h home
(function () {
  'use strict';

  const STEP = 90;
  let gPressed = false;
  let gTimer = null;

  function inputFocused() {
    const el = document.activeElement;
    if (!el) return false;
    const tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
  }

  function navigate(selector) {
    const link = document.querySelector(selector);
    if (link && link.href) window.location.href = link.href;
  }

  document.addEventListener('keydown', (e) => {
    if (inputFocused()) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    const k = e.key;

    if (gPressed) {
      if (k === 'h') {
        window.location.href = '/';
        e.preventDefault();
      }
      gPressed = false;
      clearTimeout(gTimer);
      return;
    }

    switch (k) {
      case 'j':
        window.scrollBy({ top: STEP, behavior: 'smooth' });
        e.preventDefault();
        break;
      case 'k':
        window.scrollBy({ top: -STEP, behavior: 'smooth' });
        e.preventDefault();
        break;
      case '[':
        navigate('.post-nav .nav-prev');
        e.preventDefault();
        break;
      case ']':
        navigate('.post-nav .nav-next');
        e.preventDefault();
        break;
      case 'g':
        gPressed = true;
        gTimer = setTimeout(() => { gPressed = false; }, 900);
        break;
    }
  });
})();
