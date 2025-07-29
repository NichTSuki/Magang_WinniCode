import { CONFIG } from '../config.js';
import { Utils } from '../utils.js';

/**
 * Form Validation Utilities
 * Shared validation utilities for form handling
 */
export const FormValidation = {
    clearValidation(element) {
        element.classList.remove(CONFIG.VALIDATION.CLASSES.INVALID, CONFIG.VALIDATION.CLASSES.VALID);
    },

    setValid(element) {
        element.classList.remove(CONFIG.VALIDATION.CLASSES.INVALID);
        element.classList.add(CONFIG.VALIDATION.CLASSES.VALID);
    },

    setInvalid(element, message) {
        element.classList.remove(CONFIG.VALIDATION.CLASSES.VALID);
        element.classList.add(CONFIG.VALIDATION.CLASSES.INVALID);
        this.addFeedback(element, message);
    },

    addFeedback(element, message, className = CONFIG.VALIDATION.CLASSES.FEEDBACK) {
        this.removeFeedback(element, className);
        const feedback = document.createElement('div');
        feedback.className = className;
        feedback.textContent = message;
        element.parentNode.appendChild(feedback);
    },

    removeFeedback(element, className = 'custom-validation-feedback') {
        const selector = `.${className.split(' ').join('.')}`;
        const existingFeedback = element.parentNode.querySelector(selector);
        if (existingFeedback) existingFeedback.remove();
    },

    removeAllCustomFeedback() {
        Utils.querySelectorAll('.custom-validation-feedback').forEach(el => el.remove());
    }
};
