<script setup lang="ts">
import utils from '../../utils/utils.js';
import { ref, computed, type CSSProperties, watch, nextTick, getCurrentInstance, type ComponentPublicInstance, type Ref } from 'vue';
import propsData from './props';

defineOptions({
    name: 'ste-notice-bar',
    options: {
        virtualHost: true,
    },
});

const props = defineProps(propsData);

const emits = defineEmits<{
    (e: 'end', value: string | number): void;
    (e: 'close', value: any): void;
    (e: 'click', value: string | number): void;
}>();

// 组件样式
const cmpStyle = computed(() => {
    let style: CSSProperties = {};
    style['width'] = isNaN(Number(props.width)) ? props.width : utils.formatPx(props.width);
    style['background'] = props.background;
    style['color'] = props.color;
    return style;
});

// 横向滚动动画样式
let touch = ref(false);
let firstDone = ref(false);
let acrossDuration = ref(0);
let textTranslate = ref(0);
const cmpAcrossStyle = computed(() => {
    let style: CSSProperties = {};
    style['animationPlayState'] = touch.value ? 'paused' : 'running';
    style['animationDuration'] = acrossDuration.value + 'ms';
    style['animationDelay'] = (firstDone.value ? 0 : props.delay) + 'ms';
    style['transform'] = `translateX(${textTranslate.value}px)`;
    return style;
});

// 纵向滚动动画样式
const cmpVerticalStyle = computed(() => {
    let style: CSSProperties = {};
    style['animationPlayState'] = touch.value ? 'paused' : 'running';
    style['animationDuration'] = props.verticalSpeed + 'ms';
    style['animationDelay'] = (firstDone.value ? 0 : props.delay) + 'ms';
    return style;
});

// 通知数组有值 则判断是否开始滚动
let copyList: Ref<string[]> = ref([]);
watch(
    () => props.list,
    val => {
        copyList.value = utils.deepClone(val);
        console.log('props.list', props.list);
        if (val.length && props.scrollable) {
            nextTick(() => {
                handleAnimation();
            });
        }
    },
    {
        deep: true,
        immediate: true,
    }
);
// 执行滚动动画
const id = ref(utils.guid());
let cardMsgClass = ref('');
const instance = getCurrentInstance() as unknown as ComponentPublicInstance;
async function handleAnimation() {
    if (props.direction == 'across') {
        // 获取滚动消息的长度来计算动画的执行时间
        const dom = await utils.querySelector<false>('#' + id.value, instance);
        acrossDuration.value = ((Number(dom.width) + textTranslate.value) / Number(props.acrossSpeed)) * 1000;
        cardMsgClass.value = 'across-play-infinite';
    } else {
        cardMsgClass.value = 'vertical-play-infinite';
    }
}

// h5下是否执行过动画
let index = ref(0);
let h5flag = ref(false);
watch(
    () => index.value,
    () => {
        h5flag.value = false;
    },
    {
        immediate: true,
    }
);

watch(
    () => copyList.value,
    () => {
        h5flag.value = false;
    },
    {
        immediate: true,
    }
);

// 动画结束
async function onAnimationEnd() {
    // 解决h5动画初始会触发结束事件
    if (props.direction == 'across') {
        if (!textTranslate.value) {
            // 获取滚动消息的父级元素的长度实现无缝滚动
            const dom = await utils.querySelector<false>('#' + id.value, instance);
            textTranslate.value = Number(dom.width);
        }
        cardMsgClass.value = '';
        // h5里 文本内容切换会导致触发动画结束事件，屏蔽切换
        index.value = index.value + 1 >= props.list.length ? 0 : index.value + 1;
        nextTick(() => {
            handleAnimation();
        });
    } else {
        cardMsgClass.value = '';
        // h5里 文本内容切换会导致触发动画结束事件，屏蔽切换
        copyList.value.push(copyList.value.shift() ?? '');
        index.value = index.value + 1 >= props.list.length ? 0 : index.value + 1;
        setTimeout(
            () => {
                handleAnimation();
            },
            // 下一个动画要在前一个动画后
            props.standTime > props.verticalSpeed ? props.standTime : props.verticalSpeed
        );
    }
    firstDone.value = true;
    emits('end', index.value);
}

// 动画方法
let closeShow = ref(true);
// 暂停
function doPause() {
    touch.value = true;
}
// 取消暂停
function doRun() {
    touch.value = false;
}
function handleClose(e: any) {
    closeShow.value = false;
    emits('close', e);
}
function handleClick() {
    emits('click', index.value);
}
</script>

<template>
    <view v-if="closeShow" class="ste-notice-bar-root" :style="[cmpStyle]" data-test="notice-bar">
        <view class="msg-box-content" @touchstart="doPause" @touchend="doRun" @mousedown="doPause" @mouseup="doRun">
            <view class="left">
                <slot name="leftIcon">
                    <ste-image width="36" height="36" src="https://image.whzb.com/chain/StellarUI/notice-bar/tip.png" />
                </slot>
            </view>
            <view v-if="direction == 'across'" :class="'center ' + id" @click="handleClick">
                <view class="center-item" :id="id" :class="cardMsgClass" :style="[cmpAcrossStyle]" @animationend="onAnimationEnd">
                    <ste-rich-text :text="list[index]"></ste-rich-text>
                </view>
            </view>
            <view v-else :class="'center vertical ' + cardMsgClass" @click="handleClick" @animationend="onAnimationEnd" :style="[cmpVerticalStyle]">
                <view class="center-item" v-for="(item, i) in copyList" :key="i">
                    <ste-rich-text :text="item"></ste-rich-text>
                </view>
            </view>
            <view v-if="$slots.rightIcon || closeMode" class="right-icon">
                <slot name="rightIcon">
                    <view @click="handleClose">
                        <ste-icon code="&#xe694;" size="32" :color="color"></ste-icon>
                    </view>
                </slot>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-notice-bar-root {
    width: 100%;
    height: 68rpx;
    padding: 16rpx;
    background: #ffffff;
    border-radius: 16rpx;
    display: flex;
    align-items: center;

    .msg-box-content {
        display: flex;
        align-items: center;
        overflow-x: hidden;
        overflow-y: hidden;
        justify-content: flex-start;
        flex: 1;
        height: 100%;
    }

    .left {
        flex-shrink: 0;
        margin-right: 16rpx;
        display: flex;
        align-items: center;
        height: 36rpx;
        line-height: 36rpx;
    }

    .center {
        flex: 1;
        display: flex;
        overflow: hidden;

        > .center-item {
            font-size: var(--font-size-24, 24rpx);
            display: inline-block;
            width: auto;
            white-space: nowrap;
        }

        .across-play-infinite {
            animation: acrossAnimation linear both running;
            animation-iteration-count: 1;
        }

        @keyframes acrossAnimation {
            100% {
                transform: translateX(-100%);
            }
        }
    }

    .vertical {
        flex-direction: column;
        height: 36rpx;
        line-height: 36rpx;
    }

    .vertical-play-infinite {
        animation: verticalAnimation linear both running;
        animation-iteration-count: 1;
    }

    @keyframes verticalAnimation {
        100% {
            transform: translateY(-100%);
        }
    }

    .right-icon {
        margin-left: 16rpx;
    }
}
</style>
