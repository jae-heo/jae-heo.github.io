// src/pages/HomePage.tsx
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import BlogPostList from '../components/blog/BlogPostList';
import { getRecentBlogPosts } from '../utils/blogLoader';
import { BlogPost } from '../types/blog';

interface HomePageProps {
  showLayoutControls?: boolean;
}

function HomePage({ showLayoutControls = false }: HomePageProps) {
  const { t, i18n } = useTranslation();
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Reload posts when language changes
  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const posts = await getRecentBlogPosts(6); // Get more posts for homepage
        setRecentPosts(posts);
      } catch (error) {
        console.error('Failed to load recent posts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
    
    // Update page title with translated title
    document.title = t('blog.title');
  }, [i18n.language, t]); // Re-run when language changes
  
  return (
    <Layout showLayoutControls={showLayoutControls}>
      <section className="hero-section">
        <div className="hero-content">
          <h1>{t('pages.home.heroTitle')}</h1>
          <p>{t('pages.home.heroSubtitle')}</p>
        </div>
      </section>
      
      <section className="recent-posts-section">
        {loading ? (
          <div className="loading">{t('common.loading')}</div>
        ) : (
          <BlogPostList 
            posts={recentPosts} 
            title={t('blog.recentPosts')} 
          />
        )}
      </section>
    </Layout>
  );
}

export default HomePage;