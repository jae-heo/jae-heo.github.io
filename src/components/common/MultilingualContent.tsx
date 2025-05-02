// src/components/common/MultilingualContent.tsx
import { ReactNode, useEffect, useState } from 'react';
import { useI18n } from '../../hooks/useI18n';

interface LanguageContent {
  [key: string]: ReactNode;
}

interface MultilingualContentProps {
  content: LanguageContent;
  fallback?: ReactNode;
}

/**
 * Component that renders content based on the current language
 * You can provide different content for each supported language
 */
function MultilingualContent({ content, fallback }: MultilingualContentProps) {
  const { currentLang, languages } = useI18n();
  const [currentContent, setCurrentContent] = useState<ReactNode | null>(null);
  
  useEffect(() => {
    // If content exists for current language, use it
    if (content[currentLang]) {
      setCurrentContent(content[currentLang]);
      return;
    }
    
    // Try default language if not available in current language
    if (content[languages.default]) {
      setCurrentContent(content[languages.default]);
      return;
    }
    
    // Use fallback or first available language content if nothing else works
    if (fallback) {
      setCurrentContent(fallback);
    } else {
      // Get first available language content
      const firstAvailableLang = Object.keys(content)[0];
      if (firstAvailableLang) {
        setCurrentContent(content[firstAvailableLang]);
      } else {
        setCurrentContent(null);
      }
    }
  }, [currentLang, content, fallback, languages.default]);
  
  return <>{currentContent}</>;
}

export default MultilingualContent;