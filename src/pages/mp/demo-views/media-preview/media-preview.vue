<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from '@/uni_modules/stellar-plus/composables';
let toast = useToast();
const medias = ref([
    'https://image.whzb.com/chain/StellarUI/image/banner1.png',
    'https://image.whzb.com/chain/StellarUI/竖屏1.mp4',
    'https://image.whzb.com/chain/StellarUI/验证码背景.png',
    'https://image.whzb.com/chain/StellarUI/bg4.jpg',
    'https://image.whzb.com/chain/StellarUI/image/banner2.png',
    'https://image.whzb.com/chain/StellarUI/bg3.jpg',
]);
const show = ref(false);
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);
const show5 = ref(false);
const show6 = ref(false);
const show7 = ref(false);

const onLongpress = (i: number) => {
    toast.showToast({
        title: `长按了第【${i + 1}】个媒体资源`,
        icon: 'none',
    });
};

const onBeforeClose = (stop: () => void, next: () => void, prevent: () => void) => {
    stop();
    uni.showModal({
        title: '确定关闭弹窗吗？',
        success({ cancel, confirm }) {
            if (confirm) {
                console.log('点了确定');
                next();
            }
            if (cancel) {
                console.log('点了取消');
                prevent();
            }
        },
        fail() {
            prevent();
        },
    });
};

const onClose = () => {
    toast.showToast({
        title: '弹窗关闭了',
        icon: 'none',
    });
};
</script>
<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="媒体预览"></page-nav>
        <view class="content">
            <view class="demo-item">
                <view class="title">基础用法</view>
                <view class="item-block">
                    <ste-button @click="show = true">基础预览</ste-button>
                    <view style="width: 100%">
                        <ste-media-preview :urls="medias" v-model:show="show" />
                    </view>
                </view>
                <view class="item-block">
                    <ste-button @click="show1 = true">自动轮播</ste-button>
                    <view style="width: 100%">
                        <ste-media-preview :urls="medias" v-model:show="show1" :autoplay="3000" />
                    </view>
                </view>
                <view class="item-block">
                    <ste-button @click="show2 = true">前后衔接循环播放</ste-button>
                    <view style="width: 100%">
                        <ste-media-preview :urls="medias" v-model:show="show2" loop />
                    </view>
                </view>
                <view class="item-block">
                    <ste-button @click="show3 = true">默认展示下标为2的媒体资源</ste-button>
                    <view style="width: 100%">
                        <ste-media-preview :urls="medias" v-model:show="show3" :index="2" />
                    </view>
                </view>
                <view class="item-block">
                    <ste-button @click="show4 = true">隐藏左下角索引标签</ste-button>
                    <view style="width: 100%">
                        <ste-media-preview :urls="medias" v-model:show="show4" :showIndex="false" />
                    </view>
                </view>
                <view class="item-block">
                    <ste-button @click="show5 = true">双指缩放</ste-button>
                    <view style="width: 100%">
                        <ste-media-preview :urls="medias" v-model:show="show5" scale />
                    </view>
                </view>
                <view class="item-block">
                    <ste-button @click="show6 = true">长按触发事件</ste-button>
                    <view style="width: 100%">
                        <ste-media-preview :urls="medias" v-model:show="show6" @longpress="onLongpress" />
                    </view>
                </view>
                <view class="item-block">
                    <ste-button @click="show7 = true">关闭前/后事件</ste-button>
                    <view style="width: 100%">
                        <ste-media-preview :urls="medias" v-model:show="show7" @beforeClose="onBeforeClose" @close="onClose" />
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<style scoped lang="scss">
.page {
    .content {
        background: #fbfbfc;

        .demo-item {
            .item-block {
                > view {
                    margin: 0 8px 8px 0;
                }
            }
        }
    }
}
</style>
