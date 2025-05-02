// src/components/blog/BlogPostCard.tsx
import { Link } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import { BlogPost } from '../../types';
import { formatDate } from '../../utils/dateFormatter';
import LetterAvatar from '../common/LetterAvatar';
import styles from './BlogPostCard.module.css';

interface BlogPostCardProps {
  post: BlogPost;
}

/**
 * Blog post card component for the blog list
 * Displays a preview of the blog post with image, title, description, and metadata
 */
function BlogPostCard({ post }: BlogPostCardProps) {
  const { t, getLocalizedAuthorName } = useI18n();
  
  // Get localized author name
  const authorName = getLocalizedAuthorName(post.author);
  
  return (
    <article className={styles.card}>
      {/* Post image or letter avatar */}
      <Link to={`/blog/${post.slug}`} className={styles.imageContainer}>
        {post.imageUrl ? (
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className={styles.image} 
            onError={(e) => {
              // If image fails to load, replace with letter avatar
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const container = target.parentElement;
              if (container) {
                const avatar = document.createElement('div');
                avatar.className = styles.letterAvatar;
                container.appendChild(avatar);
              }
            }}
          />
        ) : (
          <LetterAvatar 
            title={post.title} 
            className={styles.letterAvatar}
          />
        )}
      </Link>
      
      <div className={styles.content}>
        {/* Post header with title and metadata */}
        <header>
          <h2 className={styles.title}>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <div className={styles.meta}>
            <span className={styles.date}>{formatDate(post.date)}</span>
            <span className={styles.author}>{authorName}</span>
          </div>
        </header>
        
        {/* Post description */}
        <p className={styles.description}>{post.description}</p>
        
        {/* Post footer with tags and read more link */}
        <footer className={styles.footer}>
          <div className={styles.tags}>
            {post.tags.map(tag => (
              <Link key={tag} to={`/tag/${tag.toLowerCase()}`} className={styles.tag}>
                #{tag}
              </Link>
            ))}
          </div>
          <Link to={`/blog/${post.slug}`} className={styles.readMore}>
            {t('blog.readMore')}
          </Link>
        </footer>
      </div>
    </article>
  );
}

export default BlogPostCard;