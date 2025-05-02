// src/components/blog/BlogPostList.tsx
import { useTranslation } from 'react-i18next';
import { BlogPost } from '../../types';
import BlogPostCard from './BlogPostCard';
import '../../styles/components/blog/blog-post-list.css';

interface BlogPostListProps {
  posts: BlogPost[];
  title?: string;
}

/**
 * Blog post list component that renders a grid of blog posts
 */
function BlogPostList({ posts, title }: BlogPostListProps) {
  const { t } = useTranslation();
  
  // If no posts, show a message
  if (posts.length === 0) {
    return <div className="no-posts">{t('blog.noPostsFound')}</div>;
  }
  
  return (
    <div className="blog-post-list">
      {/* Optional section title */}
      {title && <h2 className="section-title">{title}</h2>}
      
      {/* Grid of blog posts */}
      <div className="posts-grid">
        {posts.map(post => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default BlogPostList;