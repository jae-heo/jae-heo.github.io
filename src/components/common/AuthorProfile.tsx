// src/components/common/AuthorProfile.tsx
import { Link } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import config from '../../config/blog';
import styles from './AuthorProfile.module.css';

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
      <div className={styles.profileCompact}>
        {authorImageUrl && (
          <div className={styles.avatar}>
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
        <h4 className={styles.name}>{authorName}</h4>
        <p className={styles.bioShort}>{authorBio}</p>
        <Link to="/about" className={styles.aboutLink}>{t('nav.about')}</Link>
      </div>
    );
  }
  
  // Full layout for about page
  return (
    <div className={styles.profileFull}>
      <div className={styles.authorInfo}>
        {authorImageUrl && (
          <div className={styles.authorImage}>
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
        
        <div className={styles.bio}>
          <h2>{authorName}</h2>
          <p>{authorBio}</p>
        </div>
      </div>
    </div>
  );
}

export default AuthorProfile;