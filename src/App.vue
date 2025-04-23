<script setup lang="ts">
import { nextTick, watch } from 'vue';
import config from '@/uni_modules/stellar-ui-plus/config';

// #ifdef H5
watch(
    () => config.rootStyle,
    (style: { [key: string]: string }) => {
        nextTick(() => {
            Object.keys(style).forEach((key: string) => {
                document.documentElement.style.setProperty(key, style[key]);
            });
        });
    },
    { immediate: true, deep: true }
);
// #endif
</script>

<style lang="scss">
@import './uni_modules/stellar-ui-plus/common/css/common.scss';
</style>
