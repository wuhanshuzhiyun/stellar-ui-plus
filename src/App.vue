<script setup lang="ts">
// 显式指定 .ts 扩展名，防止 Vite 在存在同名 .uts 时根据 extensions 优先级错误命中 UTS 模块
import useFontSize from '@/uni_modules/stellar-ui-plus/config/font-size.ts';
const { fontSizeStyle, config } = useFontSize();
// #ifdef H5

function setFontSize() {
    const vw = document.documentElement.clientWidth;
    if (vw > 720) return;
    Object.keys(fontSizeStyle).forEach((key: string) => {
        document.documentElement.style.setProperty(key, fontSizeStyle[key]);
    });
}
setTimeout(setFontSize);
// 防御性检查：确保 config 和 onChange 方法存在
if (config && typeof config.onChange === 'function') {
    config.onChange(setFontSize);
}
// #endif
</script>

<style lang="scss">
@import './uni_modules/stellar-ui-plus/common/css/common.scss';
</style>
