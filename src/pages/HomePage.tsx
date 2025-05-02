// src/pages/HomePage.tsx
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import BlogPostList from '../components/blog/BlogPostList';
import { getRecentBlogPosts } from '../data/blogPosts';

function HomePage() {
  const { t } = useTranslation();
  const recentPosts = getRecentBlogPosts();
  
  return (
    <Layout>
      <section className="hero-section">
        <div className="hero-content">
          <h1>{t('blog.title')}</h1>
          <p>{t('blog.description')}</p>
        </div>
      </section>
      
      <section className="recent-posts-section">
        <BlogPostList 
          posts={recentPosts} 
          title={t('sidebar.recentPosts')} 
        />
      </section>
    </Layout>
  );
}

export default HomePage;