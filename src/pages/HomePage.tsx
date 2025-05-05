// src/pages/HomePage.tsx
import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import BlogPostList from '../components/blog/BlogPostList';
import { useLanguageFilteredBlog } from '../contexts/LanguageFilteredBlogContext';
import { useI18n } from '../hooks/useI18n';
import styles from './HomePage.module.css';

function HomePage() {
  const { t } = useI18n();
  const { posts, loading, error } = useLanguageFilteredBlog();
  
  // Get only the recent posts from the filtered list
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>{t('pages.home.heroTitle')}</h1>
          <p>{t('pages.home.heroSubtitle')}</p>
        </div>
      </section>
      
      {/* Recent Posts Section */}
      <section className={styles.recentPostsSection}>
        {loading ? (
          <div className="loading">{t('common.loading')}</div>
        ) : error ? (
          <div className="error">{error}</div>
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