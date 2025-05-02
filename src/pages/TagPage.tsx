// src/pages/TagPage.tsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import BlogPostList from '../components/blog/BlogPostList';
import { getBlogPostsByTag } from '../utils/blogLoader';
import { BlogPost } from '../types';
import { useI18n } from '../hooks/useI18n';
import styles from './TagPage.module.css';

/**
 * Tag page component
 * Displays posts filtered by tag
 */
function TagPage() {
  const { tag } = useParams<{ tag: string }>();
  const { t, getPageTitle } = useI18n();
  const [taggedPosts, setTaggedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Set page title
    if (tag) {
      document.title = getPageTitle('blog.title', { tag });
    }
    
    async function loadPosts() {
      if (!tag) return;
      
      try {
        setLoading(true);
        const posts = await getBlogPostsByTag(tag);
        setTaggedPosts(posts);
      } catch (error) {
        console.error(`Failed to load posts with tag: ${tag}`, error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [tag, getPageTitle]);
  
  return (
    <Layout>
      <section className={styles.section}>
        <h1 className={styles.pageTitle}>
          {tag}
        </h1>
        {loading ? (
          <div className="loading">{t('common.loading')}</div>
        ) : (
          <BlogPostList 
            posts={taggedPosts} 
            title={`${taggedPosts.length} ${taggedPosts.length === 1 ? t('post.post') : t('post.posts')}`}
          />
        )}
      </section>
    </Layout>
  );
}

export default TagPage;