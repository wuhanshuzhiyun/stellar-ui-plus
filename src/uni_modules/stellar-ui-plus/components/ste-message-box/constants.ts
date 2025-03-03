export const ICON_OBJ = {
    info: '&#xe67d;',
    success: '&#xe67a;',
    error: '&#xe67b;',
};
export const DURATION = 200;
export const ANIMATION_PROP: UniApp.CreateAnimationOptions = { duration: DURATION, timingFunction: 'ease-out' };

export type MessageBoxIcon = 'info' | 'success' | 'error';

export interface MessageBoxOptions {
    show?: boolean;
    title?: string;
    content?: string;
    icon?: MessageBoxIcon;
    cancelText?: string;
    confirmText?: string;
    confirmColor?: string;
    showCancel?: boolean;
    showClose?: boolean;
    cancelColor?: string;
    editable?: boolean;
    placeholderText?: string;
    confirm?: (value?: string) => void;
    cancel?: (value?: string) => void;
    complete?: (value?: string) => void;

    closeOnClickOverlay?: boolean;
    closeOnPressEscape?: boolean;
    closeOnBackdropClick?: boolean;
}
