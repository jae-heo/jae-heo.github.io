// src/components/layout/Layout.tsx
import { ReactNode, useState } from 'react';
import Header from './Header';
import Sidebar from './RightSidebar';
import LeftSidebar from './LeftSidebar';
import Footer from './Footer';
import LayoutControl from './LayoutControl'; // Import the layout control component

interface LayoutProps {
  children: ReactNode;
  showLayoutControls?: boolean; // Optional prop to show/hide layout controls
}

function Layout({ children, showLayoutControls = false }: LayoutProps) {
  // State to toggle layout controls visibility (only in development)
  const [showControls, setShowControls] = useState(showLayoutControls);
  const isDevelopment = import.meta.env.DEV;

  return (
    <div className="layout">
      <Header />
      <div className="main-container">
        {/* Left sidebar - author info */}
        <aside className="left-sidebar">
          <LeftSidebar />
        </aside>
        
        {/* Main content */}
        <main className="content">
          {children}
        </main>
        
        {/* Right sidebar - categories, recent posts, etc. */}
        <aside className="sidebar">
          <Sidebar />
        </aside>
      </div>
      <Footer />
      
      {/* Layout controls - only shown in development when enabled */}
      {isDevelopment && (
        <>
          {showControls ? (
            <LayoutControl />
          ) : (
            <button 
              className="layout-control-toggle"
              onClick={() => setShowControls(true)}
              title="Show Layout Controls"
            >
              ⚙️
            </button>
          )}
        </>
      )}
      
      {/* Inline styles for the toggle button */}
      <style jsx>{`
        .layout-control-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--primary-color);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          z-index: 1000;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          border: none;
        }
        
        .layout-control-toggle:hover {
          background-color: var(--primary-hover-color);
        }
      `}</style>
    </div>
  );
}

export default Layout;