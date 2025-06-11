<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useToast } from '@/uni_modules/stellar-ui-plus/composables';
let toast = useToast();
const iconUrl = ref('https://at.alicdn.com/t/c/font_4457057_yv7ztjy747.json?spm=a313x.manage_type_myprojects.i1.13.539c3a81Bn8IBV&file=font_4457057_yv7ztjy747.json');
const glyphs = ref<Array<any>>([]);
const tabIndex = ref(0);
const isShowUnicode = ref(false);

interface Glyph {
    font_class: string;
    font_family: string;
    font_size: number;
    font_weight: string;
    name: string;
    unicode: string;
    unicode_decimal: number;
}

// 使用异步函数获取数据
const fetchGlyphs = async () => {
    try {
        const res = (await uni.request({
            url: iconUrl.value,
        })) as any;
        if (res.data.glyphs) {
            glyphs.value = res.data.glyphs.map((item: Glyph) => {
                return {
                    ...item,
                    unicode: '&#x' + item.unicode + ';',
                };
            });
        } else {
            console.error('Failed to fetch glyphs:', res);
        }
    } catch (error) {
        console.error('Request error:', error);
    }
};

// 在组件挂载后获取数据
onMounted(() => {
    fetchGlyphs();
});

function nav() {
    uni.navigateTo({
        url: '/subPackages_demo_view/icon-vertical-align/icon-vertical-align',
    });
}

function copy(data: string) {
    uni.setClipboardData({
        data,
        showToast: false,
        success: function () {
            toast.showToast({
                icon: 'none',
                title: `code：${data} 已复制到剪切板`,
            });
        },
    });
}
</script>

<template>
    <page-layout title="图标">
        <view class="description">
            <view class="cmp-name">Icon 图标</view>
            <view class="cmp-desc">基于字体的图标集，包含了大多数常见场景的图标。</view>
        </view>
        <view class="tabs">
            <view class="tab1-title" :class="{ actived: tabIndex === 0 }" @click="tabIndex = 0">用法示例</view>
            <view class="tab2-title" :class="{ actived: tabIndex === 1 }" @click="tabIndex = 1">图标库</view>
            <view class="tab3-title" @click="nav">图标对齐预览</view>
        </view>
        <view v-if="tabIndex === 0" class="tab1-content">
            <view class="demo-item">
                <view class="title">基础用法</view>
                <view class="item-block" style="justify-content: flex-start">
                    <ste-icon code="&#xe689;" size="60"></ste-icon>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">图标颜色</view>
                <view class="item-block" style="justify-content: flex-start">
                    <ste-icon code="&#xe684;" color="#1989fa" size="60" marginRight="30"></ste-icon>
                    <ste-icon code="&#xe684;" color="#ee0a24" size="60"></ste-icon>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">图标大小</view>
                <view class="item-block" style="justify-content: flex-start">
                    <ste-icon code="&#xe671;" marginRight="30"></ste-icon>
                    <ste-icon code="&#xe671;" marginRight="30" size="50"></ste-icon>
                    <ste-icon code="&#xe671;" marginRight="30" size="70"></ste-icon>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">图标是否加粗</view>
                <view class="item-block" style="justify-content: flex-start">
                    <ste-icon code="&#xe673;" marginRight="30"></ste-icon>
                    <ste-icon code="&#xe673;" bold></ste-icon>
                </view>
            </view>
        </view>
        <view v-if="tabIndex === 1" class="tab2-content">
            <view class="demo-item">
                <view class="item-block">
                    <view class="icon-condition">
                        <ste-icon code="&#xe68a;" :size="48" v-if="isShowUnicode" :marginLeft="40" :marginBottom="8" @click="isShowUnicode = false"></ste-icon>
                        <ste-icon code="&#xe691;" :size="48" v-if="!isShowUnicode" :marginLeft="40" :marginBottom="8" @click="isShowUnicode = true"></ste-icon>
                        &nbsp;&nbsp;&nbsp;{{ isShowUnicode ? '隐藏unicode' : '展示unicode' }}（点击对应icon可复制其code）
                    </view>
                    <view v-for="item in glyphs" class="icon-item" @click="copy(item.unicode)">
                        <view class="icon-content">
                            <ste-icon :code="item.unicode" :size="40"></ste-icon>
                        </view>
                        <view class="icon-name">{{ item.name }}</view>
                        <view class="icon-unicode" v-if="isShowUnicode">{{ item.unicode }}</view>
                        <view class="icon-class">{{ item.font_class }}</view>
                    </view>
                </view>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.demo-item {
    margin-bottom: 16px;

    .title {
        font-size: 14px;
        color: #8f9ca2;
        margin-bottom: 8px;
    }

    .item-block {
        display: flex;
        flex-wrap: wrap;
        row-gap: 60rpx;
        justify-content: center;
        align-items: center;
        .icon-condition {
            width: 100%;
            color: #6699ff;
        }
        .icon-item {
            width: 25%;

            .icon-content {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                align-items: center;
                padding-bottom: 20rpx;
            }

            .icon-name {
                text-align: center;
                overflow: hidden;
                height: 40rpx;
                line-height: 40rpx;
                font-size: 28rpx;
            }

            .icon-unicode {
                font-size: 26rpx;
                text-align: center;
                word-wrap: break-word;
                height: 40rpx;
                line-height: 40rpx;
                color: #f07c82;
            }
            .icon-class {
                font-size: 26rpx;
                text-align: center;
                word-wrap: break-word;
                height: 90rpx;
                line-height: 30rpx;
            }
        }
    }
}

.tabs {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    height: 70rpx;
    border-bottom: 1px solid #eee;
    margin-bottom: 20rpx;
    .tab1-title {
        width: 33.3%;
        text-align: center;
    }
    .tab2-title {
        width: 33.3%;
        text-align: center;
        font-size: 32rpx;
    }
    .tab3-title {
        width: 33.4%;
        text-align: center;
        font-size: 32rpx;
    }
    .actived {
        font-weight: bold;
    }
}
</style>
