// src/components/blog/BlogPostList.tsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types/blog';
import { formatDate } from '../../utils/dateFormatter';
import blogConfig from '../../config/blog';

interface BlogPostListProps {
  posts: BlogPost[];
  title?: string;
}

function BlogPostList({ posts, title }: BlogPostListProps) {
  const { t, i18n } = useTranslation();
  
  // Get author name based on current language
  const getLocalizedAuthorName = (authorName: string) => {
    const currentLang = i18n.language;
    // For simple cases, just return the author name
    if (!blogConfig.languages.info[currentLang]?.authorName) {
      return authorName;
    }
    
    // If the author is the blog owner, use the localized name
    if (authorName === blogConfig.blog.author) {
      return blogConfig.languages.info[currentLang]?.authorName || authorName;
    }
    
    return authorName;
  };
  
  if (posts.length === 0) {
    return <div className="no-posts">{t('blog.noPostsFound')}</div>;
  }
  
  return (
    <div className="blog-post-list">
      {title && <h2 className="section-title">{title}</h2>}
      
      <div className="posts-grid">
        {posts.map(post => {
          const localizedAuthor = getLocalizedAuthorName(post.author);
          
          return (
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
                    <span className="post-author">{localizedAuthor}</span>
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
                    {t('blog.readMore')}
                  </Link>
                </footer>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default BlogPostList;