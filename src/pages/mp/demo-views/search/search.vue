<script setup lang="ts">
import { ref } from 'vue';
import { useToast } from '@/uni_modules/stellar-plus/composables';
let toast = useToast();
const value = ref('RTX4060Ti');
const hotWords = ref(['RTX4060', 'RTX4070', 'RTX4080']);
const focus = ref(false);

const onInput = (v: string) => {
    toast.showToast({
        title: 'onInput' + v,
        icon: 'none',
    });
};
const onSearch = (v: string) => {
    toast.showToast({
        title: 'onSearch' + v,
        icon: 'none',
    });
};

const onClick = (v: string) => {
    toast.showToast({
        title: 'onClick' + v,
        icon: 'none',
    });
};
</script>

<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="搜索"></page-nav>
        <view class="content">
            <view class="demo-item">
                <view class="title">基础用法</view>
                <view class="item-block">
                    <ste-search @input="onInput" @search="onSearch" />
                </view>
                <view class="item-block">
                    <ste-search v-model="value" @search="onSearch" />
                </view>
                <view class="item-block">
                    <ste-search placeholder="搜索商品" @search="onSearch" />
                </view>
                <view class="item-block">
                    <ste-search disabled placeholder="禁用" />
                </view>
            </view>
            <view class="demo-item">
                <view class="title">热词列表</view>
                <view class="item-block">
                    <ste-search :hotWords="hotWords" @search="onSearch" />
                </view>
                <view class="item-block">
                    <ste-search :hotWords="hotWords" :interval="1000" @search="onSearch" />
                </view>
            </view>
            <view class="demo-item">
                <view class="title">自定义按钮文字</view>
                <view class="item-block">
                    <ste-search btnText="查询" @search="onSearch" />
                </view>
            </view>
            <view class="demo-item">
                <view class="title">隐藏分割线以及按钮</view>
                <view class="item-block">
                    <ste-search hiddenLine @search="onSearch" />
                </view>
                <view class="item-block">
                    <ste-search hiddenBtn @search="onSearch" />
                </view>
            </view>
            <view class="demo-item">
                <view class="title">隐藏输入框以及按钮</view>
                <view class="item-block" style="width: 60rpx">
                    <ste-search hiddenInput hiddenBtn @click="onClick" />
                </view>
            </view>
            <view class="demo-item">
                <view class="title">不显示清除图标</view>
                <view class="item-block">
                    <ste-search :clearable="false" @search="onSearch" />
                </view>
            </view>
            <view class="demo-item">
                <view class="title">颜色和背景</view>
                <view class="item-block">
                    <ste-search
                        placeholder="全部颜色"
                        hiddenLine
                        borderColor="#F00"
                        background="#000"
                        prefixIconColor="#a55"
                        placeholderColor="#a55"
                        inputTextColor="#fff"
                        clearIconColor="#a55"
                        btnBackground="#fff"
                        btnTextColor="#000"
                        @search="onSearch"
                    />
                </view>
                <view class="item-block">
                    <ste-search hiddenLine placeholder="边框颜色" borderColor="#F00" @search="onSearch" />
                </view>
                <view class="item-block">
                    <ste-search
                        placeholder="背景渐变和按钮背景渐变"
                        hiddenLine
                        borderColor="#F00"
                        background="linear-gradient(to right, #aaaaaa, #aaa000)"
                        prefixIconColor="#fff"
                        placeholderColor="#fff"
                        inputTextColor="#fff"
                        clearIconColor="#a55"
                        btnBackground="linear-gradient(to right, #0AAAAA, #000FFF)"
                        btnTextColor="#fff"
                        @search="onSearch"
                    />
                </view>
                <view class="item-block">
                    <ste-search
                        placeholder="背景图片和按钮背景图片"
                        hiddenLine
                        borderColor="#F00"
                        background="https://image.whzb.com/chain/StellarUI/背景1.png"
                        prefixIconColor="#f00"
                        placeholderColor="#faa"
                        inputTextColor="#f00"
                        clearIconColor="#a55"
                        btnBackground="https://image.whzb.com/chain/StellarUI/背景2.png"
                        btnTextColor="#f00"
                        @search="onSearch"
                    />
                </view>
            </view>
            <view class="demo-item">
                <view class="title">自定义高度以及圆角弧度</view>
                <view class="item-block">
                    <ste-search :height="120" :radius="60" @search="onSearch" />
                </view>
            </view>
            <view class="demo-item">
                <view class="title">导航模式</view>
                <view class="item-block">
                    <ste-search type="nav" @click="onClick" :hotWords="hotWords" />
                </view>
            </view>
            <view class="demo-item">
                <view class="title">聚焦</view>
                <view class="item-block">
                    <ste-search @click="onClick" v-model:focus="focus" />
                    <view style="margin: 10px auto 0 auto">
                        <ste-button @click="focus = true" width="100%">聚焦</ste-button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style scoped lang="scss">
.page {
    .content {
        .demo-item {
            .item-block {
                display: block;
                margin-bottom: 12rpx;

                & > .ste-search {
                    margin: 0 8px 8px 0;
                }
            }
        }
    }
}
</style>
