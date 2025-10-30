<script setup>
import { reactive, ref } from 'vue';
const formData = reactive({
    question: '',
    image: [],
    suggestion: '1',
    contact: '',
});

const suggestionList = reactive([
    { title: '提个建议', value: '1' },
    { title: '功能故障', value: '2' },
    { title: '其他问题', value: '3' },
]);

const handleSuggestionChange = e => {
    formData.suggestion = e.value;
};
</script>
<template>
    <view class="help-feedback-view">
        <ste-navbar title="提交反馈" :titleAlignment="2" backgroundColor="#fff"></ste-navbar>
        <view class="content">
            <view class="submit-item textarea">
                <view class="label">
                    问题描述
                    <text style="color: #fb4229">*</text>
                </view>
                <view class="item-value">
                    <ste-input class="input-textarea" v-model="formData.question" type="textarea" placeholder="请输入反馈或建议" fontSize="28" showWordLimit :maxlength="300" background="#F4F5F6" />
                </view>
            </view>

            <view class="submit-item upload-image">
                <view class="label">
                    图片说明
                    <text>0/4</text>
                </view>
                <view class="item-value">
                    <ste-upload v-model="formData.image" uploadIcon="&#xe67e;" :maxCount="4" />
                </view>
            </view>

            <view class="submit-item suggestion">
                <view class="label">反馈建议</view>
                <view class="item-value">
                    <view class="s-item" :class="[{ active: e.value === formData.suggestion }]" v-for="(e, i) in suggestionList" @click="handleSuggestionChange(e)">{{ e.title }}</view>
                </view>
            </view>

            <view class="submit-item contact">
                <view class="label">联系方式</view>
                <view class="item-value">
                    <ste-input v-model="formData.contact" placeholder="微信/QQ/电话" fontSize="28" background="#F4F5F6" />
                </view>
            </view>

            <view class="submit-btn">
                <ste-button width="100%" :round="false" :mode="300">提交反馈</ste-button>
            </view>
        </view>
    </view>
</template>
<style lang="scss" scoped>
.help-feedback-view {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    .content {
        flex: 1;
        padding: 0 28rpx;
        overflow-y: auto;

        .submit-item {
            .label {
                color: #888c92;
                font-size: 28rpx;
                margin-top: 24rpx;
                margin-bottom: 16rpx;
            }

            &.textarea {
                .item-value {
                    height: 300rpx;

                    :deep(.input-textarea) {
                        border-radius: 12rpx !important;
                    }
                }
            }

            &.upload-image {
                .item-value {
                    .upload-icon {
                        height: 142rpx;
                        width: 142rpx;
                        background-color: #f4f5f6;
                        border-radius: 12rpx;
                    }
                }
            }

            &.suggestion {
                .item-value {
                    display: flex;
                    flex-wrap: wrap;

                    .s-item {
                        background-color: #f4f5f6;
                        border-radius: 12rpx;
                        height: 76rpx;
                        width: calc(33.33% - 18.66rpx);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 28rpx;
                        color: #555a61;

                        &.active {
                            background-color: #1482ff;
                            color: #fff;
                        }
                    }

                    .s-item + .s-item {
                        margin-left: 28rpx;
                    }
                }
            }
        }

        .submit-btn {
            margin-top: 184rpx;
        }
    }
}
</style>
