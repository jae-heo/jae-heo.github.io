// src/components/layout/Layout.tsx
import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main layout component that wraps all pages
 * Provides consistent structure with header, sidebars, and footer
 */
function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <div className="main-container">
        {/* Left sidebar with author info */}
        <Sidebar position="left" />
        
        {/* Main content */}
        <main className="content">
          {children}
        </main>
        
        {/* Right sidebar with categories and recent posts */}
        <Sidebar position="right" />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;