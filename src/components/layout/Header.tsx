// src/components/layout/Header.tsx
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../common/LanguageSwitcher';
import config from '../../config/blog';
import './Header.css';

/**
 * Header component with navigation and language switcher
 */
function Header() {
  const { t } = useTranslation();
  
  // Filter visible menu items and sort by order
  const menuItems = config.mainMenu
    .filter(item => item.visible)
    .sort((a, b) => a.order - b.order);
  
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo/Site Title */}
        <div className="logo">
          <Link to="/">
            <h1>{t('blog.title')}</h1>
          </Link>
        </div>
        
        {/* Main Navigation */}
        <nav className="main-nav">
          <ul>
            {menuItems.map(item => (
              <li key={item.id}>
                <Link to={item.path}>
                  {t(`nav.${item.name}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Language Switcher */}
        <LanguageSwitcher showText={true} />
      </div>
    </header>
  );
}

export default Header;