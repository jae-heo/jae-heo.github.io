// src/components/layout/Footer.tsx
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>{t('blog.copyright', { year: currentYear })}</p>
      </div>
    </footer>
  );
}

export default Footer;