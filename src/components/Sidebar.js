// components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import blogConfig from '../config';
import Icon from './Icon';
import './Sidebar.css';

// 각 섹션 컴포넌트들
const ProfileSection = () => {
  const { blog } = blogConfig;
  
  return (
    <div className="sidebar-profile">
      <img 
        src={blog.authorImageUrl} 
        alt={blog.author} 
        className="profile-image" 
      />
      <h3>{blog.author}</h3>
      <p>{blog.description}</p>
    </div>
  );
};

const MenuSection = ({ section }) => {
  const { mainMenu } = blogConfig;
  const visibleItems = mainMenu
    .filter(item => item.visible)
    .sort((a, b) => a.order - b.order);
  
  return (
    <div className="nav-section">
      <h4>{section.title}</h4>
      <ul className="nav-list">
        {visibleItems.map(menuItem => (
          <li key={menuItem.id} className="nav-item">
            <Link to={menuItem.path} className="nav-link">
              {menuItem.icon && (
                <Icon name={menuItem.icon} size={16} />
              )}
              <span>{menuItem.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CategoriesSection = ({ section }) => {
  const { categories } = blogConfig;
  const visibleCategories = categories
    .filter(category => category.visible)
    .sort((a, b) => a.order - b.order);
  
  return (
    <div className="nav-section">
      <h4>{section.title}</h4>
      <ul className="nav-list">
        {visibleCategories.map(category => (
          <React.Fragment key={category.id}>
            <li className="nav-item">
              <Link to={category.path} className="nav-link">
                {category.icon && (
                  <Icon name={category.icon} size={16} />
                )}
                <span>{category.name}</span>
              </Link>
            </li>
            {category.subCategories && category.subCategories.length > 0 && (
              <ul className="sub-nav-list">
                {category.subCategories
                  .filter(subCat => subCat.visible)
                  .sort((a, b) => a.order - b.order)
                  .map(subCategory => (
                    <li key={subCategory.id} className="sub-nav-item">
                      <Link to={subCategory.path} className="sub-nav-link">
                        {subCategory.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

const RecentPostsSection = ({ section }) => {
  // 실제로는 API 또는 상태 관리를 통해 최근 포스트를 가져오겠지만,
  // 여기서는 예시를 위해 더미 데이터를 사용합니다
  const recentPosts = [
    { id: 1, title: "React로 블로그 만들기", path: "/blog/1" },
    { id: 2, title: "JavaScript의 비동기 처리", path: "/blog/2" },
    { id: 3, title: "CSS Grid 레이아웃 가이드", path: "/blog/3" }
  ];
  
  return (
    <div className="nav-section">
      <h4>{section.title}</h4>
      <ul className="recent-posts-list">
        {recentPosts.slice(0, section.count || 3).map(post => (
          <li key={post.id} className="recent-post-item">
            <Link to={post.path} className="recent-post-link">
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const TagsSection = ({ section }) => {
  const { tags } = blogConfig;
  const visibleTags = tags
    .filter(tag => tag.visible)
    .sort((a, b) => b.count - a.count) // 가장 많이 사용된 태그 순으로 정렬
    .slice(0, section.count || 10);
  
  return (
    <div className="nav-section">
      <h4>{section.title}</h4>
      <div className="tag-cloud">
        {visibleTags.map(tag => (
          <Link 
            key={tag.id} 
            to={tag.path} 
            className="tag-link"
            style={{ 
              fontSize: `${Math.max(0.8, Math.min(1.8, 0.8 + (tag.count / 10)))}rem` 
            }}
          >
            {tag.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

const SocialSection = ({ section }) => {
  const { socialMedia } = blogConfig;
  const visibleSocial = socialMedia
    .filter(social => social.visible)
    .sort((a, b) => a.order - b.order);
  
  return (
    <div className="nav-section">
      <h4>{section.title}</h4>
      <ul className="nav-list">
        {visibleSocial.map(social => (
          <li key={social.id} className="nav-item">
            <a 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link social-link"
            >
              {social.icon && (
                <Icon name={social.icon} size={16} />
              )}
              <span>{social.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ArchivesSection = ({ section }) => {
  const { archives } = blogConfig;
  const visibleArchives = archives
    .filter(archive => archive.visible)
    .sort((a, b) => b.date.localeCompare(a.date)); // 최신 날짜순으로 정렬
  
  return (
    <div className="nav-section">
      <h4>{section.title}</h4>
      <ul className="archives-list">
        {visibleArchives.map(archive => (
          <li key={archive.id} className="archive-item">
            <Link to={archive.path} className="archive-link">
              {archive.label} <span className="count">({archive.count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// 메인 사이드바 컴포넌트
const Sidebar = () => {
  const { sidebar, blog } = blogConfig;
  
  // 섹션을 표시 순서대로 정렬
  const visibleSections = sidebar.sections
    .filter(section => section.visible)
    .sort((a, b) => a.order - b.order);
  
  // 섹션 타입에 맞는 컴포넌트 반환
  const renderSection = (section) => {
    switch (section.type) {
      case 'menu':
        return <MenuSection key={section.id} section={section} />;
      case 'categories':
        return <CategoriesSection key={section.id} section={section} />;
      case 'recent-posts':
        return <RecentPostsSection key={section.id} section={section} />;
      case 'tags':
        return <TagsSection key={section.id} section={section} />;
      case 'social':
        return <SocialSection key={section.id} section={section} />;
      case 'archives':
        return <ArchivesSection key={section.id} section={section} />;
      default:
        return null;
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>{blog.title}</h1>
      </div>
      
      {sidebar.display.showProfile && <ProfileSection />}
      
      <div className="sidebar-nav">
        {visibleSections.map(renderSection)}
      </div>
      
      <div className="sidebar-footer">
        <p className="copyright">{blog.copyright}</p>
      </div>
    </aside>
  );
};

export default Sidebar;