// src/pages/AboutPage.tsx
import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import AuthorProfile from '../components/common/AuthorProfile';
import { useI18n } from '../hooks/useI18n';
import styles from './AboutPage.module.css';

/**
 * About page component
 * Displays author information and blog details
 */
function AboutPage() {
  const { t, getPageTitle } = useI18n();
  
  useEffect(() => {
    // Set page title
    document.title = getPageTitle('pages.about.title');
  }, [getPageTitle]);
  
  return (
    <Layout>
      <section className={styles.section}>
        <h1 className={styles.pageTitle}>{t('pages.about.title')}</h1>
        
        <div className={styles.content}>
          {/* Author information */}
          <div className={styles.authorContainer}>
            <h2>{t('pages.about.aboutMe')}</h2>
            <AuthorProfile />
          </div>
          
          {/* About the blog */}
          <div className={styles.aboutBlog}>
            <h2>{t('pages.about.aboutBlog')}</h2>
            <p>{t('blog.description')}</p>
          </div>
          
          {/* Skills section */}
          <div className={styles.skillsSection}>
            <h3>{t('pages.about.skills')}</h3>
            <div className={styles.skillsGrid}>
              <div className={styles.skillItem}>React</div>
              <div className={styles.skillItem}>TypeScript</div>
              <div className={styles.skillItem}>JavaScript</div>
              <div className={styles.skillItem}>HTML/CSS</div>
              <div className={styles.skillItem}>Node.js</div>
              <div className={styles.skillItem}>Git</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AboutPage;