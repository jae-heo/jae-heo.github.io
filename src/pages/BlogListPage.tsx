// src/pages/BlogListPage.tsx
import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import BlogPostList from '../components/blog/BlogPostList';
import { useLanguageFilteredBlog } from '../contexts/LanguageFilteredBlogContext';
import { useI18n } from '../hooks/useI18n';
import styles from './BlogListPage.module.css';

function BlogListPage() {
  const { t, getPageTitle, currentLang } = useI18n();
  const { posts, loading, error } = useLanguageFilteredBlog();
  
  // Get language display name for UI
  const languageDisplay = currentLang === 'ko' ? '한국어' : 'English';
  
  useEffect(() => {
    // Set page title
    document.title = getPageTitle('nav.blog');
  }, [getPageTitle]);
  
  return (
    <Layout>
      <section className={styles.section}>
        <h1 className={styles.pageTitle}>
          {t('nav.blog')}
          <span className={styles.languageIndicator}>
            {languageDisplay}
          </span>
        </h1>
        
        {loading ? (
          <div className="loading">{t('common.loading')}</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : posts.length === 0 ? (
          <div className={styles.noPosts}>
            {t('blog.noPostsInLanguage', { language: languageDisplay })}
          </div>
        ) : (
          <BlogPostList 
            posts={posts} 
            title={`${posts.length} ${posts.length === 1 ? t('post.post') : t('post.posts')}`} 
          />
        )}
      </section>
    </Layout>
  );
}

export default BlogListPage;