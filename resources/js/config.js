/**
 * Application Configuration
 * Contains all constants and configuration settings
 */
export const CONFIG = {
    THEME: {
        STORAGE_KEY: 'theme',
        THEMES: {
            LIGHT: 'light',
            DARK: 'dark'
        },
        SELECTORS: {
            TOGGLE: '#theme-toggle',
            SUN: '#theme-toggle .bi-sun-fill',
            MOON: '#theme-toggle .bi-moon-stars-fill'
        }
    },
    SCROLL: {
        THRESHOLD: 100,
        BUTTON_ID: 'scrollTopBtn'
    },
    VALIDATION: {
        MIN_PASSWORD_LENGTH: 8,
        CLASSES: {
            INVALID: 'is-invalid',
            VALID: 'is-valid',
            FEEDBACK: 'invalid-feedback custom-validation-feedback'
        }
    }
};
