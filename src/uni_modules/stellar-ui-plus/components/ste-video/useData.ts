import type { SetupContext } from 'vue'
import { ref } from 'vue'
import type { BaseEvent } from '../../types/event'
import type { VideoEmits, VideoProps } from './props'

export default function useData(props: VideoProps, emits: SetupContext<VideoEmits>['emit']) {
  const videoSrc = ref('')
  const playState = ref(false)
  const isFull = ref(false)

  const showControl = ref(true)
  const isClickControl = ref(false)

  const playProgress = ref(0)
  const videoDuration = ref(0)
  const videoCurrent = ref(0)

  const firstFullDone = ref(false)
  const isClickImgTip = ref(false)
  const showPopup = ref(false)
  const popupState = ref(1)
  const speedIndex = ref(2)
  const resolutionIndex = ref(0)

  const speedConfigArr = ref([0.5, 0.8, 1.0, 1.25, 1.5])

  const showTip = ref(false)
  const msg = ref('')
  const reRenderFlag = ref(true) // 由于视频进度条在全屏切换时由于uniapp的像素计算导致进度条拖动异常，所以加个变量用于重新渲染

  const isMuted = ref(props.muted)

  function play() {
    playState.value = true
  }
  function pause() {
    playState.value = false
  }

  function ended(e: BaseEvent) {
    emits('ended', e)
  }

  function waiting(e: BaseEvent) {
    emits('waiting', e)
  }
  function error(e: BaseEvent) {
    emits('error', e)
  }
  function progress(e: BaseEvent) {
    emits('progress', e)
  }
  function loadeddata(e: BaseEvent) {
    emits('loadeddata', e)
  }
  function loadstart(e: BaseEvent) {
    emits('loadstart', e)
  }
  function seeked(e: BaseEvent) {
    emits('seeked', e)
  }
  function seeking(e: BaseEvent) {
    emits('seeking', e)
  }

  function fullscreenclick(e: BaseEvent) {
    emits('fullscreenclick', e)
  }

  function loadedMetaData(e: BaseEvent) {
    videoDuration.value = e.detail.duration
  }

  // 格式化视频时间为时分秒
  function formatTime(seconds: number) {
    // console.log('formatTime is ', seconds);
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = Math.floor(seconds % 60)

    const formattedHours = hours > 0 ? (hours < 10 ? `0${hours}` : hours) : ''
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds

    if (formattedHours !== '')
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    else return `${formattedMinutes}:${formattedSeconds}`
  }

  function tip(v: string) {
    if (!v)
      return
    msg.value = v
    showTip.value = true
    setTimeout(() => {
      showTip.value = false
    }, 1500)
  }

  function triggerMuted() {
    isMuted.value = !isMuted.value
  }

  return {
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
    waiting,
    error,
    progress,
    loadeddata,
    loadstart,
    seeked,
    seeking,
    fullscreenclick,
    play,
    pause,
    loadedMetaData,
    formatTime,
    tip,
    showTip,
    msg,
    reRenderFlag,
    isMuted,
    triggerMuted,
  }
}
