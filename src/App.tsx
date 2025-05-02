// src/App.tsx
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useI18n } from './hooks/useI18n';

// Pages
import HomePage from './pages/HomePage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from './pages/AboutPage';
import TagPage from './pages/TagPage';
import NotFoundPage from './pages/NotFoundPage';

// In development mode, you might want to clear cache on refresh
import { clearCache } from './utils/blogLoader';
import blogConfig from './config/blog';

function App() {
  const { t, i18n, currentLang, isRTL } = useI18n();
  const isDevelopment = import.meta.env.DEV;
  
  useEffect(() => {
    // Set document title
    document.title = t('blog.title');

    // Set HTML lang attribute to current language
    document.documentElement.lang = currentLang;
    
    // Set RTL attribute if needed
    document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';

    // Clear cache in development mode to see changes immediately
    if (isDevelopment) {
      clearCache();
    }
    
    // Add language-specific class to body for additional styling
    document.body.className = `lang-${currentLang}`;
    
    // Add any font imports needed for specific languages
    if (currentLang === 'ko' && !document.getElementById('korean-font')) {
      const link = document.createElement('link');
      link.id = 'korean-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap';
      document.head.appendChild(link);
    }
  }, [t, currentLang, isRTL, isDevelopment]);

  return (
    <Router>
      <Suspense fallback={<div className="loading">{t('common.loading')}</div>}>
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