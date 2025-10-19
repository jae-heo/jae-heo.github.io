/**
 * Series Navigation Enhancement
 * Handles long series lists with multiple strategies
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        COLLAPSE_THRESHOLD: 10,    // Collapse if more than 10 posts
        SCROLL_THRESHOLD: 15,      // Use scroll if more than 15 posts
        TRUNCATE_THRESHOLD: 20,    // Truncate if more than 20 posts
        PAGINATE_THRESHOLD: 50,    // Paginate if more than 50 posts
        POSTS_PER_PAGE: 10,         // Posts per page in pagination
        CONTEXT_RANGE: 2            // Posts to show before/after current
    };

    /**
     * Initialize series navigation enhancements
     */
    function initSeriesNavigation() {
        // Handle post page series navigation
        const seriesNav = document.querySelector('.series-navigation');
        if (seriesNav) {
            handleSeriesNavigation(seriesNav, true);
        }

        // Handle homepage series groups
        const seriesGroups = document.querySelectorAll('.series-group');
        seriesGroups.forEach(group => {
            handleSeriesNavigation(group, false);
        });
    }

    /**
     * Handle series navigation for both post pages and homepage
     */
    function handleSeriesNavigation(container, isPostPage) {
        const postItems = container.querySelectorAll('.series-post-item');
        const postCount = postItems.length;

        // Skip if too few posts
        if (postCount <= 5) return;

        // Choose strategy based on post count
        if (postCount > CONFIG.PAGINATE_THRESHOLD) {
            setupPagination(container, postItems);
        } else if (postCount > CONFIG.TRUNCATE_THRESHOLD) {
            setupTruncation(container, postItems);
        } else if (postCount > CONFIG.SCROLL_THRESHOLD) {
            setupScrollable(container, postItems);
        } else if (postCount > CONFIG.COLLAPSE_THRESHOLD) {
            setupCollapsible(container, postItems);
        }

        // Add progress indicator only for post pages with long series
        if (isPostPage && postCount > 5) {
            addProgressIndicator(container, postItems);
        }
    }

    /**
     * Setup collapsible navigation (10-15 posts)
     */
    function setupCollapsible(container, postItems) {
        const currentIndex = getCurrentIndex(postItems);

        // For homepage series (no current post), show first few and last few
        if (currentIndex === -1) {
            // Add collapsed class
            container.classList.add('collapsed');

            // Mark first 3 and last 2 posts as visible
            for (let i = 0; i < Math.min(3, postItems.length); i++) {
                postItems[i].classList.add('near-current');
            }
            for (let i = Math.max(postItems.length - 2, 3); i < postItems.length; i++) {
                postItems[i].classList.add('near-current');
            }
        } else {
            // Mark posts near current for visibility
            markNearbyPosts(postItems, currentIndex, CONFIG.CONTEXT_RANGE);

            // Add collapsed class
            container.classList.add('collapsed');
        }

        // Create expand/collapse button
        const expandBtn = document.createElement('button');
        expandBtn.className = 'series-expand-btn';
        expandBtn.textContent = `Show all ${postItems.length} posts`;
        expandBtn.onclick = function() {
            toggleExpanded(container, expandBtn, postItems.length);
        };

        // Insert button after the posts list
        const postsList = container.querySelector('.series-posts');
        postsList.insertAdjacentElement('afterend', expandBtn);
    }

    /**
     * Setup scrollable container (15-20 posts)
     */
    function setupScrollable(container, postItems) {
        container.classList.add('scrollable');

        // Auto-scroll to current post (only for post pages)
        const currentItem = container.querySelector('.series-post-item.current');
        if (currentItem) {
            setTimeout(() => {
                const postsList = container.querySelector('.series-posts');
                const scrollTop = currentItem.offsetTop - postsList.offsetTop - 100;
                postsList.scrollTop = scrollTop;
            }, 100);
        }
    }

    /**
     * Setup truncated view (20-50 posts)
     */
    function setupTruncation(container, postItems) {
        const currentIndex = getCurrentIndex(postItems);

        container.classList.add('truncated');

        if (currentIndex === -1) {
            // For homepage, just show first 3 and last 3
            // No need to mark adjacent posts
        } else {
            // Mark adjacent posts to current
            if (currentIndex > 0) {
                postItems[currentIndex - 1].classList.add('before-current');
            }
            if (currentIndex < postItems.length - 1) {
                postItems[currentIndex + 1].classList.add('after-current');
            }
        }

        // Add ellipsis indicators
        addEllipsisIndicators(container, postItems, currentIndex);
    }

    /**
     * Setup pagination (50+ posts)
     */
    function setupPagination(seriesNav, postItems) {
        const currentIndex = getCurrentIndex(postItems);
        const currentPage = Math.floor(currentIndex / CONFIG.POSTS_PER_PAGE) + 1;
        const totalPages = Math.ceil(postItems.length / CONFIG.POSTS_PER_PAGE);

        // Hide all posts initially
        postItems.forEach(item => item.style.display = 'none');

        // Show current page
        showPage(postItems, currentPage);

        // Create pagination controls
        const paginationDiv = createPaginationControls(currentPage, totalPages, (page) => {
            showPage(postItems, page);
        });

        const postsList = seriesNav.querySelector('.series-posts');
        postsList.insertAdjacentElement('afterend', paginationDiv);
    }

    /**
     * Add progress indicator
     */
    function addProgressIndicator(seriesNav, postItems) {
        const currentIndex = getCurrentIndex(postItems);
        if (currentIndex === -1) return;

        const progress = ((currentIndex + 1) / postItems.length) * 100;

        const progressDiv = document.createElement('div');
        progressDiv.className = 'series-progress';
        progressDiv.innerHTML = `
            <span class="series-progress-text">Part ${currentIndex + 1} of ${postItems.length}</span>
            <div class="series-progress-bar">
                <div class="series-progress-fill" style="width: ${progress}%"></div>
            </div>
            <span class="series-progress-text">${Math.round(progress)}%</span>
        `;

        const header = seriesNav.querySelector('.series-header');
        header.insertAdjacentElement('afterend', progressDiv);
    }

    /**
     * Helper: Get current post index
     */
    function getCurrentIndex(postItems) {
        for (let i = 0; i < postItems.length; i++) {
            if (postItems[i].classList.contains('current')) {
                return i;
            }
        }
        return -1;
    }

    /**
     * Helper: Mark posts near current
     */
    function markNearbyPosts(postItems, currentIndex, range) {
        const start = Math.max(0, currentIndex - range);
        const end = Math.min(postItems.length - 1, currentIndex + range);

        for (let i = start; i <= end; i++) {
            if (i !== currentIndex) {
                postItems[i].classList.add('near-current');
            }
        }
    }

    /**
     * Helper: Toggle expanded state
     */
    function toggleExpanded(seriesNav, button, totalPosts) {
        if (seriesNav.classList.contains('collapsed')) {
            seriesNav.classList.remove('collapsed');
            seriesNav.classList.add('expanded');
            button.textContent = `Show fewer posts`;
        } else {
            seriesNav.classList.add('collapsed');
            seriesNav.classList.remove('expanded');
            button.textContent = `Show all ${totalPosts} posts`;
        }
    }

    /**
     * Helper: Add ellipsis indicators for truncated view
     */
    function addEllipsisIndicators(seriesNav, postItems, currentIndex) {
        const postsList = seriesNav.querySelector('.series-posts');

        // Add ellipsis after first 3 if current is > 5
        if (currentIndex > 5) {
            const ellipsis1 = document.createElement('li');
            ellipsis1.className = 'series-ellipsis';
            ellipsis1.textContent = '... more posts ...';
            postItems[2].insertAdjacentElement('afterend', ellipsis1);
        }

        // Add ellipsis before last 3 if current is < length - 5
        if (currentIndex < postItems.length - 5) {
            const ellipsis2 = document.createElement('li');
            ellipsis2.className = 'series-ellipsis';
            ellipsis2.textContent = '... more posts ...';
            postItems[postItems.length - 3].insertAdjacentElement('beforebegin', ellipsis2);
        }
    }

    /**
     * Helper: Create pagination controls
     */
    function createPaginationControls(currentPage, totalPages, onPageChange) {
        const div = document.createElement('div');
        div.className = 'series-pagination';

        // Previous button
        if (currentPage > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'series-page-btn';
            prevBtn.textContent = '← Previous';
            prevBtn.onclick = () => onPageChange(currentPage - 1);
            div.appendChild(prevBtn);
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            // Show first, last, and pages near current
            if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
                const pageBtn = document.createElement('button');
                pageBtn.className = 'series-page-btn';
                if (i === currentPage) pageBtn.classList.add('active');
                pageBtn.textContent = i;
                pageBtn.onclick = () => onPageChange(i);
                div.appendChild(pageBtn);
            } else if (Math.abs(i - currentPage) === 2) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                dots.style.padding = '0 0.5rem';
                div.appendChild(dots);
            }
        }

        // Next button
        if (currentPage < totalPages) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'series-page-btn';
            nextBtn.textContent = 'Next →';
            nextBtn.onclick = () => onPageChange(currentPage + 1);
            div.appendChild(nextBtn);
        }

        return div;
    }

    /**
     * Helper: Show specific page of posts
     */
    function showPage(postItems, page) {
        const start = (page - 1) * CONFIG.POSTS_PER_PAGE;
        const end = start + CONFIG.POSTS_PER_PAGE;

        postItems.forEach((item, index) => {
            if (index >= start && index < end) {
                item.style.display = 'block';
                item.classList.add('series-fade-in');
            } else {
                item.style.display = 'none';
            }
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSeriesNavigation);
    } else {
        initSeriesNavigation();
    }

})();