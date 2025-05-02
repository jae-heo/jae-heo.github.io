// src/components/layout/Footer.tsx
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>{t('blog.copyright', { year: currentYear })}</p>
        
        {/* Optional: Add additional footer content like links */}
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