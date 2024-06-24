document.addEventListener("DOMContentLoaded", function() {
  var selectedFilters = {
    tags: [],
    categories: []
  };

  function filterPosts() {
    var lists = document.querySelectorAll('.list-posts');
    if (selectedFilters.tags.length === 0 && selectedFilters.categories.length === 0) {
      lists.forEach(function(list) {
        list.style.display = 'block';
      });
    } else {
      lists.forEach(function(list) {
        var tags = list.getAttribute('data-tags').split(' ');
        var categories = list.getAttribute('data-categories').split(' ');
        var display = selectedFilters.tags.some(function(tag) {
          return tags.includes(tag);
        }) || selectedFilters.categories.some(function(category) {
          return categories.includes(category);
        });
        list.style.display = display ? 'block' : 'none';
      });
    }
  }

  var filterButtons = document.querySelectorAll('.filter-toggle');
  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var filter = this.getAttribute('data-filter');
      var tag = this.getAttribute('data-tag') ? this.getAttribute('data-tag').toLowerCase().replace(/ /g, '-') : null;
      var category = this.getAttribute('data-category') ? this.getAttribute('data-category').toLowerCase().replace(/ /g, '-') : null;

      if (filter === 'all') {
        selectedFilters.tags = [];
        selectedFilters.categories = [];
        filterButtons.forEach(function(btn) {
          btn.classList.remove('active');
        });
      } else {
        if (tag) {
          if (selectedFilters.tags.includes(tag)) {
            selectedFilters.tags = selectedFilters.tags.filter(function(t) {
              return t !== tag;
            });
            this.classList.remove('active');
          } else {
            selectedFilters.tags.push(tag);
            this.classList.add('active');
          }
        }
        if (category) {
          if (selectedFilters.categories.includes(category)) {
            selectedFilters.categories = selectedFilters.categories.filter(function(c) {
              return c !== category;
            });
            this.classList.remove('active');
          } else {
            selectedFilters.categories.push(category);
            this.classList.add('active');
          }
        }
      }
      filterPosts();
    });
  });

  var postButtons = document.querySelectorAll('.post-tag');
  postButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var tag = this.getAttribute('data-tag').toLowerCase().replace(/ /g, '-');
      if (selectedFilters.tags.includes(tag)) {
        selectedFilters.tags = selectedFilters.tags.filter(function(t) {
          return t !== tag;
        });
        this.classList.remove('active');
      } else {
        selectedFilters.tags.push(tag);
        this.classList.add('active');
      }
      filterPosts();
    });
  });
});