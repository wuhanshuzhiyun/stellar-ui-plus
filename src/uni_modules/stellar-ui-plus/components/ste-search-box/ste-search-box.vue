<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import propsData, { searchBoxEmits } from './props';
import utils from '../../utils/utils';
import { useColorStore } from '../../store/color';
let { getColor } = useColorStore();

const dayjs = utils.dayjs;
const props = defineProps(propsData);
const emits = defineEmits(searchBoxEmits);

const show = ref(false);
const calendarType = ref('single');
const calendarValues = ref<(string | number)[]>([]);
const inputValue = ref(String(props.value));

watch(
    () => inputValue.value,
    newVal => {
        emits('update:value', String(newVal));
    }
);

watch(
    () => props.type,
    newVal => {
        if (newVal === 'dateRange') {
            calendarType.value = 'range';
        } else {
            calendarType.value = 'single';
        }
    },
    { immediate: true }
);

watch(
    () => props.headerValue,
    newVal => {
        const now = new Date();
        if (props.type === 'dateRange') {
            if (newVal instanceof Array) {
                for (let i = 0; i < 2; i++) {
                    calendarValues.value[i] = dayjs(newVal[i] || now).format('YYYY-MM-DD');
                }
            } else {
                calendarValues.value = [dayjs(newVal || now).format('YYYY-MM-DD'), dayjs(now).format('YYYY-MM-DD')];
            }
        } else {
            calendarValues.value = [dayjs(newVal || now).format('YYYY-MM-DD')];
        }
    },
    { immediate: true }
);

const calendarStrs = computed(() => {
    if (props.type === 'dateRange') {
        return calendarValues.value.map(item => {
            return dayjs(item).format('MM-DD');
        });
    } else {
        return [dayjs(calendarValues.value[0]).format('MM-DD')];
    }
});

const handleActionClick = () => {
    show.value = true;
};

const handleConfirm = (v: (string | number)[]) => {
    if (props.type === 'dateRange') {
        calendarValues.value = [v[0], v[v.length - 1]];
    } else {
        calendarValues.value = [v[0]];
    }
    show.value = false;
    emits('update:headerValue', calendarValues.value);
};

const handleInputConfirm = (v?: string | number | undefined) => {
    emits('search', String(v));
};
</script>
<template>
    <view class="ste-search-box-root">
        <view class="action left">
            <view class="action-item" @click="handleActionClick">
                <text>{{ calendarStrs[0] }}</text>
                <text>{{ calendarStrs[1] }}</text>
            </view>
            <view class="divider" />
            <view class="search-icon">
                <ste-icon code="&#xe695;" color="#888C92" size="36" />
            </view>
            <view class="search-input">
                <ste-input
                    :placeholder="placeholder"
                    :placeholderStyle="`color: ${placeholderColor}`"
                    v-model="inputValue"
                    rootClass="ste-search-box-input"
                    @confirm="handleInputConfirm"
                    :clearable="clearable"
                    @clear="handleInputConfirm"
                    :confirmType="confirmType"
                    :fontColor="textColor"
                />
            </view>
        </view>

        <view class="action right">
            <slot name="right" />
        </view>
    </view>
    <view class="action-popup">
        <ste-popup v-model:show="show" height="60vh" position="bottom" round>
            <view style="padding-bottom: 20px; height: 100%">
                <ste-calendar :mode="calendarType" @confirm="handleConfirm" :list="calendarValues" />
            </view>
        </ste-popup>
    </view>
</template>

<style lang="scss" scoped>
.ste-search-box-root {
    display: flex;
    align-items: center;

    width: 100%;

    .action.left {
        display: flex;
        align-items: center;
        background-color: #fff;
        border-radius: 16rpx;
        padding: 0 16rpx;
        flex: 1;

        .action-item {
            color: #0275ff;
            font-size: 24rpx;
            display: flex;
            flex-direction: column;
            width: 74rpx;
        }

        .divider {
            width: 2rpx;
            height: 22rpx;
            background-color: #888c92;
            margin-left: 16rpx;
            margin-right: 10rpx;
        }

        .search-icon {
            display: inline;
            font-size: 0;
            margin-right: 8rpx;
        }
        .search-input {
            flex: 1;

            :deep(.ste-search-box-input) {
                .content {
                    padding: 0;
                }
            }
        }
    }

    .action.right {
        // padding: 0 16rpx;
    }
}
</style>
