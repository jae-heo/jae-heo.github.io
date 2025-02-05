document.addEventListener("DOMContentLoaded", function() {
  var selectedFilters = {
    tags: [],
    categories: ['general'] // General을 기본값으로 설정
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
        
        // 카테고리 조건 확인 - 선택된 카테고리가 포함되어야 함
        var categoryMatch = selectedFilters.categories.length === 0 || 
          selectedFilters.categories.some(function(category) {
            return categories.includes(category);
          });
        
        // 태그 조건 확인 - 선택된 태그들 중 하나라도 포함되면 됨 (OR 조건)
        var tagMatch = selectedFilters.tags.length === 0 || 
          selectedFilters.tags.some(function(tag) {
            return tags.includes(tag);
          });
        
        // 카테고리와 태그 조건을 모두 만족해야 함 (AND 조건)
        list.style.display = (categoryMatch && tagMatch) ? 'block' : 'none';
      });
    }
  }

  var filterButtons = document.querySelectorAll('.filter-toggle');
  
  // General 버튼을 찾아서 기본적으로 active 상태로 설정
  filterButtons.forEach(function(button) {
    if (button.getAttribute('data-category') === 'general') {
      button.classList.add('active');
    }
  });

  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var filter = this.getAttribute('data-filter');
      var tag = this.getAttribute('data-tag') ? this.getAttribute('data-tag').toLowerCase().replace(/ /g, '-') : null;
      var category = this.getAttribute('data-category') ? this.getAttribute('data-category').toLowerCase().replace(/ /g, '-') : null;

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
        // 카테고리 버튼 클릭시 다른 카테고리 모두 비활성화
        filterButtons.forEach(function(btn) {
          if (btn.getAttribute('data-category')) {
            btn.classList.remove('active');
          }
          // 태그 버튼들의 active 상태도 모두 제거
          if (btn.getAttribute('data-tag')) {
            btn.classList.remove('active');
          }
        });
        // 태그 필터 초기화
        selectedFilters.tags = [];
        // post-tag 버튼들의 active 상태도 모두 제거
        var postButtons = document.querySelectorAll('.post-tag');
        postButtons.forEach(function(btn) {
          btn.classList.remove('active');
        });
        selectedFilters.categories = [category];
        this.classList.add('active');
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

  // 초기 필터링 실행
  filterPosts();
});