// src/components/layout/Layout.tsx
import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <div className="main-container">
        <main className="content">
          {children}
        </main>
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;