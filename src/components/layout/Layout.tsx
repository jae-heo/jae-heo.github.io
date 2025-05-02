// src/components/layout/Layout.tsx
import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import styles from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main layout component that wraps all pages
 * Provides consistent structure with header, sidebars, and footer
 */
function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.container}>
        {/* Left sidebar with author info */}
        <Sidebar position="left" className={styles.sidebarLeft} />
        
        {/* Main content */}
        <main className={styles.content}>
          {children}
        </main>
        
        {/* Right sidebar with categories and recent posts */}
        <Sidebar position="right" className={styles.sidebarRight} />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;