// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useI18n } from '../hooks/useI18n';
import styles from './NotFoundPage.module.css';

/**
 * 404 Not Found page component
 */
function NotFoundPage() {
  const { t } = useI18n();
  
  useEffect(() => {
    // Set document title for the 404 page
    document.title = `404 - ${t('pages.notFound.title')}`;
  }, [t]);
  
  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title404}>404</h1>
        <h2 className={styles.title}>{t('pages.notFound.title')}</h2>
        <p className={styles.message}>{t('pages.notFound.message')}</p>
        <Link to="/" className={styles.backLink}>
          {t('pages.notFound.backToHome')}
        </Link>
      </div>
    </Layout>
  );
}

export default NotFoundPage;