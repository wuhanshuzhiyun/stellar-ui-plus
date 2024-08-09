<script lang="ts">
export default defineComponent({
    name: 'ste-rate',
});
</script>

<script setup lang="ts">
import utils from '../../utils/utils.js';
export default {
    model: {
        prop: 'value',
        // 派发事件名，更新父组件数据
        event: 'input',
    },
    data() {
        return {};
    },
    computed: {
        cmpListStyle() {
            let style = {};
            style['columnGap'] = utils.formatPx(this.gutter);
            // #ifdef H5
            if (this.disabled || this.readonly) {
                style['cursor'] = 'not-allowed';
            } else {
                style['cursor'] = 'pointer';
            }
            // #endif
            return style;
        },
        cmpCount() {
            // 兼容浏览器和微信 对数字循环的处理不同
            return Array.from({ length: this.count }, (_, index) => index);
        },
        cmpActiveCode() {
            let code = this.getIconCode();
            if (code) return code;
            return this.activeCode;
        },
        cmpInactiveCode() {
            let code = this.getIconCode();
            if (code) return code;
            return this.inactiveCode;
        },
    },
    methods: {
        onSelect(index) {
            if (!this.disabled && !this.readonly) {
                let value = (index + 1) * this.score;
                if (this.value != value) {
                    // 更新 model
                    this.$emit('input', value);
                    // change回调
                    this.$emit('change', value);
                }
            }
        },
        // 计算已评分占未评分的宽度
        getWidth(index) {
            let value = (index + 1) * this.score;
            let diff = this.value - value;
            // 全部占据
            if (diff >= 0) {
                return '100%';
            }
            // 部分占据
            else if (Math.abs(diff) > 0 && Math.abs(diff) < this.score) {
                return (1 - Math.abs(diff) / this.score).toFixed(2) * 100 + '%';
            }
            // 未占据
            else {
                return 0;
            }
        },
        // 根据iconData来算出每个分值对应的iconCode
        getIconCode() {
            if (!this.iconData || this.iconData.length === 0) return;

            let curScroeIndex = Math.ceil(this.value / this.score) - 1;
            // 如果索引在数组范围内且对应的值不为空，直接返回该值
            if (curScroeIndex < this.iconData.length && this.iconData[curScroeIndex] !== '') {
                return this.iconData[curScroeIndex];
            }

            // 否则，从索引位置向左搜索最近的非空值
            for (let i = curScroeIndex; i >= 0; i--) {
                if (this.iconData[i] !== '') {
                    return this.iconData[i];
                }
            }
        },
    },
};
</script>

<template>
    <view class="ste-rate-root">
        <view class="list" :style="[cmpListStyle]">
            <view v-for="index in cmpCount" class="item">
                <view class="icon-box inactive" @click="onSelect(index)">
                    <ste-icon :code="cmpInactiveCode" :color="inactiveColor" :size="size"></ste-icon>
                </view>
                <view class="icon-box active" @click="onSelect(index)" :style="{ width: getWidth(index) }">
                    <ste-icon :code="cmpActiveCode" :color="disabled ? '#C8C9CC' : activeColor" :size="size"></ste-icon>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.ste-rate-root {
    .list {
        display: flex;

        .item {
            position: relative;

            .active {
                position: absolute;
                overflow: hidden;
                top: 0;
            }
        }
    }
}
</style>
