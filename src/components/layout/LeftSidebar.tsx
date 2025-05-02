// src/components/layout/LeftSidebar.tsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import blogConfig from '../../config/blog';

function LeftSidebar() {
  const { t } = useTranslation();
  
  return (
    <aside className="left-sidebar">
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
    </aside>
  );
}

export default LeftSidebar;