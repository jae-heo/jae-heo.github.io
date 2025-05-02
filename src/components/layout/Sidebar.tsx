// src/components/layout/Sidebar.tsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getCategories, getRecentBlogPosts } from '../../data/blogPosts';

function Sidebar() {
  const { t } = useTranslation();
  const categories = getCategories();
  const recentPosts = getRecentBlogPosts(5);
  
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>{t('sidebar.categories')}</h3>
        <ul className="category-list">
          {categories.map(category => (
            <li key={category.id}>
              <Link to={`/category/${category.slug}`}>
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