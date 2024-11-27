<script setup lang="ts">
import { onMounted, watch, computed, defineEmits, defineProps } from 'vue';
import utils from '../../utils/utils';
import propsData from './props';
import useData from './useData';
import TouchScaleing from './TouchScaleing';
import type { UniTouchEvent } from '../../types/event';
import type { SwiperOnChangeEvent } from '@uni-helper/uni-app-types';

const emits = defineEmits<{
    (e: 'beforeClose', suspend: () => void, next: () => void, stop: () => void): void;
    (e: 'update:show', show: boolean): void;
    (e: 'close'): void;
    (e: 'update:index', index: number): void;
    (e: 'change', index: number): void;
    (e: 'longpress', index: number): void;
}>();

const { dataIndex, setDataIndex, dataShow, setDataShow, touch, setTouch, scaling, setScaling, translate, setTranslate, rotate, setRotate, transition, setTransition, dataShowmenu, setDataShowmenu } =
    useData();

const props = defineProps(propsData);

const cmpUrls = computed<{ url: string; type: string | number; path?: string }[]>(() => {
    return props.urls.map(url => ({ url, type: utils.getMediaFileType(url) })).filter(item => item.type !== 'audio');
});

const cmpTransform = computed(() => {
    return {
        transform: `scale(${scaling.value}) translate(${translate.value}) rotate(${rotate.value}deg)`,
        transition: transition.value,
    };
});

onMounted(() => {
    setTouch(new TouchScaleing());
});

watch(
    () => props.show,
    v => {
        if (v && props.index !== null) {
            setDataIndex(props.index);
        }
        setDataShow(v);
    },
    { immediate: true }
);
watch(() => props.showmenu, setDataShowmenu, { immediate: true });

const onClose = async () => {
    let next = true;
    const stop = new Promise((resolve, reject) => {
        emits(
            'beforeClose',
            () => (next = false),
            () => resolve(true),
            () => reject(false)
        );
    });
    if (!next) {
        await stop;
    }
    setDataShow(false);
    emits('update:show', false);
    emits('close');
};

const onTouchstart = (e: UniTouchEvent) => {
    if (props.scale) return;
    const [x1, y1, x2, y2] = touch.value?.touchStart(e.changedTouches) || [];
    if (x1 && y1 && x2 && y2) {
        if (dataShowmenu) setDataShowmenu(false);
    }
};

const onTouchmove = (e: UniTouchEvent) => {
    if (props.scale) return;
    const bool = touch.value?.touchMove(e.changedTouches);
    if (!bool) return;
    if (dataShowmenu) setDataShowmenu(false);
    setScaling(touch.value?.scale || 1);
    setTranslate(`${touch.value?.translateX || 0}px,${touch.value?.translateY || 0}px`);
    setRotate(touch.value?.rotate || 0);
};

const onTouchend = (e: UniTouchEvent) => {
    if (props.scale) return;
    if (dataShowmenu.value !== props.showmenu) setDataShowmenu(props.showmenu);
    const bool = touch.value?.touchEnd(e.changedTouches);
    if (!bool) return;
    setTransition('300ms');
    setTimeout(() => {
        setScaling(1);
        setTranslate('0');
        setRotate(0);
        setTimeout(() => {
            setTransition('0');
        }, 100);
    }, 50);
};

const onChange = (e: SwiperOnChangeEvent) => {
    setDataIndex(e.detail.current);
    emits('update:index', e.detail.current);
    emits('change', e.detail.current);
};

const onLongpress = () => {
    emits('longpress', dataIndex.value);
};

const getTransfrom = (i: number) => (dataIndex.value === i ? cmpTransform.value : {});
</script>
<template>
    <view class="ste-media-preview-root" v-if="dataShow">
        <view class="media-preview-content">
            <swiper style="width: 100%; height: 100%" :autoplay="props.autoplay > 0" :interval="props.autoplay" :circular="props.loop" :current="dataIndex" @change="onChange">
                <swiper-item v-for="(item, index) in cmpUrls" :key="index">
                    <view
                        class="preview-item"
                        @click.stop="1"
                        @touchstart="onTouchstart"
                        @touchmove="onTouchmove"
                        @touchend="onTouchend"
                        @longpress="onLongpress"
                        :style="[dataIndex === index ? cmpTransform : {}]"
                    >
                        <!-- #ifndef APP -->
                        <video class="video" object-fit="contain" v-if="item.type === 'video'" :src="item.url || item.path" @click.stop="1" />
                        <ste-image v-else class="image" :showMenuByLongpress="dataShowmenu" :src="item.url || item.path" mode="aspectFit" />
                        <!-- #endif -->
                        <!-- #ifdef APP -->
                        <video class="video" object-fit="contain" v-if="item.type === 'video' && cmpUrls.length <= 1" :src="item.url || item.path" @click.stop="1" />
                        <ste-image class="image" :showMenuByLongpress="dataShowmenu" :src="item.url || item.path" mode="aspectFit" />
                        <!-- #endif -->
                    </view>
                </swiper-item>
            </swiper>
        </view>
        <view class="media-preview-footer">
            <view class="footer-index">
                <text v-if="showIndex">{{ dataIndex + 1 }}/{{ cmpUrls.length }}</text>
            </view>
            <view class="footer-close" @click="onClose">
                <ste-icon name="close" size="60" code="&#xe6a0;" color="#fff" />
            </view>
        </view>
    </view>
</template>
<style scoped lang="scss">
.ste-media-preview-root {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    color: #fff;
    z-index: 9999999;

    .media-preview-content {
        width: 100%;
        height: calc(100% - 120rpx);
        display: flex;
        align-items: center;
        justify-content: center;

        .preview-item {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .image,
            .video {
                width: 100%;
                height: 100%;
            }

            .image {
                max-width: 100%;
                max-height: 100%;
            }
        }
    }

    .media-preview-footer {
        width: 100%;
        height: 120rpx;
        padding: 0 30rpx 30rpx 30rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: var(--font-size-28, 28rpx);
    }
}
</style>
