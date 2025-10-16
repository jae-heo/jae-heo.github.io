// Home page tab switching functionality
(function() {
    'use strict';

    // Initialize tab functionality when DOM is ready
    function initHomeTabs() {
        const tabButtons = document.querySelectorAll('.home-tab');
        const tabContents = document.querySelectorAll('.tab-content');

        if (tabButtons.length === 0 || tabContents.length === 0) {
            return; // Not on a page with tabs
        }

        // Add click event listeners to tab buttons
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');

                // Remove active class from all tabs and contents
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                const targetContent = document.querySelector(`[data-content="${tabName}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }

                // Store the active tab in localStorage for persistence
                try {
                    localStorage.setItem('activeHomeTab', tabName);
                } catch (e) {
                    // localStorage might not be available
                }
            });
        });

        // Restore previously active tab from localStorage
        try {
            const savedTab = localStorage.getItem('activeHomeTab');
            if (savedTab) {
                const savedTabButton = document.querySelector(`.home-tab[data-tab="${savedTab}"]`);
                if (savedTabButton) {
                    savedTabButton.click();
                }
            }
        } catch (e) {
            // localStorage might not be available
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHomeTabs);
    } else {
        initHomeTabs();
    }
})();
