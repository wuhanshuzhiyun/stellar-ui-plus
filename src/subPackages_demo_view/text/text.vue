<script setup lang="ts">
import { ref } from 'vue';

const text1 = ref('是你   是你');
const text2 = ref('是你   是你');
const text3 = ref('是你   是你');
</script>

<template>
    <page-layout title="文本">
        <view class="description">
            <view class="cmp-name">Text 文本</view>
            <view class="cmp-desc">显示文本文字的组件</view>
        </view>
        <view class="demo-item">
            <view class="title">可选</view>
            <view class="item-block">
                <view>
                    <ste-text selectable value="Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水">Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水</ste-text>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">空格</view>
            <view class="item-block">
                <view style="width: 30%" space="ensp">
                    <ste-text :value="text1">{{ text1 }}</ste-text>
                </view>
                <view style="width: 30%" space="emsp">
                    <ste-text :value="text2">{{ text2 }}</ste-text>
                </view>
                <view style="width: 30%" space="nbsp">
                    <ste-text :value="text3">{{ text3 }}</ste-text>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">解码</view>
            <view class="item-block">
                <view>
                    <ste-text decode value="Stellar&nbsp;UI">Stellar&nbsp;UI</ste-text>
                </view>
                <view>
                    <!-- <ste-text decode>Stellar&lt;UI</ste-text> -->
                </view>
                <view>
                    <!-- <ste-text decode>Stellar&gt;UI</ste-text> -->
                </view>
                <view>
                    <ste-text decode value="Stellar&amp;UI">Stellar&amp;UI</ste-text>
                </view>
                <view>
                    <ste-text decode value="Stellar'UI">Stellar&apos;UI</ste-text>
                </view>
                <view>
                    <ste-text decode value="Stellar&ensp;UI">Stellar&ensp;UI</ste-text>
                </view>
                <view>
                    <ste-text decode value="Stellar&emsp;UI">Stellar&emsp;UI</ste-text>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">换行省略</view>
            <view class="item-block">
                <view style="width: 30%">
                    <ste-text value="Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。">
                        Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。
                    </ste-text>
                </view>
                <view style="width: 30%">
                    <ste-text :lines="2" value="Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。">
                        Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。
                    </ste-text>
                </view>
                <view style="width: 30%">
                    <ste-text :lines="3" value="Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。">
                        Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。
                    </ste-text>
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
    }
}
</style>
