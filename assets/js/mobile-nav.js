(function() {
    'use strict';

    function initMobileNav() {
        const toggle = document.getElementById('mobile-menu-toggle');
        const links = document.getElementById('site-nav-links');

        if (!toggle || !links) {
            return;
        }

        toggle.addEventListener('click', () => {
            const isOpen = links.classList.toggle('active');
            toggle.classList.toggle('active', isOpen);
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        links.querySelectorAll('a, select, button').forEach(element => {
            element.addEventListener('click', () => {
                links.classList.remove('active');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileNav);
    } else {
        initMobileNav();
    }
})();
