// src/components/layout/Header.tsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LangSwitcher from '../common/LangSwitcher';
import blogConfig from '../../config/blog';

function Header() {
  const { t } = useTranslation();
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <h1>{t('blog.title')}</h1>
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul>
            {blogConfig.mainMenu
              .filter(item => item.visible)
              .sort((a, b) => a.order - b.order)
              .map(item => (
                <li key={item.id}>
                  <Link to={item.path}>
                    {t(`nav.${item.name}`)}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
        
        {/* Use the dropdown style for language switching */}
        <LangSwitcher dropdownStyle={true} showText={true} />
      </div>
    </header>
  );
}

export default Header;