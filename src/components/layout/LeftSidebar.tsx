// src/components/layout/LeftSidebar.tsx
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../utils/blogLoader';
import { Category } from '../../types/blog';
import blogConfig from '../../config/blog';

function LeftSidebar() {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);
  
  return (
    <aside className="left-sidebar">
      {/* Author Information */}
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
      
      {/* Categories Section */}
      <div className="sidebar-section">
        <h3>{t('sidebar.categories')}</h3>
        {loading ? (
          <div>Loading categories...</div>
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

export default LeftSidebar;