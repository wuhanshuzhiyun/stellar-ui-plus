import { provide, ref } from 'vue';
import { toastDefaultOptionsKey } from './ste-toast';

export function useToast() {
    const toastOptions = ref({});
    provide(toastDefaultOptionsKey, toastOptions);

    // 打开弹窗
    function showToast(options: any) {
        toastOptions.value = Object.assign(
            {
                show: true,
            },
            options
        );
    }
    /** 关闭弹窗 */
    function hideToast() {
        toastOptions.value = {
            show: false,
        };
    }
    return {
        showToast,
        hideToast,
    };
}
