// Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.portfolio-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('[data-nav-link]');

    function highlightActiveSection() {
        const scrollY = window.pageYOffset;
        const headerHeight = document.querySelector('.portfolio-header').offsetHeight;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Check if we're at the bottom of the page
        const isAtBottom = (windowHeight + scrollY) >= documentHeight - 50;

        let currentSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });

        // If we're at the bottom, highlight the last section (contact)
        if (isAtBottom && sections.length > 0) {
            currentSection = sections[sections.length - 1].getAttribute('id');
        }

        // Update active states
        if (currentSection) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentSection}`) {
                    item.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Initial call

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all project cards and skill categories
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });

    // Language switcher
    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        const currentPath = window.location.pathname;
        const currentLang = currentPath.includes('/ko/') ? 'ko' : 'en';
        langSelect.value = currentLang;

        langSelect.addEventListener('change', function() {
            const newLang = this.value;
            localStorage.setItem('lang', newLang);

            let newPath;
            if (currentLang === 'en') {
                newPath = currentPath.replace('/en/', '/ko/');
            } else {
                newPath = currentPath.replace('/ko/', '/en/');
            }

            window.location.href = newPath;
        });
    }

    // Add animation classes
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-up {
            animation: fadeInUpAnimation 0.6s ease-out forwards;
        }

        @keyframes fadeInUpAnimation {
            to {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        }

        [data-nav-link].active {
            color: var(--portfolio-primary, var(--accent));
            position: relative;
        }

        [data-nav-link].active::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--portfolio-primary, var(--accent));
            border-radius: 1px;
        }
    `;
    document.head.appendChild(style);
});