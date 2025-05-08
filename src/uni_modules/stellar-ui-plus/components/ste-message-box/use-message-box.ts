// useMessageBox.ts
import { getMessageBoxKey } from './ste-message-box';
import type { MessageBoxOptions } from './constants';

export function useMessageBox(customKey?: string) {
    // 获取基于当前页面路由的消息框key
    const msgKey = getMessageBoxKey(customKey);

    // 打开弹窗
    function showMsgBox(options: MessageBoxOptions) {
        // 使用 uni-app 的全局事件系统
        uni.$emit(`${msgKey}:show`, options);
    }

    // 关闭弹窗
    function hideMsgBox() {
        uni.$emit(`${msgKey}:hide`);
    }

    return {
        showMsgBox,
        hideMsgBox,
    };
}
