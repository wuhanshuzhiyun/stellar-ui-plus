<script setup lang="ts">
import { computed, defineOptions } from 'vue';
import utils from '../../utils/utils';
import propsData from './props';

const componentName = `ste-price`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const props = defineProps(propsData);

const cmpValue = computed(() => {
    if (props.formatter && typeof props.formatter === 'function') return props.formatter(props.value);

    let value = props.value;
    if (props.valueUnit === 'fen') value = utils.fenToYuan(props.value, -1, '', 0);

    if (props.digits === -1) value = Number.parseFloat(String(value)).toString();
    else value = Number(value).toFixed(props.digits).toString();

    return value;
});

const cmpYuanValue = computed(() => {
    if (cmpValue.value) {
        if (cmpValue.value.includes('.')) return cmpValue.value.split('.')[0];
        else return cmpValue.value;
    } else {
        return utils.fenToYuan(props.value, -1, '', 1);
    }
});

const cmpFenValue = computed(() => {
    if (cmpValue.value) {
        if (cmpValue.value.includes('.')) return `.${cmpValue.value.split('.')[1]}`;

        return '';
    } else {
        return utils.fenToYuan(props.value, -1, '', 2);
    }
});

const cmpPriceStyle = computed(() => {
    return {
        lineHeight: props.lineHeight === -1 ? 0.8 : utils.formatPx(props.lineHeight),
        color: `${props.isSuggestPrice ? props.linePriceColor : props.color} !important`,
        marginLeft: utils.formatPx(props.marginLeft),
        marginRight: utils.formatPx(props.marginRight),
        marginTop: utils.formatPx(props.marginTop),
        marginBottom: utils.formatPx(props.marginBottom),
        fontWeight: props.bold ? 'bold' : 'normal',
    };
});

const cmpUnitStyle = computed(() => {
    const style: any = {
        textDecoration: props.isSuggestPrice ? 'line-through' : 'none',
        color: `${props.isSuggestPrice ? props.linePriceColor : props.color} !important`,
    };

    if (props.isSuggestPrice) {
        style.color = props.linePriceColor;
        style.fontSize = `var(--font-size-${props.fontSize},${utils.formatPx(props.fontSize)})`;
    } else {
        style.fontSize = `var(--font-size-${calcFontSize()},${calcFontSize()})`;
    }
    return style;
});

const cmpYuanPriceStyle = computed(() => {
    return {
        fontSize: utils.formatPx(props.fontSize),
        textDecoration: props.isSuggestPrice ? 'line-through' : 'none',
    };
});

const cmpFenPriceStyle = computed(() => {
    let fontSize: string | number;
    if (props.isSuggestPrice) {
        fontSize = `var(--font-size-${props.fontSize},${utils.formatPx(props.fontSize)})`;
    } else {
        if (props.styleType === 2) fontSize = calcFontSize();
        else fontSize = `var(--font-size-${props.fontSize},${utils.formatPx(props.fontSize)})`;
    }

    return {
        fontSize,
        textDecoration: props.isSuggestPrice ? 'line-through' : 'none',
    };
});

function calcFontSize() {
    let size = utils.formatPx(props.fontSize);
    const fontSize = Number(props.fontSize);
    if (props.styleType == 1) {
        if (fontSize <= 40) {
            size = utils.formatPx(20);
        } else {
            size = utils.formatPx(fontSize - 20);
        }
    } else if (props.styleType == 3) {
        size = utils.formatPx(fontSize);
    } else {
        // 常规 - 分元不一致
        if (fontSize > 28 && fontSize <= 40) {
            size = utils.formatPx(20);
        } else if (fontSize > 40) {
            size = utils.formatPx(fontSize - 20);
        }
    }
    return size;
}
</script>

<template>
    <view class="ste-price-root">
        <view class="content" :style="[cmpPriceStyle]">
            <text v-if="showUnit" class="unit" :style="[cmpUnitStyle]">
                {{ unitSymbol }}
            </text>
            <text class="yuan-price" :style="[cmpYuanPriceStyle]">
                {{ cmpYuanValue }}
            </text>
            <text v-if="valueUnit === 'fen'" class="fen-price" :style="[cmpFenPriceStyle]">
                {{ cmpFenValue }}
            </text>
        </view>
    </view>
</template>

<style scoped lang="scss">
.ste-price-root {
    display: inline-flex;

    .content {
        display: inline-block;
        vertical-align: bottom;
    }

    .unit {
        vertical-align: baseline;
    }
}
</style>
