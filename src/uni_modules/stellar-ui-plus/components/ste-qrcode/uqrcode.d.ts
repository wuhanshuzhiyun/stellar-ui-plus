// uqrcode.d.ts

export type URCodeCanvasContext = CanvasRenderingContext2D | UniApp.CanvasContext

export interface UQRCodeOptions {
  data: string // 二维码的数据内容
  size: number // 二维码尺寸
  margin: number // 二维码边距
  useDynamicSize: boolean
  dynamicSize: number // 动态尺寸数值
  canvasContext: URCodeCanvasContext // Canvas 的上下文环境
  modules: any[] // 二维码模块数据
  moduleCount: number // 模块数量
  backgroundColor: string
  backgroundImageSrc: string
  backgroundImageWidth: number
  backgroundImageHeight: number
  backgroundImageX: number
  backgroundImageY: number
  foregroundColor: string
  foregroundImageSrc: string
  foregroundImageWidth: number
  foregroundImageHeight: number
  foregroundImageX: number
  foregroundImageY: number
}

export default class UQRCode {
  constructor(options?: UQRCodeOptions) // 构造函数，可以接受配置选项

  data: string // 二维码的数据内容
  size: number // 二维码尺寸
  margin: number // 二维码边距
  useDynamicSize: boolean
  dynamicSize: number // 动态尺寸数值
  canvasContext: URCodeCanvasContext // Canvas 的上下文环境
  modules: any[] // 二维码模块数据
  moduleCount: number // 模块数量
  backgroundColor: string
  backgroundImageSrc: string
  backgroundImageWidth: number
  backgroundImageHeight: number
  backgroundImageX: number
  backgroundImageY: number
  foregroundColor: string
  foregroundImageSrc: string
  foregroundImageWidth: number
  foregroundImageHeight: number
  foregroundImageX: number
  foregroundImageY: number

  loadImage(src: string): Promise
  setOptions(options: UQRCodeOptions): void // 设置uQRCode属性
  make(): void // 创建二维码
  drawCanvas(): Promise<void> // 将二维码绘制到 Canvas 上
  loadCanvasImage(src: string): Promise<HTMLImageElement> // 加载canvas图片方法
}
