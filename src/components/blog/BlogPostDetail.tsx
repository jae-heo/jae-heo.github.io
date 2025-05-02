// src/components/blog/BlogPostDetail.tsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types/blog';
import { formatDate } from '../../utils/dateFormatter';
import ReactMarkdown from 'react-markdown';

interface BlogPostDetailProps {
  post: BlogPost;
}

function BlogPostDetail({ post }: BlogPostDetailProps) {
  const { t } = useTranslation();
  
  if (!post) {
    return <div className="post-not-found">{t('blog.postNotFound')}</div>;
  }
  
  return (
    <article className="blog-post-detail">
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
        
        <div className="post-tags">
          <span className="tags-label">{t('post.tags')}</span>
          {post.tags.map(tag => (
            <Link key={tag} to={`/tag/${tag.toLowerCase()}`} className="post-tag">
              #{tag}
            </Link>
          ))}
        </div>
      </header>
      
      <div className="post-content">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      
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