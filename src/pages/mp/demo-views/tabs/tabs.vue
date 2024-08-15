<script setup lang="ts">
import { ref, computed } from 'vue';
import type { SwitchOnChangeEvent } from '@uni-helper/uni-app-types';

const list1 = [
    {
        title: '标签1',
        subTitle: '子标题',
        image: 'https://image.whzb.com/chain/StellarUI/图片.jpg',
        content: 'https://image.whzb.com/chain/StellarUI/image/banner1.png',
        badge: 5,
    },
    {
        title: '标签2',
        subTitle: '子标题',
        image: 'https://image.whzb.com/chain/StellarUI/图片.jpg',
        content: 'https://image.whzb.com/chain/StellarUI/image/banner2.png',
        badge: 0,
    },
    {
        title: '这是一个超长的标签',
        subTitle: '子标题',
        image: 'https://image.whzb.com/chain/StellarUI/图片.jpg',
        content: 'https://image.whzb.com/chain/StellarUI/image/banner1.png',
        badge: 10,
    },
    {
        title: '标签4',
        subTitle: '子标题',
        image: 'https://image.whzb.com/chain/StellarUI/图片.jpg',
        content: 'https://image.whzb.com/chain/StellarUI/image/banner2.png',
        badge: 0,
    },
];
const list2 = [
    {
        title: '标签5',
        subTitle: '子标题',
        image: 'https://image.whzb.com/chain/StellarUI/图片.jpg',
        content: 'https://image.whzb.com/chain/StellarUI/image/banner1.png',
        badge: 0,
    },
    {
        title: '标签6',
        subTitle: '子标题',
        image: 'https://image.whzb.com/chain/StellarUI/图片.jpg',
        content: 'https://image.whzb.com/chain/StellarUI/image/banner2.png',
        badge: 0,
    },
    {
        title: '标签7',
        subTitle: '子标题',
        image: 'https://image.whzb.com/chain/StellarUI/图片.jpg',
        content: 'https://image.whzb.com/chain/StellarUI/image/banner1.png',
        badge: 0,
    },
    {
        title: '标签8',
        subTitle: '子标题',
        image: 'https://image.whzb.com/chain/StellarUI/图片.jpg',
        content: 'https://image.whzb.com/chain/StellarUI/image/banner2.png',
        badge: 0,
    },
];

const showData = ref(false);
const datas = computed(() => (showData.value ? [...list1].concat(list2) : list1));
const switchData = (v: SwitchOnChangeEvent) => (showData.value = v.detail.value);

const showImage = ref(false);
const setShowImage = (v: SwitchOnChangeEvent) => (showImage.value = v.detail.value);
const showTitle = ref(true);
const setShowTitle = (v: SwitchOnChangeEvent) => (showTitle.value = v.detail.value);
const showSubTitle = ref(false);
const setSubTitle = (v: SwitchOnChangeEvent) => (showSubTitle.value = v.detail.value);
const showBadge = ref(false);
const setShowBadge = (v: SwitchOnChangeEvent) => (showBadge.value = v.detail.value);
const swipeable = ref(false);
const setSwipeable = (v: SwitchOnChangeEvent) => (swipeable.value = v.detail.value);
const showType = ref('line');
const setShowType = (v: SwitchOnChangeEvent) => (showType.value = v.detail.value ? 'card' : 'line');
</script>
<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="标签页"></page-nav>
        <ste-tabs :showImage="showImage" :showSubtitle="showSubTitle" :showTitle="showTitle" :swipeable="swipeable" :type="showType">
            <ste-tab v-for="item in datas" :key="item.title" :title="item.title" :image="item.image" :badge="showBadge ? item.badge : 0" :subTitle="item.subTitle">
                <view>{{ item.title }} Content</view>
                <image mode="widthFix" :src="item.content" />
            </ste-tab>
        </ste-tabs>
        <view class="method-list">
            <view>
                显示主标题
                <switch :checked="showTitle" @change="setShowTitle"></switch>
            </view>
            <view>
                显示图标
                <switch @change="setShowImage"></switch>
            </view>
            <view>
                显示子标题
                <switch @change="setSubTitle"></switch>
            </view>
            <view>
                切换数据
                <switch @change="switchData"></switch>
            </view>
            <view>
                显示徽标
                <switch @change="setShowBadge"></switch>
            </view>
            <view>
                手势切换
                <switch @change="setSwipeable"></switch>
            </view>
            <view>
                卡片模式
                <switch @change="setShowType"></switch>
            </view>
        </view>
        <view class="message">--更多预览效果请参考V2文档--</view>
    </view>
</template>
<style scoped lang="scss">
.page {
    image {
        width: 100%;
    }

    .method-list {
        padding: 30rpx;

        view {
            width: 100%;
            display: flex;
            align-items: center;
            margin-bottom: 24rpx;

            switch {
                margin-left: 12rpx;
                transform: scale(0.7);
            }
        }
    }

    .message {
        width: 100%;
        text-align: center;
        margin-top: 24rpx;
        color: #999;
        font-size: 24rpx;
    }
}
</style>
