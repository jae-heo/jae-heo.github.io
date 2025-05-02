// src/components/blog/BlogPostDetail.tsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '../../types';
import { formatDate } from '../../utils/dateFormatter';
import LetterAvatar from '../common/LetterAvatar';
import styles from './BlogPostDetail.module.css';

interface BlogPostDetailProps {
  post: BlogPost;
}

/**
 * Blog post detail component for the single post page
 * Renders the full blog post content with metadata
 */
function BlogPostDetail({ post }: BlogPostDetailProps) {
  const { t } = useTranslation();
  
  if (!post) {
    return <div className={styles.notFound}>{t('blog.postNotFound')}</div>;
  }
  
  return (
    <article className={styles.container}>
      {/* Post header with title and metadata */}
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>
        
        <div className={styles.meta}>
          <span className={styles.date}>
            {formatDate(post.date)}
          </span>
          <span className={styles.author}>
            {post.author}
          </span>
        </div>
        
        {/* Featured image or Letter Avatar */}
        <div className={styles.featuredImage}>
          {post.imageUrl ? (
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              onError={(e) => {
                // If image fails to load, replace with letter avatar
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                
                // Create letter avatar
                const parent = target.parentElement;
                if (parent) {
                  const letterAvatarContainer = document.createElement('div');
                  letterAvatarContainer.className = styles.letterAvatarContainer;
                  parent.appendChild(letterAvatarContainer);
                  
                  // We'd normally use React to render this component,
                  // but for simplicity in error handling, we're creating a styled div
                  const letterAvatar = document.createElement('div');
                  letterAvatar.className = styles.letterAvatar;
                  letterAvatar.textContent = post.title.charAt(0).toUpperCase();
                  letterAvatarContainer.appendChild(letterAvatar);
                }
              }}
            />
          ) : (
            <div className={styles.letterAvatarContainer}>
              <LetterAvatar 
                title={post.title} 
                size={400}
                className={styles.letterAvatar}
              />
            </div>
          )}
        </div>
        
        {/* Tags */}
        <div className={styles.tags}>
          <span className={styles.tagsLabel}>{t('post.tags')}</span>
          {post.tags.map(tag => (
            <Link key={tag} to={`/tag/${tag.toLowerCase()}`} className={styles.tag}>
              #{tag}
            </Link>
          ))}
        </div>
      </header>
      
      {/* Post content rendered with markdown */}
      <div className={styles.content}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      
      {/* Post footer with navigation */}
      <footer className={styles.footer}>
        <div className={styles.navigation}>
          <Link to="/blog" className={styles.backLink}>
            {t('blog.backToPosts')}
          </Link>
        </div>
      </footer>
    </article>
  );
}

export default BlogPostDetail;