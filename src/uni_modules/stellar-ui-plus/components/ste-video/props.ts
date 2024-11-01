import type { ExtractPropTypes, PropType } from 'vue'
import type { BaseEvent } from '../../types/event'
import type { Obj } from '../../types'
import type { CodecType, DirectionType, ObjectFitType, PlayStrategyType } from './types'

const videoProps = {
  // 视频的标题，全屏时在顶部展示
  title: { type: String, default: '' },
  // 是否视频高度跟随父容器
  autoHeight: { type: Boolean, default: false },
  // 清晰度
  resolution: { type: Array as PropType<Obj[]>, default: () => [] },
  // 要播放视频的资源地址
  src: { type: String, default: '' },
  // 是否自动播放
  autoplay: { type: Boolean, default: false },
  // 是否循环播放
  loop: { type: Boolean, default: false },
  // 是否静音播放
  muted: { type: Boolean, default: false },
  // 指定视频初始播放位置，单位为秒（s）。
  initialTime: { type: Number, default: 0 },
  // 指定视频时长，单位为秒（s）。
  duration: { type: Number, default: 0 },
  // 在非全屏模式下，是否开启亮度与音量调节手势
  pageGesture: { type: Boolean, default: false },
  // 设置全屏时视频的方向，不指定则根据宽高比自动判断。有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）
  direction: { type: Number as PropType<DirectionType>, default: 0 },
  // 是否显示全屏按钮
  showFullscreenBtn: { type: Boolean, default: true },
  // 是否显示视频底部控制栏的播放按钮
  showPlayBtn: { type: Boolean, default: true },
  // 是否开启控制进度的手势
  enableProgressGesture: { type: Boolean, default: true },
  // 当视频大小与 video 容器大小不一致时，视频的表现形式。contain：包含，fill：填充，cover：覆盖
  objectFit: { type: String as PropType<ObjectFitType>, default: 'contain' },
  // 视频封面的图片网络资源地址，如果 controls 属性值为 false 则设置 poster 无效
  poster: { type: String, default: '' },
  // 移动网络提醒样式：0是不提醒，1是提醒，默认值为1
  mobileNetHintType: { type: Number, default: 1 },
  // 是否开启手势播放
  enablePlayGesture: { type: Boolean, default: false },
  // 当跳转到其它小程序页面时，是否自动暂停本页面的视频
  autoPauseIfNavigate: { type: Boolean, default: true },
  // 当跳转到其它微信原生页面时，是否自动暂停本页面的视频
  autoPauseIfOpenNative: { type: Boolean, default: true },
  // 在非全屏模式下，是否开启亮度与音量调节手势（同 page-gesture）
  vslideGesture: { type: Boolean, default: false },
  // 在全屏模式下，是否开启亮度与音量调节手势
  vslideGestureInFullscreen: { type: Boolean, default: true },
  // 视频前贴广告单元ID，更多详情可参考开放能力视频前贴广告(https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/ad/video-patch-ad.html)
  adUnitId: { type: String, default: '' },
  // 用于给搜索等场景作为视频封面展示，建议使用无播放 icon 的视频封面图，只支持网络地址
  posterForCrawler: { type: String, default: '' },
  // 解码器选择，hardware：硬解码（硬解码可以增加解码算力，提高视频清晰度。少部分老旧硬件可能存在兼容性问题）；software：ffmpeg 软解码；
  codec: { type: String as PropType<CodecType>, default: 'hardware' },
  // 是否对 http、https 视频源开启本地缓存。缓存策略:开启了此开关的视频源，在视频播放时会在本地保存缓存文件，如果本地缓存池已超过100M，在进行缓存前会清空之前的缓存（不适用于m3u8等流媒体协议）
  httpCache: { type: Boolean, default: true },
  // 播放策略，0：普通模式，适合绝大部分视频播放场景；1：平滑播放模式（降级），增加缓冲区大小，采用open sl解码音频，避免音视频脱轨的问题，可能会降低首屏展现速度、视频帧率，出现开屏音频延迟等。 适用于高码率视频的极端场景；2： M3U8优化模式，增加缓冲区大小，提升视频加载速度和流畅度，可能会降低首屏展现速度。 适用于M3U8在线播放的场景
  playStrategy: { type: Number as PropType<PlayStrategyType>, default: 0 },
  // HTTP 请求 Header
  header: { type: Object, default: () => ({}) },
  // 是否为直播源
  isLive: { type: Boolean, default: false },
}

export type VideoProps = ExtractPropTypes<typeof videoProps>

export const videoEmits = {
  ended: (e: BaseEvent) => e instanceof Object,
  waiting: (e: BaseEvent) => e instanceof Object,
  error: (e: BaseEvent) => e instanceof Object,
  progress: (e: BaseEvent) => e instanceof Object,
  loadeddata: (e: BaseEvent) => e instanceof Object,
  loadstart: (e: BaseEvent) => e instanceof Object,
  seeked: (e: BaseEvent) => e instanceof Object,
  seeking: (e: BaseEvent) => e instanceof Object,
  fullscreenclick: (e: BaseEvent) => e instanceof Object,
  controlstoggle: (e: boolean) => typeof e === 'boolean',

  // ended: (e: BaseEvent) => e instanceof Object,
}

export type VideoEmits = typeof videoEmits

export default videoProps
