// src/components/blog/BlogPostList.tsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types/blog';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface BlogPostListProps {
  posts: BlogPost[];
  title?: string;
}

function BlogPostList({ posts, title }: BlogPostListProps) {
  const { i18n } = useTranslation();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'PPP', { locale: i18n.language === 'ko' ? ko : undefined });
  };
  
  if (posts.length === 0) {
    return <div className="no-posts">No posts found</div>;
  }
  
  return (
    <div className="blog-post-list">
      {title && <h2 className="section-title">{title}</h2>}
      
      <div className="posts-grid">
        {posts.map(post => (
          <article key={post.id} className="post-card">
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
              <header>
                <h2 className="post-title">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <div className="post-meta">
                  <span className="post-date">{formatDate(post.date)}</span>
                  <span className="post-author">{post.author}</span>
                </div>
              </header>
              
              <p className="post-description">{post.description}</p>
              
              <footer className="post-footer">
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <Link key={tag} to={`/tag/${tag.toLowerCase()}`} className="post-tag">
                      #{tag}
                    </Link>
                  ))}
                </div>
                <Link to={`/blog/${post.slug}`} className="read-more-link">
                  Read More →
                </Link>
              </footer>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default BlogPostList;