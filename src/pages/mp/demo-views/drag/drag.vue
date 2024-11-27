<script setup lang="ts">
import { ref, onMounted } from 'vue';
import utils from '@/common/utils';
const instance = getCurrentInstance() as unknown as ComponentPublicInstance;
const boundary = ref({ left: 22, bottom: 0, top: 374, right: 0 });
onMounted(() => {
    const query = uni.createSelectorQuery().in(instance);
    query
        .select('.boundary-box')
        .boundingClientRect(data => {
            let nodeInfo: UniApp.NodeInfo;
            if (Array.isArray(data)) {
                nodeInfo = data[0]; // 假设你只关心第一个节点
            } else {
                nodeInfo = data;
            }
            if (nodeInfo) {
                const tempBoundary = { left: nodeInfo.left || 0, bottom: 0, top: nodeInfo.top || 0, right: 0 };
                const systemInfo = utils.getWindowInfo();
                tempBoundary.right = systemInfo.windowWidth - (nodeInfo.left || 0) - (nodeInfo.width || 0);
                tempBoundary.bottom = systemInfo.windowHeight - (nodeInfo.top || 0) - (nodeInfo.height || 0);
                // this.boundary = boundary;
                boundary.value = tempBoundary;
            }
        })
        .exec();
    // const systemInfo = utils.getWindowInfo();
    // boundary.value.right = systemInfo.windowWidth - 22 - 300;
    // boundary.value.bottom = systemInfo.windowHeight - 374 - 150;
});

function handleStart() {
    console.log('start');
}

function handleEnd() {
    console.log('end');
}
</script>

<template>
    <page-layout title="拖拽">
        <view class="description">
            <view class="cmp-name">Drag 拖拽</view>
            <view class="cmp-desc">用于拖拽的容器</view>
        </view>
        <view class="demo-item">
            <view class="title">自由拖拽</view>
            <view class="item-block">
                <view>
                    <ste-drag @start="handleStart" @end="handleEnd">
                        <ste-button>拖拽按钮</ste-button>
                    </ste-drag>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">固定方向</view>
            <view class="item-block">
                <view>
                    <ste-drag direction="x">
                        <ste-button>横向固定</ste-button>
                    </ste-drag>
                </view>
                <view>
                    <ste-drag direction="y">
                        <ste-button>竖向固定</ste-button>
                    </ste-drag>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">贴边</view>
            <view class="item-block">
                <view>
                    <ste-drag attract @start="handleStart" @end="handleEnd">
                        <ste-button>贴边</ste-button>
                    </ste-drag>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">边界</view>
            <view class="item-block">
                <view class="boundary-box">
                    <ste-drag :boundary="boundary">
                        <ste-button>边界</ste-button>
                    </ste-drag>
                </view>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.demo-item {
    .item-block {
        > view {
            margin: 0 8px 8px 0;
        }

        .boundary-box {
            width: 300px;
            height: 150px;
            border: solid 1px red;
        }
    }
}
</style>
