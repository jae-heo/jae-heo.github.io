// src/components/common/LanguageSwitcher.tsx
import { useState, useRef, useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import styles from './LanguageSwitcher.module.css';

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
    <div ref={dropdownRef} className={styles.container}>
      {/* Current language button */}
      <button 
        className={styles.toggle}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={styles.flag}>{currentLanguage?.flag}</span>
        {showText && (
          <span className={styles.name}>{currentLanguage?.name}</span>
        )}
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}>▼</span>
      </button>
      
      {/* Language dropdown */}
      {isOpen && (
        <div className={styles.dropdown}>
          {languages.available.map(code => {
            const lang = languages.info[code];
            if (!lang) return null;
            
            return (
              <button
                key={code}
                className={`${styles.option} ${code === currentLang ? styles.optionActive : ''}`}
                onClick={() => {
                  switchLanguage(code);
                  setIsOpen(false);
                }}
              >
                <span className={styles.flag}>{lang.flag}</span>
                <span className={styles.name}>{lang.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;