<script setup lang="ts">
import { ref, defineProps, defineEmits, defineOptions, computed, onMounted, getCurrentInstance } from 'vue';
import { useProvide } from '../../utils/mixin';
import { type TabProps } from '../ste-tab/props';
import propsData, { TAB_KEY } from './props';
import useData from './useData';

defineOptions({
    name: 'ste-tabs',
});

const emits = defineEmits<{
    (e: 'click-tab', tab: TabProps): void;
    (e: 'update:active', active: number | string): void;
    (e: 'change', tab: TabProps): void;
}>();

const props = defineProps(propsData);
const thas = ref<globalThis.ComponentPublicInstance | null>();
const { internalChildren } = useProvide(TAB_KEY, 'ste-tab')({ activeKey: computed(() => props.active || 0) });

const {
    cmpRootStyle,
    cmpListBackground,
    cmpPullDown,
    openPullDown,
    cmpScrollX,
    scrollLeft,
    onScroll,
    cmpTabList,
    cmpShowLine,
    cmpActiveTabEl,
    onClickTab,
    cmpEllipsis,
    cmpTitleStyle,
    cmpLineStyle,
    onOpenDown,
    cmpPullStyle,
    onCloseDown,
    cmpPullIconTransform,
    cmpPullListTransform,
    cmpActiveIndex,
    cmpDisabledIndexs,
    onSliding,
} = useData({
    thas,
    props,
    emits,
    internalChildren,
});

onMounted(() => {
    thas.value = getCurrentInstance()?.proxy;
});
</script>
<template>
    <view class="ste-tabs-root" :class="type" :style="[cmpRootStyle]">
        <view class="tab-list-box" :style="[cmpListBackground, { paddingRight: cmpPullDown ? '70rpx' : 0 }]">
            <scroll-view
                class="tab-list view-list"
                :class="{ 'open-down': openPullDown }"
                enhanced
                :scroll-x="cmpScrollX"
                :scroll-with-animation="cmpScrollX"
                :scroll-left="scrollLeft"
                :show-scrollbar="false"
                @scroll="onScroll"
            >
                <block v-for="(tab, index) in cmpTabList" :key="index">
                    <view class="tab-space" :class="{ 'show-tab-line': cmpShowLine }" v-if="index > 0" :style="{ height: `${cmpActiveTabEl.height}px` }">
                        <view class="space-line" />
                    </view>
                    <view
                        class="tab-item"
                        :class="{
                            active: tab.active,
                            disabled: tab.disabled || disabled,
                            start: index === 0,
                        }"
                        @click="onClickTab(tab, index)"
                    >
                        <view class="tab-image" v-if="showImage" :style="{ backgroundImage: `url(${tab.image})` }"></view>
                        <ste-badge v-if="showTitle" :isBlock="type === 'card'" :showDot="tab.showDot" :content="tab.badge" :showZero="tab.showZeroBadge" isInline :rootStyle="{ maxWidth: '100%' }">
                            <view class="tab-title" :style="[cmpEllipsis, cmpTitleStyle]">
                                {{ tab.title }}
                            </view>
                        </ste-badge>
                        <view class="tab-sub-title" v-if="showSubtitle" :style="[cmpEllipsis]">
                            {{ tab.subTitle }}
                        </view>
                    </view>
                </block>
                <view class="tab-line-box" v-if="cmpShowLine">
                    <view class="tab-line" :style="[cmpLineStyle]"></view>
                </view>
            </scroll-view>
            <view v-if="cmpPullDown" class="tab-pull-down" @click="onOpenDown">
                <ste-icon code="&#xe676;" size="10px" :color="titleColor" />
            </view>
            <view v-if="cmpPullDown" class="tab-pull-down-box" :class="{ open: openPullDown }">
                <view class="pull-down-content" :style="[cmpPullStyle]">
                    <view class="content-tabs" :style="[cmpListBackground]">
                        <view class="placeholder">{{ placeholder }}</view>
                        <view class="tab-pull-down" @click="onCloseDown">
                            <view class="pull-down-icon" :style="[cmpPullIconTransform]">
                                <ste-icon code="&#xe676;" size="10px" :color="titleColor" />
                            </view>
                        </view>
                    </view>
                    <view class="tab-list" :style="[cmpListBackground, cmpPullListTransform]">
                        <view
                            class="tab-item"
                            v-for="(tab, index) in cmpTabList"
                            :key="index"
                            :class="{
                                active: tab.active,
                                disabled: tab.disabled || disabled,
                            }"
                            @click="onClickTab(tab, index)"
                        >
                            <view class="tab-image" v-if="showImage" :style="{ backgroundImage: `url(${tab.image})` }"></view>
                            <view class="tab-title" v-if="showTitle" :style="[cmpEllipsis]">
                                {{ tab.title && tab.title.length > 4 ? `${tab.title.slice(0, 4)}...` : tab.title }}
                            </view>
                            <view class="tab-sub-title" v-if="showSubtitle" :style="[cmpEllipsis]">
                                {{ tab.subTitle && tab.subTitle.length > 4 ? `${tab.subTitle.slice(0, 4)}...` : tab.subTitle }}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="content">
            <!-- 内容区域 -->
            <ste-touch-swipe
                :index="cmpActiveIndex"
                :childrenLength="cmpTabList.length"
                :duration="duration"
                :disabledIndexs="cmpDisabledIndexs"
                :disabled="!swipeable || lock || disabled"
                @change="onSliding"
            >
                <slot name="default" />
            </ste-touch-swipe>
        </view>
    </view>
</template>

<!-- 默认线状样式 -->
<style lang="scss" scoped>
.ste-tabs-root {
    display: block;
    width: 100%;
    position: relative;

    & > .tab-list-box {
        position: var(--tabs-sticky);
        top: var(--tabs-offset-top);
        width: 100%;
        background: #fff;
        z-index: 1001;
        border-radius: var(--tabs-radius);
        overflow: hidden;

        .tab-list {
            width: 100%;
            white-space: nowrap;
            overflow-x: auto;

            .tab-space {
                display: inline-flex;
                vertical-align: top;
                width: var(--tabs-tab-space);
                min-width: var(--tabs-tab-space-line);
                align-items: center;
                justify-content: center;

                .space-line {
                    width: var(--tabs-tab-space-line);
                    background-color: rgba(180, 180, 180, 0.3);
                    height: 60%;
                }

                &.show-tab-line {
                    align-items: flex-end;

                    .space-line {
                        height: calc(100% - 36rpx);
                        transform: translateY(-6rpx);
                    }
                }
            }

            .tab-item {
                display: inline-flex;
                flex-direction: column;
                vertical-align: top;
                width: var(--tabs-tab-width);
                padding: var(--tabs-tab-padding);
                padding-bottom: var(--tabs-tab-padding-bottom);
                justify-content: center;
                align-items: center;
                text-align: center;
                white-space: initial;
                overflow: hidden;

                .tab-image {
                    width: var(--tabs-image-width);
                    height: var(--tabs-image-height);
                    border-radius: var(--tabs-image-radius);
                    // border-width: var(--tabs-image-border-width);
                    border-width: 0;
                    border-style: solid;
                    border-color: var(--tabs-color);
                    background: rgba(187, 187, 187, 0.4);
                    // border-color: transparent;
                    overflow: hidden;
                    background-size: 100% 100%;
                    margin: 0 auto;

                    image {
                        width: 100%;
                        height: 100%;
                    }

                    & + .tab-sub-title {
                        margin-top: 8rpx;
                    }
                }

                .tab-title {
                    max-width: 100%;
                    height: var(--tabs-title-height);
                    line-height: var(--tabs-title-height);
                    overflow: hidden;
                    font-size: var(--font-size-28, 28rpx);
                    color: var(--tabs-title-color);
                    word-break: break-all;
                    margin: 0 auto;

                    & + .tab-sub-title {
                        margin-top: 4rpx;
                    }
                }

                .tab-sub-title {
                    width: 100%;
                    height: var(--tabs-sub-title-height);
                    line-height: var(--tabs-sub-title-height);
                    border-radius: var(--tabs-sub-title-radius);
                    max-width: 100%;
                    overflow: hidden;
                    font-size: var(--font-size-28, 28rpx);
                    text-align: center;
                    margin: 0 auto;
                    color: var(--tabs-sub-color);
                }

                &.active {
                    .tab-image {
                        // border-color: var(--tabs-color);
                        border-width: var(--tabs-image-border-width);
                    }

                    .tab-title {
                        color: var(--tabs-active-title-color);
                        font-weight: bold;
                    }

                    .tab-sub-title {
                        background-color: var(--tabs-color);
                        color: var(--tabs-active-sub-color);
                    }
                }

                &.disabled {
                    cursor: no-drop;

                    .tab-title,
                    .tab-sub-title {
                        color: #bbb;
                    }
                }
            }

            .tab-line-box {
                width: 100%;
                padding: 4rpx 0;

                .tab-line {
                    background-color: var(--tabs-color);
                    transition-duration: var(--tabs-transition-duration);
                    width: var(--tabs-line-width);
                    height: var(--tabs-line-height);
                    border-radius: 4rpx;
                }
            }

            &.open-down {
                opacity: 0;
                pointer-events: none;
            }
        }

        .tab-pull-down {
            width: 70rpx;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.45);
            box-shadow: -5px 0 5px rgba(245, 245, 245, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;

            .pull-down-icon {
                width: 10px;
                height: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition-duration: 0.3s;
            }
        }

        .tab-pull-down-box {
            display: none;
            position: fixed;
            background-color: rgba(0, 0, 0, 0.45);
            z-index: var(--tabs-mask-zindex);
            top: var(--tabs-mask-top);
            right: var(--tabs-mask-right);
            bottom: var(--tabs-mask-bottom);
            left: var(--tabs-mask-left);

            &.open {
                display: block;
            }

            .pull-down-content {
                width: 100%;
                position: fixed;
                height: initial;
                display: block;
                overflow: hidden;

                .content-tabs {
                    width: 100%;
                    height: var(--tabs-list-height);
                    position: relative;
                    z-index: 10;
                    background-color: #ffffff;

                    .placeholder {
                        display: flex;
                        height: 100%;
                        align-items: center;
                        padding: 0 24rpx;
                        color: var(--tabs-title-color);
                        font-size: var(--font-size-28, 28rpx);
                    }
                }

                .tab-list {
                    display: grid;
                    grid-template-columns: 25% 25% 25% 25%;
                    grid-row-gap: 30rpx;
                    flex-wrap: wrap;
                    position: relative;
                    z-index: 1;
                    background-color: #ffffff;
                    border-radius: 0 0 24rpx 24rpx;
                    padding: 30rpx 0;
                    transition-duration: 0.3s;
                    transform: translateY(-100%);

                    .tab-item {
                        width: 100%;
                        margin: 0;
                        padding: 0 24rpx;

                        &.active {
                            .tab-title {
                                color: var(--tabs-color);
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

<!-- card样式 -->
<style lang="scss" scoped>
.ste-tabs-root.card {
    .tab-list-box {
        .tab-list {
            padding: 0;

            .tab-item {
                padding: 12rpx 24rpx;
                background-color: var(--tabs-card-background);
                border-width: var(--tabs-tab-border-width);
                border-style: solid;
                border-color: var(--tabs-color);

                &.start {
                    border-width: var(--tabs-tab-border-width-start);
                }

                &.active {
                    background-color: var(--tabs-card-background-active);

                    .tab-sub-title {
                        background-color: var(--tabs-card-sub-bg);
                        color: var(--tabs-card-sub-color);
                    }
                }

                &.disabled {
                    cursor: no-drop;
                    background-color: #f5f5f5;

                    .tab-title,
                    .tab-sub-title {
                        color: #bbb;
                    }
                }
            }

            .tab-line-box {
                display: none;
            }
        }

        .tab-pull-down-box {
            &.open {
                .pull-down-content {
                    .tab-list {
                        .tab-item {
                            background-color: initial;
                        }
                    }
                }
            }
        }
    }
}
</style>
