<script setup lang="ts">
// #ifdef H5
import useFontSize from '@/uni_modules/stellar-ui-plus/config/font-size';

const { fontSizeStyle, config } = useFontSize();

function setFontSize() {
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
