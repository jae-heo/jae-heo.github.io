// pages/BlogPost.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogConfig from '../config';

// 블로그 포스트 더미 데이터
const blogPostsData = {
  1: {
    id: 1,
    title: 'React로 블로그 만들기',
    content: `
      <div id="intro">
        <h2>React 블로그 제작 시작하기</h2>
        <p>React는 현대 웹 애플리케이션 개발에 널리 사용되는 JavaScript 라이브러리입니다. 사용자 인터페이스를 만들기 위한 강력한 도구로, 컴포넌트 기반 아키텍처와 가상 DOM을 사용하여 효율적인 웹 애플리케이션을 구축할 수 있습니다.</p>
        <p>이 블로그 포스트에서는 React를 사용하여 개인 블로그를 만드는 방법을 단계별로 알아보겠습니다. 기본 설정부터 시작하여 블로그의 주요 기능까지 구현해보겠습니다.</p>
      </div>
      
      <div id="prerequisites">
        <h2>사전 준비물</h2>
        <p>React 블로그를 만들기 위해 다음과 같은 사전 지식과 도구가 필요합니다:</p>
        <ul>
          <li>HTML, CSS, JavaScript 기본 지식</li>
          <li>Node.js와 npm 설치</li>
          <li>기본적인 명령줄 인터페이스 사용법</li>
          <li>Git 사용법 (선택사항)</li>
        </ul>
      </div>
      
      <div id="setting-up">
        <h2>프로젝트 설정하기</h2>
        
        <div id="create-react-app">
          <h3>Create React App 사용하기</h3>
          <p>Create React App은 React 애플리케이션을 빠르게 시작할 수 있는 공식 도구입니다. 다음 명령어를 사용하여 새 프로젝트를 생성합니다:</p>
          <pre>
            npx create-react-app my-blog
            cd my-blog
            npm start
          </pre>
        </div>
        
        <div id="project-structure">
          <h3>프로젝트 구조 이해하기</h3>
          <p>Create React App으로 생성된 프로젝트는 다음과 같은 구조를 가집니다:</p>
          <ul>
            <li>public/: 정적 파일들이 위치하는 디렉토리</li>
            <li>src/: React 소스 코드가 위치하는 디렉토리</li>
            <li>package.json: 프로젝트 의존성 및 스크립트 정의 파일</li>
            <li>.gitignore: Git 버전 관리 시 무시할 파일 목록</li>
          </ul>
        </div>
      </div>
      
      <div id="components">
        <h2>주요 컴포넌트 만들기</h2>
        
        <div id="layout-component">
          <h3>레이아웃 컴포넌트</h3>
          <p>블로그의 기본 레이아웃은 헤더, 사이드바, 메인 콘텐츠 영역으로 구성됩니다. 다음과 같이 Layout 컴포넌트를 만들어 보겠습니다:</p>
          <pre>
            import React from 'react';
            import Header from './Header';
            import Sidebar from './Sidebar';
            import './Layout.css';

            const Layout = ({ children }) => {
              return (
                <div className="layout">
                  <Header />
                  <div className="main-container">
                    <Sidebar />
                    <main className="content">
                      {children}
                    </main>
                  </div>
                </div>
              );
            };

            export default Layout;
          </pre>
        </div>
        
        <div id="header-component">
          <h3>헤더 컴포넌트</h3>
          <p>헤더 컴포넌트는 블로그 이름, 네비게이션 메뉴, 검색 기능 등을 포함합니다:</p>
          <pre>
            import React from 'react';
            import { Link } from 'react-router-dom';
            import './Header.css';

            const Header = () => {
              return (
                <header className="header">
                  <div className="logo">
                    <Link to="/">My Blog</Link>
                  </div>
                  <nav className="nav-menu">
                    <ul>
                      <li><Link to="/">홈</Link></li>
                      <li><Link to="/about">소개</Link></li>
                      <li><Link to="/contact">연락처</Link></li>
                    </ul>
                  </nav>
                  <div className="search-bar">
                    <input type="text" placeholder="검색..." />
                    <button>검색</button>
                  </div>
                </header>
              );
            };

            export default Header;
          </pre>
        </div>
      </div>
      
      <div id="conclusion">
        <h2>결론</h2>
        <p>이 튜토리얼에서는 React를 사용하여 기본적인 블로그 웹사이트를 만드는 방법을 알아보았습니다. 실제 블로그를 구현할 때는 이 외에도 백엔드 API 연동, 댓글 기능, 카테고리 필터링, 페이지네이션 등 다양한 기능을 추가하여 더욱 완성도 높은 블로그를 만들 수 있습니다.</p>
        <p>React의 컴포넌트 기반 아키텍처를 활용하면 기능을 모듈화하고 재사용 가능한 코드를 작성할 수 있어, 유지보수와 확장이 용이한 웹 애플리케이션을 개발할 수 있습니다.</p>
      </div>
    `,
    date: '2023-05-15',
    author: '홍길동',
    category: '프로그래밍',
    categorySlug: 'programming',
    tags: ['React', 'JavaScript', '웹개발', '블로그'],
    thumbnail: '/api/placeholder/800/400'
  },
  // 다른 블로그 포스트 데이터도 추가할 수 있습니다
};

const BlogPost = ({ setTocItems }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const { blog, features } = blogConfig;

  useEffect(() => {
    // 실제로는 API 호출 등을 통해 데이터를 가져옵니다
    const fetchPost = () => {
      setLoading(true);
      // 데이터베이스나 API에서 해당 ID의 포스트를 가져오는 로직
      // 여기서는 더미 데이터를 사용합니다
      setTimeout(() => {
        const fetchedPost = blogPostsData[postId];
        setPost(fetchedPost);
        setLoading(false);
        
        // 페이지 타이틀 설정
        if (fetchedPost) {
          document.title = `${fetchedPost.title} | ${blog.title}`;
        } else {
          document.title = `포스트를 찾을 수 없습니다 | ${blog.title}`;
        }
      }, 300);
    };

    fetchPost();
  }, [postId, blog.title]);

  useEffect(() => {
    if (post) {
      // 포스트 내용에서 제목 요소들을 찾아 목차 생성
      const content = document.querySelector('.blog-post-content');
      if (content) {
        const headings = content.querySelectorAll('h2, h3');
        const tocItems = Array.from(headings).map(heading => {
          const id = heading.parentElement.id || heading.id;
          return {
            id,
            text: heading.textContent,
            level: parseInt(heading.tagName.charAt(1)),
          };
        });
        setTocItems(tocItems);
      }
    } else {
      setTocItems([]);
    }
  }, [post, setTocItems]);

  if (loading) {
    return <div className="loading">포스트를 불러오는 중...</div>;
  }

  if (!post) {
    return <div className="error">포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <article className="blog-post">
      <header className="blog-post-header">
        <h1>{post.title}</h1>
        <div className="blog-post-meta">
          <span className="date">{post.date}</span>
          <span className="author">작성자: {post.author}</span>
          <span className="category">카테고리: {post.category}</span>
        </div>
        <div className="tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      </header>
      
      <div 
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      {features.enableComments && (
        <footer className="blog-post-footer">
          <div className="share-buttons">
            {features.enableSocialSharing && (
              <button className="share-btn">공유하기</button>
            )}
            <button className="like-btn">좋아요</button>
          </div>
          
          <div className="author-bio">
            <img 
              src="/api/placeholder/64/64" 
              alt={post.author} 
              className="author-image"
            />
            <div className="author-info">
              <h4>{post.author}</h4>
              <p>{blog.authorBio}</p>
            </div>
          </div>
          
          <div className="post-navigation">
            <button className="prev-post">이전 포스트</button>
            <button className="next-post">다음 포스트</button>
          </div>
          
          <div className="comments-section">
            <h3>댓글</h3>
            <form className="comment-form">
              <textarea placeholder="댓글을 작성해주세요..."></textarea>
              <button type="submit">댓글 작성</button>
            </form>
            
            <div className="comments-list">
              <div className="comment">
                <div className="comment-header">
                  <img 
                    src="/api/placeholder/40/40" 
                    alt="User" 
                    className="commenter-image"
                  />
                  <div className="commenter-info">
                    <h5>사용자1</h5>
                    <span className="comment-date">2023-05-16</span>
                  </div>
                </div>
                <div className="comment-body">
                  <p>정말 유익한 포스트네요! React로 블로그 만드는 방법을 자세히 알 수 있어서 좋았습니다.</p>
                </div>
                <div className="comment-actions">
                  <button className="reply-btn">답글</button>
                  <button className="like-btn">좋아요</button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </article>
  );
};

export default BlogPost;