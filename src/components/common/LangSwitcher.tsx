// src/components/common/LangSwitcher.tsx
import { useTranslation } from 'react-i18next';
import blogConfig from '../../config/blog';

function LangSwitcher() {
  const { i18n } = useTranslation();
  const { languages } = blogConfig;
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  
  return (
    <div className="lang-switcher">
      {languages.available.map(lang => {
        // Add type check to ensure lang is a valid key
        if (lang in languages.info) {
          return (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className={i18n.language === lang ? 'active' : ''}
            >
              {languages.info[lang as keyof typeof languages.info].flag}
            </button>
          );
        }
        return null;
      })}
    </div>
  );
}

export default LangSwitcher;