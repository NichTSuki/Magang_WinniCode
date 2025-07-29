/**
 * Utility Functions
 * Common utility functions used across the application
 */
export const Utils = {
    // DOM utilities
    getElementById: id => document.getElementById(id),
    querySelector: selector => document.querySelector(selector),
    querySelectorAll: selector => document.querySelectorAll(selector),

    // Element existence check
    elementsExist: (...elements) => elements.every(el => el !== null),

    // Storage utilities
    storage: {
        get: key => localStorage.getItem(key),
        set: (key, value) => localStorage.setItem(key, value)
    },

    // Media query check
    prefersDarkMode: () => window.matchMedia('(prefers-color-scheme: dark)').matches
};
