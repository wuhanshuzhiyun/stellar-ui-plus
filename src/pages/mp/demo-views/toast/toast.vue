<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="轻提示"></page-nav>
        <view class="content">
            <view class="demo-item">
                <view class="title">文字提示</view>
                <view class="item-block item-rate">
                    <ste-button @click="click1" :width="400">提示内容</ste-button>
                    <ste-button @click="click2" :width="400">多行内容</ste-button>
                    <ste-button @click="click3" :width="400">手动换行</ste-button>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">提示类型</view>
                <view class="item-block item-rate">
                    <ste-button @click="click4" :width="400">成功</ste-button>
                    <ste-button @click="click5" :width="400">失败</ste-button>
                    <ste-button @click="click6" :width="400">加载</ste-button>
                    <ste-button @click="click7" :width="400">无</ste-button>
                    <ste-button @click="click8" :width="400">自定义</ste-button>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">遮罩层</view>
                <view class="item-block item-rate">
                    <ste-button @click="click9" :width="400">遮罩层</ste-button>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">延迟时间</view>
                <view class="item-block item-rate">
                    <ste-button @click="click10" :width="400">延迟时间</ste-button>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">回调事件</view>
                <view class="item-block item-rate">
                    <ste-button @click="click11" :width="400">成功</ste-button>
                    <ste-button @click="click12" :width="400">结束</ste-button>
                    <ste-button @click="click13" :width="400">关闭</ste-button>
                </view>
            </view>
        </view>
        <ste-toast ref="toast"></ste-toast>
    </view>
</template>

<script setup lang="ts">
import { useToast } from '@/uni_modules/stellar-plus/composables';
import { ref } from 'vue';
let toast = ref();
const toast1 = useToast();
function click1() {
    toast1.showToast({
        title: '提示内容',
    });
}
function click2() {
    toast.value.showToast({
        title: '多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，多行内容，',
    });
}
function click3() {
    toast.value.showToast({
        title: '换行\n内容',
    });
}
function click4() {
    toast.value.showToast({
        title: '提示内容',
    });
}
function click5() {
    toast.value.showToast({
        title: '提示内容',
        icon: 'error',
    });
}
function click6() {
    toast.value.showToast({
        title: '提示内容',
        icon: 'loading',
    });
    setTimeout(() => {
        toast.value.hideToast();
    }, 4000);
}
function click7() {
    toast.value.showToast({
        title: '提示内容',
        icon: 'none',
    });
}
function click8() {
    toast.value.showToast({
        title: '提示内容',
        image: 'https://image.whzb.com/chain/StellarUI/组件图标/loading.png',
    });
}
function click9() {
    toast.value.showToast({
        title: '提示内容',
        mask: true,
        duration: 5000,
    });
}
function click10() {
    toast.value.showToast({
        title: '提示内容',
        duration: 5000,
    });
}
function click11() {
    toast.value.showToast({
        title: '提示内容',
        success() {
            setTimeout(() => {
                toast.value.showToast({
                    title: '成功',
                    icon: 'none',
                });
            }, 2000);
        },
    });
}
function click12() {
    toast.value.showToast({
        title: '提示内容',
        complete() {
            setTimeout(() => {
                toast.value.showToast({
                    title: '结束',
                    icon: 'none',
                });
            }, 2000);
        },
    });
}
function click13() {
    toast.value.showToast({
        title: '提示内容',
        close() {
            toast.value.showToast({
                title: '关闭',
                icon: 'none',
            });
        },
    });
}
</script>

<style lang="scss" scoped>
.page {
    .item-rate {
        flex-direction: column;
        align-items: baseline;
        row-gap: 20rpx;
    }
}
</style>
