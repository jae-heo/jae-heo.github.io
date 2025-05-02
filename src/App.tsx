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

// Utils
import { clearCache } from './utils/blogLoader';

function App() {
  const { t, currentLang, isRTL } = useI18n();
  const isDevelopment = import.meta.env.DEV;
  
  useEffect(() => {
    // Set document title and language attributes
    document.title = t('blog.title');
    document.documentElement.lang = currentLang;
    document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
    document.body.className = `lang-${currentLang}`;
    
    // Clear cache in development mode
    if (isDevelopment) {
      clearCache();
    }
    
    // Add Korean font if needed
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