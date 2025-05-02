// src/components/layout/Sidebar.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getCategories, getRecentBlogPosts } from '../../utils/blogLoader';
import { BlogPost, Category } from '../../types/blog';
import AuthorProfile from '../common/AuthorProfile';
import './Sidebar.css';

interface SidebarProps {
  position: 'left' | 'right';
}

/**
 * Unified sidebar component that handles both left and right sidebars
 * Left sidebar: Author profile and categories
 * Right sidebar: Recent posts, archives, tags
 */
function Sidebar({ position }: SidebarProps) {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        if (position === 'left') {
          // Load categories for left sidebar
          const fetchedCategories = await getCategories();
          setCategories(fetchedCategories);
        } else {
          // Load recent posts for right sidebar
          const posts = await getRecentBlogPosts(5);
          setRecentPosts(posts);
        }
      } catch (error) {
        console.error(`Failed to load sidebar data for ${position} sidebar:`, error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [position]);
  
  // Left sidebar content
  if (position === 'left') {
    return (
      <aside className="sidebar sidebar-left">
        {/* Author Profile Section */}
        <div className="sidebar-section">
          <h3>{t('sidebar.about')}</h3>
          <AuthorProfile compact={true} />
        </div>
        
        {/* Categories Section */}
        <div className="sidebar-section">
          <h3>{t('sidebar.categories')}</h3>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ul className="category-list">
              {categories.map(category => (
                <li key={category.id}>
                  <Link to={`/tag/${category.slug}`}>
                    {category.name} ({category.count})
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    );
  }
  
  // Right sidebar content
  return (
    <aside className="sidebar sidebar-right">
      {/* Recent Posts Section */}
      <div className="sidebar-section">
        <h3>{t('sidebar.recentPosts')}</h3>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="recent-posts-list">
            {recentPosts.map(post => (
              <li key={post.id}>
                <Link to={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
                <span className="post-date">
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Social Media Section */}
      <div className="sidebar-section">
        <h3>{t('sidebar.socialMedia')}</h3>
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      
      {/* Tag Cloud Section */}
      <div className="sidebar-section">
        <h3>{t('sidebar.tagCloud')}</h3>
        <div className="tag-cloud">
          <Link to="/tag/react" className="tag">React</Link>
          <Link to="/tag/typescript" className="tag">TypeScript</Link>
          <Link to="/tag/web-development" className="tag">Web Development</Link>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;