<script setup lang="ts">
import { computed, ref, onMounted, type CSSProperties, defineEmits, defineProps, defineOptions } from 'vue';
import propsData from './props';
import utils from '../../utils/utils';

const componentName = `ste-read-more`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});
const props = defineProps(propsData);
const instance = getCurrentInstance() as unknown as ComponentPublicInstance;

const emits = defineEmits<{
    (e: 'open'): void;
    (e: 'close'): void;
}>();

const open = ref(false);
const showToggle = ref(false);

const cmpContentStyle = computed(() => {
    let style: CSSProperties = {};
    if (showToggle.value) {
        style.height = open.value ? 'auto' : utils.addUnit(props.showHeight);
    }
    return style;
});

const cmpActionStyle = computed(() => ({
    color: props.color,
    fontSize: `var(--font-size-${props.fontSize},${utils.formatPx(props.fontSize)})`,
    background: open.value ? '' : 'linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 80%)',
}));

const cmpShowAction = computed(() => {
    let show = true;
    if (!showToggle.value) {
        show = false;
    }

    if (open.value && !props.toggle) {
        show = false;
    }

    return show;
});

function init() {
    utils.sleep(200).then(() => {
        utils.querySelector<false>('.content', instance).then(rect => {
            showToggle.value = parseInt(String(rect.height)) > parseInt(utils.formatPx(props.showHeight).toString());
        });
    });
}

function handleToggleStatus() {
    if (!open.value) {
        emits('open');
    } else {
        emits('close');
    }
    open.value = !open.value;
}

onMounted(() => {
    init();
});

defineExpose({ init });
</script>

<template>
    <view class="ste-read-more-root">
        <view class="content-box" :style="[cmpContentStyle]">
            <view class="content">
                <slot></slot>
            </view>
        </view>
        <view class="action-box" :style="[cmpActionStyle]" v-if="cmpShowAction">
            <view @click="handleToggleStatus">{{ open ? openText : closeText }}</view>
            <ste-icon :code="open ? '&#xe678;' : '&#xe676;'" size="28" marginBottom="3"></ste-icon>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-read-more-root {
    .content-box {
        overflow: hidden;
    }

    .action-box {
        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;
        padding-top: 200rpx;
        margin-top: -200rpx;
        // margin-bottom: 20rpx;

        text {
            cursor: pointer;
            font-size: var(--font-size-28, 28rpx);
            margin-right: 16rpx;
        }
    }
}
</style>
