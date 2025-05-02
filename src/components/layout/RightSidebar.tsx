// src/components/layout/RightSidebar.tsx
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecentBlogPosts } from '../../utils/blogLoader';
import { BlogPost } from '../../types/blog';

function RightSidebar() {
  const { t } = useTranslation();
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadRecentPosts() {
      try {
        const posts = await getRecentBlogPosts(5);
        setRecentPosts(posts);
      } catch (error) {
        console.error('Failed to load recent posts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadRecentPosts();
  }, []);
  
  return (
    <aside className="right-sidebar">
      {/* Recent Posts Section */}
      <div className="sidebar-section">
        <h3>{t('sidebar.recentPosts')}</h3>
        {loading ? (
          <div>Loading recent posts...</div>
        ) : (
          <ul className="recent-posts-list">
            {recentPosts.map(post => (
              <li key={post.id}>
                <Link to={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
                <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Social Media Section */}
      <div className="sidebar-section">
        <h3>{t('sidebar.socialMedia')}</h3>
        <div className="social-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      
      {/* Archives Section */}
      <div className="sidebar-section">
        <h3>{t('sidebar.archives')}</h3>
        <ul className="archive-list">
          <li><Link to="/archives/2023">2023</Link></li>
          <li><Link to="/archives/2022">2022</Link></li>
          <li><Link to="/archives/2021">2021</Link></li>
        </ul>
      </div>
      
      {/* Tag Cloud Section (Optional) */}
      <div className="sidebar-section">
        <h3>{t('sidebar.tagCloud')}</h3>
        <div className="tag-cloud">
          <Link to="/tag/react" className="tag tag-sm">React</Link>
          <Link to="/tag/typescript" className="tag tag-md">TypeScript</Link>
          <Link to="/tag/web-development" className="tag tag-lg">Web Development</Link>
          <Link to="/tag/javascript" className="tag tag-md">JavaScript</Link>
          <Link to="/tag/css" className="tag tag-sm">CSS</Link>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;