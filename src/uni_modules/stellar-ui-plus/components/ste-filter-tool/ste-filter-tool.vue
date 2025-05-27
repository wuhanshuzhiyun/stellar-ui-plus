<template>
    <view class="ste-filter-tool--root" :style="[rootStyleVar]">
        <!-- 左侧筛选项滚动区域 -->
        <scroll-view class="filter-scroll" scroll-x :show-scrollbar="false" :scroll-left="scrollLeft">
            <view class="filter-content" :class="{ multiple }">
                <view v-for="(item, index) in mainFilters" :key="index" class="filter-item" :class="{ active: item.active }" @click="handleItemClick(item)">
                    <text class="filter-text">{{ item.title }}</text>
                </view>
            </view>
        </scroll-view>

        <!-- 右侧筛选按钮 -->
        <view class="filter-button" v-if="subFilters.length > 0">
            <ste-dropdown-menu :title="filterText" ref="steDropMenu" class="filter-box-menu" :activeColor="activeColor" dropDownIconColor="#000">
                <view class="custom-menu-box">
                    <view class="menu-box">
                        <view class="menu-item-block" v-for="(item, index) in subFilters" :key="index">
                            <view class="menu-item-title">{{ item.title }}</view>
                            <view class="menu-item-content" :class="{ multiple: item.multiple }">
                                <view v-for="(child, childIndex) in item.children" :key="childIndex" class="menu-item-child" :class="{ active: child.active }" @click="handleMenuClick(item, child)">
                                    {{ child.title }}
                                </view>
                            </view>
                        </view>
                    </view>
                    <view class="action-box">
                        <view class="btn reset" @click="handleMenuConfirm">
                            <text class="btn-text">重置</text>
                        </view>
                        <view class="btn confirm" @click="handleMenuConfirm">
                            <text class="btn-text">确认</text>
                        </view>
                    </view>
                </view>
            </ste-dropdown-menu>
        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import propsData, { filterToolEmits } from './props';
import type { FilterItem } from './props';
import type { RefDropdownMenu } from '../../types/refComponents';
import { useColorStore } from '../../store/color';
let { getColor } = useColorStore();

const props = defineProps(propsData);

const emits = defineEmits(filterToolEmits);

const scrollLeft = ref(0);

const initMainFilters = () => {
    const data = props.filterData || [];
    const value = props.value;
    if (Array.isArray(value)) {
        data.forEach(filter => {
            filter.active = value.includes(filter.value);
        });
    } else {
        data.forEach(filter => {
            filter.active = filter.value === value;
        });
    }
    return data;
};

const mainFilters = reactive(initMainFilters());
const subFilters = reactive(props.menuData || []);

const rootStyleVar = computed(() => {
    return {
        '--active-color': props.activeColor || getColor().themeColor,
        '--inactive-color': props.inactiveColor,
    };
});

const handleItemClick = (item: FilterItem) => {
    if (props.multiple) {
        item.active = !item.active;
    } else {
        mainFilters.forEach(filter => {
            filter.active = false;
        });
        item.active = true;
    }

    emits(
        'itemClick',
        mainFilters
            .filter(filter => filter.active)
            .map(filter => {
                const { active, ...rest } = filter; // 使用解构赋值排除 active 属性
                return rest;
            })
    );
};

const handleMenuClick = (item: FilterItem, child: FilterItem) => {
    if (item.multiple) {
        child.active = !child.active;
    } else {
        item.children?.forEach(filter => {
            filter.active = false;
        });

        child.active = true;
    }
};

const steDropMenu = ref<RefDropdownMenu>();
const handleMenuConfirm = () => {
    // const selectedFilters = subFilters.map(item => {
    //     item.children = item.children
    //         ?.filter(child => child.active)
    //         .map(filter => {
    //             const { active, ...rest } = filter;
    //             return rest;
    //         });
    //     return item;
    // });

    // emits('menuChange', selectedFilters);
    steDropMenu.value?.close();
};
</script>

<style lang="scss" scoped>
.ste-filter-tool--root {
    display: flex;
    align-items: center;
    width: 100%;
    overflow: hidden;
    background: #ffffff;

    .filter-scroll {
        flex: 1;
        white-space: nowrap;
        min-width: 0;
        position: relative;
        touch-action: pan-x;

        .filter-content {
            display: flex;
            align-items: center;
            margin: 0 16rpx;
            &.multiple {
                .filter-item.active {
                    background: rgba(230, 232, 234, 0.5);
                    .filter-text {
                        color: var(--active-color);
                    }
                }
            }

            .filter-item {
                flex-shrink: 0;
                padding: 8rpx 20rpx;
                margin-right: 16rpx;
                border-radius: 8rpx;
                background: rgba(230, 232, 234, 0.5);
                transition: all 0.2s ease;
                cursor: pointer;

                &.active {
                    background: var(--active-color);
                    .filter-text {
                        color: #fff;
                    }
                }

                .filter-text {
                    font-size: var(--font-size-24, 24rpx);
                    color: var(--inactive-color);
                }

                &:last-child {
                    margin-right: 0;
                }
            }
        }
        &::before {
            content: '';
            position: absolute;
            top: 50%;
            // left: 5%;
            right: 5%;
            bottom: 0;
            border-radius: 10px;
            transform: translate(0, -15%) rotate(-4deg);
            transform-origin: center center;
            box-shadow: 0 0 20px 15px rgba(255, 255, 255, 0.4);

            z-index: 2;
        }
    }

    .filter-button {
        margin-left: 16rpx;
        color: #000;
        cursor: pointer;

        :deep(.filter-box-menu) {
            .custom-menu-box {
                background-color: #fff;
                padding-top: 24rpx;
                border-radius: 0 0 18rpx 18rpx;
                .menu-box {
                    width: 100%;

                    margin-bottom: 56rpx;
                    font-size: var(--font-size-24, 24rpx);

                    .menu-item-block {
                        padding: 0 40rpx;
                        margin-bottom: 20rpx;

                        .menu-item-title {
                            font-size: var(--font-size-24, 24rpx);
                            color: #888c92;
                            margin-bottom: 20rpx;
                        }

                        .menu-item-content {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 20rpx 32rpx;

                            &.multiple {
                                .menu-item-child.active {
                                    background-color: var(--active-color);
                                    color: #fff;
                                }
                            }
                            .menu-item-child {
                                padding: 10rpx 0;
                                font-size: var(--font-size-24, 24rpx);
                                color: var(--inactive-color);
                                flex-shrink: 0;
                                padding: 16rpx 40rpx;
                                border-radius: 8rpx;
                                background: rgba(230, 232, 234, 0.5);
                                transition: all 0.2s ease;
                                cursor: pointer;
                                &.active {
                                    color: var(--active-color);
                                }
                            }
                        }
                    }
                }

                .action-box {
                    // padding: 0 40rpx;
                    display: flex;
                    justify-content: space-between;

                    // padding-bottom: 20rpx;
                    height: 92rpx;
                    border-radius: 0 0 16rpx 16rpx;

                    .btn {
                        flex: 1;
                        font-size: var(--font-size-32, 32rpx);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        &.reset {
                            background-color: #f4f5f6;
                            border-radius: 0 0 0 16rpx;
                            color: #1c1f23;
                        }
                        &.confirm {
                            background-color: var(--active-color);
                            border-radius: 0 0 16rpx 0;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
}

/* 隐藏滚动条 */
::-webkit-scrollbar {
    display: none;
}
</style>
