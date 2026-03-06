(function() {
    'use strict';

    function updateReadingProgress() {
        const bar = document.getElementById('reading-progress-bar');
        const article = document.querySelector('.post-content');

        if (!bar || !article) {
            return;
        }

        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollTop = window.scrollY;
        const maxScrollable = Math.max(articleHeight - viewportHeight, 1);
        const progress = Math.min(Math.max((scrollTop - articleTop) / maxScrollable, 0), 1);

        bar.style.transform = `scaleX(${progress})`;
    }

    function updateActiveTocLink() {
        const links = Array.from(document.querySelectorAll('.post-toc-item a'));
        if (links.length === 0) {
            return;
        }

        const headings = links
            .map(link => {
                const id = link.getAttribute('href')?.slice(1);
                const element = id ? document.getElementById(id) : null;
                return element ? { link, element } : null;
            })
            .filter(Boolean);

        if (headings.length === 0) {
            return;
        }

        const threshold = 140;
        let active = headings[0];

        for (const item of headings) {
            if (item.element.getBoundingClientRect().top <= threshold) {
                active = item;
            } else {
                break;
            }
        }

        headings.forEach(item => {
            item.link.classList.toggle('is-active', item === active);
        });
    }

    function onScroll() {
        updateReadingProgress();
        updateActiveTocLink();
    }

    function initPostReadingUi() {
        if (!document.querySelector('.post')) {
            return;
        }

        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPostReadingUi);
    } else {
        initPostReadingUi();
    }
})();
