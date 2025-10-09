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
        // Get all post elements
        const postElements = document.querySelectorAll('.post-preview');

        if (postElements.length === 0) {
            return; // Not on a post list page
        }

        // Extract post data
        postElements.forEach(post => {
            const tags = (post.dataset.tags || '').split(',').filter(t => t.trim());
            const category = post.dataset.category || '';

            tags.forEach(tag => this.allTags.add(tag));
            if (category) this.allCategories.add(category);

            this.posts.push({
                element: post,
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
        const postList = document.querySelector('.post-list');
        if (!postList) return;

        // Create filter container
        const filterContainer = document.createElement('div');
        filterContainer.className = 'post-filters';
        filterContainer.innerHTML = `
            <button class="filter-toggle" id="filter-toggle">
                <span class="filter-icon">⚡</span>
                <span class="filter-text">Filters</span>
                <span class="filter-count" id="filter-count"></span>
            </button>

            <div class="filter-section" id="filter-section">
                <div class="filter-header">
                    <h3>🔍 Filter Posts</h3>
                    <button class="filter-clear" id="filter-clear">Clear All</button>
                </div>

                <div class="filter-search-bar">
                    <input
                        type="text"
                        id="search-input"
                        placeholder="Search by title or content..."
                        class="filter-search"
                    >
                </div>

                ${this.allCategories.size > 0 ? `
                <div class="filter-group">
                    <h4>Categories</h4>
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
                    <h4>Tags</h4>
                    <div class="filter-buttons">
                        ${Array.from(this.allTags).sort().map(tag => `
                            <button class="filter-btn" data-filter-type="tag" data-value="${tag}">
                                ${tag}
                            </button>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
            </div>
        `;

        // Insert before post list
        postList.parentNode.insertBefore(filterContainer, postList);
    }

    setupEventListeners() {
        // Toggle button
        const toggleBtn = document.getElementById('filter-toggle');
        const filterSection = document.getElementById('filter-section');

        if (toggleBtn && filterSection) {
            toggleBtn.addEventListener('click', () => {
                filterSection.classList.toggle('active');
                toggleBtn.classList.toggle('active');
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

            post.element.style.display = isVisible ? '' : 'none';
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
        const postList = document.querySelector('.post-list');
        if (!postList) return;

        let noResultsMsg = document.getElementById('no-results-message');

        if (visibleCount === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.id = 'no-results-message';
                noResultsMsg.className = 'no-results';
                noResultsMsg.innerHTML = `
                    <p>No posts match your filters.</p>
                    <button onclick="window.postFilter.clearFilters()">Clear Filters</button>
                `;
                postList.appendChild(noResultsMsg);
            }
        } else {
            if (noResultsMsg) {
                noResultsMsg.remove();
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
