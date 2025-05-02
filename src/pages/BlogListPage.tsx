// src/pages/BlogListPage.tsx
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import BlogPostList from '../components/blog/BlogPostList';
import { getBlogPosts } from '../utils/blogLoader'; 
import { BlogPost } from '../types';
import { useI18n } from '../hooks/useI18n';
import styles from './BlogListPage.module.css';

/**
 * Blog list page component
 * Displays all blog posts
 */
function BlogListPage() {
  const { t, getPageTitle } = useI18n();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set page title
    document.title = getPageTitle('nav.blog');
    
    async function loadPosts() {
      try {
        setLoading(true);
        const allPosts = await getBlogPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [getPageTitle]);
  
  return (
    <Layout>
      <section className={styles.section}>
        <h1 className={styles.pageTitle}>{t('nav.blog')}</h1>
        {loading ? (
          <div className="loading">{t('common.loading')}</div>
        ) : (
          <BlogPostList posts={posts} />
        )}
      </section>
    </Layout>
  );
}

export default BlogListPage;