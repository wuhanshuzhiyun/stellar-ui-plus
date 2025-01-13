<script setup lang="ts">
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

<style>
/* #ifdef H5 */
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

/* #endif */
/* #ifndef H5 */
view,
button,
input,
textarea {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

/* #endif */
</style>
