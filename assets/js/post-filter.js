// Dynamic post filtering
class PostFilter {
    constructor() {
        this.posts = [];
        this.activeFilters = {
            tags: new Set(),
            categories: new Set(),
            search: ''
        };
        this.allTags = new Set();
        this.allCategories = new Set();
        this.locale = document.documentElement.lang === 'ko' ? 'ko' : 'en';
        this.copy = {
            en: {
                filters: 'Filters', title: 'Filter posts', clearAll: 'Clear all',
                search: 'Search by title or content…', categories: 'Categories', tags: 'Tags',
                noResults: 'No posts match your filters.', clearFilters: 'Clear filters'
            },
            ko: {
                filters: '필터', title: '글 필터', clearAll: '모두 지우기',
                search: '제목이나 내용으로 검색…', categories: '카테고리', tags: '태그',
                noResults: '조건에 맞는 글이 없습니다.', clearFilters: '필터 지우기'
            }
        }[this.locale];

        this.init();
    }

    init() {
        // Wait for DOM to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        // Get all post elements from the grid view
        const gridPosts = document.querySelectorAll('.post-grid-view .post-preview');

        if (gridPosts.length === 0) {
            return; // Not on a post list page
        }

        // Extract post data from grid view (source of truth)
        gridPosts.forEach((post, index) => {
            const tags = (post.dataset.tags || '').split(',').filter(t => t.trim());
            const category = post.dataset.category || '';

            tags.forEach(tag => this.allTags.add(tag));
            if (category) this.allCategories.add(category);

            this.posts.push({
                gridElement: post,
                tags,
                category,
                title: post.querySelector('h2')?.textContent.toLowerCase() || '',
                excerpt: post.querySelector('p')?.textContent.toLowerCase() || ''
            });
        });

        // Build filter UI
        this.buildFilterUI();

        // Setup event listeners
        this.setupEventListeners();
    }

    buildFilterUI() {
        const filterSection = document.querySelector('.filter-section');
        if (!filterSection) {
            return;
        }

        // Create filter toggle button
        const toggleButton = document.createElement('button');
        toggleButton.className = 'filter-toggle';
        toggleButton.id = 'filter-toggle';
        toggleButton.innerHTML = `
            <span class="filter-icon">⚡</span>
            <span class="filter-text">${this.copy.filters}</span>
            <span class="filter-count" id="filter-count"></span>
        `;

        // Create filter panel
        const filterPanel = document.createElement('div');
        filterPanel.className = 'filter-panel';
        filterPanel.id = 'filter-panel';
        filterPanel.innerHTML = `
            <div class="filter-header">
                <h3>🔍 ${this.copy.title}</h3>
                <button class="filter-clear" id="filter-clear">${this.copy.clearAll}</button>
            </div>

            <div class="filter-search-bar">
                <input
                    type="text"
                    id="search-input"
                    placeholder="${this.copy.search}"
                    aria-label="${this.copy.search}"
                    class="filter-search"
                >
            </div>

            ${this.allCategories.size > 0 ? `
            <div class="filter-group">
                <h4>${this.copy.categories}</h4>
                <div class="filter-buttons">
                    ${Array.from(this.allCategories).sort().map(cat => `
                        <button class="filter-btn" data-filter-type="category" data-value="${cat}">
                            ${cat}
                        </button>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            ${this.allTags.size > 0 ? `
            <div class="filter-group">
                <h4>${this.copy.tags}</h4>
                <div class="filter-buttons">
                    ${Array.from(this.allTags).sort().map(tag => `
                        <button class="filter-btn" data-filter-type="tag" data-value="${tag}">
                            ${tag}
                        </button>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        `;

        // Insert toggle button into filter section
        filterSection.appendChild(toggleButton);

        // Insert filter panel into posts-controls
        const postsControls = document.querySelector('.posts-controls');
        if (postsControls) {
            postsControls.appendChild(filterPanel);
        }
    }

    setupEventListeners() {
        // Toggle button
        const toggleBtn = document.getElementById('filter-toggle');
        const filterPanel = document.getElementById('filter-panel');

        if (toggleBtn && filterPanel) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                filterPanel.classList.toggle('active');
                toggleBtn.classList.toggle('active');
            });

            // Close panel when clicking outside
            document.addEventListener('click', (e) => {
                const isClickInsidePanel = filterPanel.contains(e.target);
                const isClickOnToggle = toggleBtn.contains(e.target);

                if (!isClickInsidePanel && !isClickOnToggle && filterPanel.classList.contains('active')) {
                    filterPanel.classList.remove('active');
                    toggleBtn.classList.remove('active');
                }
            });
        }

        // Clear filters
        const clearBtn = document.getElementById('filter-clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearFilters());
        }

        // Search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.activeFilters.search = e.target.value.toLowerCase();
                this.applyFilters();
            });
        }

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const type = e.target.dataset.filterType;
                const value = e.target.dataset.value;

                // Toggle active state
                btn.classList.toggle('active');

                if (btn.classList.contains('active')) {
                    this.activeFilters[type === 'category' ? 'categories' : 'tags'].add(value);
                } else {
                    this.activeFilters[type === 'category' ? 'categories' : 'tags'].delete(value);
                }

                this.applyFilters();
            });
        });
    }

    applyFilters() {
        let visibleCount = 0;

        this.posts.forEach(post => {
            const matchesSearch = !this.activeFilters.search ||
                post.title.includes(this.activeFilters.search) ||
                post.excerpt.includes(this.activeFilters.search);

            const matchesCategory = this.activeFilters.categories.size === 0 ||
                this.activeFilters.categories.has(post.category);

            const matchesTags = this.activeFilters.tags.size === 0 ||
                post.tags.some(tag => this.activeFilters.tags.has(tag));

            const isVisible = matchesSearch && matchesCategory && matchesTags;

            // Update grid view elements
            post.gridElement.classList.toggle('is-filtered-out', !isVisible);
            post.gridElement.hidden = !isVisible;
            if (isVisible) visibleCount++;
        });

        // Update filter count
        this.updateFilterCount();

        // Show no results message if needed
        this.updateNoResultsMessage(visibleCount);
    }

    updateFilterCount() {
        const count = this.activeFilters.categories.size + this.activeFilters.tags.size +
                     (this.activeFilters.search ? 1 : 0);

        // Update filter count on toggle button
        const countEl = document.getElementById('filter-count');
        if (countEl) {
            countEl.textContent = count > 0 ? `(${count})` : '';
        }

        // Update clear button visibility
        const clearBtn = document.getElementById('filter-clear');
        if (clearBtn) {
            clearBtn.style.display = count > 0 ? 'block' : 'none';
        }
    }

    updateNoResultsMessage(visibleCount) {
        const gridView = document.querySelector('.post-grid-view');
        if (!gridView) return;

        let noResultsMsg = document.getElementById('no-results-message');

        if (visibleCount === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-results-message';
                noResultsMsg.className = 'no-results';
                noResultsMsg.innerHTML = `
                    <p>${this.copy.noResults}</p>
                    <button onclick="window.postFilter.clearFilters()">${this.copy.clearFilters}</button>
                `;
                gridView.parentNode.insertBefore(noResultsMsg, gridView);
            }
            noResultsMsg.style.display = 'block';
        } else {
            if (noResultsMsg) {
                noResultsMsg.style.display = 'none';
            }
        }
    }

    clearFilters() {
        // Clear active filters
        this.activeFilters.tags.clear();
        this.activeFilters.categories.clear();
        this.activeFilters.search = '';

        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn.active').forEach(btn => {
            btn.classList.remove('active');
        });

        // Clear search input
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = '';

        // Reapply (show all)
        this.applyFilters();
    }
}

// Initialize on page load
window.postFilter = new PostFilter();
