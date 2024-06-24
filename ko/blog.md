---
layout: blog
title: Blog
subtitle: Welcome to Jae's tech blog
lang: ko
date: 2024-06-24 18:00:00 +0900
---

<div id="tag-filters" class="filter-buttons">
  <button class="tag-toggle" data-tag="all">ALL</button>
  {% assign unique_tags = site.posts | map: 'tags' | join: ',' | split: ',' | uniq %}
  {% for tag in unique_tags %}
    {% unless tag == "ko" or tag == "en" %}
      <button class="tag-toggle" data-tag="{{ tag | strip }}">{{ tag | strip }}</button>
    {% endunless %}
  {% endfor %}
</div>

<div id="post-list">
  {% assign postsTag = site.posts | where: "lang", "ko" %}
  {% for post in postsTag %}
    <ul class="list-posts" data-tags="{{ post.tags | join: ' ' | downcase }}" data-categories="{{ post.categories | join: ' ' | downcase }}">
      <li class="post-teaser">
        <a href="{{ post.url | prepend: site.baseurl }}">
          <span class="post-teaser__title">{{ post.title }}</span>
          <span class="post-teaser__date">{{ post.date | date: "%d %B %Y" }}</span>
          <div class="post-tags">
            {% for tag in post.tags %}
              {% unless tag == "ko" or tag == "en" %}
                <button class="tag-toggle post-tag" data-tag="{{ tag | strip }}">{{ tag | strip }}</button>
              {% endunless %}
            {% endfor %}
          </div>
        </a>
      </li>
    </ul>
  {% endfor %}
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
  var selectedTags = [];

  function filterPosts() {
    var lists = document.querySelectorAll('.list-posts');
    if (selectedTags.length === 0) {
      lists.forEach(function(list) {
        list.style.display = 'block';
      });
    } else {
      lists.forEach(function(list) {
        var tags = list.getAttribute('data-tags').split(' ');
        var display = selectedTags.some(function(tag) {
          return tags.includes(tag);
        });
        list.style.display = display ? 'block' : 'none';
      });
    }
  }

  var filterButtons = document.querySelectorAll('#tag-filters .tag-toggle');
  filterButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var tag = this.getAttribute('data-tag').toLowerCase().replace(/ /g, '-');
      if (tag === 'all') {
        selectedTags = [];
        filterButtons.forEach(function(btn) {
          btn.classList.remove('active');
        });
      } else {
        if (selectedTags.includes(tag)) {
          selectedTags = selectedTags.filter(function(t) {
            return t !== tag;
          });
          this.classList.remove('active');
        } else {
          selectedTags.push(tag);
          this.classList.add('active');
        }
      }
      filterPosts();
    });
  });

  var postButtons = document.querySelectorAll('.post-tag');
  postButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      var tag = this.getAttribute('data-tag').toLowerCase().replace(/ /g, '-');
      if (selectedTags.includes(tag)) {
        selectedTags = selectedTags.filter(function(t) {
          return t !== tag;
        });
        this.classList.remove('active');
      } else {
        selectedTags.push(tag);
        this.classList.add('active');
      }
      filterPosts();
    });
  });
});
</script>

<style>
.filter-buttons {
  margin-bottom: 20px;
}

.tag-toggle {
  margin-right: 5px;
  margin-top: 5px;
  padding: 4px 12px; /* 위의 필터링 버튼 크기 */
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-radius: 8px; /* 둥근 테두리 */
}

.tag-toggle.active {
  border: 2px solid rgba(59, 32, 15, 0.3); /* 선택된 버튼 테두리 추가 */
  padding: 2px 10px;
}

.tag-toggle:hover {
  background-color: #e0e0e0;
}

.post-teaser {
  border: 1px solid #d0d0d0; /* 테두리 추가 */
  border-radius: 5px; /* 둥근 테두리 */
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer; /* 커서 포인터 추가 */
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.post-teaser:hover {
  background-color: #f0f0f0; /* 배경색 변경 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
}

.post-teaser a {
  display: block; /* 링크를 블록 요소로 변경 */
  color: inherit; /* 링크 색상을 부모 요소와 동일하게 */
  text-decoration: none; /* 링크 밑줄 제거 */
}

.post-tags {
  margin-top: 1px;
}

.post-tag {
  margin-right: 5px;
  padding: 5px 10px; /* 게시글 아래 버튼 크기 */
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 12px; /* 글씨 크기 조절 */
  border-radius: 8px; /* 둥근 테두리 */
  line-height: 1;
}

.post-tag:hover {
  background-color: #c0c0c0;
}

.post-tag.active {
  background-color: #b0b0b0; /* 선택된 버튼 배경색 */
  border: 2px solid #000; /* 선택된 버튼 테두리 추가 */
}

/* 태그별 색상 지정 */
.tag-toggle[data-tag="tutorial"], .post-tag[data-tag="tutorial"] {
  background-color: rgba(214, 158, 158, 0.5); /* 파스텔톤 칙칙한 핑크 */
}

.tag-toggle[data-tag="gcp"], .post-tag[data-tag="gcp"] {
  background-color: rgba(158, 214, 158, 0.5); /* 파스텔톤 칙칙한 연두색 */
}

.tag-toggle[data-tag="python"], .post-tag[data-tag="python"] {
  background-color: rgba(214, 214, 158, 0.5); /* 파스텔톤 칙칙한 노란색 */
}

.tag-toggle[data-tag="project"], .post-tag[data-tag="project"] {
  background-color: rgba(158, 201, 214, 0.5); /* 파스텔톤 칙칙한 하늘색 */
}

.tag-toggle[data-tag="opencv"], .post-tag[data-tag="opencv"] {
  background-color: rgba(214, 158, 198, 0.5); /* 파스텔톤 칙칙한 연분홍색 */
}

.tag-toggle[data-tag="deeplearning"], .post-tag[data-tag="deeplearning"] {
  background-color: rgba(183, 158, 214, 0.5); /* 파스텔톤 칙칙한 연보라색 */
}

.tag-toggle[data-tag="general"], .post-tag[data-tag="general"] {
  background-color: rgba(214, 198, 158, 0.5); /* 파스텔톤 칙칙한 살구색 */
}

.tag-toggle[data-tag="selenium"], .post-tag[data-tag="selenium"] {
  background-color: rgba(158, 214, 214, 0.5); /* 파스텔톤 칙칙한 청록색 */
}

.tag-toggle[data-tag="docker"], .post-tag[data-tag="docker"] {
  background-color: rgba(158, 178, 214, 0.5); /* 파스텔톤 칙칙한 파란색 */
}

.tag-toggle[data-tag="infra"], .post-tag[data-tag="infra"] {
  background-color: rgba(214, 178, 158, 0.5); /* 파스텔톤 칙칙한 갈색 */
}

.tag-toggle[data-tag="cicd"], .post-tag[data-tag="cicd"] {
  background-color: rgba(120, 158, 214, 0.5); /* 파스텔톤 칙칙한 연보라색 */
}

/* 선택된 상태의 태그별 색상 지정 */
.tag-toggle.active[data-tag="tutorial"], .post-tag.active[data-tag="tutorial"] {
  background-color: rgba(194, 133, 133, 0.5); /* 더 칙칙한 핑크 */
}

.tag-toggle.active[data-tag="gcp"], .post-tag.active[data-tag="gcp"] {
  background-color: rgba(133, 194, 133, 0.5); /* 더 칙칙한 연두색 */
}

.tag-toggle.active[data-tag="python"], .post-tag.active[data-tag="python"] {
  background-color: rgba(194, 194, 133, 0.5); /* 더 칙칙한 노란색 */
}

.tag-toggle.active[data-tag=“project”], .post-tag.active[data-tag=“project”] {
background-color: rgba(133, 159, 194, 0.5); /* 더 칙칙한 하늘색 */
}

.tag-toggle.active[data-tag=“opencv”], .post-tag.active[data-tag=“opencv”] {
background-color: rgba(194, 133, 159, 0.5); /* 더 칙칙한 연분홍색 */
}

.tag-toggle.active[data-tag=“deeplearning”], .post-tag.active[data-tag=“deeplearning”] {
background-color: rgba(158, 133, 194, 0.5); /* 더 칙칙한 연보라색 */
}

.tag-toggle.active[data-tag=“general”], .post-tag.active[data-tag=“general”] {
background-color: rgba(194, 158, 133, 0.5); /* 더 칙칙한 살구색 */
}

.tag-toggle.active[data-tag=“selenium”], .post-tag.active[data-tag=“selenium”] {
background-color: rgba(133, 194, 194, 0.5); /* 더 칙칙한 청록색 */
}

.tag-toggle.active[data-tag=“docker”], .post-tag.active[data-tag=“docker”] {
background-color: rgba(133, 153, 194, 0.5); /* 더 칙칙한 파란색 */
}

.tag-toggle.active[data-tag=“infra”], .post-tag.active[data-tag=“infra”] {
background-color: rgba(194, 153, 133, 0.5); /* 더 칙칙한 갈색 */
}

.tag-toggle.active[data-tag=“cicd”], .post-tag.active[data-tag=“cicd”] {
background-color: rgba(100, 133, 194, 0.5); /* 더 칙칙한 연보라색 */
}