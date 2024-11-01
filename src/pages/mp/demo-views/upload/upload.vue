<script setup lang="ts">
import { ref, watch } from 'vue';
import type { UploadFileType } from '../../../../uni_modules/stellar-ui-plus/types';
import { useToast } from '@/uni_modules/stellar-ui-plus/composables';
let toast = useToast();
const fileList = ref<UploadFileType[]>([]);
const fileList1 = ref<UploadFileType[]>([]);
const fileList2 = ref<UploadFileType[]>([{ url: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' }]);
const fileList3 = ref<UploadFileType[]>([]);
const fileList4 = ref<UploadFileType[]>([]);
const fileList5 = ref<UploadFileType[]>([{ url: 'https://image.whzb.com/chain/StellarUI/bg1.jpg', type: 'image', size: 1234 }]);
const fileList6 = ref<UploadFileType[]>([]);
const fileList7 = ref<UploadFileType[]>([]);

const onChange = (v: UploadFileType[]) => {
    console.log(v);
    setTimeout(() => {
        v.forEach(item => {
            item.status = 'success';
        });
    }, 1000);
};

watch(() => fileList1.value, onChange);
watch(() => fileList2.value, onChange);
watch(() => fileList3.value, onChange);
watch(() => fileList4.value, onChange);
watch(() => fileList5.value, onChange);
watch(() => fileList6.value, onChange);
watch(() => fileList7.value, onChange);

const onRead = (list: UploadFileType[]) => {
    setTimeout(() => {
        list.forEach(item => {
            if (Math.random() > 0.5) {
                item.status = 'success';
            } else {
                item.status = 'error';
            }
        });
        fileList.value = [...fileList.value];
    }, 1000);
};

const beforeRead = (list: UploadFileType[], suspend: () => void, next: () => void, stop: () => void) => {
    suspend();
    uni.showModal({
        title: '提示',
        content: '正在读取文件？',
        success: res => {
            if (res.confirm) {
                next();
            } else {
                stop();
            }
        },
    });
};

const onSuccessRead = (list: UploadFileType[]) => {
    toast.showToast({ title: '读取成功，请自行处理上传逻辑', icon: 'none' });
};

const beforeDelete = (index: number, suspend: () => void, next: () => void, stop: () => void) => {
    suspend();
    uni.showModal({
        title: '提示',
        content: '确定删除文件？',
        success: res => {
            if (res.confirm) {
                next();
            } else {
                stop();
            }
        },
    });
};

const onSuccessDelete = (index: number, list: UploadFileType[]) => {
    toast.showToast({ title: '删除成功', icon: 'none' });
};

const openPreview = () => {
    console.log('openPreview');
};
const closePreview = () => {
    console.log('closePreview');
};
</script>
<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="上传"></page-nav>
        <view class="content">
            <view class="demo-item">
                <view class="title">基础用法</view>
                <ste-upload v-model="fileList" @read="onRead" />
            </view>

            <view class="demo-item">
                <view class="title">文件类型、多选</view>
                <ste-upload v-model="fileList1" accept="media" multiple />
            </view>
            <view class="demo-item">
                <view class="title">上传单张图片，隐藏删除按钮和全屏预览</view>
                <ste-upload v-model="fileList7" :maxCount="1" :deletable="false"></ste-upload>
            </view>
            <view class="demo-item">
                <view class="title">自定义上传图标，限制上传数量2</view>
                <ste-upload v-model="fileList2" uploadIcon="&#xe67e;" :maxCount="2" @open-preview="openPreview" @close-preview="closePreview" />
            </view>
            <view class="demo-item">
                <view class="title">限制文件大小2M</view>
                <ste-upload v-model="fileList3" :maxSize="2048" />
            </view>
            <view class="demo-item">
                <view class="title">自定义上传样式</view>
                <ste-upload v-model="fileList4">
                    <button type="primary" size="mini" style="padding: 0 10px">上传文件</button>
                </ste-upload>
            </view>
            <view class="demo-item">
                <view class="title">自定义预览图层</view>
                <ste-upload v-model="fileList5">
                    <template v-slot:preview-cover="{ item }">
                        <view class="item-preview">size:{{ item.size }}b</view>
                    </template>
                </ste-upload>
            </view>

            <view class="demo-item">
                <view class="title">读取文件前置处理</view>
                <ste-upload @beforeRead="beforeRead" @read="onSuccessRead"></ste-upload>
            </view>
            <view class="demo-item">
                <view class="title">删除前置处理</view>
                <ste-upload v-model="fileList6" @beforeDelete="beforeDelete" @delete="onSuccessDelete"></ste-upload>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.page {
    .item-rate {
        display: flex;
        flex-direction: column;

        text {
            font-size: 30rpx;
        }
    }

    .item-preview {
        position: absolute;
        z-index: 10;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
    }
}
</style>
