<script lang="ts" setup>
import { ref, onMounted, watch, getCurrentInstance, type ComponentPublicInstance, nextTick } from 'vue';
import utils from '../../utils/utils.js';
import { useTooltip } from '../ste-tooltip/use-tooltip';

const props = defineProps({
    text: {
        type: [String, null],
        default: '',
    },
    line: {
        type: [Number, String],
        default: 1,
    }, // 配置超过多少行后才显示
});

const instance = getCurrentInstance() as unknown as ComponentPublicInstance;
const { showTooltip, hideTooltip } = useTooltip();

const pressTimer = ref();
const isTextOverflow = ref(false);

onMounted(() => {
    nextTick(() => {
        checkTextOverflow();
    });
});

watch(
    () => props.text,
    () => {
        checkTextOverflow();
    }
);

const checkTextOverflow = async () => {
    const containerData = await utils.querySelector<false>('.ellipsis-box', instance);
    let textData = await utils.querySelector<false>('.measure-text', instance);

    if (containerData && textData && textData.width && containerData.width) {
        isTextOverflow.value = textData.width > containerData.width * Number(props.line) - 4;
    }
};

const handleTouchStart = (e: TouchEvent | MouseEvent) => {
    if (!isTextOverflow.value) return;

    pressTimer.value = setTimeout(() => {
        showTooltip({
            text: props.text || '',
            instance,
            selector: '.ellipsis-box',
        });
    }, 100);

    // #ifdef WEB
    window.addEventListener('mouseup', handleTouchEnd);
    // #endif
};

const handleTouchEnd = () => {
    if (pressTimer.value) {
        clearTimeout(pressTimer.value);
        pressTimer.value = null;
    }
    hideTooltip();
    // #ifdef WEB
    window.removeEventListener('mouseup', handleTouchEnd);
    // #endif
};
</script>

<template>
    <view class="wrapper">
        <view class="ellipsis-box" @touchstart="handleTouchStart" @touchend="handleTouchEnd" @mousedown="handleTouchStart">
            {{ text }}
        </view>
        <!-- 不做展示，正常显示文字长度，用于判断是否超过长度 -->
        <text class="measure-text">{{ text }}</text>
    </view>
</template>

<style lang="scss" scoped>
.wrapper {
    position: relative;
}

.ellipsis-box {
    display: -webkit-box;
    -webkit-line-clamp: var(--ste-table-popover-line);
    line-clamp: var(--ste-table-popover-line);
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    // #ifdef H5
    user-select: none;
    // #endif
}

.measure-text {
    position: fixed;
    left: -9999px;
    top: -9999px;
    white-space: nowrap;
    visibility: hidden;
}
</style>
