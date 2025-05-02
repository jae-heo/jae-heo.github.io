// src/components/layout/Footer.tsx
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

/**
 * Footer component
 * Displays copyright information and optional links
 */
function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.copyright}>{t('blog.copyright', { year: currentYear })}</p>
        
        {/* Optional footer links */}
        <div className={styles.links}>
          <a href="/privacy-policy" className={styles.link}>Privacy Policy</a>
          <span className={styles.separator}>|</span>
          <a href="/terms" className={styles.link}>Terms of Use</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;