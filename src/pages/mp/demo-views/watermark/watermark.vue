<script lang="ts" setup>
import { reactive, ref } from 'vue';

const font = ref({
    color: 'rgba(0, 0, 0, .15)',
});

const config = ref({
    content: 'ste-watermark',
    font: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.15)',
    },
    zIndex: -1,
    rotate: -22,
    gap: [100, 100] as [number, number],
    offset: [] as unknown as [number, number],
});

const handelChange = (key: any, val: any, i?: any) => {
    config.value = {
        ...config.value,
        [key]: val,
    };
};
</script>

<template>
    <page-layout title="水印">
        <view class="description">
            <view class="cmp-name">Watermark 水印</view>
            <view class="cmp-desc">当需要对文本、图片或页面等进行版权说明、所属权标识或防盗用时使用。</view>
        </view>
        <view class="demo-item">
            <view class="title">基础使用</view>
            <view class="item-block">
                <ste-watermark :font="font">
                    <div style="height: 150px; width: 400px" />
                </ste-watermark>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">多行水印</view>
            <view class="item-block">
                <ste-watermark :font="font" :content="['watermark+', 'ste-watermark']">
                    <div style="height: 150px; width: 400px" />
                </ste-watermark>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">图片水印</view>
            <view class="item-block">
                <ste-watermark :width="130" :height="30" image="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*lkAoRbywo0oAAAAAAAAAAAAADrJ8AQ/original">
                    <div style="height: 150px; width: 400px" />
                </ste-watermark>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">自定义配置</view>
            <view class="item-block">
                <ste-watermark class="watermark" :content="config.content" :font="config.font" :z-index="config.zIndex" :rotate="config.rotate" :gap="config.gap" :offset="config.offset">
                    <div class="demo" style="height: 200px; width: 400px">
                        <img src="https://image.whzb.com/chain/StellarUI/组件图标/watermark.png" alt="示例图片" />
                    </div>
                </ste-watermark>
                <view class="setting-items">
                    <div class="label">内容：</div>
                    <ste-input :value="config.content" border borderColor="#8f9ca2" @input="val => handelChange('content', val)" />
                </view>
                <view class="setting-items">
                    <div class="label">颜色：</div>
                    <ste-input
                        :value="config.font.color"
                        border
                        borderColor="#8f9ca2"
                        @input="
                            val => {
                                config = {
                                    ...config,
                                    font: {
                                        ...config.font,
                                        color: val,
                                    },
                                };
                            }
                        "
                    />
                </view>
                <view class="setting-items">
                    <div class="label">字体大小：</div>
                    <ste-input
                        :value="config.font.fontSize"
                        border
                        borderColor="#8f9ca2"
                        type="number"
                        @input="
                            val => {
                                config = {
                                    ...config,
                                    font: {
                                        ...config.font,
                                        fontSize: val,
                                    },
                                };
                            }
                        "
                    />
                </view>
                <view class="setting-items">
                    <div class="label">水印层级：</div>
                    <ste-input :value="config.zIndex" border borderColor="#8f9ca2" type="number" @input="val => handelChange('zIndex', val)" />
                </view>
                <view class="setting-items">
                    <div class="label">旋转角度：</div>
                    <ste-input :value="config.rotate" border borderColor="#8f9ca2" type="number" @input="val => handelChange('rotate', val)" />
                </view>
                <view class="setting-items">
                    <div class="label">间隙：</div>
                    <ste-input
                        :value="config.gap[0]"
                        border
                        borderColor="#8f9ca2"
                        rootClass="root-my-input"
                        type="number"
                        @input="
                            val => {
                                config = {
                                    ...config,
                                    gap: [val, config.gap[1]],
                                };
                            }
                        "
                    />
                    <ste-input
                        :value="config.gap[1]"
                        border
                        borderColor="#8f9ca2"
                        type="number"
                        @input="
                            val => {
                                config = {
                                    ...config,
                                    gap: [config.gap[0], val],
                                };
                            }
                        "
                    />
                </view>
                <view class="setting-items">
                    <div class="label">偏移：</div>
                    <ste-input
                        :value="config.offset[0]"
                        border
                        borderColor="#8f9ca2"
                        rootClass="root-my-input"
                        type="number"
                        @input="
                            val => {
                                config = {
                                    ...config,
                                    offset: [val, config.offset[1]],
                                };
                            }
                        "
                    />
                    <ste-input
                        :value="config.offset[1]"
                        border
                        borderColor="#8f9ca2"
                        type="number"
                        @input="
                            val => {
                                config = {
                                    ...config,
                                    offset: [config.offset[0], val],
                                };
                            }
                        "
                    />
                </view>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.setting-items {
    display: flex;
    margin-top: 10px;
    .label {
        width: 80px;
        display: flex;
        align-content: center !important;
        color: #8f9ca2;
        font-size: 14px;
    }
    .root-my-input {
        margin-right: 10px;
    }
}
</style>
