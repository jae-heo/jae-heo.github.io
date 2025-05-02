// src/components/layout/Layout.tsx
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { t } = useTranslation();
  
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