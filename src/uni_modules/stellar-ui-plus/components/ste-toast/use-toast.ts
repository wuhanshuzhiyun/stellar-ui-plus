// stellar-ui-plus/composables/use-toast.ts

export function useToast() {
    // 打开弹窗
    function showToast(options: any) {
        // 使用 uni-app 的全局事件系统
        uni.$emit('ste:toast:show', options);
    }

    // 关闭弹窗
    function hideToast() {
        uni.$emit('ste:toast:hide');
    }

    return {
        showToast,
        hideToast,
    };
}
