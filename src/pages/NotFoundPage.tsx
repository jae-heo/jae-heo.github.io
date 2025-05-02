// src/pages/NotFoundPage.tsx
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

interface NotFoundPageProps {
  showLayoutControls?: boolean;
}

function NotFoundPage({ showLayoutControls = false }: NotFoundPageProps) {
  return (
    <Layout showLayoutControls={showLayoutControls}>
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