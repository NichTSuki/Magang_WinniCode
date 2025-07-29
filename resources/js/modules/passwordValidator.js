import { CONFIG } from '../config.js';
import { Utils } from '../utils.js';
import { FormValidation } from './formValidation.js';

/**
 * Password Validation Module
 * Handles all password validation logic for different forms
 */
export const PasswordValidator = {
    // Validation strategies for different forms
    strategies: {
        profile: {
            fields: ['new_password', 'new_password_confirmation', 'current_password'],
            validator: 'validateProfileForm'
        },
        change: {
            fields: ['new_password', 'new_password_confirmation'],
            validator: 'validateSimpleForm',
            exclude: 'current_password'
        },
        register: {
            fields: ['password', 'password_confirmation'],
            validator: 'validateSimpleForm',
            exclude: 'new_password_confirmation'
        }
    },

    init() {
        this.initProfileValidation();
        this.initChangePasswordValidation();
        this.initRegisterValidation();
        this.initResetPasswordValidation();
    },

    // Generic validation initializer
    initValidation(strategy, excludeCheck = null) {
        const config = this.strategies[strategy];
        const elements = this.getElementsFromIds(config.fields);
        const submitButton = Utils.querySelector('button[type="submit"]');

        // Check if required elements exist and exclusion check passes
        if (!Utils.elementsExist(...Object.values(elements), submitButton) ||
            (excludeCheck && Utils.getElementById(excludeCheck))) return;

        const validator = this[config.validator].bind(this);
        const validateFn = () => validator(elements, submitButton, config.feedbackClass);

        this.addEventListeners(Object.values(elements), validateFn);
        if (strategy === 'profile') validateFn(); // Initial validation for profile
    },

    initProfileValidation() {
        this.initValidation('profile');
    },

    initChangePasswordValidation() {
        this.initValidation('change', 'current_password');
    },

    initRegisterValidation() {
        this.initValidation('register', 'new_password_confirmation');
    },

    initResetPasswordValidation() {
        const elements = {
            password: Utils.getElementById('password'),
            confirm: Utils.getElementById('password-confirm'),
            message: Utils.getElementById('password-match-message')
        };

        if (!Utils.elementsExist(...Object.values(elements))) return;

        const validateFn = () => this.validateResetForm(elements);
        elements.password.addEventListener('input', validateFn);
        elements.confirm.addEventListener('input', validateFn);
    },

    // Validation methods
    validateProfileForm(elements, submitButton) {
        const {
            new_password: newPass,
            new_password_confirmation: confirmPass,
            current_password: currentPass
        } = elements;
        let isValid = true;

        // Clear previous validation states
        [newPass, confirmPass, currentPass].forEach(el => FormValidation.clearValidation(el));
        FormValidation.removeAllCustomFeedback();

        if (newPass.value) {
            isValid = this.validateCurrentPassword(currentPass) && isValid;
            isValid = this.validatePasswordLength(newPass) && isValid;
            isValid = this.validatePasswordConfirmation(newPass, confirmPass) && isValid;
        }

        submitButton.disabled = !isValid;
    },

    validateSimpleForm(elements, submitButton, feedbackClass = 'invalid-feedback') {
        const [password, confirmation] = Object.values(elements);

        if (password.value && confirmation.value) {
            if (password.value !== confirmation.value) {
                FormValidation.setInvalid(confirmation, 'Passwords do not match');
                this.updateFeedbackClass(confirmation, feedbackClass);
                submitButton.disabled = true;
            } else {
                FormValidation.setValid(confirmation);
                FormValidation.removeFeedback(confirmation, feedbackClass);
                submitButton.disabled = false;
            }
        } else {
            FormValidation.clearValidation(confirmation);
            FormValidation.removeFeedback(confirmation, feedbackClass);
            submitButton.disabled = false;
        }
    },

    validateResetForm(elements) {
        const {
            password,
            confirm,
            message
        } = elements;

        if (password.value && confirm.value) {
            message.style.display = password.value !== confirm.value ? 'block' : 'none';
        } else {
            message.style.display = 'none';
        }
    },

    // Validation helpers
    validateCurrentPassword(currentPass) {
        if (!currentPass.value) {
            FormValidation.setInvalid(currentPass, 'Password saat ini harus diisi untuk mengubah password');
            return false;
        }
        FormValidation.setValid(currentPass);
        return true;
    },

    validatePasswordLength(newPass) {
        if (newPass.value.length < CONFIG.VALIDATION.MIN_PASSWORD_LENGTH) {
            FormValidation.setInvalid(newPass,
                `Password minimal ${CONFIG.VALIDATION.MIN_PASSWORD_LENGTH} karakter`);
            return false;
        }
        FormValidation.setValid(newPass);
        return true;
    },

    validatePasswordConfirmation(newPass, confirmPass) {
        if (!confirmPass.value) {
            FormValidation.setInvalid(confirmPass, 'Konfirmasi password harus diisi');
            return false;
        }
        if (newPass.value !== confirmPass.value) {
            FormValidation.setInvalid(confirmPass, 'Password dan konfirmasi password tidak sama');
            return false;
        }
        FormValidation.setValid(confirmPass);
        return true;
    },

    updateFeedbackClass(element, feedbackClass) {
        if (feedbackClass !== 'invalid-feedback') {
            const feedback = element.parentNode.querySelector('.invalid-feedback');
            if (feedback) feedback.className = `invalid-feedback ${feedbackClass}`;
        }
    },

    // Utility methods
    getElementsFromIds(ids) {
        return ids.reduce((acc, id) => {
            acc[id] = Utils.getElementById(id);
            return acc;
        }, {});
    },

    addEventListeners(elements, callback) {
        elements.forEach(el => el && el.addEventListener('input', callback));
    }
};
