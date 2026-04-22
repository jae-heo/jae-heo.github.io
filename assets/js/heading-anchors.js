// Add a § deep-link icon to post headings with an id; click copies the URL
(function () {
  'use strict';

  function attach() {
    const headings = document.querySelectorAll('.post-content h2[id], .post-content h3[id], .page-content h2[id], .page-content h3[id]');
    headings.forEach(h => {
      if (h.querySelector('.heading-anchor')) return;
      const link = document.createElement('a');
      link.className = 'heading-anchor';
      link.href = '#' + h.id;
      link.setAttribute('aria-label', 'Copy link to this section');
      link.textContent = '§';
      h.appendChild(link);

      link.addEventListener('click', (e) => {
        e.preventDefault();
        const url = window.location.origin + window.location.pathname + '#' + h.id;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url);
        }
        history.pushState(null, '', '#' + h.id);
        h.classList.add('anchor-copied');
        setTimeout(() => h.classList.remove('anchor-copied'), 1400);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
})();
