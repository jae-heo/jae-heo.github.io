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
  const { t } = useTranslation();
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const posts = await getRecentBlogPosts();
        setRecentPosts(posts);
      } catch (error) {
        console.error('Failed to load recent posts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);
  
  return (
    <Layout showLayoutControls={showLayoutControls}>
      <section className="hero-section">
        <div className="hero-content">
          <h1>{t('blog.title')}</h1>
          <p>{t('blog.description')}</p>
        </div>
      </section>
      
      <section className="recent-posts-section">
        {loading ? (
          <div className="loading">Loading recent posts...</div>
        ) : (
          <BlogPostList 
            posts={recentPosts} 
            title={t('sidebar.recentPosts')} 
          />
        )}
      </section>
    </Layout>
  );
}

export default HomePage;