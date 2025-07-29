import './bootstrap';

import { ThemeManager } from './modules/themeManager.js';
import { ScrollManager } from './modules/scrollManager.js';
import { AvatarManager } from './modules/avatarManager.js';
import { PasswordValidator } from './modules/passwordValidator.js';
import { GlobalFunctions } from './globalFunctions.js';

/**
 * Main Application Entry Point
 * Initializes all modules and manages application lifecycle
 */
class WinnewsApp {
    constructor() {
        this.modules = {
            theme: ThemeManager,
            scroll: ScrollManager,
            avatar: AvatarManager,
            password: PasswordValidator
        };
    }

    /**
     * Initialize the application
     */
    init() {
        // Initialize all modules
        Object.values(this.modules).forEach(module => {
            if (module.init && typeof module.init === 'function') {
                module.init();
            }
        });

        // Initialize global functions (already done in globalFunctions.js)
        // This ensures they're available for onclick handlers
        console.log('Winnews Application initialized successfully');
    }

    /**
     * Get a specific module instance
     * @param {string} moduleName - Name of the module
     * @returns {Object} Module instance
     */
    getModule(moduleName) {
        return this.modules[moduleName];
    }

    /**
     * Reinitialize a specific module
     * @param {string} moduleName - Name of the module to reinitialize
     */
    reinitModule(moduleName) {
        const module = this.modules[moduleName];
        if (module && module.init) {
            module.init();
        }
    }
}

// Create application instance
const App = new WinnewsApp();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => App.init());

// Export for potential external use
export default App;
