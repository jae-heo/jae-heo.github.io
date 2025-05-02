// src/components/common/AuthorProfile.tsx
import { Link } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import config from '../../config/blog';
import './AuthorProfile.css';

interface AuthorProfileProps {
  compact?: boolean;
}

/**
 * Author profile component used in sidebar and about page
 * Supports compact mode for sidebar and full mode for about page
 */
function AuthorProfile({ compact = false }: AuthorProfileProps) {
  const { t, currentLang } = useI18n();
  
  // Get localized author info
  const authorName = config.languages.info[currentLang]?.authorName || config.blog.author;
  const authorBio = config.languages.info[currentLang]?.authorBio || config.blog.authorBio;
  const { authorImageUrl } = config.blog;
  
  // Use compact layout for sidebar
  if (compact) {
    return (
      <div className="author-profile-compact">
        {authorImageUrl && (
          <div className="author-avatar">
            <img 
              src={authorImageUrl} 
              alt={authorName} 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-profile.jpg';
              }}
            />
          </div>
        )}
        <h4 className="author-name">{authorName}</h4>
        <p className="author-bio-short">{authorBio}</p>
        <Link to="/about" className="about-link">{t('nav.about')}</Link>
      </div>
    );
  }
  
  // Full layout for about page
  return (
    <div className="author-profile-full">
      <div className="author-info">
        {authorImageUrl && (
          <div className="author-image">
            <img 
              src={authorImageUrl} 
              alt={authorName} 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-profile.jpg';
              }}
            />
          </div>
        )}
        
        <div className="author-bio">
          <h2>{authorName}</h2>
          <p>{authorBio}</p>
        </div>
      </div>
    </div>
  );
}

export default AuthorProfile;