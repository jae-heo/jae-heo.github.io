// App.js
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import TableOfContents from './components/TableOfContents';
import HomePage from './pages/HomePage';
import BlogPost from './pages/BlogPost';
import './App.css';

// 현재 경로를 체크하는 래퍼 컴포넌트
const AppContent = () => {
  const [tocItems, setTocItems] = useState([]);
  const location = useLocation();
  
  // 홈페이지인지 확인 (경로가 정확히 '/'인 경우)
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-container">
        <Navbar />
        <div className="main-content-wrapper">
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage setTocItems={setTocItems} />} />
              <Route path="/blog/:postId" element={<BlogPost setTocItems={setTocItems} />} />
            </Routes>
          </main>
          {/* 홈페이지가 아닐 때만 목차 표시 */}
          {!isHomePage && tocItems.length > 0 && (
            <aside className="table-of-contents">
              <TableOfContents items={tocItems} />
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;