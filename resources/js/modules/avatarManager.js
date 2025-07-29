import { Utils } from '../utils.js';

/**
 * Avatar Management Module
 * Handles avatar upload, preview, and removal functionality
 */
export const AvatarManager = {
    elements: {},

    init() {
        this.cacheElements();
        this.bindEvents();
    },

    cacheElements() {
        this.elements = {
            input: Utils.getElementById('avatar-input'),
            previewImg: Utils.getElementById('preview-img'),
            preview: Utils.getElementById('avatar-preview'),
            removeField: Utils.getElementById('remove-avatar'),
            current: Utils.getElementById('current-avatar')
        };
    },

    bindEvents() {
        if (this.elements.input) {
            this.elements.input.addEventListener('change', e => this.handleFileChange(e));
        }
    },

    handleFileChange(e) {
        const file = e.target.files[0];

        if (file) {
            this.previewFile(file);
            this.setRemoveFlag(false);
        } else {
            this.clearPreview();
        }
    },

    previewFile(file) {
        const reader = new FileReader();
        reader.onload = e => {
            if (this.elements.previewImg) this.elements.previewImg.src = e.target.result;
            if (this.elements.preview) this.elements.preview.style.display = 'block';
            if (this.elements.current) this.elements.current.parentElement.style.opacity = '0.5';
        };
        reader.readAsDataURL(file);
    },

    clearPreview() {
        if (this.elements.preview) this.elements.preview.style.display = 'none';
        if (this.elements.current) this.elements.current.parentElement.style.opacity = '1';
    },

    setRemoveFlag(shouldRemove) {
        if (this.elements.removeField) {
            this.elements.removeField.value = shouldRemove ? '1' : '0';
        }
    },

    remove() {
        if (!confirm('Apakah Anda yakin ingin menghapus avatar?')) return;

        this.setRemoveFlag(true);
        if (this.elements.input) this.elements.input.value = '';
        this.clearPreview();

        if (this.elements.current) {
            this.elements.current.parentElement.innerHTML =
                '<small class="text-muted"><i class="fas fa-info-circle"></i> Avatar akan dihapus setelah menyimpan perubahan</small>';
        }
    }
};
