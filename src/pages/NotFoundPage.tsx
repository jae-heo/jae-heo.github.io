// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Layout from '../components/layout/Layout';

interface NotFoundPageProps {
  showLayoutControls?: boolean;
}

function NotFoundPage({ showLayoutControls = false }: NotFoundPageProps) {
  const { t } = useTranslation();
  
  // Set document title for the 404 page
  useEffect(() => {
    document.title = `404 - ${t('pages.notFound.title')}`;
  }, [t]);
  
  return (
    <Layout showLayoutControls={showLayoutControls}>
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