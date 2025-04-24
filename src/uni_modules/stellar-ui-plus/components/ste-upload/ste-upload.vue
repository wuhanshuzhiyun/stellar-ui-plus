<script setup lang="ts">
import { computed, watch } from 'vue';
import type { UploadFileType, WxInputAccept } from '../../types';
import { readMediaFile, readFile } from './ReadFile';
import utils from '../../utils/utils';
import propsData from './props';
import useData from './useData';

defineOptions({
    name: 'ste-upload',
});

const emits = defineEmits<{
    (e: 'beforeRead', list: UploadFileType[], suspend: () => void, next: () => void, stop: () => void): void;
    (e: 'oversize', item: UploadFileType, list: UploadFileType[]): void;
    (e: 'update:modelValue', list: UploadFileType[]): void;
    (e: 'read', list: UploadFileType[]): void;
    (e: 'beforeDelete', index: number, suspend: () => void, next: () => void, stop: () => void): void;
    (e: 'delete', index: number, list: UploadFileType[]): void;
    (e: 'open-preview'): void;
    (e: 'close-preview'): void;
}>();

const props = defineProps(propsData);

const {
    dataValue,
    setDataValue,
    previewIndex,
    setPreviewIndex,
    reading,
    setReading,
    deleting,
    setDeleting,
    // #ifdef MP-ALIPAY
    mediaType,
    setMediaType,
    // #endif
} = useData();

const cmpRootStyle = computed(() => ({
    '--ste-upload-width': utils.formatPx(props.previewWidth),
    '--ste-upload-height': utils.formatPx(props.previewHeight),
    '--ste-upload-radius': utils.formatPx(props.radius),
    '--ste-upload-flex-wrap': utils.formatPx(props.flexWrap),
    '--ste-upload-item-margin': props.maxCount.toString() === '1' ? 0 : utils.formatPx(18),
}));

const cmpShowUpload = computed(() => (!props.disabled || !dataValue.value.length) && props.showUpload && (props.maxCount == 0 || dataValue.value.length < props.maxCount));

const cmpDeletable = computed(() => !props.disabled && props.deletable);

const cmpPreviewList = computed(() => dataValue.value.filter(item => ['video', 'image'].indexOf(item.type as string) !== -1).map(item => item.thumbPath || item.url || item.path || ''));

const cmpPreviewFullImage = computed(() => props.previewFullImage && (props.maxCount !== 1 || cmpDeletable.value));

watch(
    () => props.modelValue,
    val => {
        let list = [...val];
        if (props.maxCount > 0 && val.length > props.maxCount) {
            list = list.splice(props.maxCount);
        }
        const value = list.map(item => {
            if (!item?.type) {
                const url = item.thumbPath || item.url || item.path;
                const type = utils.getMediaFileType(url);
                item.type = type === -1 ? 'image' : type;
            }
            return { ...item };
        });
        setDataValue(value);
    },
    { immediate: true, deep: true }
);

watch(
    () => previewIndex.value,
    val => {
        if (val === null) {
            emits('close-preview');
        } else {
            emits('open-preview');
        }
    }
);

const toSelectFile = () => {
    if (props.maxCount !== 1 || cmpDeletable.value) return;
    selectFile(() => {
        deleteItem(0);
    });
};

const selectFile = (callback?: (list?: UploadFileType[]) => void) => {
    if (props.disabled) return;
    let accept = props.accept, // 文件类型, 可选值为all media image file video
        capture = props.capture, //  图片或者视频选取模式，当accept为image | media 类型时设置capture可选值为camera可以直接调起摄像头
        camera = props.camera, // 相机类型 当 accept 为 image | video | media 时生效，可选值为 back-后置 front-前置
        compressed = props.compressed, // 是否压缩
        maxDuration = props.maxDuration, // 录制时长
        multiple = props.multiple,
        maxCount = props.maxCount;
    let count = 1;
    if (multiple) {
        if (maxCount === 0) {
            count = 9;
        } else {
            count = maxCount - dataValue.value.length > 9 ? 9 : maxCount - dataValue.value.length;
        }
    }
    if (count === 0) return;
    // #ifdef MP-ALIPAY
    if (accept === 'media') {
        accept = mediaType.value;
    }
    // #endif
    if (['image', 'video', 'media'].indexOf(accept) >= 0) {
        readMediaFile({
            accept: accept as WxInputAccept,
            capture,
            camera,
            compressed,
            maxDuration,
            multiple,
            count,
        }).then(fileList => {
            if (typeof callback === 'function') callback(fileList);
            readNext(fileList);
        });
    } else {
        readFile(accept as any, count, multiple).then(fileList => {
            if (typeof callback === 'function') callback(fileList);
            readNext(fileList);
        });
    }
};

const readNext = async (fileList: UploadFileType[]) => {
    if (reading.value) return;
    setReading(true);
    let next = true;
    const stop = new Promise((resolve, reject) => {
        emits(
            'beforeRead',
            fileList,
            () => (next = false),
            () => resolve(true),
            () => reject()
        );
    });
    if (!next) {
        try {
            await stop;
        } catch (e) {
            setReading(false);
            return;
        }
    }
    setReading(false);
    if (props.maxSize > 0) {
        for (let item of fileList) {
            if ((item.size || 0) / 1024 > props.maxSize) {
                console.error(`文件大小${Math.floor((item.size || 0) / 1024)}kb超过${props.maxSize}kb限制`);
                emits('oversize', item, fileList);
                return;
            }
        }
    }
    fileList.forEach(item => (item.status = 'uploading'));
    if (dataValue.value.length + fileList.length > props.maxCount) {
        fileList.splice(props.maxCount - dataValue.value.length);
    }
    setDataValue(dataValue.value.concat(fileList));
    console.log(dataValue);
    emits('update:modelValue', dataValue.value);
    emits('read', fileList);
};

const deleteItem = async (index: number) => {
    if (props.disabled || deleting.value) return;
    setDeleting(true);

    let next = true;
    const stop = new Promise((resolve, reject) => {
        emits(
            'beforeDelete',
            index,
            () => (next = false),
            () => resolve(true),
            () => reject()
        );
    });
    if (!next) {
        try {
            await stop;
        } catch (e) {
            //TODO handle the exception
            setDeleting(false);
            return;
        }
    }
    setDeleting(false);
    dataValue.value.splice(index, 1);
    emits('update:modelValue', dataValue.value);
    emits('delete', index, dataValue.value);
};

const previewItem = (index: number, item: UploadFileType) => {
    if (!cmpPreviewFullImage.value) return;
    if (['video', 'image'].indexOf(item.type as string) === -1) return;
    setPreviewIndex(index);
};

// #ifdef MP-ALIPAY
const onMediaType = () => {
    setMediaType(mediaType.value === 'image' ? 'video' : 'image');
};
// #endif
</script>
<template>
    <view class="ste-upload-root" data-test="upload" :style="[cmpRootStyle]">
        <view class="upload-list">
            <block v-if="previewImage">
                <view class="image-item" v-for="(item, index) in dataValue" :key="index" @click="toSelectFile">
                    <image class="image" :src="item.thumbPath || item.url || item.path" mode="aspectFit" @click="previewItem(index, item)" />
                    <view class="uploading" v-if="item.status === 'uploading'">
                        <view class="icon"><ste-icon code="&#xe69f;" size="48" color="#fff" /></view>
                        <view class="text">上传中</view>
                    </view>
                    <view class="error" v-if="item.status === 'error'">
                        <view class="icon"><ste-icon code="&#xe6a0;" size="48" color="#fff" /></view>
                        <view class="text">上传失败</view>
                    </view>
                    <view class="delete" v-if="cmpDeletable && item.status !== 'uploading'" @click.stop="deleteItem(index)">
                        <view class="icon">
                            <ste-icon code="&#xe67b;" size="20" color="#fff" />
                        </view>
                    </view>
                    <block v-if="!item.status || item.status === 'success'">
                        <slot name="preview-cover" :item="item"></slot>
                    </block>
                </view>
            </block>
            <view class="add-file" data-test="upload-add-file" v-if="cmpShowUpload" @click="() => selectFile()">
                <slot>
                    <view class="image-item add-file">
                        <view class="upload-btn">
                            <ste-icon :code="uploadIcon" :size="60" color="#ddd"></ste-icon>
                            <view class="upload-text" data-test="upload-text">{{ uploadText }}</view>
                        </view>
                        <!-- #ifdef MP-ALIPAY -->
                        <view class="delete" v-if="accept === 'media'" @click.stop="onMediaType">
                            <view class="icon">
                                <view :class="{ video: mediaType === 'video' }">
                                    <ste-icon :code="mediaType === 'video' ? '&#xe6a1;' : '&#xe69b;'" size="20" color="#fff" />
                                </view>
                            </view>
                        </view>
                        <!-- #endif -->
                    </view>
                </slot>
            </view>
        </view>
        <ste-media-preview :show="Boolean(previewIndex || previewIndex === 0)" :urls="cmpPreviewList" v-model:index="previewIndex" @close="setPreviewIndex(null)" />
    </view>
</template>
<style lang="scss" scoped>
@keyframes ste-upload-rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.ste-upload-root {
    .image {
        width: 100%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
    }

    .upload-list {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: var(--ste-upload-flex-wrap);

        .image-item {
            width: var(--ste-upload-width);
            height: var(--ste-upload-height);
            border-radius: var(--ste-upload-radius);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: var(--ste-upload-item-margin);
            margin-right: var(--ste-upload-item-margin);
            position: relative;
            background: #f7f7f7;
            overflow: hidden;

            &.add-file {
                .upload-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;

                    .upload-text {
                        color: #ccc;
                        font-size: var(--font-size-24, 24rpx);
                    }
                }

                .icon {
                    .video {
                        transform: rotateZ(-90deg);
                    }
                }
            }

            .uploading,
            .error {
                position: absolute;
                z-index: 5;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.45);
                color: #fff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-family:
                    PingFang SC,
                    PingFang SC;
                font-weight: 400;

                .icon {
                    width: 48rpx;
                    height: 48rpx;
                    display: flex;
                    align-items: center;
                    text-align: center;
                }

                .text {
                    margin-top: 16rpx;
                    font-size: var(--font-size-28, 28rpx);
                    line-height: 40rpx;
                }
            }

            .uploading .icon {
                animation: ste-upload-rotate 1s linear infinite;
            }

            .delete {
                position: absolute;
                z-index: 10;
                width: 90rpx;
                height: 90rpx;
                background-color: rgba(0, 0, 0, 0.7);
                color: #fff;
                font-size: var(--font-size-24, 24rpx);
                top: -45rpx;
                right: -45rpx;
                border-radius: 50%;

                .icon {
                    position: absolute;
                    left: 16rpx;
                    bottom: 16rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }
        }
    }
}
</style>
