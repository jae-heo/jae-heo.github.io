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
      {languages.available.map(lang => (
        <button
          key={lang}
          onClick={() => changeLanguage(lang)}
          className={i18n.language === lang ? 'active' : ''}
        >
          {languages.info[lang].flag}
        </button>
      ))}
    </div>
  );
}

export default LangSwitcher;