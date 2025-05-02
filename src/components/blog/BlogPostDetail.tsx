// src/components/blog/BlogPostDetail.tsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '../../types';
import { formatDate } from '../../utils/dateFormatter';
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
        
        {/* Featured image */}
        {post.imageUrl && (
          <div className={styles.featuredImage}>
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-image.jpg';
              }}
            />
          </div>
        )}
        
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