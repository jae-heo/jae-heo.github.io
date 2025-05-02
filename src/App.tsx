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
  const isDevelopment = import.meta.env.DEV;
  
  useEffect(() => {
    document.title = t('blog.title');

    // Clear cache in development mode to see changes immediately
    if (isDevelopment) {
      clearCache();
    }
  }, [t, isDevelopment]);

  return (
    <Router>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          {/* Pass the showLayoutControls prop to enable layout controls in dev mode */}
          <Route path="/" element={<HomePage showLayoutControls={isDevelopment} />} />
          <Route path="/blog" element={<BlogListPage showLayoutControls={isDevelopment} />} />
          <Route path="/blog/:slug" element={<BlogPostPage showLayoutControls={isDevelopment} />} />
          <Route path="/about" element={<AboutPage showLayoutControls={isDevelopment} />} />
          <Route path="/tag/:tag" element={<TagPage showLayoutControls={isDevelopment} />} />
          <Route path="*" element={<NotFoundPage showLayoutControls={isDevelopment} />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;