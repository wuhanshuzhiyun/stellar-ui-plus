<script setup lang="ts">
import { defineProps, computed, watch, onMounted, getCurrentInstance, nextTick, defineEmits, type StyleValue } from 'vue';
import utils from '../../utils/utils';
import { useProvide } from '../../utils/mixin';
import { type TabProps } from '../ste-tab/props';
import propsData, { TAB_KEY } from './props';
import useData from './useData';
import type { UniScrollViewOnScrollEvent } from '../../types/event';

const emits = defineEmits<{
    (e: 'click-tab', tab: TabProps): void;
    (e: 'update:active', active: number | string): void;
    (e: 'change', tab: TabProps): void;
}>();

const props = defineProps(propsData);

const {
    thas,
    setThas,
    dataActive,
    setDataActive,
    viewScrollLeft,
    setViewScrollLeft,
    scrollLeft,
    setScrollLeft,
    showComponent,
    setShowComponent,
    listBoxEl,
    setListBoxEl,
    listEl,
    setListEl,
    tabEls,
    setTabEls,
    openPullDown,
    setOpenPullDown,
    pullTransform,
    setPullTransform,
    setUpdateChildrenTimeout,
    setUpdateTabsTimeout,
} = useData();

const { internalChildren } = useProvide(TAB_KEY, 'ste-tab')({ activeKey: computed(() => props.active || 0) });
watch(
    () => internalChildren.length,
    v => {
        console.log('???????????', v);
    }
);

const cmpShowLine = computed(() => props.type === 'line' && props.showLine && !props.showSubtitle);

const cmpTabList = computed(() =>
    internalChildren.map((item, index) => {
        const tab: TabProps & { active: boolean } = { ...item.props } as any;
        switch (typeof dataActive.value) {
            case 'string':
                tab.active = dataActive.value === tab.name;
                break;
            case 'number':
                tab.active = dataActive.value === index;
                break;
        }
        if (tab.subTitle?.length > 6) {
            tab.subTitle = tab.subTitle.slice(0, 6);
        }

        return tab;
    })
);

const cmpDisabledIndexs = computed(() => {
    const indexs: number[] = [];
    cmpTabList.value.forEach((item, i) => {
        if (item.disabled) indexs.push(i);
    });
    return indexs;
});

const cmpRootStyle = computed(() => {
    let tabCardBg = utils.Color.formatColor(props.titleColor, 0.05);
    let tabCardBgActive = utils.Color.formatColor(props.color, 0.1);
    let tabCardSubBg = props.color;
    let tabCardSubColor = '#fff';
    let activeTitleColor = props.activeTitleColor;
    let borderWidthStart = '0';
    let borderWidth = '0';
    if (props.type === 'card') {
        activeTitleColor = props.color;
        if (props.border) {
            tabCardBg = 'none';
            tabCardBgActive = props.color;
            tabCardSubBg = '#fff';
            tabCardSubColor = props.color;
            activeTitleColor = '#fff';
            borderWidthStart = '1px';
            borderWidth = '1px 1px 1px 0';
            if (Number(props.tabSpace) > 0) {
                borderWidth = '1px';
            }
        }
    }
    const tabSpace = utils.formatPx<'str'>(props.tabSpace);
    let tabSpaceLine = '0';
    if (props.showGapLine) {
        tabSpaceLine = '1px';
    }
    let tabWidth = utils.formatPx<'str'>(props.tabWidth);
    if (internalChildren.length > 0 && internalChildren.length <= props.divideNum) {
        const listWidth = listEl.value?.width || 375;
        const tabsWidth = listWidth - Number(tabSpace.slice(0, -2)) * (internalChildren.length - 1);
        tabWidth = tabsWidth / internalChildren.length + 'px';
    }

    const style = {
        '--tabs-color': props.color,
        '--tabs-radius': utils.formatPx(props.radius),
        '--tabs-card-background': tabCardBg,
        '--tabs-card-background-active': tabCardBgActive,
        '--tabs-card-sub-bg': tabCardSubBg,
        '--tabs-card-sub-color': tabCardSubColor,
        '--tabs-line-width': utils.formatPx(props.lineWidth),
        '--tabs-line-height': utils.formatPx(props.lineHeight),
        '--tabs-tab-width': tabWidth,
        '--tabs-tab-padding': utils.formatPx(props.tabPadding),
        '--tabs-tab-padding-bottom': cmpShowLine.value ? utils.formatPx(4) : utils.formatPx(props.tabPadding),
        '--tabs-transition-duration': props.duration ? `${props.duration}s` : 'inherit',
        '--tabs-tab-space': tabSpace,
        '--tabs-tab-space-line': tabSpaceLine,
        '--tabs-tab-border-width': borderWidth,
        '--tabs-tab-border-width-start': borderWidthStart,
        '--tabs-sticky': props.sticky ? 'sticky' : 'relative',
        '--tabs-offset-top': utils.formatPx(props.offsetTop),
        '--tabs-title-color': props.titleColor,
        '--tabs-active-title-color': activeTitleColor,
        '--tabs-title-height': utils.formatPx(props.titleHeight),
        '--tabs-sub-title-height': utils.formatPx(props.subTitleHeight),
        '--tabs-sub-title-radius': utils.formatPx(props.subTitleRadius),
        '--tabs-list-height': openPullDown.value && listEl.value ? `${listEl.value?.height}px` : 'initial',
        '--tabs-image-width': utils.formatPx(props.imageWidth),
        '--tabs-image-height': utils.formatPx(props.imageHeight),
        '--tabs-image-radius': utils.formatPx(props.imageRadius),
        '--tabs-image-border-width': utils.formatPx(props.imageBorderWidth),
        '--tabs-sub-color': props.subColor,
        '--tabs-active-sub-color': props.activeSubColor,
        '--tabs-mask-top': utils.formatPx(props.maskTop),
        '--tabs-mask-right': utils.formatPx(props.maskRight),
        '--tabs-mask-bottom': utils.formatPx(props.maskBottom),
        '--tabs-mask-left': utils.formatPx(props.maskLeft),
        '--tabs-mask-zindex': props.maskZindex,
        opacity: showComponent.value ? '1' : '0',
        zIndex: openPullDown.value ? '1001' : '1',
    };
    return style;
});

const cmpListBackground = computed(() => utils.bg2style(props.background));

const cmpActiveIndex = computed(() => cmpTabList.value.findIndex(m => m.active));

const cmpActiveTabEl = computed(() => tabEls.value[cmpActiveIndex.value] || {});

const cmpLineStyle = computed(() => {
    const width = utils.formatPx<'str'>(props.lineWidth);
    const display = tabEls.value.length ? 'block' : 'none';
    let marginLeft = '0';
    if (cmpActiveIndex.value !== -1) {
        const activeEl = tabEls.value[cmpActiveIndex.value];
        if (activeEl) {
            marginLeft = `${(activeEl.left || 0) - (listEl.value?.left || 0) + ((activeEl.width || 0) - Number(width.slice(0, -2))) / 2}px`;
        }
    }
    return { marginLeft, display };
});

const cmpScrollX = computed(() => props.divideNum > 0 && internalChildren.length > props.divideNum);

const cmpPullDown = computed(() => cmpScrollX.value && props.pullDown);

const cmpPullStyle = computed(() => {
    if (!listBoxEl.value || !openPullDown.value) return {};
    return {
        top: `${listBoxEl.value?.top}px`,
        left: `${listBoxEl.value?.left}px`,
        width: `${listBoxEl.value?.width}px`,
    };
});

const cmpPullListTransform = computed(() => ({ transform: `translateY(${pullTransform.value ? '0' : '-100%'})` }));

const cmpPullIconTransform = computed(() => ({ transform: `rotate(${pullTransform.value ? '180deg' : '0'})` }));

const cmpEllipsis = computed(() => {
    if (props.ellipsis) {
        return { whiteSpace: 'nowrap', textOverflow: 'ellipsis' } as StyleValue;
    }
    return {};
});

const cmpTitleStyle = computed(() => {
    if (props.showSubtitle) {
        return { fontWeight: 'bold', fontSize: utils.formatPx<'str'>(32) };
    }
    return {};
});

onMounted(() => {
    setThas(getCurrentInstance()?.proxy);
});

const initChildren = () => {
    setShowComponent(false);
    setUpdateChildrenTimeout(() => {
        nextTick(async () => {
            setListBoxEl(await utils.querySelector<false>('.tab-list-box', thas.value));
            setListEl(await utils.querySelector<false>('.tab-list-box .tab-list.view-list', thas.value));
            setTabEls(await utils.querySelector('.tab-list-box .tab-list.view-list .tab-item', thas.value, true));
            setShowComponent(true);
        });
    }, 100);
};

const onClickTab = (tab: TabProps, index: number) => {
    emits('click-tab', { ...tab, index });
    onSelect(tab, index);
};

const onSelect = async (tab: TabProps, index: number) => {
    if (tab.disabled || props.disabled || props.lock) return false;
    if (openPullDown.value) await onCloseDown();
    let active = dataActive.value;
    if (typeof active === 'string') {
        active = tab.name;
    } else if (typeof active === 'number') {
        active = index;
    }
    setDataActive(active);
    emits('update:active', active);
    emits('change', { ...tab, index });
    return true;
};

const onScroll = (e: UniScrollViewOnScrollEvent) => {
    setViewScrollLeft(e?.detail?.scrollLeft || 0);
};

const scrollToActive = () => {
    nextTick(async () => {
        const activeEl = await utils.querySelector('.tab-list-box .tab-list.view-list .tab-item.active', thas.value, false);
        if (!activeEl) return;
        if (!tabEls.value[cmpActiveIndex.value]) {
            setTabEls(await utils.querySelector('.tab-list-box .tab-list.view-list .tab-item', thas.value, true));
        }
        if (!listEl.value) {
            setListEl(await utils.querySelector('.tab-list-box .tab-list.view-list', thas.value, false));
        }
        const scrollLeft = utils.scrollViewX({
            viewLeft: activeEl.left || 0,
            viewRight: activeEl.right || 0,
            boxLeft: listEl.value?.left || 0,
            boxRight: listEl.value?.right || 0,
            prevWidth: tabEls.value[cmpActiveIndex.value - 1]?.width || 0,
            nextWidth: tabEls.value[cmpActiveIndex.value + 1]?.width || 0,
            scrollLeft: viewScrollLeft.value,
        });
        setViewScrollLeft(scrollLeft);
        setScrollLeft(scrollLeft);
    });
};

const onOpenDown = () => {
    return new Promise(async (resolve, reject) => {
        try {
            setListBoxEl(await utils.querySelector('.tab-list-box', thas.value, false));
            setOpenPullDown(true);
            setTimeout(() => {
                setPullTransform(true);
                resolve(true);
            }, 20);
        } catch (error) {
            reject(error);
        }
    });
};

const onCloseDown = () => {
    setPullTransform(false);
    setTimeout(() => {
        setOpenPullDown(false);
    }, 200);
};

const onSliding = (index: number) => {
    if (props.disabled) return;
    const tab = cmpTabList.value[index];
    onSelect(tab, index);
};

watch(
    () => props.active,
    v => setDataActive(v),
    { immediate: true }
);

watch(
    () => cmpActiveIndex.value,
    () => {
        scrollToActive();
    },
    { immediate: true }
);

watch(
    () => cmpRootStyle.value,
    () => setUpdateTabsTimeout(async () => setTabEls(await utils.querySelector('.tab-list-box .tab-list.view-list .tab-item', thas.value, true)), 10)
);
watch(
    () => internalChildren.length,
    () => initChildren()
);
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
                    font-size: 28rpx;
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
                    font-size: 28rpx;
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
                        font-size: 28rpx;
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
