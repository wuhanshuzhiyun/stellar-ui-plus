<script setup lang="ts">
import { ref } from 'vue';
import type { RefSignature } from '@/uni_modules/stellar-ui-plus/types/refComponents';

const signature = ref<RefSignature>();
function save() {
    signature.value?.save(res => {
        uni.previewImage({
            urls: [res],
        });
    });
}
function output(orientation: 'up' | 'down' | 'right' | 'left' | 'up-mirrored' | 'down-mirrored' | 'left-mirrored' | 'right-mirrored' = 'up') {
    signature.value?.output({
        orientation,
        success: res => {
            uni.previewImage({
                urls: [res],
            });
        },
        fail(e) {
            console.error(':::::', e);
        },
    });
}
function back() {
    signature.value?.back();
}

function clear() {
    signature.value?.clear();
}
</script>

<template>
    <page-layout title="签名">
        <view class="description">
            <view class="cmp-name">Signature 签名</view>
            <view class="cmp-desc">签名组件用于在页面上显示签名。</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <view class="signature-demo">
                <ste-signature ref="signature" type="jpg" />
            </view>
            <view class="button" @click="back">回退</view>
            <view class="button" @click="clear">清除</view>
            <view class="button" @click="save">保存并预览</view>
            <ste-button background="#f00" @click="output('right')">输出旋转90°</ste-button>
            <ste-button background="#f00" @click="output('down')">输出旋转180°</ste-button>
            <ste-button background="#f00" @click="output('left')">输出旋转270°</ste-button>
            <ste-button background="#f00" @click="output('up-mirrored')">输出镜像</ste-button>
            <ste-button background="#f00" @click="output('right-mirrored')">输出旋转90°镜像</ste-button>
            <ste-button background="#f00" @click="output('down-mirrored')">输出旋转180°镜像</ste-button>
            <ste-button background="#f00" @click="output('left-mirrored')">输出旋转270°镜像</ste-button>
        </view>
        <view class="demo-item">
            <view class="title">画笔颜色和线宽</view>
            <view class="signature-demo">
                <ste-signature stroke-color="red" :line-width="1" />
            </view>
        </view>
    </page-layout>
</template>

<style scoped lang="scss">
.demo-item {
    .signature-demo {
        width: 100%;
        height: 300rpx;
        background-color: #f5f5f5;
    }

    .button {
        display: inline-block;
        height: 64rpx;
        line-height: 64rpx;
        font-size: 30rpx;
        border-radius: 32rpx;
        background-color: red;
        color: #fff;
        padding: 0 20px;
        margin-top: 10px;
        &:active {
            background-color: #f55;
        }

        & + .button {
            margin-left: 8px;
        }
    }
}
</style>
