export default {
  // 二维码内容
  content: { type: String, required: true, default: '' },
  // 二维码尺寸
  size: { type: Number, default: 100 },
  // 背景色
  background: { type: String, default: '#FFFFFF' },
  // 前景色
  foreground: { type: String, default: '#000000' },
  // 二维码logo
  foregroundImageSrc: { type: String, default: '' },
  // logo尺寸 默认画布尺寸四分之一
  foregroundImageWidth: { type: Number, default: null },
  // logo尺寸 默认画布尺寸四分之一
  foregroundImageHeight: { type: Number, default: null },
}
