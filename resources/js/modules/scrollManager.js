import { CONFIG } from '../config.js';
import { Utils } from '../utils.js';

/**
 * Scroll Management Module
 * Handles scroll-to-top functionality and scroll-based UI updates
 */
export const ScrollManager = {
    init() {
        window.addEventListener('scroll', this.handleScroll);
    },

    handleScroll() {
        const btn = Utils.getElementById(CONFIG.SCROLL.BUTTON_ID);
        if (btn) {
            const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            btn.style.display = scrollTop > CONFIG.SCROLL.THRESHOLD ? 'block' : 'none';
        }
    },

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};
