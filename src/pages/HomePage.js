// pages/HomePage.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogConfig from '../config';

// 더미 블로그 포스트 데이터 (실제로는 API나 데이터베이스에서 가져옵니다)
const blogPosts = [
  {
    id: 1,
    title: 'React로 블로그 만들기',
    excerpt: 'React를 사용하여 개인 블로그를 만드는 방법을 알아봅니다. 컴포넌트 구조와 라우팅, 상태 관리까지 자세히 설명합니다.',
    date: '2023-05-15',
    category: '프로그래밍',
    categorySlug: 'programming',
    thumbnail: '/api/placeholder/800/400'
  },
  {
    id: 2,
    title: '제주도 여행 추천 코스',
    excerpt: '제주도 3박 4일 여행 코스를 소개합니다. 맛집, 숙소, 명소를 한 번에 알아보세요.',
    date: '2023-04-28',
    category: '여행',
    categorySlug: 'travel',
    thumbnail: '/api/placeholder/800/400'
  },
  {
    id: 3,
    title: '초보자를 위한 카메라 사용법',
    excerpt: '카메라를 처음 접하는 분들을 위한 기본 사용법과 팁을 정리했습니다. 조리개, 셔터 스피드, ISO 설정에 대해 배워보세요.',
    date: '2023-03-15',
    category: '사진',
    categorySlug: 'photography',
    thumbnail: '/api/placeholder/800/400'
  },
  {
    id: 4,
    title: '홈메이드 파스타 레시피',
    excerpt: '집에서 쉽게 만들 수 있는 파스타 레시피를 소개합니다. 기본 재료로 맛있는 파스타를 만들어보세요.',
    date: '2023-02-10',
    category: '음식',
    categorySlug: 'food',
    thumbnail: '/api/placeholder/800/400'
  }
];

const HomePage = ({ setTocItems }) => {
  const { blog } = blogConfig;

  useEffect(() => {
    // 홈페이지에서는 목차가 필요 없으므로 빈 배열로 설정
    setTocItems([]);
    // 페이지 타이틀 설정
    document.title = blog.title;
  }, [setTocItems, blog.title]);

  return (
    <div className="home-page">
      <section className="featured-post">
        <h2>최신 포스트</h2>
        <div className="featured-post-card">
          <img 
            src={blogPosts[0].thumbnail} 
            alt={blogPosts[0].title} 
            className="featured-post-image" 
          />
          <div className="featured-post-content">
            <span className="post-category">{blogPosts[0].category}</span>
            <h3>{blogPosts[0].title}</h3>
            <p>{blogPosts[0].excerpt}</p>
            <div className="post-meta">
              <span className="post-date">{blogPosts[0].date}</span>
            </div>
            <Link to={`/blog/${blogPosts[0].id}`} className="read-more-btn">
              계속 읽기
            </Link>
          </div>
        </div>
      </section>

      <section className="recent-posts">
        <h2>다른 포스트</h2>
        <div className="post-grid">
          {blogPosts.slice(1).map(post => (
            <div key={post.id} className="post-card">
              <img 
                src={post.thumbnail} 
                alt={post.title} 
                className="post-thumbnail" 
              />
              <div className="post-card-content">
                <span className="post-category">{post.category}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                </div>
                <Link to={`/blog/${post.id}`} className="read-more-link">
                  계속 읽기 →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;