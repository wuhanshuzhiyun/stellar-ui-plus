<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick, getCurrentInstance } from 'vue';
import propsData, { type MarqueeItem } from './props';

const props = defineProps(propsData);
const instance = getCurrentInstance();
const emits = defineEmits<{
    (e: 'click', item: MarqueeItem, index: number): void;
}>();

// ─── 状态 ──────────────────────────────────────────────────────
const displayQueue = ref<(MarqueeItem & { _key: string })[]>([]);
const contentWidth = ref(0);
const isReady = ref(false);
let copyCount = 2;
let keySeed = 0;

// ─── 样式 ──────────────────────────────────────────────────────
const containerStyle = computed(() => ({
    height: props.height === 'auto' ? undefined : props.height,
    background: props.containerBg,
    padding: props.containerPadding,
    borderRadius: props.containerRadius,
}));

// 使用 CSS 变量控制动画
const cssVariables = computed(() => {
    if (!isReady.value || contentWidth.value <= 0) {
        return {};
    }
    const duration = contentWidth.value / props.speed;
    return {
        '--marquee-duration': `${duration}s`,
        '--marquee-width': `${contentWidth.value}px`,
    };
});

const animationClass = computed(() => {
    if (!isReady.value || contentWidth.value <= 0) {
        return '';
    }
    return 'is-animating';
});

const getItemStyle = (item: MarqueeItem) => ({
    color: item.color || '',
    background: item.background || props.itemBg,
    padding: props.itemPadding,
    borderRadius: props.itemRadius,
    marginRight: `${props.gap}rpx`,
});

// ─── 测量 ──────────────────────────────────────────────────────
const queryWidth = (selector: string): Promise<number> =>
    new Promise(resolve => {
        uni.createSelectorQuery()
            .in(instance)
            .select(selector)
            .boundingClientRect((rect: any) => resolve(rect ? rect.width : 0))
            .exec();
    });

// ─── 构建队列 ──────────────────────────────────────────────────
const mkKey = (id: string | number, copy: number, seed: number) => `${id}_c${copy}_s${seed}`;

const buildQueue = async (sourceList: MarqueeItem[]) => {
    if (!sourceList.length) {
        displayQueue.value = [];
        isReady.value = false;
        return;
    }

    isReady.value = false;
    const currentSeed = keySeed++;

    // 先渲染单份测量
    displayQueue.value = sourceList.map(it => ({ ...it, _key: mkKey(it.id, 0, currentSeed) }));

    await nextTick();
    await new Promise(r => setTimeout(r, 50));

    const containerWidth = await queryWidth('.ste-marquee');
    const singleWidth = await queryWidth('.ste-mq-content');

    if (singleWidth <= 0) {
        await new Promise(r => setTimeout(r, 100));
        const retryWidth = await queryWidth('.ste-mq-content');
        if (retryWidth <= 0) {
            contentWidth.value = 0;
            return;
        }
        contentWidth.value = retryWidth;
    } else {
        contentWidth.value = singleWidth;
    }

    // 计算份数（防止除零）
    if (contentWidth.value <= 0) {
        copyCount = 2;
    } else if (contentWidth.value >= containerWidth) {
        copyCount = 2;
    } else {
        copyCount = Math.max(3, Math.ceil((containerWidth * 3) / contentWidth.value) + 1);
    }

    // 构建多份
    const filled: (MarqueeItem & { _key: string })[] = [];
    for (let c = 0; c < copyCount; c++) {
        sourceList.forEach(it => filled.push({ ...it, _key: mkKey(it.id, c, currentSeed) }));
    }
    displayQueue.value = filled;

    await nextTick();
    isReady.value = true;

    console.log('[ste-marquee] built queue, contentWidth:', contentWidth.value, 'copies:', copyCount);
};

// ─── 初始化 ────────────────────────────────────────────────────
const init = async (list: MarqueeItem[], { keepPaused = false } = {}) => {
    if (!keepPaused) {
        isPaused.value = false;
    }
    await buildQueue(list);
};

// ─── 控制 ──────────────────────────────────────────────────────
const isPaused = ref(false);

const play = () => {
    isPaused.value = false;
};
const pause = () => {
    isPaused.value = true;
};
const resume = () => {
    isPaused.value = false;
};
const stop = async () => {
    isPaused.value = true;
    // 重新初始化回到起始位置，保持暂停状态
    await init(props.list, { keepPaused: true });
};

// ─── 监听 ──────────────────────────────────────────────────────
let isInitialized = false;
watch(
    () => props.list,
    newList => {
        if (!isInitialized) return;
        init(newList);
    },
    { deep: true }
);

// ─── 生命周期 ──────────────────────────────────────────────────
onMounted(() => {
    setTimeout(async () => {
        await init(props.list);
        isInitialized = true;
    }, 100);
});

// ─── 交互 ──────────────────────────────────────────────────────
const handleClick = (item: MarqueeItem, index: number) => {
    if (!props.clickable) return;
    emits('click', item, index);
};
const handleMouseEnter = () => {
    if (props.pauseOnHover) pause();
};
const handleMouseLeave = () => {
    if (props.pauseOnHover) resume();
};

defineExpose({ play, pause, resume, stop });
</script>

<template>
    <view class="ste-marquee" :style="[containerStyle, cssVariables]" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @touchstart="handleMouseEnter" @touchend="handleMouseLeave">
        <view class="ste-mq-wrapper" :class="{ 'is-paused': isPaused }">
            <view class="ste-mq-content" :class="animationClass">
                <view v-for="(item, index) in displayQueue" :key="item._key" class="ste-mq-item" :style="getItemStyle(item)" @click="handleClick(item, index)">
                    <slot name="item" :item="item" :index="index">
                        <image v-if="item.icon" class="ste-mq-icon" :src="item.icon" mode="aspectFit" />
                        <text class="ste-mq-text">{{ item.text }}</text>
                    </slot>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-marquee {
    width: 100%;
    overflow: hidden;
    position: relative;
}

.ste-mq-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    white-space: nowrap;

    &.is-paused .ste-mq-content {
        animation-play-state: paused !important;
    }
}

.ste-mq-content {
    display: flex;
    flex-shrink: 0;
    will-change: transform;

    &.is-animating {
        animation: marquee-scroll var(--marquee-duration, 10s) linear infinite;
    }
}

@keyframes marquee-scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(calc(var(--marquee-width, 0px) * -1));
    }
}

.ste-mq-item {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;
}

.ste-mq-icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 10rpx;
    border-radius: 50%;
}

.ste-mq-text {
    font-size: 28rpx;
    line-height: 1.5;
}
</style>
