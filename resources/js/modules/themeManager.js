import { CONFIG } from '../config.js';
import { Utils } from '../utils.js';

/**
 * Theme Management Module
 * Handles dark/light theme switching and persistence
 */

export const ThemeManager = {
    init() {
        this.setTheme(this.getPreferredTheme());
        this.bindEvents();
    },

    getStoredTheme: () => Utils.storage.get(CONFIG.THEME.STORAGE_KEY),
    setStoredTheme: theme => Utils.storage.set(CONFIG.THEME.STORAGE_KEY, theme),

    getPreferredTheme() {
        return this.getStoredTheme() ||
            (Utils.prefersDarkMode() ? CONFIG.THEME.THEMES.DARK : CONFIG.THEME.THEMES.LIGHT);
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-bs-theme', theme);
        this.updateThemeIcons(theme);
    },

    updateThemeIcons(theme) {
        const sun = Utils.querySelector(CONFIG.THEME.SELECTORS.SUN);
        const moon = Utils.querySelector(CONFIG.THEME.SELECTORS.MOON);

        if (Utils.elementsExist(sun, moon)) {
            const isDark = theme === CONFIG.THEME.THEMES.DARK;
            sun.classList.toggle('d-none', !isDark);
            moon.classList.toggle('d-none', isDark);
        }
    },

    toggleTheme() {
        const current = this.getStoredTheme() || this.getPreferredTheme();
        const next = current === CONFIG.THEME.THEMES.LIGHT ?
            CONFIG.THEME.THEMES.DARK : CONFIG.THEME.THEMES.LIGHT;
        this.setStoredTheme(next);
        this.setTheme(next);
    },

    bindEvents() {
        const toggler = Utils.getElementById('theme-toggle');
        if (toggler) {
            toggler.addEventListener('click', () => this.toggleTheme());
        }

        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', () => {
                if (!this.getStoredTheme()) this.setTheme(this.getPreferredTheme());
            });
    }
};
