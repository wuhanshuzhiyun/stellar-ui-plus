<script setup lang="ts">
import { ref } from 'vue';

const text1 = ref('是你   是你');
const text2 = ref('是你   是你');
const text3 = ref('是你   是你');
</script>

<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="文本"></page-nav>
        <view class="content">
            <view class="demo-item">
                <view class="title">可选</view>
                <view class="item-block">
                    <view>
                        <ste-text selectable>Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水</ste-text>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">空格</view>
                <view class="item-block">
                    <view style="width: 30%" space="ensp">
                        <ste-text>{{ text1 }}</ste-text>
                    </view>
                    <view style="width: 30%" space="emsp">
                        <ste-text>{{ text2 }}</ste-text>
                    </view>
                    <view style="width: 30%" space="nbsp">
                        <ste-text>{{ text3 }}</ste-text>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">解码</view>
                <view class="item-block">
                    <view>
                        <ste-text decode>Stellar&nbsp;UI</ste-text>
                    </view>
                    <view>
                        <!-- <ste-text decode>Stellar&lt;UI</ste-text> -->
                    </view>
                    <view>
                        <!-- <ste-text decode>Stellar&gt;UI</ste-text> -->
                    </view>
                    <view>
                        <ste-text decode>Stellar&amp;UI</ste-text>
                    </view>
                    <view>
                        <ste-text decode>Stellar&apos;UI</ste-text>
                    </view>
                    <view>
                        <ste-text decode>Stellar&ensp;UI</ste-text>
                    </view>
                    <view>
                        <ste-text decode>Stellar&emsp;UI</ste-text>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">换行省略</view>
                <view class="item-block">
                    <view style="width: 30%">
                        <ste-text>Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。</ste-text>
                    </view>
                    <view style="width: 30%">
                        <ste-text :lines="2">Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。</ste-text>
                    </view>
                    <view style="width: 30%">
                        <ste-text :lines="3">Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。</ste-text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.page {
    .content {
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
