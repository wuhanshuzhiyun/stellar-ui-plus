<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import type { RefReadMore } from '@/uni_modules/stellar-ui-plus/types/refComponents';

const moreStr = ref(
    '浔阳江头夜送客，枫叶荻花秋瑟瑟。主人下马客在船，举酒欲饮无管弦。醉不成欢惨将别，别时茫茫江浸月。 忽闻水上琵琶声，主人忘归客不发。寻声暗问弹者谁，琵琶声停欲语迟。移船相近邀相见，添酒回灯重开宴。千呼万唤始出来，犹抱琵琶半遮面。凝绝不通声暂歇。悄无言，唯见江心秋月白。 沉吟放拨插弦中，整顿衣裳起敛容。自言本是京城女，家在虾蟆陵下住。十三学得琵琶成，名属教坊第一部。曲罢曾教善才服，妆成每被秋娘妒。五陵年少争缠头，一曲红绡不知数。钿头银篦击节碎，血色罗裙翻酒污。今年欢笑复明年，秋月春风等闲度。弟走从军阿姨死，暮去朝来颜色故'
);
const moreStr2 = ref(
    '浔阳江头夜送客，枫叶荻花秋瑟瑟。主人下马客在船，举酒欲饮无管弦。醉不成欢惨将别，别时茫茫江浸月。 忽闻水上琵琶声,浔阳江头夜送客，枫叶荻花秋瑟瑟。主人下马客在船，举酒欲饮无管弦。醉不成欢惨将别，别时茫茫江浸月。 忽闻水上琵琶声'
);
const moreStr3 = ref('');

const readMoreRef = ref<RefReadMore>();

setTimeout(() => {
    moreStr3.value = moreStr.value;
    nextTick(() => {
        readMoreRef.value?.init();
    });
}, 1500);
</script>

<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="阅读更多"></page-nav>
        <view class="content">
            <view class="demo-item">
                <view class="title">基础使用</view>
                <view class="item-block">
                    <view class="more-block">
                        <view class="title">演示效果</view>
                        <ste-read-more>
                            <text>{{ moreStr }}</text>
                        </ste-read-more>
                    </view>
                    <view class="more-block">
                        <view class="title">间距和字号</view>
                        <ste-read-more>
                            <text style="font-size: 35rpx; letter-spacing: 6rpx">{{ moreStr }}</text>
                        </ste-read-more>
                    </view>
                    <view class="more-block">
                        <view class="title">演示效果</view>
                        <ste-read-more>{{ moreStr2 }}</ste-read-more>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">收起后展示按钮</view>
                <view class="item-block">
                    <view class="more-block">
                        <view class="title">演示效果</view>
                        <ste-read-more toggle>{{ moreStr }}</ste-read-more>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">提示文字</view>
                <view class="item-block">
                    <view class="more-block">
                        <view class="title">演示效果</view>
                        <ste-read-more toggle openText="收起吧" closeText="展开吧" color="#f1f" fontSize="32">
                            {{ moreStr }}
                        </ste-read-more>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">异步初始化</view>
                <view class="item-block">
                    <view class="more-block" v-if="moreStr3">
                        <ste-read-more ref="readMoreRef">{{ moreStr3 }}</ste-read-more>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.page {
    background-color: #f5f5f5;
    .content {
        padding: 0 20rpx;
        .demo-item {
            .item-block {
                // > view {
                // 	// margin: 0 36px 36px 0;
                // 	margin-bottom: 36rpx;
                // }

                .more-block {
                    background-color: #fff;
                    border-radius: 16rpx;
                    padding: 24rpx 24rpx 20rpx 24rpx;

                    color: #666666;

                    &:not(:last-child) {
                        margin-bottom: 80rpx;
                    }

                    .title {
                        font-size: 32rpx;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        margin-bottom: 16rpx;
                    }
                }
            }
        }
    }
}
</style>
