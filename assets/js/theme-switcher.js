// Theme Switcher Functionality

const themes = [
    { id: 'light', name: 'Light', icon: '☀️' },
    { id: 'dark', name: 'Dark', icon: '🌙' },
    { id: 'ocean', name: 'Ocean', icon: '🌊' },
    { id: 'forest', name: 'Forest', icon: '🌲' },
    { id: 'sunset', name: 'Sunset', icon: '🌅' },
    { id: 'midnight', name: 'Midnight', icon: '🌌' },
    { id: 'rose', name: 'Rose', icon: '🌹' },
    { id: 'monochrome', name: 'Monochrome', icon: '⚫' },
    { id: 'cyberpunk', name: 'Cyberpunk', icon: '🔮' }
];

class ThemeSwitcher {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.menuOpen = false;
        this.init();
    }

    init() {
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', this.currentTheme);

        // Create theme switcher UI
        this.createThemeSwitcher();

        // Handle clicks outside menu
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.theme-switcher') && this.menuOpen) {
                this.closeMenu();
            }
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.menuOpen) {
                this.closeMenu();
            }
        });
    }

    createThemeSwitcher() {
        const existingToggle = document.getElementById('theme-toggle');
        if (!existingToggle) return;

        // Replace simple toggle with advanced switcher
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';

        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'theme-toggle';
        toggleBtn.setAttribute('aria-label', 'Change theme');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.style.cssText = 'background: none; border: none; cursor: pointer; color: var(--text-secondary); font-size: 1.2rem; padding: 0.5rem; position: relative;';

        const currentThemeObj = themes.find(t => t.id === this.currentTheme);
        toggleBtn.innerHTML = `<span id="theme-icon">${currentThemeObj ? currentThemeObj.icon : '☀️'}</span>`;

        // Create theme menu
        const menu = document.createElement('div');
        menu.className = 'theme-menu';
        menu.style.display = 'none';
        menu.setAttribute('role', 'menu');

        themes.forEach(theme => {
            const option = document.createElement('button');
            option.className = 'theme-option';
            if (theme.id === this.currentTheme) {
                option.classList.add('active');
            }
            option.setAttribute('role', 'menuitem');
            option.innerHTML = `${theme.icon} ${theme.name}`;
            option.onclick = () => this.setTheme(theme.id);
            menu.appendChild(option);
        });

        // Add event listeners
        toggleBtn.onclick = (e) => {
            e.stopPropagation();
            this.toggleMenu();
        };

        // Assemble switcher
        switcher.appendChild(toggleBtn);
        switcher.appendChild(menu);

        // Replace existing toggle
        existingToggle.parentNode.replaceChild(switcher, existingToggle);

        // Store references
        this.toggleBtn = toggleBtn;
        this.menu = menu;
    }

    toggleMenu() {
        if (this.menuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        if (!this.menu) return;
        this.menu.style.display = 'block';
        this.toggleBtn.setAttribute('aria-expanded', 'true');
        this.menuOpen = true;
    }

    closeMenu() {
        if (!this.menu) return;
        this.menu.style.display = 'none';
        this.toggleBtn.setAttribute('aria-expanded', 'false');
        this.menuOpen = false;
    }

    setTheme(themeId) {
        const theme = themes.find(t => t.id === themeId);
        if (!theme) return;

        // Apply theme
        this.currentTheme = themeId;
        document.documentElement.setAttribute('data-theme', themeId);
        localStorage.setItem('theme', themeId);

        // Update icon
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.textContent = theme.icon;
        }

        // Update active state
        const options = this.menu.querySelectorAll('.theme-option');
        options.forEach(option => {
            option.classList.remove('active');
        });
        const activeOption = Array.from(options).find(o => o.textContent.includes(theme.name));
        if (activeOption) {
            activeOption.classList.add('active');
        }

        // Close menu
        this.closeMenu();

        // Announce change for screen readers
        this.announceChange(theme.name);
    }

    announceChange(themeName) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Theme changed to ${themeName}`;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }
}

// Initialize theme switcher when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ThemeSwitcher());
} else {
    new ThemeSwitcher();
}