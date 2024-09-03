<script setup lang="ts">
import { ref } from 'vue';
const show = ref(false);
const steps = ref([{ message: '点这里', target: 'button' }]);
const show2 = ref(false);
const steps2 = ref([{ message: '点这里', target: 'button-2' }]);
const show3 = ref(false);
const steps3 = ref([
    { title: '步骤1', message: '先点这里', target: 'step-1' },
    { title: '步骤2', message: '再点这里', target: 'step-2' },
    { title: '步骤3', message: '然后点这里', target: 'step-3' },
]);
const show4 = ref(false);
const steps4 = ref([{ message: '点这里', target: 'button-4' }]);
const show5 = ref(false);
const steps5 = ref([{ message: '点这里', target: 'button-5' }]);
</script>
<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="指引"></page-nav>
        <view class="content">
            <view class="demo-item">
                <view class="title">基础用法</view>
                <view id="button" class="button-box">
                    <ste-button @click="show = true">基础指引</ste-button>
                </view>

                <ste-tour v-model:show="show" :steps="steps"></ste-tour>
            </view>
            <view class="demo-item">
                <view class="title">位置偏移和插槽</view>
                <view id="button-2" class="button-box">
                    <ste-button @click="show2 = true">描述位置偏移</ste-button>
                </view>
                <ste-tour v-model:show="show2" :steps="steps2" :offset="[20, 10]"></ste-tour>
                <br />
                <view
                    id="button-5"
                    style="border: 1px solid #ddd; width: 120rpx; height: 120rpx; line-height: 120rpx; border-radius: 60rpx; text-align: center; margin-left: 60rpx"
                    @click="show5 = true"
                >
                    插槽
                </view>
                <ste-tour v-model:show="show5" :steps="steps5" :offset="[-20, -30]" messageBg="transparent" radius="60">
                    <image src="https://image.whzb.com/chain/StellarUI/component-icons/tour.png" mode="widthFix" style="width: 630rpx"></image>
                </ste-tour>
            </view>
            <view class="demo-item">
                <view class="title">多步骤，显示标题栏</view>
                <ste-button @click="show3 = true">多步骤带标题</ste-button>
                <view style="display: inline-block; padding: 6rpx 20rpx">
                    <view id="step-1" class="button-box">步骤1</view>
                    <view id="step-2" class="button-box">步骤2</view>
                    <view id="step-3" class="button-box">步骤3</view>
                </view>
                <ste-tour showTitleBar v-model:show="show3" :steps="steps3"></ste-tour>
            </view>
            <view class="demo-item">
                <view class="title">不显示背景蒙层</view>
                <view id="button-4" class="button-box">
                    <ste-button @click="show4 = true">不显示背景蒙层</ste-button>
                </view>
                <ste-tour v-model:show="show4" :steps="steps4" :mask="false"></ste-tour>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.page {
    .content {
        .demo-item {
            .button-box {
                display: inline-block;
                padding: 20rpx;
            }
        }
    }
}
</style>
