<script lang="ts" setup>
import { computed, defineOptions, type CSSProperties, onMounted, nextTick } from 'vue';
import type { BaseEvent } from '../../types/event';
import useData from './useData';
import utils from '../../utils/utils';
import propsData, { videoEmits } from './props';
const props = defineProps(propsData);
const emits = defineEmits(videoEmits);

const {
    videoSrc,
    playState,
    isFull,
    showControl,
    isClickControl,
    playProgress,
    videoDuration,
    videoCurrent,
    firstFullDone,
    isClickImgTip,
    showPopup,
    popupState,
    speedIndex,
    resolutionIndex,
    speedConfigArr,
    ended,
    fullscreenclick,
    waiting,
    error,
    progress,
    loadeddata,
    loadstart,
    seeked,
    seeking,
    play,
    pause,
    loadedMetaData,
    formatTime,
    tip,
    showTip,
    msg,
    reRenderFlag,
} = useData(props, emits);

const componentName = `ste-video`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});
let videoContext = null as unknown as UniApp.VideoContext;

const instance = getCurrentInstance() as unknown as ComponentPublicInstance;
const id = 'video-' + utils.guid();

if (props.src) {
    videoSrc.value = props.src;
} else {
    videoSrc.value = props.resolution[resolutionIndex.value] ? props.resolution[resolutionIndex.value].url : '';
}

const cmpRootClass = computed(() => {
    let classArr = [];
    if (isFull.value) {
        classArr.push('full');
    }
    if (props.autoHeight) {
        classArr.push('auto-height');
    }

    return classArr.join(' ');
});

const cmpRootStyleVar = computed(() => {
    let style = {
        '--control-height': isFull.value ? utils.formatPx(128) : utils.formatPx(88),
        // #ifndef H5 || WEB
        '--control-bottom-bar': utils.System.getNavbarBottom(),
        // #endif
        '--text-box-width': utils.formatPx(80),
        '--progress-bar-width': utils.formatPx(28),
        '--choose-item-font-size': utils.formatPx(28),
        '--check-icon-left': utils.formatPx(100),
        '--choose-item-gap': utils.formatPx(80),
        '--cover-font-size': utils.formatPx(28),
        '--title-padding-left': utils.formatPx(194),
        '--rpx-to-px-20': utils.formatPx(20),
        '--rpx-to-px-24': utils.formatPx(24),
        '--rpx-to-px-40': utils.formatPx(40),
        '--rpx-to-px-32': utils.formatPx(32),
        '--rpx-to-px-46': utils.formatPx(46),
        '--rpx-to-px-16': utils.formatPx(16),
        '--rpx-to-px-36': utils.formatPx(36),
    };
    return style as CSSProperties;
});

onMounted(() => {
    videoContext = uni.createVideoContext(id, instance);
});

function handlePlay(state: boolean) {
    if (state) {
        // 播放
        videoContext.play();
    } else {
        videoContext.pause();
    }
}

function handleFull(state: boolean) {
    if (state) {
        videoContext.requestFullScreen({ direction: 90 });
    } else {
        firstFullDone.value = true;
        videoContext.exitFullScreen();
    }

    reRenderFlag.value = false;
    nextTick(() => {
        reRenderFlag.value = true;
    });
}

function exitFullScreen() {
    showPopup.value = false;
    videoContext.exitFullScreen();

    reRenderFlag.value = false;
    nextTick(() => {
        reRenderFlag.value = true;
    });
}

function handleProgressChange(v: number | number[]) {
    let val;
    if (Array.isArray(v)) {
        // 如果 val 是数组，取第一个元素
        val = v[0];
    } else {
        val = v;
    }
    videoCurrent.value = videoDuration.value * (val / 100);
    videoContext.seek(videoCurrent.value);
}

function handleClick() {
    // 此时全屏并点击了图片提示
    if (isFull.value && !firstFullDone.value) {
        firstFullDone.value = true;
        return;
    }

    if (!isClickControl.value && !isClickImgTip.value) {
        // 此时点击了视频空白区域
        if (showPopup.value) {
            showPopup.value = false;
            return;
        }
        showControl.value = !showControl.value;
        emits('controlstoggle', showControl.value);
    } else {
        isClickControl.value = false;
        isClickImgTip.value = false;
    }
}

function handleSpeedClick() {
    popupState.value = 1;
    showPopup.value = true;
}

function handleResolutionClick() {
    popupState.value = 2;
    showPopup.value = true;
}

function handlePopupClick() {
    isClickControl.value = true;
}

function handleChooseItem(e: any, index: number) {
    let tipMsg = '';
    if (popupState.value == 1) {
        if (speedIndex.value == index) return;
        speedIndex.value = index;
        videoContext.playbackRate(speedConfigArr.value[speedIndex.value]);
        tipMsg = e + 'X';
    } else {
        if (resolutionIndex.value == index) return;
        resolutionIndex.value = index;
        handlePlay(false);
        videoSrc.value = props.resolution[resolutionIndex.value].url;
        // setTimeout(() => {

        // }, 200);
        nextTick(() => {
            videoContext.seek(videoCurrent.value);
            handlePlay(true);
            tipMsg = `切换${e.text}成功`;
        });
    }
    nextTick(() => {
        showPopup.value = false;
        tip(tipMsg);
    });
    // setTimeout(() => {

    // }, 20);
}

function timeupdate(e: BaseEvent) {
    videoDuration.value = e.detail.duration;
    if (!isNaN(videoDuration.value)) {
        videoCurrent.value = e.detail.currentTime;
    }
    playProgress.value = (videoCurrent.value / videoDuration.value) * 100;
}
function fullscreenchange(e: BaseEvent) {
    isFull.value = e.detail.fullScreen;
    if (isFull.value) {
        (videoContext as Obj).hideStatusBar();
    } else {
        (videoContext as Obj).showStatusBar();
    }
}
</script>

<template>
    <view class="ste-video-root" :class="cmpRootClass" :style="[cmpRootStyleVar]">
        <!-- #ifndef MP-ALIPAY -->
        <video
            class="ste-video"
            :id="id"
            :src="videoSrc"
            :controls="false"
            :show-center-play-btn="false"
            :poster="poster"
            :autoplay="autoplay"
            :loop="loop"
            :muted="muted"
            :initialTime="initialTime"
            :duration="duration"
            :enable-play-gesture="enablePlayGesture"
            :pageGesture="pageGesture"
            :direction="direction"
            :enableProgressGesture="enableProgressGesture"
            :objectFit="objectFit"
            :mobileNetHintType="mobileNetHintType"
            :autoPauseIfNavigate="autoPauseIfNavigate"
            :autoPauseIfOpenNative="autoPauseIfOpenNative"
            :vslideGesture="vslideGesture"
            :vslideGestureInFullscreen="vslideGestureInFullscreen"
            :adUnitId="adUnitId"
            :posterForCrawler="posterForCrawler"
            :codec="codec"
            :httpCache="httpCache"
            :playStrategy="playStrategy"
            :header="header"
            :isLive="isLive"
            @click="handleClick"
            @play="play"
            @pause="pause"
            @ended="ended"
            @timeupdate="timeupdate"
            @fullscreenchange="fullscreenchange"
            @waiting="waiting"
            @error="error"
            @progress="progress"
            @loadeddata="loadeddata"
            @loadstart="loadstart"
            @seeked="seeked"
            @seeking="seeking"
            @loadedmetadata="loadedMetaData"
            @fullscreenclick="fullscreenclick"
        >
            <!-- <view class="ste-video-custom-content"> -->
            <!-- 图片操作提示 -->
            <view class="overlay-box" v-if="isFull && !firstFullDone">
                <ste-image src="https://image.whzb.com/chain/StellarUI/video/overlay.png" mode="widthFix" width="100%" />
            </view>
            <!-- 顶部操作栏 -->
            <view
                class="cover top"
                :style="{
                    transform: showControl ? 'translateY(0)' : 'translateY(-100%)',
                    display: isFull ? 'flex' : 'none',
                }"
                @click="isClickControl = true"
            >
                <view @click="exitFullScreen">
                    <ste-icon code="&#xe673;" size="40" color="#ffffff"></ste-icon>
                </view>
                <text class="title">{{ title }}</text>
            </view>
            <!-- 底部操作栏 -->
            <view class="cover bottom" :style="{ transform: showControl ? 'translateY(0)' : 'translateY(100%)' }" @click="isClickControl = true">
                <!-- 播放/暂停按钮 -->
                <view v-if="showPlayBtn">
                    <ste-icon code="&#xe6a8;" size="36" color="#ffffff" v-if="!playState" @click="handlePlay(true)"></ste-icon>
                    <ste-icon code="&#xe6ab;" size="36" color="#ffffff" v-else @click="handlePlay(false)"></ste-icon>
                </view>
                <!-- 时间进度 -->
                <view class="time-box" v-if="isFull">
                    <view class="time left">{{ formatTime(videoCurrent) }}</view>
                    <view>/</view>
                    <view class="time right">{{ formatTime(videoDuration) }}</view>
                </view>
                <!-- 进度条 -->
                <view class="progress-box" v-if="reRenderFlag">
                    <ste-slider :value="playProgress" @change="handleProgressChange" barHeight="4" buttonSize="26">
                        <template #button>
                            <view class="progress-bar" />
                        </template>
                    </ste-slider>
                </view>
                <!-- 时间进度 -->
                <view class="time-box" v-if="!isFull">
                    <view class="time left">{{ formatTime(videoCurrent) }}</view>
                    <view>/</view>
                    <view class="time right">{{ formatTime(videoDuration) }}</view>
                </view>
                <template v-if="isFull">
                    <view class="text-box resolution" @click="handleResolutionClick" v-if="resolution && resolution.length > 0">
                        {{ resolution[resolutionIndex].text }}
                    </view>
                    <view class="text-box speed" @click="handleSpeedClick">
                        {{ speedConfigArr[speedIndex] + 'X' }}
                    </view>
                </template>
                <!-- 全屏按钮 -->
                <view v-if="showFullscreenBtn">
                    <ste-icon code="&#xe6a9;" size="36" color="#ffffff" v-if="!isFull" @click="handleFull(true)"></ste-icon>
                    <ste-icon code="&#xe6aa;" size="36" color="#ffffff" v-else @click="handleFull(false)"></ste-icon>
                </view>
            </view>
            <!-- 倍速、清晰度弹窗 -->
            <view class="popup-box" :style="{ transform: showPopup ? 'translateX(0)' : 'translateX(100%)' }" @click="handlePopupClick">
                <view class="item-box" :style="{ display: popupState == 1 ? 'flex' : 'none' }">
                    <view class="choose-item" v-for="(e, index) in speedConfigArr" :key="index" @click="handleChooseItem(e, index)">
                        <text>{{ e + 'X' }}</text>
                        <view v-if="speedIndex == index" class="check-icon">
                            <ste-icon code="&#xe67a;" color="#fff" size="36"></ste-icon>
                        </view>
                    </view>
                </view>
                <view class="item-box" :style="{ display: popupState == 2 ? 'flex' : 'none' }">
                    <view class="choose-item" v-for="(e, index) in resolution" :key="index" @click="handleChooseItem(e, index)">
                        <text>{{ e.text }}</text>
                        <view v-if="resolutionIndex == index" class="check-icon">
                            <ste-icon code="&#xe67a;" color="#fff" size="36"></ste-icon>
                        </view>
                    </view>
                </view>
            </view>
            <!-- 操作提示 -->
            <view class="tip-toast" :class="[{ show: showTip }]">
                <view class="tip-text">{{ msg }}</view>
            </view>
            <!-- </view> -->
        </video>
        <!-- #endif -->
        <!-- #ifdef MP-ALIPAY -->
        <video class="ste-video" :id="id" :src="src" />
        <!-- #endif -->
    </view>
</template>
<style lang="scss" scoped>
@import './ste-video';
</style>
