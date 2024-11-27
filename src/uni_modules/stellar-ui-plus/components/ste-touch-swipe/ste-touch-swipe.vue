<script setup lang="ts">
import { onMounted, defineOptions, getCurrentInstance, computed, nextTick, watch, ref, defineExpose } from 'vue';
import utils from '../../utils/utils';
import propsData, { TOUCH_SWIPE_KEY } from './props';
import { useProvide } from '../../utils/mixin';
import useData from './useData';
import type { Obj } from '../../types';

defineOptions({
    name: 'ste-touch-swipe',
});

const emits = defineEmits<{
    (e: 'update:index', index: number): void;
    (e: 'change', index: number): void;
}>();

const props = defineProps(propsData);

const { internalChildren } = useProvide(TOUCH_SWIPE_KEY, 'ste-touch-swipe-item')({ activeKey: props.index });

const thas = ref<globalThis.ComponentPublicInstance | null>();

const {
    initializing,
    setInitializing,
    showNode,
    setShowNode,
    boxEl,
    setBoxEl,
    touch,
    moveing,
    setMoveing,
    translateX,
    setTranslateX,
    translateY,
    setTranslateY,
    dataIndex,
    setDataIndex,
    dataChildrenLength,
    setDataChildrenLength,
    dataDisabledIndexs,
    setDataDisabledIndexs,
    set_timeout,
} = useData();

const cmpRootStyle = computed(() => ({
    '--touch-swipe-width': utils.formatPx(props.width),
    '--touch-swipe-height': utils.formatPx(props.height),
    opacity: showNode.value ? '1' : '0',
}));

const cmpChildrenLength = computed(() => (props.childrenLength ? props.childrenLength : dataChildrenLength.value));
const cmpDisabledIndexs = computed(() => (props.disabledIndexs.length ? props.disabledIndexs : dataDisabledIndexs.value));
const cmpBoxStyle = computed(() => {
    let style: Obj = {};
    if (props.direction === 'horizontal') {
        style.gridTemplateColumns = `repeat(${cmpChildrenLength.value || 'auto-fill'}, 100%)`;
    } else if (props.direction === 'vertical') {
        style.gridTemplateRows = `repeat(${cmpChildrenLength.value || 'auto-fill'}, 100%)`;
    }
    return style;
});

const cmpTransform = computed(() => {
    nextTick(() => {
        if (!showNode.value) setShowNode(true);
    });
    let transform = '';
    if (props.direction === 'horizontal') {
        transform = `translateX(${translateX.value}px)`;
    } else if (props.direction === 'vertical') {
        transform = `translateY(${translateY.value}px)`;
    }
    return {
        transform,
        transitionDuration: initializing.value || moveing.value ? 'inherit' : `${props.duration}s`,
    };
});

const cmpItemLefts = computed(() => {
    const list: number[] = [];
    if (!boxEl.value?.width) return list;
    for (let i = 0; i < cmpChildrenLength.value; i++) {
        list.push(boxEl.value.width * i);
    }
    return list;
});

const cmpItemTops = computed(() => {
    const list: number[] = [];
    if (!boxEl.value?.height) return list;
    for (let i = 0; i < cmpChildrenLength.value; i++) {
        list.push(boxEl.value.height * i);
    }
    return list;
});

const getBoxSize = async () => {
    if (!thas.value) return;
    if (boxEl.value && (boxEl.value.width || 0) > 0 && (boxEl.value.height || 0) > 0) return;
    setBoxEl(await utils.querySelector<false>('.ste-touch-swipe-root', thas.value));
};

const initChildren = () => {
    setShowNode(false);
    set_timeout(() => {
        if (dataChildrenLength.value !== internalChildren.length) {
            setDataChildrenLength(internalChildren.length);
        }
        const _disabledIndexs: number[] = [];
        internalChildren.forEach((m, i) => {
            if (m.props.disabled) _disabledIndexs.push(i);
        });
        let diff = dataDisabledIndexs.value.length !== _disabledIndexs.length;
        if (!diff) {
            for (let i = 0; i < dataDisabledIndexs.value.length; i++) {
                if (dataDisabledIndexs.value[i] !== _disabledIndexs[i]) {
                    diff = true;
                    break;
                }
            }
        }
        if (diff) setDataDisabledIndexs(_disabledIndexs);
        nextTick(async () => {
            await getBoxSize();
            setShowNode(true);
        });
    }, 50);
};

onMounted(async () => {
    thas.value = getCurrentInstance()?.proxy;
    await getBoxSize();
    initChildren();
});

watch(
    () => props.index,
    v => {
        if (v === dataIndex.value) return;
        setDataIndex(v);
    },
    { immediate: true }
);
watch([() => dataIndex.value, () => thas.value], () => {
    if (!cmpChildrenLength.value) return;
    nextTick(async () => {
        await getBoxSize();
        setTransform();
    });
});

watch(
    () => internalChildren.length,
    () => {
        initChildren();
    },
    { immediate: true }
);

const setTransform = () => {
    if (!cmpItemLefts.value?.length) return;
    if (props.direction === 'horizontal') {
        setTranslateX(-cmpItemLefts.value[dataIndex.value]);
    } else if (props.direction === 'vertical') {
        setTranslateY(-cmpItemTops.value[dataIndex.value]);
    }
    if (initializing.value) {
        setTimeout(() => setInitializing(false), 50);
    }
};

const nextItem = (moveX: number, moveY: number): [number, boolean] => {
    let index = dataIndex.value;
    if (props.direction === 'horizontal' && moveX !== 0) {
        index = moveX > 0 ? index - 1 : index + 1;
    } else if (props.direction === 'vertical' && moveY !== 0) {
        index = moveY > 0 ? index - 1 : index + 1;
    }
    const disabled = cmpDisabledIndexs.value.indexOf(index) !== -1;
    return [index, disabled];
};

const swipeNext = (moveX: number, moveY: number) => {
    if (props.direction === 'horizontal') {
        return Math.abs(moveX) > (boxEl.value?.width || 0) * props.swipeThreshold;
    } else if (props.direction === 'vertical') {
        return Math.abs(moveY) > (boxEl.value?.height || 0) * props.swipeThreshold;
    }
};

const onTouchstart = async (e: MouseEvent | TouchEvent) => {
    if (props.disabled) return;
    setMoveing(true);
    await getBoxSize();
    touch.touchStart(e as any);
};

const onTouchmove = (e: MouseEvent | TouchEvent) => {
    if (props.disabled || props.duration === 0 || !moveing.value) return;
    const res = touch.touchMove(e as any);
    if (!res) return;
    let { moveX, moveY } = res;
    const [nextIndex, nextDisabled] = nextItem(moveX, moveY);
    if (nextDisabled || nextIndex < 0 || nextIndex > cmpChildrenLength.value - 1) {
        if (props.direction === 'horizontal') {
            moveX = Math.floor(moveX / 4);
        } else if (props.direction === 'vertical') {
            moveY = Math.floor(moveY / 4);
        }
    }
    if (props.direction === 'horizontal') {
        setTranslateX(-cmpItemLefts.value[dataIndex.value] + Math.floor(moveX));
    } else if (props.direction === 'vertical') {
        setTranslateY(-cmpItemTops.value[dataIndex.value] + Math.floor(moveY));
    }
};

const onTouchend = (e: MouseEvent | TouchEvent) => {
    if (props.disabled) return;
    setMoveing(false);
    const { moveX, moveY } = touch.touchEnd(e as any);
    if (props.direction === 'horizontal' && !moveX) return;
    else if (props.direction === 'vertical' && !moveY) return;
    const [nextIndex, nextDisabled] = nextItem(moveX, moveY);
    const isSwipeNext = swipeNext(moveX, moveY);
    if (nextDisabled || !isSwipeNext || nextIndex < 0 || nextIndex > cmpChildrenLength.value - 1) {
        if (props.direction === 'horizontal') {
            nextTick(() => {
                setTranslateX(-cmpItemLefts.value[dataIndex.value]);
            });
        } else if (props.direction === 'vertical') {
            nextTick(() => {
                setTranslateY(-cmpItemTops.value[dataIndex.value]);
            });
        }
        return;
    }
    setDataIndex(nextIndex);
    emits('update:index', nextIndex);
    emits('change', nextIndex);
};

defineExpose({ init: initChildren });
</script>
<template>
    <view class="ste-touch-swipe-root" :style="[cmpRootStyle]">
        <view
            class="content"
            @mousedown="onTouchstart"
            @mousemove="onTouchmove"
            @mouseup="onTouchend"
            @mouseleave="onTouchend"
            @touchstart="onTouchstart"
            @touchmove.stop="onTouchmove"
            @touchend="onTouchend"
            @touchcancel="onTouchend"
        >
            <view class="content-view" :style="[cmpBoxStyle, cmpTransform]">
                <slot />
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.ste-touch-swipe-root {
    width: var(--touch-swipe-width);
    height: var(--touch-swipe-height);

    .content {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .content-view {
            width: 100%;
            height: 100%;
            display: grid;
        }
    }
}
</style>
