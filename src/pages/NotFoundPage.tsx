// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';

function NotFoundPage() {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <div className="not-found-page">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="back-home-link">
          Back to Home
        </Link>
      </div>
    </Layout>
  );
}

export default NotFoundPage;