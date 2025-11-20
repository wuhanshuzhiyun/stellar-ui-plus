/**
{
    "name": "ste-tooltip",
    "title": "文字提示",
    "description": "全局文字提示组件，用于显示长文本内容"
}
 */

import type { ComponentPublicInstance } from 'vue';

export interface TooltipOptions {
    text: string;
    instance: ComponentPublicInstance; // 触发元素所在的组件实例
    selector: string; // 触发元素的选择器
    placement?: 'top' | 'bottom'; // 弹出方向，默认 top
    maxWidth?: string; // 最大宽度，默认60vw
}

export const defaultTooltipOptions: Partial<TooltipOptions> = {
    placement: 'top',
    maxWidth: '60vw',
};
