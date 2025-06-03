<template>
    <view class="ste-category--root">
        <scroll-view scroll-y scroll-anchoring class="menu-category" :show-scrollbar="false">
            <view class="category-block" v-for="(item, index) in categoryData" :key="index">
                <ste-badge :content="item.badge">
                    <view
                        class="category-item"
                        :key="index"
                        :class="{ active: currentActiveIndex === index, next: currentActiveIndex === index - 1, prev: currentActiveIndex === index + 1 }"
                        @click="handleCategoryClick(item, index)"
                    >
                        <view class="title">{{ item.title }}</view>
                        <view class="sub-title">
                            <slot :item="item"></slot>
                        </view>
                    </view>
                </ste-badge>
            </view>
        </scroll-view>
    </view>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from 'vue';
import propsData, { categoryEmits, type CategoryItem } from './props';

const props = defineProps(propsData);
const emits = defineEmits(categoryEmits);
const currentActiveIndex = ref(0);
const categoryData = reactive<CategoryItem[]>([]);
const initData = () => {
    categoryData.length = 0;
    props.data.forEach((item, index) => {
        categoryData.push({
            ...item,
            title: item.title,
            value: item.value,
            active: index === 0,
        });
    });
};

watch(() => props.data, initData, { immediate: true });

const handleCategoryClick = (item: CategoryItem, index: number) => {
    categoryData.forEach((item, i) => {
        item.active = i === index;
    });
    currentActiveIndex.value = index;
    emits('update:value', String(item.value));
    emits('change', String(item.value));
};
</script>

<style lang="scss" scoped>
$padding-buffer: 16rpx;
$default-width: 144rpx;

.ste-category--root {
    height: 100%;
    .menu-category {
        height: 100%;
        display: flex;
        flex-direction: column;
        .category-block {
            width: calc($default-width);
            &:first-child {
                padding-top: $padding-buffer;
            }
        }
        .category-item {
            width: 100%;
            padding: 24rpx 16rpx 24rpx 16rpx;
            text-align: center;
            color: #000;
            background-color: #f4f5f6;
            transition: all 0.2s ease;
            font-size: var(--font-size-24, 24rpx);

            .title {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                overflow: hidden;
                /*! autoprefixer: off */
                -webkit-box-orient: vertical;
            }

            &.prev {
                border-bottom-right-radius: 16rpx;
            }

            &.next {
                border-top-right-radius: 16rpx;
            }

            .sub-title {
                margin-top: 8rpx;
                font-size: var(--font-size-20, 20rpx);
            }

            &.active {
                background-color: #fff;
                border-radius: 0;
            }
        }

        .category-item.active + .category-item {
            border-top-right-radius: 16rpx;
        }

        .category-item:has(+ .category-item.active) {
            border-bottom-right-radius: 16rpx;
        }
    }
}
</style>
