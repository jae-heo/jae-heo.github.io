// src/components/blog/BlogPostDetail.tsx
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BlogPost } from '../../types/blog';
import { formatDate } from '../../utils/dateFormatter';
import blogConfig from '../../config/blog';

interface BlogPostDetailProps {
  post: BlogPost;
}

function BlogPostDetail({ post }: BlogPostDetailProps) {
  const { t, i18n } = useTranslation();
  
  // Get author name based on current language
  const getLocalizedAuthorName = (authorName: string) => {
    const currentLang = i18n.language;
    
    // If the author is the blog owner, use the localized name
    if (authorName === blogConfig.blog.author) {
      return blogConfig.languages.info[currentLang]?.authorName || authorName;
    }
    
    return authorName;
  };
  
  if (!post) {
    return <div className="post-not-found">{t('blog.postNotFound')}</div>;
  }
  
  const localizedAuthor = getLocalizedAuthorName(post.author);
  const formattedDate = formatDate(post.date);
  
  return (
    <article className="blog-post-detail">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        
        <div className="post-meta">
          <span className="post-date">
            {t('post.publishedOn', { date: formattedDate })}
          </span>
          <span className="post-author">
            {t('post.writtenBy', { author: localizedAuthor })}
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
      
      <div 
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
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