<template>
    <view class="version-switcher" @click.stop>
        <view class="version-selected" @tap="toggleDropdown">
            <text class="version-text">{{ currentVersion }}</text>
            <text class="arrow" :class="{ 'arrow-up': isOpen }"></text>
        </view>
        <view class="dropdown-menu" v-if="isOpen">
            <view v-for="version in versions" :key="version.value" class="dropdown-item" :class="{ active: currentVersion === version.label }" @click="switchVersion(version)">
                <a :href="version.url" class="version-text">{{ version.label }}</a>
                <text v-if="currentVersion === version.label" class="check-icon">✓</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import config from '@/common/config';

// 响应式状态
const isOpen = ref(false);
const currentVersion = ref('Vue 3.x');
const hoverIndex = ref(-1);

// 版本配置
const versions = [
    {
        label: 'Vue 2.x',
        value: 'v2',
        url: config.BASE_WEB_URL + '/pc/index/index',
    },
    {
        label: 'Vue 3.x',
        value: 'v3',
        url: config.BASE_WEB_URL + '/plus',
    },
];

// 方法
const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const hideDropdown = () => {
    isOpen.value = false;
};

const switchVersion = version => {
    if (currentVersion.value === version.label) {
        hideDropdown();
        return;
    }
    currentVersion.value = version.label;
    hideDropdown();
};

const checkClickOutside = e => {
    const componentEl = e.target.closest('.version-switcher');
    if (!componentEl && isOpen.value) {
        hideDropdown();
    }
};

const bindGlobalClick = () => {
    // #ifdef H5
    document.addEventListener('click', checkClickOutside);
    // #endif
};

const unbindGlobalClick = () => {
    // #ifdef H5
    document.removeEventListener('click', checkClickOutside);
    // #endif
};

// 生命周期钩子
onMounted(() => {
    bindGlobalClick();
});

onBeforeUnmount(() => {
    unbindGlobalClick();
});

// 可以选择性地导出一些方法供父组件使用
defineExpose({
    hideDropdown,
    currentVersion,
});
</script>

<style scoped>
.version-switcher {
    position: relative;
    display: inline-block;
    min-width: 240rpx;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.version-selected {
    padding: 16rpx 32rpx;
    background: #fff;
    border: 1rpx solid #dcdfe6;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s ease;
    /* #ifdef H5 */
    cursor: pointer;
}

.version-selected:hover {
    border-color: var(--pc-main-color);
    color: var(--pc-main-color);
}
/* #endif */

.version-text {
    font-size: 28rpx;
    color: #606266;
    text-decoration: none;
}

.arrow {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 12rpx solid transparent;
    border-right: 12rpx solid transparent;
    border-top: 12rpx solid #909399;
    transition: transform 0.3s;
    margin-left: 16rpx;
}

.arrow-up {
    transform: rotate(180deg);
}

.dropdown-menu {
    position: absolute;
    top: calc(100% + 8rpx);
    left: 0;
    right: 0;
    background: #fff;
    border: 1rpx solid #dcdfe6;
    border-radius: 8rpx;
    box-shadow: 0 4rpx 24rpx 0 rgba(0, 0, 0, 0.1);
    z-index: 100;
    overflow: hidden;
    transition: all 0.3s ease;
    animation: slideDown 0.2s ease-out;
}

.dropdown-item {
    padding: 16rpx 32rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s ease;
    cursor: pointer;
    /* #ifdef H5 */
}

.dropdown-item:hover {
    background-color: #f5f7fa;
    color: var(--pc-main-color);
}
/* #endif */

.active {
    color: var(--pc-main-color);
    background-color: #ecf5ff;
}

.check-icon {
    font-size: 24rpx;
    color: var(--pc-main-color);
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10rpx);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 移动端点击反馈效果 */
.dropdown-item:active {
    background-color: #f5f7fa;
}

/* 禁用文本选择 */
.version-text,
.check-icon {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
</style>
