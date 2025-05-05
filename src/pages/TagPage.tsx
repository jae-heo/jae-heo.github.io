// src/pages/TagPage.tsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import BlogPostList from '../components/blog/BlogPostList';
import { useLanguageFilteredBlog } from '../contexts/LanguageFilteredBlogContext';
import { useI18n } from '../hooks/useI18n';
import styles from './TagPage.module.css';

function TagPage() {
  const { tag } = useParams<{ tag: string }>();
  const { t, getPageTitle } = useI18n();
  const { posts, loading } = useLanguageFilteredBlog();
  const [taggedPosts, setTaggedPosts] = useState([]);
  
  useEffect(() => {
    // Set page title
    if (tag) {
      document.title = getPageTitle('blog.title', { tag });
    }
    
    // Filter posts by tag
    if (tag && posts.length > 0) {
      const filtered = posts.filter(post => 
        post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
      );
      setTaggedPosts(filtered);
    }
  }, [tag, posts, getPageTitle]);
  
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