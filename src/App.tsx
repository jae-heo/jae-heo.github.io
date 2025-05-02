import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';

// 추가: 컴포넌트 import 추가 예정

function App() {
  const { t } = useTranslation();
  
  useEffect(() => {
    document.title = t('blog.title');
  }, [t]);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="app-container">
          {/* 사이드바와 컨텐츠 영역 추가 예정 */}
          <main className="content">
            <Routes>
              <Route path="/" element={<div>Home Page</div>} />
              <Route path="/blog/:postId" element={<div>Blog Post</div>} />
              <Route path="/about" element={<div>About Page</div>} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </main>
        </div>
      </Suspense>
    </Router>
  );
}

export default App;