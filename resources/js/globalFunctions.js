import { Utils } from './utils.js';
import { ThemeManager } from './modules/themeManager.js';
import { ScrollManager } from './modules/scrollManager.js';
import { AvatarManager } from './modules/avatarManager.js';

/**
 * Global Functions Module
 * Functions that need to be accessible from HTML onclick handlers
 */
export const GlobalFunctions = {
    removeAvatar: () => AvatarManager.remove(),
    scrollToTop: () => ScrollManager.scrollToTop()
};

// Make functions globally accessible immediately
window.removeAvatar = function() {
    return AvatarManager.remove();
};

window.scrollToTop = function() {
    return ScrollManager.scrollToTop();
};
