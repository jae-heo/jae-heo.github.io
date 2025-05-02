// src/components/layout/Layout.tsx
import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import LeftSidebar from './LeftSidebar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <div className="main-container">
        {/* 왼쪽 사이드바 - 소개 정보 */}
        <LeftSidebar />
        
        {/* 메인 콘텐츠 */}
        <main className="content">
          {children}
        </main>
        
        {/* 오른쪽 사이드바 - 기존 메뉴, 카테고리 등 */}
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;