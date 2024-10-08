<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { getInfo } from '@/common/account';
import request from '@/common/request';
import utils from '@/uni_modules/stellar-plus/utils/utils';
import { type MarkdownData } from '../types.d';

const datas = inject<MarkdownData>('datas');
const dayjs = utils.dayjs;

const commentList = ref<any[]>([]);

const commentParams = reactive({
    root_id: 0,
    parent_id: 0,
    title: '',
    content: '',
    versions: 3,
});

const userInfo = ref<any>(null);

const isAjax = ref(false);

const backComment = ref<any>(null);

const toLogin = () => {
    uni.navigateTo({
        url: `/pages/pc/login?back=${datas?.active.value}`,
    });
};

const getComment = (document_name: string) => {
    request('/comments/list', { document_name, versions: commentParams.versions }).then(data => {
        commentList.value = data.map((item: any) => {
            if (item.children) {
                item.children = item.children
                    .map((m: any) => {
                        return Object.assign(m, { time: dayjs(m.created_at).format('YYYY-MM-DD HH:mm:ss') });
                    })
                    .sort((a: any, b: any) => a.id - b.id);
            }
            return Object.assign(item, { time: dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss') });
        });
    });
};

onMounted(async () => {
    userInfo.value = await getInfo(true);
    const activeName = datas?.active.value || '';
    getComment(activeName);
});

const setComment = () => {
    const activeName = datas?.active.value || '';
    if (!commentParams.title) {
        uni.showToast({ title: '请输入标题', icon: 'none' });
        return;
    }
    if (!commentParams.content) {
        uni.showToast({ title: '请输入反馈意见', icon: 'none' });
        return;
    }
    if (isAjax.value) return;
    isAjax.value = true;
    const form = { ...commentParams };
    const _backComment = backComment.value;
    if (_backComment) {
        form.root_id = _backComment.root_id ? _backComment.root_id : _backComment.id;
        form.parent_id = _backComment.id;
    }
    request('/comments/append', Object.assign(form, { document_name: activeName }), 'POST')
        .then(() => {
            isAjax.value = false;
            uni.showToast({
                title: '评论成功',
                icon: 'none',
            });
            getComment(activeName);
            commentParams.title = '';
            commentParams.content = '';
            backComment.value = null;
        })
        .catch(() => {
            isAjax.value = false;
        });
};
</script>
<template>
    <view class="comment-body">
        <view class="comment-title">意见反馈</view>
        <block v-if="userInfo">
            <view class="back-commit" v-if="backComment">
                <view class="back-commit-text">
                    回复
                    <text>{{ backComment.Account.nickname }}：{{ backComment.title }}</text>
                </view>
                <text class="close-back" @click="backComment = null">×</text>
            </view>
            <input class="user-input" placeholder="标题" v-model="commentParams.title" :maxlength="20" />

            <textarea class="comment-input" v-model="commentParams.content" rows="10" placeholder="反馈意见" :maxlength="240" />
            <view class="button-box">
                <view>
                    <text class="user-name">{{ userInfo.nickname }}</text>
                </view>
                <div>
                    <button type="primary" style="width: 120px; height: 32px; line-height: 32px" :loading="isAjax" @click="setComment">提交</button>
                </div>
            </view>
        </block>
        <view class="not-login" v-else>
            <view class="to-login">
                <text class="btn" @click="toLogin">登录</text>
                后可提交意见
            </view>
        </view>
        <view class="comment-list" v-if="commentList.length">
            <view class="comment-item" v-for="item in commentList" :key="item.id">
                <view class="item-title">
                    <text>{{ item.title }}</text>
                    <text class="item-back" @click="backComment = item">回复</text>
                </view>
                <view class="item-user">
                    <image class="avatar" :src="item.Account.avatar_url" mode="widthFix" />
                    <text class="nickname">{{ item.Account.nickname }}</text>
                    <text class="time-text">{{ item.time }}</text>
                </view>

                <view class="item-content">
                    {{ item.content }}
                </view>

                <view class="item-children">
                    <view class="comment-item" v-for="m in item.children" :key="m.id">
                        <view class="back-commit">
                            <view class="back-commit-text">
                                <text class="at-user">@{{ m.parent.Account.nickname }}</text>
                                ：{{ m.parent.title }}
                            </view>
                        </view>
                        <view class="item-title">
                            <text>{{ m.title }}</text>
                            <text class="item-back" @click="backComment = m">回复</text>
                        </view>
                        <view class="item-user">
                            <image class="avatar" :src="m.Account.avatar_url" mode="widthFix" />
                            <text class="nickname">{{ m.Account.nickname }}</text>
                            <text class="time-text">{{ m.time }}</text>
                        </view>

                        <view class="item-content">
                            {{ m.content }}
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.comment-body {
    padding: 12px var(--pc-padding);
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;

    .comment-title {
        font-size: 20px;
        font-weight: 600;
        border-left: 4px solid #0090ff;
        padding-left: 5px;
    }
    .not-login {
        height: 240px;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        .to-login {
            height: 60rpx;
            line-height: 60rpx;
            cursor: pointer;
            .btn {
                color: #0090ff;
            }
        }
    }
    .back-commit {
        margin-top: 20px;
        font-size: 12px;
        color: #999;
        display: flex;
        align-items: center;
        .back-commit-text {
            max-width: calc(100% - 20px);
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            text {
                margin-left: 10px;
            }
        }
        .close-back {
            font-size: 20px;
            width: 20px;
            color: #0090ff;
            cursor: pointer;
        }
    }
    .comment-input,
    .user-input {
        margin-top: 10px;
        border: 1px solid #ddd;
        padding: 5px;
        border-radius: 4px;
    }

    .user-input {
        height: 32px;
    }
    .comment-input {
        width: 100%;
    }
    .button-box {
        margin-top: 12px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user-name {
            color: #666;
        }
    }
    .comment-list {
        border: 1px solid #ddd;
        padding: 12px;
        margin-top: 12px;
        .comment-item {
            & + .comment-item {
                border-top: 1px solid #ddd;
                margin-top: 20px;
                padding-top: 20px;
            }
            .item-title {
                font-size: 18px;
                line-height: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .item-back {
                    font-size: 14px;
                    color: #0090ff;
                    cursor: pointer;
                }
            }

            .item-user {
                display: flex;
                align-items: center;
                margin-top: 5px;
                .avatar {
                    width: 24px;
                    height: 24px;
                    margin-right: 5px;
                }
                .nickname {
                    font-size: 14px;
                    padding-right: 6px;
                    color: #666;
                }
                .time-text {
                    margin-left: 10px;
                    font-size: 12px;
                    color: #aaa;
                }
            }
            .item-content {
                margin-top: 5px;
                font-size: 14px;
                color: #666;
            }

            .item-children {
                margin-top: 10px;
                padding-left: 30px;
                .comment-item {
                    padding-top: 10px;
                    border-top: 1px solid #ddd;

                    & + .comment-item {
                        margin-top: 10px;
                    }
                    .back-commit {
                        margin-top: 0px;
                        .at-user {
                            margin-left: 0;
                            color: #0090ff;
                        }
                    }
                    .item-title {
                        margin-top: 5px;
                        font-size: 16px;
                    }
                    .item-time {
                        .item-back {
                            font-size: 12px;
                        }
                    }
                    .item-head-user {
                        .avatar {
                            width: 20px;
                            height: 20px;
                        }
                        .head-user {
                            font-size: 12px;
                        }
                    }
                }
            }
        }
    }
}
</style>
