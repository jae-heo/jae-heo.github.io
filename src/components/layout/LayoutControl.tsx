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
    </div>
  );
}

export default LayoutControl;