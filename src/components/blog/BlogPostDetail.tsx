// src/components/blog/BlogPostDetail.tsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types/blog';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface BlogPostDetailProps {
  post: BlogPost;
}

function BlogPostDetail({ post }: BlogPostDetailProps) {
  const { i18n } = useTranslation();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'PPP', { locale: i18n.language === 'ko' ? ko : undefined });
  };
  
  if (!post) {
    return <div className="post-not-found">Post not found</div>;
  }
  
  return (
    <article className="blog-post-detail">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        
        <div className="post-meta">
          <span className="post-date">{formatDate(post.date)}</span>
          <span className="post-author">{post.author}</span>
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
          {post.tags.map(tag => (
            <Link key={tag} to={`/tag/${tag.toLowerCase()}`} className="post-tag">
              #{tag}
            </Link>
          ))}
        </div>
      </header>
      
      <div 
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      <footer className="post-footer">
        <div className="post-navigation">
          <Link to="/blog" className="back-to-posts">
            ← Back to all posts
          </Link>
        </div>
      </footer>
    </article>
  );
}

export default BlogPostDetail;