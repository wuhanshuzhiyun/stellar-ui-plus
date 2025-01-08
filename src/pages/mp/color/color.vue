<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="主题色"></page-nav>
        <view class="content">
            <ste-sticky>
                <view class="demo-item">
                    <view class="title">主题色</view>
                    <view class="item-block" style="display: flex; align-items: center; padding-bottom: 20px">
                        <span>{{ color }}：</span>
                        <view
                            class="color-box"
                            @click="selectColor"
                            :style="{
                                'background-color': color,
                                marginRight: '20rpx',
                            }"
                        ></view>
                        <ste-button @click="reset">还原主题色</ste-button>
                    </view>
                </view>
            </ste-sticky>
            <view class="demo-item">
                <view class="title">按钮</view>
                <view class="item-block">
                    <ste-button>按钮</ste-button>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">日历</view>
                <view class="item-block" style="display: block">
                    <ste-calendar height="720" :showTitle="false" @confirm="handleConfirm" ref="Calendar" />
                </view>
            </view>
            <view class="demo-item">
                <view class="title">复选框</view>
                <view class="item-block">
                    <ste-checkbox v-model="checkboxValue">复选框</ste-checkbox>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">时间选择器</view>
                <view class="item-block" style="display: block">
                    <ste-date-picker :value="datetime"></ste-date-picker>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">评分</view>
                <view class="item-block">
                    <ste-rate v-model="rateValue"></ste-rate>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">下拉</view>
                <view class="item-block">
                    <ste-select :list="list" v-model="selectValue"></ste-select>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">滑块</view>
                <view class="item-block">
                    <ste-slider value="30"></ste-slider>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">步进器</view>
                <view class="item-block">
                    <ste-stepper v-model="value1"></ste-stepper>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">开关</view>
                <view class="item-block">
                    <ste-switch v-model="value2"></ste-switch>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">弹框</view>
                <view class="item-block">
                    <ste-button @click="msgBox">打开弹框</ste-button>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">数字键盘</view>
                <view class="item-block" style="display: block">
                    <ste-number-keyboard mode="page" v-model="value3" />
                </view>
            </view>
            <view class="demo-item">
                <view class="title">步骤条</view>
                <view class="item-block">
                    <ste-steps :active="active">
                        <ste-step></ste-step>
                        <ste-step></ste-step>
                        <ste-step></ste-step>
                    </ste-steps>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">表格</view>
                <view class="item-block">
                    <ste-table :data="rows">
                        <template v-slot="{ row }">
                            <ste-table-column label="姓名" prop="name"></ste-table-column>
                            <ste-table-column label="生日" prop="birth"></ste-table-column>
                            <ste-table-column label="性别" prop="sex"></ste-table-column>
                        </template>
                    </ste-table>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">下拉菜单</view>
                <view class="item-block">
                    <view class="menu-item">
                        <view>
                            <ste-dropdown-menu v-model="menu1" direction="up">
                                <ste-dropdown-menu-item value="1" title="全部商品" />
                                <ste-dropdown-menu-item value="2" title="新款商品" />
                                <ste-dropdown-menu-item value="3" title="活动商品" />
                            </ste-dropdown-menu>
                        </view>
                        <view>
                            <ste-dropdown-menu title="选择项" direction="up" type="round" :max="2">
                                <ste-dropdown-menu-item value="1" title="选项1" />
                                <ste-dropdown-menu-item value="2" title="选项2" />
                                <ste-dropdown-menu-item value="3" title="选项3" />
                                <ste-dropdown-menu-item value="4" title="选项4" />
                                <ste-dropdown-menu-item value="5" title="选项5" />
                                <ste-dropdown-menu-item value="6" title="选项6" />
                                <ste-dropdown-menu-item value="7" title="选项7" />
                            </ste-dropdown-menu>
                        </view>
                    </view>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">索引列表</view>
                <view class="item-block">
                    <ste-index-list :sticky="false">
                        <ste-index-item v-for="(item, index) in data" :key="index" :title="item.title" :list="item.list" />
                    </ste-index-list>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">标签页</view>
                <view class="item-block">
                    <ste-tabs>
                        <ste-tab v-for="(item, index) in list1" :key="index" :title="item.title" :index="index">
                            <view>{{ item.title }}内容</view>
                            <image style="width: 100%; height: 300px" :src="item.content" />
                        </ste-tab>
                    </ste-tabs>
                </view>
            </view>
            <view class="demo-item">
                <view class="title">进度条</view>
                <view class="item-block">
                    <ste-progress :percentage="40"></ste-progress>
                </view>
            </view>
        </view>
        <t-color-picker ref="colorPicker" :color="defaultColor" @confirm="confirm"></t-color-picker>
    </view>
</template>

<script>
import useColor from '../../../uni_modules/stellar-ui-plus/config/color';
let color = useColor();
import utils from '../../../uni_modules/stellar-ui-plus/utils/utils';
export default {
    data() {
        return {
            color: '',
            defaultColor: { r: 255, g: 0, b: 0, a: 0.6 },
            checkboxValue: true,
            datetime: '',
            radioValue: 'a',
            rateValue: 1,
            selectValue: 2011,
            list: [
                { label: '选项2011', value: 2011 },
                { label: '选项2012', value: 2012 },
                { label: '选项2013', value: 2013 },
                { label: '选项2014', value: 2014 },
                { label: '选项2015', value: 2015 },
                { label: '选项2016', value: 2016 },
                { label: '选项2017', value: 2017 },
                { label: '选项2018', value: 2018 },
                { label: '选项2019', value: 2019 },
            ],
            value1: 10,
            value2: true,
            value3: '',
            active: 0,
            rows: [
                { name: '张三', birth: '2023.12.31', sex: '男' },
                { name: '李四', birth: '2024.01.01', sex: '女' },
                { name: '王五', birth: '2024.11.01', sex: '女' },
                { name: '赵六', birth: '2024.11.01', sex: '女' },
                { name: '王七', birth: '2024.01.01', sex: '男' },
            ],
            menu1: 1,
            data: [
                {
                    title: 'A',
                    list: ['列表A1', '列表A2', '列表A3', '列表A4', '列表A5', '列表A6', '列表A7', '列表A8'],
                },
            ],
            list1: [
                {
                    title: '标签1',
                    image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
                    content: 'https://image.whzb.com/chain/StellarUI/image/img1.jpg',
                },
                {
                    title: '标签2',
                    image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
                    content: 'https://image.whzb.com/chain/StellarUI/image/img2.jfif',
                },
                {
                    title: '标签3标签3标签3标签3',
                    image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
                    content: 'https://image.whzb.com/chain/StellarUI/image/img3.jpg',
                },
                {
                    title: '标签4',
                    image: `https://image.whzb.com/chain/StellarUI/图片.jpg`,
                    content: 'https://image.whzb.com/chain/StellarUI/image/img4.jpg',
                },
            ],
        };
    },
    methods: {
        headleChangeColor() {
            color.setColor({ steThemeColor: this.color });
        },
        reset() {
            this.color = color.$state.defaultColor;
            color.setColor({ steThemeColor: this.color });
        },
        msgBox() {
            this.showMsgBox({
                title: '提示',
                icon: 'info',
            });
        },
        selectColor() {
            this.$refs.colorPicker.open();
        },
        confirm(e) {
            this.color = e.hex;
            color.setColor({ steThemeColor: this.color });
        },
    },
    mounted() {
        this.color = color.getColor().steThemeColor;
        let colormd = utils.Color.hex2rgba(color.$state.defaultColor);
        colormd = colormd.replace('rgba(', '').replace(')', '').split(',');
        colormd = { r: colormd[0], g: colormd[1], b: colormd[2], a: colormd[3] };
        this.defaultColor = colormd;
    },
};
</script>

<style lang="scss" scoped>
.page {
    .content {
        .demo-item {
            .item-block {
                > view {
                    margin: 0 16rpx 16rpx 0;
                }

                .menu-item {
                    display: flex;
                    padding: 0 40rpx;
                    width: 100%;
                    box-shadow: 0 0 10px #ddd;
                    > view {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .custom-menu-box {
                        background-color: #fff;
                        padding-top: 24rpx;
                        border-top: solid 4rpx #f5f5f5;
                        .menu-box {
                            width: 100%;
                            display: flex;
                            margin-bottom: 56rpx;
                            font-size: 28rpx;
                            .left {
                                width: 236rpx;
                                background-color: #f9f9f9;

                                > view {
                                    height: 90rpx;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;

                                    &.active {
                                        background-color: #fff;
                                        color: #0090ff;
                                    }
                                }
                            }

                            .right {
                                flex: 1;
                                margin-left: 26rpx;
                                margin-right: 18rpx;
                                background-color: #fff;
                                > view {
                                    height: 90rpx;
                                    display: flex;
                                    align-items: center;

                                    &:not(:last-child) {
                                        border-bottom: 2rpx solid #f9f9f9;
                                    }

                                    &.active {
                                        color: #0090ff;
                                        font-weight: bold;
                                    }
                                }
                            }
                        }

                        .action-box {
                            padding: 0 40rpx;
                            display: flex;
                            justify-content: space-between;

                            padding-bottom: 20rpx;
                        }
                    }
                }
            }
        }
    }

    .color-box {
        width: 40rpx;
        height: 40rpx;
        margin-bottom: 0 !important;
    }
}
</style>
