<template>
    <view
        class="ste-skeleton"
        :class="[
            {
                'is-loading': loading,
            },
            `ste-skeleton--${type}`,
        ]"
        ref="skeletonRef"
    >
        <template v-if="loading">
            <ste-icon v-if="type == 'image'" :size="20" code="&#xe693;"></ste-icon>
        </template>

        <template v-else>
            <slot></slot>
        </template>
    </view>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, type PropType } from 'vue';
import propsData from './props';

const componentName = `ste-skeleton`;

defineOptions({
    name: componentName,
});
const props = defineProps(propsData);

// 组件引用
// const skeletonRef = ref<UniElement | null>(null);

// // 动画实例
// let animation: null = null;

// // 开始动画
// function start() {
//     if (!props.loading) return;

//     animation = createAnimation(skeletonRef.value, {
//         duration: 2000,
//         loop: -1,
//         alternate: true,
//     })
//         .opacity('0.3', '1')
//         .play();
// }

// // 停止动画
// function stop() {
//     if (animation != null) {
//         animation!.stop();
//         animation!.reset();
//     }
// }

// onMounted(() => {
//     watch(
//         computed(() => props.loading),
//         (val: boolean) => {
//             if (val) {
//                 start();
//             } else {
//                 stop();
//             }
//         },
//         {
//             immediate: true,
//         }
//     );
// });
</script>

<style lang="scss" scoped>
.ste-skeleton {
    &.is-loading {
        @apply bg-surface-100 rounded-md;

        &.ste-skeleton--text {
            height: 16px;
            width: 150px;
            border-radius: 4px;
        }

        &.ste-skeleton--image {
            @apply flex flex-row items-center justify-center;
            width: 60px;
            height: 60px;
            border-radius: 8px;
        }

        &.ste-skeleton--circle {
            @apply rounded-full;
            width: 60px;
            height: 60px;
        }

        &.ste-skeleton--button {
            @apply rounded-lg;
            height: 32px;
            width: 88px;
        }
    }
}
</style>
