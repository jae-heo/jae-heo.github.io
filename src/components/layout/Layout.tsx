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
    </div>
  );
}

export default Layout;