// src/components/layout/LayoutControl.tsx
import { useState, useEffect } from 'react';

/**
 * Layout Control Component - Allows dynamic adjustment of layout widths
 * This can be added to your app for development purposes
 */
function LayoutControl() {
  // State for sidebar widths
  const [leftSidebarWidth, setLeftSidebarWidth] = useState(250);
  const [rightSidebarWidth, setRightSidebarWidth] = useState(300);
  const [contentMaxWidth, setContentMaxWidth] = useState(800);
  
  // Update CSS variables when values change
  useEffect(() => {
    // Get root element to modify CSS variables
    const root = document.documentElement;
    
    // Update CSS variables
    root.style.setProperty('--left-sidebar-width', `${leftSidebarWidth}px`);
    root.style.setProperty('--right-sidebar-width', `${rightSidebarWidth}px`);
    root.style.setProperty('--content-max-width', `${contentMaxWidth}px`);
    
  }, [leftSidebarWidth, rightSidebarWidth, contentMaxWidth]);
  
  return (
    <div className="layout-control">
      <h3>Layout Controls</h3>
      
      <div className="control-group">
        <label htmlFor="left-sidebar-width">Left Sidebar Width: {leftSidebarWidth}px</label>
        <input
          id="left-sidebar-width"
          type="range"
          min="150"
          max="350"
          value={leftSidebarWidth}
          onChange={(e) => setLeftSidebarWidth(parseInt(e.target.value))}
        />
      </div>
      
      <div className="control-group">
        <label htmlFor="right-sidebar-width">Right Sidebar Width: {rightSidebarWidth}px</label>
        <input
          id="right-sidebar-width"
          type="range"
          min="200" 
          max="400"
          value={rightSidebarWidth}
          onChange={(e) => setRightSidebarWidth(parseInt(e.target.value))}
        />
      </div>
      
      <div className="control-group">
        <label htmlFor="content-max-width">Content Max Width: {contentMaxWidth}px</label>
        <input
          id="content-max-width"
          type="range"
          min="600"
          max="1200"
          value={contentMaxWidth}
          onChange={(e) => setContentMaxWidth(parseInt(e.target.value))}
        />
      </div>
      
      <button onClick={() => {
        // Reset to defaults
        setLeftSidebarWidth(250);
        setRightSidebarWidth(300);
        setContentMaxWidth(800);
      }}>
        Reset to Defaults
      </button>
      
      <style jsx>{`
        .layout-control {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: var(--card-bg-color);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 15px;
          z-index: 1000;
          box-shadow: 0 0 10px rgba(0,0,0,0.2);
          max-width: 300px;
        }
        
        h3 {
          margin-top: 0;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
        }
        
        .control-group {
          margin-bottom: 15px;
        }
        
        label {
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
        }
        
        input[type="range"] {
          width: 100%;
        }
        
        button {
          width: 100%;
          background-color: var(--primary-color);
          color: white;
          border: none;
          padding: 8px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        button:hover {
          background-color: var(--primary-hover-color);
        }
      `}</style>
    </div>
  );
}

export default LayoutControl;