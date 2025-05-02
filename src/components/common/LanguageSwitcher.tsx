// src/components/common/LanguageSwitcher.tsx
import { useState, useRef, useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import '../../styles/components/common/language-switcher.css';

interface LanguageSwitcherProps {
  showText?: boolean;
}

/**
 * Language switcher component
 * Supports both button and dropdown styles
 */
function LanguageSwitcher({ showText = false }: LanguageSwitcherProps) {
  const { currentLang, languages, switchLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Get current language info
  const currentLanguage = languages.info[currentLang];
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <div ref={dropdownRef} className="language-switcher">
      {/* Current language button */}
      <button 
        className="language-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="language-flag">{currentLanguage?.flag}</span>
        {showText && (
          <span className="language-name">{currentLanguage?.name}</span>
        )}
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {/* Language dropdown */}
      {isOpen && (
        <div className="language-dropdown">
          {languages.available.map(code => {
            const lang = languages.info[code];
            if (!lang) return null;
            
            return (
              <button
                key={code}
                className={code === currentLang ? 'active' : ''}
                onClick={() => {
                  switchLanguage(code);
                  setIsOpen(false);
                }}
              >
                <span className="language-flag">{lang.flag}</span>
                <span className="language-name">{lang.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;