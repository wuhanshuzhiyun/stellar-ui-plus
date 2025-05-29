<template>
    <view class="ste-filter-tool--root" :style="[rootStyleVar, { '--expand-count': 3 }]">
        <ste-dropdown-menu ref="steDropMenu" class="filter-box-menu" :activeColor="activeColor" dropDownIconColor="#000" v-model:showPopup="showMenu">
            <template #title>
                <slot>
                    <view></view>
                </slot>
            </template>
            <view class="custom-menu-box">
                <view class="menu-box" :class="[{ 'checkbox-mode': filterType === 'checkbox' }]">
                    <!-- 左侧分类栏 -->
                    <scroll-view scroll-y scroll-anchoring class="menu-category" :show-scrollbar="false" v-if="showCategory">
                        <view class="category-item" v-for="(item, index) in categoryData" :key="index" :class="{ active: currentActiveIndex === index }" @click="handleCategoryClick(index)">
                            {{ item.title }}
                        </view>
                    </scroll-view>

                    <!-- 右侧内容区 -->
                    <scroll-view
                        scroll-y
                        scroll-anchoring
                        class="menu-items"
                        :scroll-top="scrollTop"
                        @scroll="handleScroll"
                        :scroll-with-animation="true"
                        :enable-back-to-top="false"
                        :show-scrollbar="false"
                    >
                        <!-- 按钮模式 -->
                        <template v-if="filterType === 'button'">
                            <view class="menu-item-block" v-for="(item, index) in filtersData" :key="index">
                                <view class="menu-item-title">
                                    <text>{{ item.title }}</text>
                                    <view style="display: flex; align-items: center; color: #000" v-if="(item.expandCount || 0) > 0">
                                        <text>展开</text>
                                        <view class="expand-btn" @click.stop="toggleExpand(item)" :class="{ expanded: item.expand }">
                                            <ste-icon code="&#xe676;" color="#000" size="24" />
                                        </view>
                                    </view>
                                </view>
                                <view
                                    class="menu-item-content"
                                    :style="[{ '--expand-count': item.expandCount }]"
                                    :class="[{ multiple: item.multiple }, item.rowCount && item.rowCount > 1 ? `row-${item.rowCount}` : '', { collapsed: !item.expand && (item.expandCount || 0) > 0 }]"
                                >
                                    <view
                                        v-for="(child, childIndex) in item.children"
                                        :key="childIndex"
                                        class="menu-item-child"
                                        :class="[{ active: child.active }]"
                                        @click="handleFilterClick(item, child)"
                                    >
                                        {{ child.title }}
                                    </view>
                                </view>
                            </view>
                        </template>
                        <!-- 复选框模式 -->
                        <template v-if="filterType === 'checkbox'">
                            <view
                                class="menu-item-checkbox"
                                v-for="(item, index) in filtersData[currentActiveIndex].children"
                                :key="index"
                                @click="
                                    () => {
                                        filtersData[currentActiveIndex].activeValue = item.value;
                                    }
                                "
                            >
                                <view>{{ item.title }}</view>
                                <view class="checkbox-action">
                                    <ste-radio v-model="filtersData[currentActiveIndex].activeValue" :name="item.value" />
                                </view>
                            </view>
                        </template>
                    </scroll-view>
                </view>

                <view class="action-box">
                    <view class="btn reset" @click="handleMenuReset">
                        <text class="btn-text">重置</text>
                    </view>
                    <view class="btn confirm" @click="handleMenuConfirm">
                        <text class="btn-text">确认</text>
                    </view>
                </view>
            </view>
        </ste-dropdown-menu>
    </view>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick, getCurrentInstance } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import propsData, { filterToolEmits } from './props';
import type { FilterItem, CategoryItem } from './type';
import utils from '../../utils/utils';
import { useColorStore } from '../../store/color';

let { getColor } = useColorStore();

const instance = getCurrentInstance() as unknown as ComponentPublicInstance;

const props = defineProps(propsData);
const emits = defineEmits(filterToolEmits);

const categoryData = reactive<CategoryItem[]>([]);
const filtersData = reactive(props.data || []);
const checkboxData = ref<FilterItem[]>([]);
const showMenu = ref(false);

// 滚动相关状态
const currentActiveIndex = ref(0);
const scrollTop = ref(0);
const itemOffsets = ref<number[]>([]);
const isScrollingToTarget = ref(false); // 防止手动滚动时触发联动
const lastManualClickTime = ref(0); // 记录上次手动点击时间

let clickScrollTimer: any = null; // 用于点击滚动的定时器

// 样式变量
const rootStyleVar = computed(() => {
    return {
        '--active-color': props.activeColor || getColor().themeColor,
        '--inactive-color': props.inactiveColor,
    };
});

const showCategory = computed(() => {
    return props.filterType !== 'checkbox' || (props.filterType === 'checkbox' && filtersData.length > 1);
});

const calculateItemOffsets = () => {
    utils.debounce(calculateItemOffsetsCore, { delay: 50 })();
};

// 添加重试机制的位置计算 - 使用utils的防抖优化
const calculateItemOffsetsCore = async (retryCount = 0): Promise<void> => {
    const maxRetries = 3;

    try {
        await nextTick();

        // 等待一帧确保DOM完全渲染
        await new Promise(resolve => {
            // #ifdef H5
            requestAnimationFrame(() => resolve(void 0));
            // #endif
            // #ifndef H5
            setTimeout(() => resolve(void 0), 16);
            // #endif
        });

        const offsets: number[] = [];
        let hasValidOffsets = true;

        const scrollContainer = await utils.querySelector<false>('.menu-items', instance);
        if (!scrollContainer || !scrollContainer.top) {
            throw new Error('滚动容器未找到');
        }

        const containerTop = scrollContainer.top;

        // 批量获取所有标题位置
        for (let i = 0; i < filtersData.length; i++) {
            try {
                const titleRect = await utils.querySelector<false>(`.menu-item-block:nth-child(${i + 1}) .menu-item-title`, instance);

                if (titleRect && typeof titleRect.top === 'number' && titleRect.top > 0) {
                    offsets[i] = titleRect.top - containerTop;
                } else {
                    hasValidOffsets = false;
                    break;
                }
            } catch (error) {
                hasValidOffsets = false;
                break;
            }
        }

        // 如果获取的位置无效且还有重试次数，则重试
        if (!hasValidOffsets && retryCount < maxRetries) {
            console.warn(`位置计算失败，第${retryCount + 1}次重试`);
            setTimeout(
                () => {
                    calculateItemOffsetsCore(retryCount + 1);
                },
                100 * (retryCount + 1)
            ); // 递增延迟
            return;
        }

        // 验证offset的合理性
        if (hasValidOffsets && offsets.length === filtersData.length) {
            // 检查offsets是否递增（合理性检查）
            const isValidSequence = offsets.every((offset, index) => index === 0 || offset >= offsets[index - 1]);

            if (isValidSequence) {
                itemOffsets.value = offsets;
                console.log('位置计算成功:', offsets);
                return;
            }
        }

        // 兜底方案：使用估算值
        console.warn('使用兜底位置估算');
        const fallbackOffsets = filtersData.map((_, index) => index * 120); // 增加估算间距
        itemOffsets.value = fallbackOffsets;
    } catch (error) {
        console.error('位置计算失败:', error);
        // 最终兜底
        const fallbackOffsets = filtersData.map((_, index) => index * 120);
        itemOffsets.value = fallbackOffsets;
    }
};

// 优化初始化方法
const init = async () => {
    categoryData.length = 0;
    props.data.forEach((item, index) => {
        categoryData.push({
            title: item.title,
            value: item.value,
            children: item.children || [],
            active: index === 0,
        });
    });

    if (props.filterType === 'checkbox') {
        checkboxData.value.length = 0;
        checkboxData.value = props.data[0].children || [];
    }

    // 使用utils的防抖方法，多次尝试计算位置
    await nextTick();
    utils.debounce(() => calculateItemOffsetsCore(), { delay: 100 })();
    utils.debounce(() => calculateItemOffsetsCore(), { delay: 300 })();
    utils.debounce(() => calculateItemOffsetsCore(), { delay: 500 })();
};

// 监听数据变化
watch(
    () => props.data,
    newData => {
        if (newData) {
            init();
        }
    },
    { immediate: true }
);

// 点击左侧分类 - 滚动到对应位置（兼容多端）
const handleCategoryClick = async (index: number) => {
    if (currentActiveIndex.value === index) return;
    // 立即更新激活状态，避免视觉延迟
    categoryData.forEach((item, i) => {
        item.active = i === index;
    });
    currentActiveIndex.value = index;

    // 设置滚动标志
    isScrollingToTarget.value = true;

    if (props.filterType === 'checkbox') return;
    doScroll(index);
};

const doScroll = async (index: number) => {
    lastManualClickTime.value = Date.now();

    try {
        // 如果offsets为空或长度不匹配，重新计算
        if (itemOffsets.value.length !== filtersData.length || itemOffsets.value.every(offset => offset === 0)) {
            console.log('重新计算位置偏移');
            await calculateItemOffsets();

            // 等待计算完成
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        const targetOffset = itemOffsets.value[index] || 0;
        console.log(`滚动到位置: ${targetOffset}, 目标索引: ${index}`);

        // 清除之前的定时器
        if (clickScrollTimer) clearTimeout(clickScrollTimer);

        // 添加小的偏移量，确保标题完全可见
        const adjustedOffset = Math.max(0, targetOffset - 10);

        // 分两步设置滚动，确保滚动生效
        scrollTop.value = adjustedOffset;

        // 微调确保精确定位
        setTimeout(() => {
            scrollTop.value = adjustedOffset;
        }, 50);

        // 延长重置标志的时间
        clickScrollTimer = setTimeout(() => {
            isScrollingToTarget.value = false;
            console.log('滚动标志重置');
        }, 1000);
    } catch (error) {
        console.error('滚动失败:', error);
        isScrollingToTarget.value = false;
    }
};

// 处理滚动事件 - 根据滚动位置更新左侧激活状态（兼容多端）

// 优化滚动事件处理，使用utils的防抖方法
const handleScrollLogic = (currentScrollTop: number) => {
    // 检查offsets是否有效
    if (!itemOffsets.value.length || itemOffsets.value.length !== filtersData.length) {
        console.warn('位置数据无效，跳过滚动联动');
        return;
    }

    let targetIndex = 0;
    const threshold = 50; // 增加阈值，减少误触

    // 更精确的索引计算
    for (let i = itemOffsets.value.length - 1; i >= 0; i--) {
        if (currentScrollTop >= itemOffsets.value[i] - threshold) {
            targetIndex = i;
            break;
        }
    }

    // 只有确实需要切换时才更新
    if (currentActiveIndex.value !== targetIndex) {
        console.log(`滚动联动: ${currentActiveIndex.value} -> ${targetIndex}, 位置: ${currentScrollTop}`);

        categoryData.forEach((item, i) => {
            item.active = i === targetIndex;
        });
        currentActiveIndex.value = targetIndex;
    }
};
// 优化滚动事件处理，增加防抖和容错
const handleScroll = (event: any) => {
    // 基础条件检查
    if (props.filterType === 'checkbox' || isScrollingToTarget.value) return;

    const now = Date.now();
    if (now - lastManualClickTime.value < 800) return; // 增加保护时间

    // 获取滚动位置
    const currentScrollTop = event.detail?.scrollTop || event.target?.scrollTop || 0;

    // 使用utils的防抖方法
    utils.debounce(handleScrollLogic, currentScrollTop, { delay: 150 })();
};

// 滚动防抖定时器
let scrollTimer: any = null;

// 处理筛选项点击
const handleFilterClick = (item: FilterItem, child: FilterItem) => {
    if (item.multiple) {
        child.active = !child.active;
    } else {
        item.children?.forEach(filter => {
            filter.active = false;
        });
        child.active = true;
    }
};

// 重置筛选
const handleMenuReset = () => {
    filtersData.forEach(item => {
        item.children?.forEach(child => {
            child.active = false;
        });
    });

    //
    emits('reset');
    showMenu.value = false;
};

// 确认筛选
const handleMenuConfirm = () => {
    // 收集选中的筛选项
    // const selectedFilters: Record<string, any> = {};
    // filtersData.forEach(item => {
    //     const selected = item.children?.filter(child => child.active) || [];
    //     if (selected.length > 0) {
    //         selectedFilters[item.value] = item.multiple ? selected : selected[0];
    //     }
    // });

    emits('confirm', []);
    showMenu.value = false;
};

// 切换展开状态的方法
const toggleExpand = (item: FilterItem) => {
    item.expand = !item.expand;
};

// 优化监听显示状态
// 优化监听显示状态
watch(showMenu, async visible => {
    if (visible) {
        // 重置状态
        isScrollingToTarget.value = false;
        scrollTop.value = 0;

        // 使用utils的防抖方法，分多次计算确保准确
        await nextTick();
        utils.debounce(() => calculateItemOffsetsCore(), { delay: 50 })();
        utils.debounce(() => calculateItemOffsetsCore(), { delay: 200 })();
        utils.debounce(() => calculateItemOffsetsCore(), { delay: 500 })();
    }
});

// 添加resize监听（H5环境）- 使用utils的防抖
// #ifdef H5
const handleResize = () => {
    if (showMenu.value) {
        utils.debounce(() => calculateItemOffsetsCore(), { delay: 200 })();
    }
};
window.addEventListener('resize', handleResize);
// #endif

// 组件销毁时清理定时器
import { onUnmounted } from 'vue';
onUnmounted(() => {
    if (scrollTimer) clearTimeout(scrollTimer);
    if (clickScrollTimer) clearTimeout(clickScrollTimer);
});
</script>

<style lang="scss" scoped>
.ste-filter-tool--root {
    // #ifndef MP-WEIXIN || MP-ALIPAY || APP
    cursor: pointer;
    // #endif

    :deep(.custom-menu-box) {
        background-color: #fff;
        padding-top: 24rpx;

        .menu-box {
            width: 100%;
            min-height: 328rpx;
            max-height: 456rpx;
            font-size: var(--font-size-24, 24rpx);
            display: flex;

            &.checkbox-mode {
                min-height: 410rpx;
                max-height: 410rpx;
            }

            .menu-category {
                width: 144rpx;
                display: flex;
                flex-direction: column;

                .category-item {
                    padding: 24rpx;
                    text-align: center;
                    color: #888c92;
                    background-color: #f4f5f6;
                    transition: all 0.2s ease;

                    &.active {
                        background-color: #fff;
                        color: var(--active-color, #000);
                        border-radius: 0;
                    }
                }

                .category-item.active + .category-item {
                    border-top-left-radius: 16rpx;
                    border-top-right-radius: 16rpx;
                }
                .category-item:has(+ .category-item.active) {
                    border-bottom-left-radius: 16rpx;
                    border-bottom-right-radius: 16rpx;
                }
            }

            .menu-items {
                flex: 1;

                .menu-item-block {
                    padding: 0 40rpx;
                    margin-bottom: 20rpx;

                    .menu-item-title {
                        font-size: var(--font-size-24, 24rpx);
                        color: #888c92;
                        margin-bottom: 20rpx;

                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .expand-btn {
                            padding: 8rpx;
                            cursor: pointer;

                            .expand-icon {
                                font-size: 20rpx;
                            }
                            transition: transform 0.3s ease;

                            &.expanded {
                                transform: rotate(180deg);
                            }
                        }
                    }

                    .menu-item-content {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr); // 默认三列
                        gap: 20rpx 32rpx;
                        // 展开时的过渡效果
                        transition: height 0.3s ease;

                        &.collapsed {
                            overflow: hidden;
                            max-height: calc(var(--expand-count, 1) * 70rpx); // 大约一行的高度，根据实际调整
                        }

                        &:not(.collapsed) {
                            max-height: none;
                        }

                        &.multiple {
                            .menu-item-child.active {
                                color: var(--active-color);
                            }
                        }

                        // 两列
                        &.row-2 {
                            grid-template-columns: repeat(2, 1fr); // 两列
                        }
                        // 四列
                        &.row-4 {
                            grid-template-columns: repeat(4, 1fr); // 两列
                        }

                        .menu-item-child {
                            padding: 0 8rpx;
                            font-size: var(--font-size-24, 24rpx);
                            color: var(--inactive-color);
                            border-radius: 8rpx;
                            background: rgba(230, 232, 234, 0.5);
                            transition: all 0.2s ease;
                            height: 58rpx;
                            line-height: 58rpx;
                            cursor: pointer;
                            text-align: center;
                            vertical-align: middle;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;

                            &.active {
                                background-color: var(--active-color);
                                color: #fff;
                            }
                        }
                    }
                }

                .menu-item-checkbox {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #f4f5f6;
                    padding: 20rpx 40rpx;
                }
            }
            padding-bottom: 20rpx;
        }

        .action-box {
            padding: 0 26rpx 20rpx 26rpx;
            display: flex;
            justify-content: space-between;

            .btn {
                flex: 1;
                font-size: var(--font-size-32, 32rpx);
                display: flex;
                align-items: center;
                justify-content: center;
                height: 92rpx;
                transition: all 0.2s ease;

                &.reset {
                    background-color: #f4f5f6;
                    border-radius: 16rpx 0 0 16rpx;
                    color: #1c1f23;
                }
                &.confirm {
                    background-color: var(--active-color);
                    border-radius: 0 16rpx 16rpx 0;
                    color: #fff;
                }
            }
        }
    }
}
</style>
