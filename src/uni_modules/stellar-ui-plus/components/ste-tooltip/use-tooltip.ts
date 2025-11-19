import type { TooltipOptions } from './props';

export function useTooltip() {
    // 显示提示
    function showTooltip(options: TooltipOptions) {
        uni.$emit('ste:tooltip:show', options);
    }

    // 隐藏提示
    function hideTooltip() {
        uni.$emit('ste:tooltip:hide');
    }

    return {
        showTooltip,
        hideTooltip,
    };
}
