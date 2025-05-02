// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useI18n } from '../hooks/useI18n';
import './NotFoundPage.css';

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
      <div className="not-found-page">
        <h1>404</h1>
        <h2>{t('pages.notFound.title')}</h2>
        <p>{t('pages.notFound.message')}</p>
        <Link to="/" className="back-home-link">
          {t('pages.notFound.backToHome')}
        </Link>
      </div>
    </Layout>
  );
}

export default NotFoundPage;