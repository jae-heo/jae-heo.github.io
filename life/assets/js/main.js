// Main JavaScript file for the blog

// Update navigation links based on current language
function updateNavLinks() {
    const isKorean = window.location.pathname.startsWith('/ko');
    const navLinks = document.querySelectorAll('[data-nav-link]');

    navLinks.forEach(link => {
        let href = link.getAttribute('href');
        // Remove any existing /ko prefix
        href = href.replace(/^\/ko/, '');

        // Add /ko prefix if on Korean site
        if (isKorean) {
            // Special case for root
            if (href === '/') {
                link.setAttribute('href', '/ko/');
            } else {
                link.setAttribute('href', '/ko' + href);
            }
        } else {
            link.setAttribute('href', href);
        }
    });
}

// Call immediately to update links
updateNavLinks();

// Theme toggle functionality
const toggleBtn = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-icon');

function updateThemeIcon(theme) {
    if (icon) {
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

if (localStorage.getItem('theme')) {
    updateThemeIcon(localStorage.getItem('theme'));
}

if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });
}

// Language dropdown functionality
const langSelect = document.getElementById('lang-select');
if (langSelect) {
    // Set current language in dropdown based on URL
    const isKorean = window.location.pathname.startsWith('/ko');
    langSelect.value = isKorean ? 'ko' : 'en';

    langSelect.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('lang', selectedLang);

        // Get current path and remove any existing /ko prefix
        let path = window.location.pathname;
        const cleanPath = path.replace(/^\/ko/, '') || '/';

        if (selectedLang === 'ko') {
            // Add /ko prefix for Korean
            if (cleanPath === '/') {
                window.location.href = '/ko/';
            } else {
                window.location.href = '/ko' + cleanPath;
            }
        } else {
            // Use clean path without /ko for English
            window.location.href = cleanPath;
        }
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add copy button to code blocks
document.querySelectorAll('.code-block').forEach(block => {
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    button.onclick = function() {
        const code = block.querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        });
    };
    block.appendChild(button);
});