// src/pages/HomePage.tsx
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import BlogPostList from '../components/blog/BlogPostList';
import { getRecentBlogPosts } from '../utils/blogLoader';
import { BlogPost } from '../types';
import { useI18n } from '../hooks/useI18n';
import './HomePage.css';

/**
 * Home page component
 * Features a hero section and recent blog posts
 */
function HomePage() {
  const { t } = useI18n();
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const posts = await getRecentBlogPosts(6);
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
    <Layout>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>{t('pages.home.heroTitle')}</h1>
          <p>{t('pages.home.heroSubtitle')}</p>
        </div>
      </section>
      
      {/* Recent Posts Section */}
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