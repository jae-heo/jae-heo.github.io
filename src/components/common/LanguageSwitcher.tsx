// src/components/common/LanguageSwitcher.tsx
import { useState, useRef, useEffect } from 'react';
import { useI18n } from '../../hooks/useI18n';
import { LanguagesConfig, Language } from '../../types'; // Import from centralized types
import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  showText?: boolean;
}

function LanguageSwitcher({ showText = false }: LanguageSwitcherProps) {
  const { currentLang, languages, switchLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Use type assertion to tell TypeScript what type the languages object is
  const typedLanguages = languages as LanguagesConfig;
  
  // Get current language info with proper typing
  const currentLanguage = typedLanguages.info[currentLang];
  
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
          {typedLanguages.available.map(code => {
            const lang = typedLanguages.info[code];
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