// src/components/common/LangSwitcher.tsx
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import blogConfig from '../../config/blog';
import { changeLanguage } from '../../i18n';

interface LangSwitcherProps {
  showText?: boolean;
  dropdownStyle?: boolean;
}

function LangSwitcher({ showText = false, dropdownStyle = false }: LangSwitcherProps) {
  const { i18n, t } = useTranslation();
  const { languages } = blogConfig;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  
  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
    setDropdownOpen(false);
  };
  
  // Handle dropdown toggling
  const toggleDropdown = () => {
    if (!dropdownOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left
      });
    }
    setDropdownOpen(!dropdownOpen);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node) && 
          dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);
  
  // For simple flag buttons
  if (!dropdownStyle) {
    return (
      <div className="lang-switcher">
        {languages.available.map(lang => {
          // Add type check to ensure lang is a valid key
          if (lang in languages.info) {
            const langInfo = languages.info[lang as keyof typeof languages.info];
            
            return (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={i18n.language === lang ? 'active' : ''}
                aria-label={`Switch to ${langInfo.name}`}
                title={langInfo.name}
              >
                {langInfo.flag}{showText && <span className="lang-name">{langInfo.name}</span>}
              </button>
            );
          }
          return null;
        })}
      </div>
    );
  }
  
  // For dropdown style
  const currentLang = i18n.language;
  const currentLangInfo = languages.info[currentLang as keyof typeof languages.info];
  
  return (
    <div className="lang-switcher-dropdown">
      <button 
        ref={buttonRef}
        className="lang-dropdown-toggle"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
      >
        {currentLangInfo?.flag || ''} 
        {(showText || dropdownStyle) && (
          <>
            <span className="current-lang-name">
              {currentLangInfo?.name || t('ui.language')}
            </span>
            <span className="dropdown-arrow" style={{ 
              transform: dropdownOpen ? 'rotate(180deg)' : 'none' 
            }}>▼</span>
          </>
        )}
      </button>
      
      {dropdownOpen && createPortal(
        <div className="dropdown-overlay">
          <div 
            ref={dropdownRef}
            className="lang-dropdown-menu" 
            style={{
              position: 'absolute',
              top: `${menuPosition.top}px`,
              right: `auto`,
              left: `${menuPosition.left}px`
            }}
          >
            {languages.available.map(lang => {
              if (lang in languages.info) {
                const langInfo = languages.info[lang as keyof typeof languages.info];
                
                return (
                  <li key={lang}>
                    <button 
                      onClick={() => handleLanguageChange(lang)}
                      className={i18n.language === lang ? 'active' : ''}
                    >
                      {langInfo.flag} {langInfo.name}
                    </button>
                  </li>
                );
              }
              return null;
            })}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default LangSwitcher;