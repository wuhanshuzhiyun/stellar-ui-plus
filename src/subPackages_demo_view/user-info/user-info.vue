<script lang="ts" setup>
import { ref } from 'vue';
let list1 = ref([
    { title: '余额', value: '100' },
    { title: '订餐数', value: '10000' },
]);

let list2 = ref([
    { title: '数据1', value: '100' },
    { title: '数据2', value: '8' },
    { title: '数据3', value: '8' },
]);
let list3 = ref([{ title: '数据1', value: '100' }]);
</script>

<template>
    <page-layout title="用户信息" contentStyle="padding: 12rpx;background-color: #f5f5f5;">
        <view class="description">
            <view class="cmp-name">UserInfo 用户信息</view>
            <view class="cmp-desc">提供用户信息展示。</view>
        </view>
        <view class="demo-item">
            <view class="title">基础使用</view>
            <view class="item-block">
                <view>
                    <ste-user-info
                        avatar="https://image.whzb.com/chain/StellarUI/图片.jpg"
                        nickname="张三"
                        :list="list1"
                        codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png"
                        codeTitle="核销码"
                        codeTitleColor="#EC3E1A"
                    >
                        <template v-slot:desc>
                            <view class="desc">
                                <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                                <view class="title">中百食堂111225x</view>
                            </view>
                        </template>
                    </ste-user-info>
                </view>
            </view>
            <view class="item-block">
                <view>
                    <ste-user-info
                        avatar="https://image.whzb.com/chain/StellarUI/图片.jpg"
                        nickname="张三"
                        :list="[]"
                        codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png"
                        codeTitle="核销码"
                        codeTitleColor="#EC3E1A"
                    >
                        <template v-slot:desc>
                            <view class="desc">
                                <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                                <view class="title">中百食堂</view>
                            </view>
                        </template>
                    </ste-user-info>
                </view>
            </view>
            <view class="item-block">
                <view>
                    <ste-user-info
                        avatar="https://image.whzb.com/chain/StellarUI/图片.jpg"
                        nickname="张三"
                        :list="list3"
                        codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png"
                        codeTitle="核销码"
                        codeTitleColor="#EC3E1A"
                    >
                        <template v-slot:desc>
                            <view class="desc">
                                <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                                <view class="title">中百食堂</view>
                            </view>
                        </template>
                    </ste-user-info>
                </view>
            </view>
            <view class="item-block">
                <view>
                    <ste-user-info
                        avatar="https://image.whzb.com/chain/StellarUI/图片.jpg"
                        nickname="张三"
                        :list="list2"
                        codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png"
                        codeTitle="核销码"
                        codeTitleColor="#EC3E1A"
                    >
                        <template v-slot:desc>
                            <view class="desc">
                                <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                                <view class="title">中百食堂</view>
                            </view>
                        </template>
                    </ste-user-info>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">用户信息隐藏</view>
            <view class="item-block">
                <view>
                    <ste-user-info :showUserInfo="false" :list="list1" codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png" codeTitle="核销码" codeTitleColor="#EC3E1A"></ste-user-info>
                </view>
            </view>
            <view class="item-block">
                <view>
                    <ste-user-info :showUserInfo="false" :list="[]" codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png" codeTitle="核销码" codeTitleColor="#EC3E1A"></ste-user-info>
                </view>
            </view>
            <view class="item-block">
                <view>
                    <ste-user-info :showUserInfo="false" :list="list3" codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png" codeTitle="核销码" codeTitleColor="#EC3E1A"></ste-user-info>
                </view>
            </view>
            <view class="item-block">
                <view>
                    <ste-user-info :showUserInfo="false" :list="list2" codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png" codeTitle="核销码" codeTitleColor="#EC3E1A"></ste-user-info>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">核销码隐藏</view>
            <view class="item-block">
                <view>
                    <ste-user-info avatar="https://image.whzb.com/chain/StellarUI/图片.jpg" nickname="张三" :list="list1" :showCode="false">
                        <template v-slot:desc>
                            <view class="desc">
                                <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                                <view class="title">中百食堂</view>
                            </view>
                        </template>
                    </ste-user-info>
                </view>
            </view>
            <view class="item-block">
                <view>
                    <ste-user-info avatar="https://image.whzb.com/chain/StellarUI/图片.jpg" nickname="张三" :list="[]" :showCode="false">
                        <template v-slot:desc>
                            <view class="desc">
                                <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                                <view class="title">中百食堂</view>
                            </view>
                        </template>
                    </ste-user-info>
                </view>
            </view>
            <view class="item-block">
                <view>
                    <ste-user-info avatar="https://image.whzb.com/chain/StellarUI/图片.jpg" nickname="张三" :list="list3" :showCode="false">
                        <template v-slot:desc>
                            <view class="desc">
                                <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                                <view class="title">中百食堂</view>
                            </view>
                        </template>
                    </ste-user-info>
                </view>
            </view>
            <view class="item-block">
                <view>
                    <ste-user-info avatar="https://image.whzb.com/chain/StellarUI/图片.jpg" nickname="张三" :list="list2" :showCode="false">
                        <template v-slot:desc>
                            <view class="desc">
                                <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                                <view class="title">中百食堂</view>
                            </view>
                        </template>
                    </ste-user-info>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">用户信息和核销码隐藏</view>
            <view class="item-block">
                <view>
                    <ste-user-info :showCode="false" :showUserInfo="false" :list="list1"></ste-user-info>
                </view>
            </view>
            <view class="item-block">
                <view>
                    <ste-user-info :showCode="false" :showUserInfo="false" :list="[]"></ste-user-info>
                </view>
            </view>
            <view class="item-block">
                <view>
                    <ste-user-info :showCode="false" :showUserInfo="false" :list="list3"></ste-user-info>
                </view>
            </view>
            <view class="item-block">
                <view>
                    <ste-user-info :showCode="false" :showUserInfo="false" :list="list2"></ste-user-info>
                </view>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">未登录(带用户头像)</view>
            <view class="item-block">
                <ste-user-info
                    :loginStatus="0"
                    loginSrc="https://image.whzb.com/chain/StellarUI/头像/数智云巡店助手头像.png"
                    loginTitle="欢迎来到中百食堂~"
                    loginInfo="马上登录，在线即点"
                    loginBtnBg="#EC3E1A"
                >
                    <template v-slot:desc>
                        <view class="desc">
                            <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                            <view class="title">中百食堂</view>
                        </view>
                    </template>
                </ste-user-info>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">未登录(隐藏用户头像)</view>
            <view class="item-block">
                <ste-user-info
                    :loginStatus="0"
                    loginSrc="https://image.whzb.com/chain/StellarUI/头像/数智云巡店助手头像.png"
                    loginTitle="欢迎来到中百食堂~"
                    loginInfo="马上登录，在线即点"
                    loginBtnBg="#EC3E1A"
                    :showUserInfo="false"
                    :list="list2"
                    codeSrc="https://image.whzb.com/chain/StellarUI/image/code1.png"
                    codeTitle="核销码"
                    codeTitleColor="#EC3E1A"
                >
                    <template v-slot:desc>
                        <view class="desc">
                            <ste-icon code="&#xe670;" color="#EC3E1A" size="26"></ste-icon>
                            <view class="title">中百食堂</view>
                        </view>
                    </template>
                </ste-user-info>
            </view>
        </view>
    </page-layout>
</template>

<style lang="scss" scoped>
.page {
    .content {
        .description {
            padding: 0 30rpx;
        }

        .demo-item {
            .item-block {
                justify-content: center;

                > view {
                    margin: 0 0 36rpx 0;
                }
            }

            > .title {
                padding: 0 30rpx;
            }

            .desc {
                display: flex;
                align-items: center;
                .title {
                    font-size: 24rpx;
                    color: #ec3e1a;
                    margin: 4rpx;
                    margin-right: 14rpx;
                    white-space: nowrap; /* 禁止换行 */
                    overflow: hidden; /* 隐藏溢出内容 */
                    text-overflow: ellipsis; /* 溢出时显示省略号 */
                    width: 120rpx;
                }
            }
        }
    }
}
</style>
