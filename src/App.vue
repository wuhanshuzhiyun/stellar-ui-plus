<script setup lang="ts">
import useFontSize from '@/uni_modules/stellar-ui-plus/config/font-size';
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
config.onChange(setFontSize);
// #endif
</script>

<style lang="scss">
@import './uni_modules/stellar-ui-plus/common/css/common.scss';
</style>
