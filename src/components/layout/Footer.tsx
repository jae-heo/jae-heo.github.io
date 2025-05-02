// src/components/layout/Footer.tsx
import { useTranslation } from 'react-i18next';
import './Footer.css';

/**
 * Footer component
 * Displays copyright information and optional links
 */
function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>{t('blog.copyright', { year: currentYear })}</p>
        
        {/* Optional footer links */}
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <span className="separator">|</span>
          <a href="/terms">Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;