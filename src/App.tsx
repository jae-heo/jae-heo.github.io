// src/App.tsx
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Pages
import HomePage from './pages/HomePage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from './pages/AboutPage';
import TagPage from './pages/TagPage';
import NotFoundPage from './pages/NotFoundPage';

// In development mode, you might want to clear cache on refresh
import { clearCache } from './utils/blogLoader';

function App() {
  const { t } = useTranslation();
  
  useEffect(() => {
    document.title = t('blog.title');

    // Clear cache in development mode to see changes immediately
    if (import.meta.env.DEV) {
      clearCache();
    }
  }, [t]);

  return (
    <Router>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tag/:tag" element={<TagPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;