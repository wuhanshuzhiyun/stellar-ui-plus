<script lang="ts" setup>
import { ref, computed, onMounted, getCurrentInstance, type ComponentPublicInstance, type CSSProperties } from 'vue';
import utils from '../../utils/utils';

defineOptions({
    name: 'ste-sub-table',
    options: {
        virtualHost: true,
    },
});

const props = defineProps({
    rows: {
        type: [Array, null],
        default: () => [],
    },
    border: {
        type: [Boolean, null],
        default: false,
    },
});

const instance = getCurrentInstance() as unknown as ComponentPublicInstance;

const rowEls = ref<UniApp.NodeInfo[]>([]);

onMounted(() => {
    utils.querySelector('.sub-table-root .row', instance, true).then(rec => {
        rowEls.value = rec;
    });
});

const cmpRootClass = computed(() => {
    let classArr: string[] = [];
    if (props.border) {
        classArr.push('border');
    }
    return classArr.join(' ');
});

const cmpRowStyle = computed(() => {
    let style: CSSProperties = {};
    if (rowEls.value.length > 0) {
        let maxHeight = findMaxInRange(
            0.5,
            rowEls.value.map(e => e.height || 0)
        );
        if (maxHeight > 0) {
            style.flexBasis = maxHeight + 'px';
            style.flexGrow = 0;
        }
    }
    return style;
});

function findMaxInRange(tolerance: number, numbers: number[] = []) {
    if (numbers.length === 0) return 0;

    let max = Math.max(...numbers);
    let min = Math.min(...numbers);

    // 如果最大值和最小值的差值在浮动范围内，返回 0
    if (max - min <= tolerance) {
        return 0;
    }

    // 返回最大值
    return max;
}
</script>

<template>
    <view class="sub-table-root" :class="[cmpRootClass]">
        <view class="row" v-for="(v, i) in rows" :key="i" :style="[cmpRowStyle]">
            <view class="cell">
                {{ v }}
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
@import './var.scss';
.sub-table-root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &.border {
        .row {
            .cell {
                border-bottom: $default-border;
            }
        }
    }

    .row {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex: 1;
        .cell {
            @import './common.scss';
            @include cell;

            border-bottom: none;
            padding: 24rpx 32rpx;
        }
        &:nth-last-child(1) {
            .cell {
                border-bottom: none;
            }
        }
    }
}
</style>
