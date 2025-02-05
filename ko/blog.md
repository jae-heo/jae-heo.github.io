---
layout: blog
title: Jae's Tech Blog
subtitle: 의미있는 글을 올리려고 노력합니다.
lang: ko
date: 2024-06-24 18:00:00 +0900
---
<div class="filter-label">Categories:</div>
<div id="category-filter-buttons" class="filter-buttons">
  <!-- general 카테고리를 먼저 표시 -->
  <button class="filter-toggle category-toggle" data-category="general">general</button>
  
  {% assign unique_categories = site.posts | map: 'categories' | join: ',' | split: ',' | uniq | sort %}
  {% for category in unique_categories %}
    {% unless category == "ko" or category == "en" or category == "general" %}
      <button class="filter-toggle category-toggle" data-category="{{ category | strip }}">{{ category | strip }}</button>
    {% endunless %}
  {% endfor %}
</div>

<div class="filter-label">Tags:</div>
<div id="tag-filter-buttons" class="filter-buttons">
  {% assign unique_tags = site.posts | map: 'tags' | join: ',' | split: ',' | uniq %}
  {% for tag in unique_tags %}
    {% unless tag == "ko" or tag == "en" %}
      <button class="filter-toggle tag-toggle" data-tag="{{ tag | strip }}">{{ tag | strip }}</button>
    {% endunless %}
  {% endfor %}
</div>

<div id="post-list">
  {% assign postsTag = site.posts | where: "lang", page.lang %}
  {% for post in postsTag %}
    <ul class="list-posts" data-tags="{{ post.tags | join: ' ' | downcase }}" data-categories="{{ post.categories | join: ' ' | downcase }}">
      <li class="post-teaser">
        <a href="{{ post.url | prepend: site.baseurl }}">
          <span class="post-teaser__title">{{ post.title }}</span>
          <span class="post-teaser__date">{{ post.date | date: "%d %B %Y" }}</span>
          <div class="post-tags">
            {% for tag in post.tags %}
              <button class="tag-toggle post-tag" data-tag="{{ tag | strip }}">{{ tag | strip }}</button>
            {% endfor %}
          </div>
        </a>
      </li>
    </ul>
  {% endfor %}
</div>