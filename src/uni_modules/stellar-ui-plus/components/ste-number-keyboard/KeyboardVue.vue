<script setup lang="ts">
import { computed, type PropType, getCurrentInstance, ref, onMounted } from 'vue';
import utils from '../../utils/utils';
defineOptions({
    name: 'KeyboardVue',
    options: {
        virtualHost: true,
    },
});

const props = defineProps({
    list: { type: Array as PropType<string[]>, default: () => [] },
    confirmText: { type: String },
    disabled: { type: Boolean },
    showClear: { type: Boolean },
    textColor: { type: String },
    textSize: { type: [Number, String] },
    rightKeys: { type: Boolean },
});

const boxWidth = ref(0);

onMounted(async () => {
    const box = await utils.querySelector<false>('.number-keyboard', getCurrentInstance()?.proxy);
    if (box && box.width) {
        boxWidth.value = box.width;
        return;
    }
    // 获取屏幕宽度
    const vw = await utils.System.getWindowWidth();
    if (vw) {
        boxWidth.value = vw - utils.formatPx<'num'>(60, 'num');
    }
});

const cmpRootStyle = computed(() => {
    // 宽高比例
    let width = 8,
        height = 5;
    if (!props.rightKeys) {
        width = 7;
        height = 3;
    }

    // 计算间隔
    const gap = utils.formatPx<'num'>(16, 'num');
    // 列数
    const col = props.rightKeys ? 4 : 3;
    // 间隔宽度总和
    const gapW = props.rightKeys ? gap * 3 : gap * 2;
    // 计算每个按钮的宽度
    const itemW = (boxWidth.value - gapW) / col;
    // 根据比例获取高度
    const itemH = (itemW * height) / width;

    const confirmRows = Math.ceil(props.list.length / 3) - (props.showClear ? 2 : 1);
    return {
        '--ste-number-keyboard-item-width': `${itemW}px`,
        '--ste-number-keyboard-item-height': `${itemH}px`,
        '--ste-number-keyboard-item-gap': `${gap}px`,
        '--ste-number-keyboard-right-confirm-height': `${itemH * confirmRows + gap * (confirmRows - 1)}px`,
    };
});

const emits = defineEmits<{
    (e: 'change', key: string): void;
}>();

const onChange = (key: string) => {
    emits('change', key);
};

const rows = computed(() => {
    const list: string[][] = [];
    for (let row = 0; row < Math.ceil(props.list.length / 3); row++) {
        list[row] = [];
        for (let col = 0; col < 3; col++) {
            const index = row * 3 + col;
            if (index < props.list.length) {
                list[row].push(props.list[index]);
            }
        }
    }

    return list;
});
console.log(rows.value);
</script>
<template>
    <view class="number-keyboard" :style="[cmpRootStyle]" data-test="number-keyboard-item">
        <view class="number-keyboard-left">
            <view class="number-keyboard-left-row" v-for="(row, index) in rows" :key="index">
                <block v-for="(num, i) in row" :key="num">
                    <view
                        class="number-keyboard-item"
                        :class="{
                            span3: row.length % 3 == 1 && i === row.length - 1,
                            span2: row.length % 3 == 2 && i === row.length - 2,
                            clear: num === 'clear',
                        }"
                        @click="onChange(num)"
                    >
                        <view v-if="['backspace', 'clear'].indexOf(num) !== -1">
                            <ste-icon v-if="num === 'backspace'" code="&#xe6a7;" :color="textColor" :size="textSize" />
                            <text v-else-if="num === 'clear'">清除</text>
                        </view>
                        <view v-else>
                            {{ num }}
                        </view>
                    </view>
                </block>
            </view>
        </view>
        <view class="number-keyboard-right" v-if="rightKeys">
            <view class="number-keyboard-item" @click="onChange('backspace')">
                <ste-icon code="&#xe6a7;" :color="textColor" :size="textSize" />
            </view>
            <view class="number-keyboard-item clear" v-if="showClear" @click="onChange('clear')">清除</view>
            <view class="number-keyboard-item confirm" :class="{ disabled }" @click="onChange('confirm')">
                <text>
                    {{ confirmText }}
                </text>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.number-keyboard {
    width: 100%;
    display: flex;
    background-color: #f9f9f9;
    .number-keyboard-left {
        flex: 1;
        .number-keyboard-left-row {
            display: flex;
            .number-keyboard-item {
                & + .number-keyboard-item {
                    margin-left: var(--ste-number-keyboard-item-gap);
                }
            }
            & + .number-keyboard-left-row {
                margin-top: var(--ste-number-keyboard-item-gap);
            }
        }
    }
    .number-keyboard-right {
        width: var(--ste-number-keyboard-item-width);
        margin-left: var(--ste-number-keyboard-item-gap);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .number-keyboard-item {
            margin-right: 0;
            & + .number-keyboard-item {
                margin-top: var(--ste-number-keyboard-item-gap);
            }
            &.confirm {
                flex-direction: column;
                height: var(--ste-number-keyboard-right-confirm-height);
            }
        }
    }
    .number-keyboard-item {
        width: var(--ste-number-keyboard-item-width);
        height: var(--ste-number-keyboard-item-height);
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: DIN, DIN;
        font-weight: bold;
        font-size: var(--ste-number-keyboard-text-size);
        color: var(--ste-number-keyboard-text-color);
        border-radius: 8rpx;

        &:active {
            background-color: #f1f1f1;
        }

        &.clear {
            font-size: var(--ste-number-keyboard-clear-text-size);
        }

        &.confirm {
            flex-direction: column;
            font-size: var(--ste-number-keyboard-confirm-text-size);
            background: var(--ste-number-keyboard-confirm-bg);
            color: #fff;
            &:active {
                background-color: var(--ste-number-keyboard-confirm-bg-active);
            }

            &.disabled {
                background: rgba(238, 238, 238, 0.4) !important;
            }
        }
        &.span2 {
            width: calc(var(--ste-number-keyboard-item-width) * 2 + var(--ste-number-keyboard-item-gap));
        }
        &.span3 {
            width: calc(var(--ste-number-keyboard-item-width) * 3 + var(--ste-number-keyboard-item-gap) * 2);
            margin-right: 0;
        }
    }
}
</style>
