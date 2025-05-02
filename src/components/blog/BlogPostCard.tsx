// src/components/blog/BlogPostCard.tsx
import { Link } from 'react-router-dom';
import { useI18n } from '../../hooks/useI18n';
import { BlogPost } from '../../types';
import { formatDate } from '../../utils/dateFormatter';
import './BlogPostCard.css';

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
    <article className="post-card">
      {/* Post image */}
      {post.imageUrl && (
        <Link to={`/blog/${post.slug}`} className="post-image-container">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="post-image" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-image.jpg';
            }}
          />
        </Link>
      )}
      
      <div className="post-content">
        {/* Post header with title and metadata */}
        <header>
          <h2 className="post-title">
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <div className="post-meta">
            <span className="post-date">{formatDate(post.date)}</span>
            <span className="post-author">{authorName}</span>
          </div>
        </header>
        
        {/* Post description */}
        <p className="post-description">{post.description}</p>
        
        {/* Post footer with tags and read more link */}
        <footer className="post-footer">
          <div className="post-tags">
            {post.tags.map(tag => (
              <Link key={tag} to={`/tag/${tag.toLowerCase()}`} className="post-tag">
                #{tag}
              </Link>
            ))}
          </div>
          <Link to={`/blog/${post.slug}`} className="read-more-link">
            {t('blog.readMore')}
          </Link>
        </footer>
      </div>
    </article>
  );
}

export default BlogPostCard;