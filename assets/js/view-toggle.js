// View Toggle: Switch between grid and list view for posts
(function() {
    const VIEW_KEY = 'blog-view-preference';

    // Get saved view preference or default to grid
    const savedView = localStorage.getItem(VIEW_KEY) || 'grid';

    const gridView = document.querySelector('.post-grid-view');
    const listView = document.querySelector('.post-list-view');
    const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');

    if (!gridView || !listView || viewToggleBtns.length === 0) return;

    // Apply saved view on page load
    function applyView(view) {
        if (view === 'list') {
            gridView.style.display = 'none';
            listView.style.display = 'flex';
        } else {
            gridView.style.display = 'grid';
            listView.style.display = 'none';
        }

        // Update button states
        viewToggleBtns.forEach(btn => {
            if (btn.dataset.view === view) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Initialize with saved preference
    applyView(savedView);

    // Handle view toggle clicks
    viewToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            applyView(view);
            localStorage.setItem(VIEW_KEY, view);
        });
    });
})();
