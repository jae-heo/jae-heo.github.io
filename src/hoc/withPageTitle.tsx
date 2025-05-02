// src/hoc/withPageTitle.tsx
import React, { useEffect } from 'react';
import { useI18n } from '../hooks/useI18n';

interface WithPageTitleProps {
  titleKey: string;
  titleParams?: Record<string, any>;
}

/**
 * Higher-order component that automatically sets the page title
 * based on the provided translation key when the component mounts
 * and when the language changes.
 */
function withPageTitle<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithPageTitleProps
) {
  const { titleKey, titleParams } = options;
  
  // Return a new component
  const WithPageTitle: React.FC<P> = (props) => {
    const { getPageTitle, i18n } = useI18n();
    
    // Set document title on mount and language change
    useEffect(() => {
      document.title = getPageTitle(titleKey, titleParams);
      
      // Reset title when component unmounts
      return () => {
        document.title = getPageTitle('blog.title');
      };
    }, [i18n.language, getPageTitle]);
    
    // Render the wrapped component with its props
    return <WrappedComponent {...props} />;
  };
  
  // Set display name for debugging
  const displayName = 
    WrappedComponent.displayName || 
    WrappedComponent.name || 
    'Component';
    
  WithPageTitle.displayName = `WithPageTitle(${displayName})`;
  
  return WithPageTitle;
}

export default withPageTitle;