<script setup lang="ts">
<<<<<<< HEAD
import { nextTick, watch } from 'vue';
import config from '@/uni_modules/stellar-ui-plus/config';

// #ifdef H5
watch(
    () => config.rootStyle,
    style => {
        nextTick(() => {
            Object.keys(style).forEach((key: string) => {
                document.documentElement.style.setProperty(key, style[key]);
            });
        });
    },
    { immediate: true }
);
// #endif
</script>

<style lang="scss">
@import './uni_modules/stellar-ui-plus/common/css/common.scss';
</style>
=======
onLaunch(() => {})
</script>
>>>>>>> f9c262a (feat(init): init)
