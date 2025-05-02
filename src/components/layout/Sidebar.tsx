// src/components/layout/Sidebar.tsx
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getRecentBlogPosts } from '../../utils/blogLoader';
import { Category, BlogPost } from '../../types/blog';
import blogConfig from '../../config/blog';

function Sidebar() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedCategories, fetchedPosts] = await Promise.all([
          getCategories(),
          getRecentBlogPosts(5)
        ]);
        
        setCategories(fetchedCategories);
        setRecentPosts(fetchedPosts);
      } catch (error) {
        console.error('Failed to load sidebar data:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);
  
  if (loading) {
    return <aside className="sidebar">Loading...</aside>;
  }
  
  return (
    <aside className="sidebar">
      {/* 소개 섹션 추가 */}
      <div className="sidebar-section author-profile">
        <h3>{t('sidebar.about')}</h3>
        <div className="author-info-compact">
          {blogConfig.blog.authorImageUrl && (
            <div className="author-avatar">
              <img 
                src={blogConfig.blog.authorImageUrl} 
                alt={blogConfig.blog.author} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-profile.jpg';
                }}
              />
            </div>
          )}
          <h4 className="author-name">{blogConfig.blog.author}</h4>
          <p className="author-bio-short">{blogConfig.blog.authorBio}</p>
          <Link to="/about" className="about-link">{t('nav.about')}</Link>
        </div>
      </div>
      
      <div className="sidebar-section">
        <h3>{t('sidebar.categories')}</h3>
        <ul className="category-list">
          {categories.map(category => (
            <li key={category.id}>
              <Link to={`/tag/${category.slug}`}>
                {category.name} ({category.count})
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="sidebar-section">
        <h3>{t('sidebar.recentPosts')}</h3>
        <ul className="recent-posts-list">
          {recentPosts.map(post => (
            <li key={post.id}>
              <Link to={`/blog/${post.slug}`}>
                {post.title}
              </Link>
              <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="sidebar-section">
        <h3>{t('sidebar.socialMedia')}</h3>
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;