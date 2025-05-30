<template>
    <view class="ste-filter-tool--root" :style="[rootStyleVar, { '--category-count': categoryData.length }]">
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
                        <view
                            class="category-item"
                            v-for="(item, index) in categoryData"
                            :key="index"
                            :class="[{ active: currentActiveIndex === index, next: currentActiveIndex === index - 1, prev: currentActiveIndex === index + 1 }]"
                            @click="handleCategoryClick(index)"
                        >
                            {{ item.title }}
                        </view>
                        <view class="category-item placeholder"></view>
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
                                    <view @click.stop="toggleExpand(item)" style="display: flex; align-items: center; color: #000; font-size: 20rpx" v-if="(item.expandCount || 0) > 0">
                                        <text>展开</text>
                                        <view class="expand-btn" :class="{ expanded: item.expand }">
                                            <ste-icon code="&#xe676;" color="#000" size="20" />
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
                                        @click="handleFilterItemClick(item, child)"
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
                                @click="() => handleCheckboxItemClick(filtersData[currentActiveIndex], String(item.value))"
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
import { ref, reactive, computed, watch, getCurrentInstance, onUnmounted } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import propsData, { filterToolEmits } from './props';
import type { FilterItem, CategoryItem } from './type';
import { useColorStore } from '../../store/color';
import { ScrollCalculator, ScrollController, InitializationManager, EventHandlerFactory } from './scrollUtil';
import useData from './useData';

// 组合式API和响应式数据
const { getColor } = useColorStore();
const instance = getCurrentInstance() as unknown as ComponentPublicInstance;
const props = defineProps(propsData);
const emits = defineEmits(filterToolEmits);

// 响应式状态
const categoryData = reactive<CategoryItem[]>([]);
const filtersData = reactive(props.data || []);
const checkboxData = ref<FilterItem[]>([]);
const showMenu = ref(false);
const currentActiveIndex = ref(0);
const scrollTop = ref(0);

// 计算属性
const rootStyleVar = computed(() => ({
    '--active-color': props.activeColor || getColor().themeColor,
    '--inactive-color': props.inactiveColor,
}));

// 使用简化的筛选逻辑组合式函数
const { handleFilterClick, handleCheckboxChange, handleReset, handleConfirm } = useData(props, emits, filtersData);

// 工具类实例
const calculator = new ScrollCalculator(instance, filtersData);
const controller = new ScrollController(scrollTop, currentActiveIndex, categoryData);
const initManager = new InitializationManager(calculator);

// 事件处理器
const handleScroll = EventHandlerFactory.createScrollHandler(controller, props.filterType);
const handleCategoryClick = EventHandlerFactory.createCategoryClickHandler(controller, calculator, categoryData, currentActiveIndex, props.filterType);

// 初始化数据
const initializeData = () => {
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
        checkboxData.value = props.data[0]?.children || [];
    }
};

// 包装筛选逻辑的点击事件
const handleFilterItemClick = (item: FilterItem, child: FilterItem) => {
    handleFilterClick(item, child);
};

const handleCheckboxItemClick = (item: FilterItem, value: string) => {
    handleCheckboxChange(item, value);
};

// 包装重置和确认事件
const handleMenuReset = () => {
    handleReset();
    showMenu.value = false;
};

const handleMenuConfirm = () => {
    handleConfirm();
    showMenu.value = false;
};

const toggleExpand = (item: FilterItem) => {
    item.expand = !item.expand;
};

// 监听器
watch(
    () => props.data,
    newData => {
        if (newData) {
            initializeData();
            initManager.initializeOffsets();
        }
    },
    { immediate: true }
);

watch(showMenu, async visible => {
    if (visible) {
        scrollTop.value = 0;
        await initManager.initializeOnMenuShow();

        // 更新控制器的偏移数据
        const offsets = await calculator.calculateItemOffsets();
        controller.updateOffsets(offsets);
    }
});

// H5环境resize监听
// #ifdef H5
const handleResize = EventHandlerFactory.createResizeHandler(calculator, showMenu);
window.addEventListener('resize', handleResize);
// #endif

// 组件销毁时清理
onUnmounted(() => {
    controller.destroy();
    // #ifdef H5
    window.removeEventListener('resize', handleResize);
    // #endif
});
</script>

<style lang="scss" scoped>
@import './ste-filter-tool.scss';
</style>
