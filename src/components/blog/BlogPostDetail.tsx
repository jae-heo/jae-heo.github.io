// src/components/blog/BlogPostDetail.tsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '../../types';
import { formatDate } from '../../utils/dateFormatter';
import './BlogPostDetail.css';

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
    return <div className="post-not-found">{t('blog.postNotFound')}</div>;
  }
  
  return (
    <article className="blog-post-detail">
      {/* Post header with title and metadata */}
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        
        <div className="post-meta">
          <span className="post-date">
            {formatDate(post.date)}
          </span>
          <span className="post-author">
            {post.author}
          </span>
        </div>
        
        {/* Featured image */}
        {post.imageUrl && (
          <div className="post-featured-image">
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
        <div className="post-tags">
          <span className="tags-label">{t('post.tags')}</span>
          {post.tags.map(tag => (
            <Link key={tag} to={`/tag/${tag.toLowerCase()}`} className="post-tag">
              #{tag}
            </Link>
          ))}
        </div>
      </header>
      
      {/* Post content rendered with markdown */}
      <div className="post-content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      
      {/* Post footer with navigation */}
      <footer className="post-footer">
        <div className="post-navigation">
          <Link to="/blog" className="back-to-posts">
            {t('blog.backToPosts')}
          </Link>
        </div>
      </footer>
    </article>
  );
}

export default BlogPostDetail;