export const popupProps = {
  // 打开或者关闭弹窗，必须使用.sync进行双向绑定
  show: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: String,
    default: '#ffffff',
  },
  // 是否显示遮罩
  showMask: {
    type: Boolean,
    default: true,
  },
  // 蒙版点击是否关闭弹窗
  isMaskClick: {
    type: Boolean,
    default: true,
  },
  // 弹窗内容层宽度
  width: {
    type: [Number, String],
    default: '100vw',
  },
  // 弹窗内容层高度
  height: {
    type: [Number, String],
    default: 'auto',
  },
  // 位置 center top bottom left right
  position: {
    type: String,
    default: 'center',
  },
  round: {
    type: Boolean,
    default: false,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
  offsetX: {
    type: [Number, String],
    default: 0,
  },
  offsetY: {
    type: [Number, String],
    default: 0,
  },
  // 动画持续时间
  duration: {
    type: Number,
    default: 200,
  },
  // 弹窗z-index
  zIndex: {
    type: [Number, String],
    default: 998,
  },
  // 是否在动画完成后渲染或销毁内容元素
  keepContent: {
    type: Boolean,
    default: true,
  },
}
