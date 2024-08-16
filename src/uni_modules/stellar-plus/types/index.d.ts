export type UniImageMode = 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'center' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right'

export type ImgType = 'png' | 'jpg' | 'jpeg' | 'svg' | 'webp'

export type DisplayType = 'flex' | 'block' | 'inline-flex' | 'inline-block' | 'none' | 'inherit' | 'inline'

export type SizeType = number | string

export type PositionType = 'top' | 'bottom' | 'left' | 'right' | 'center'

export type AroundPositionType = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

export type ModeType = 100 | 200 | 300 | 400

export interface Obj {
  [key: string]: any
}

export interface UploadFileType {
  url: string
  type?: string
  size?: number
  name?: string
  status?: 'uploading' | 'error' | 'success'
  path?: string
  thumbPath?: string
  duration?: number
  height?: number
  width?: number
}

export interface ReadFileOptions {
  // #ifdef MP-WEIXIN
  accept?: 'image' | 'video' | 'mix'
  // #endif
  // #ifndef MP-WEIXIN
  accept?: 'image' | 'video' | 'media'
  // #endif
  capture?: ('album' | 'camera')[]
  camera?: 'back' | 'front'
  compressed?: boolean
  maxDuration?: number
  multiple?: boolean
  count?: number
}

export type InputAccept = 'image' | 'video' | 'all' | 'file' | 'media'

export type InputCapture = 'back' | 'front'

export type WxInputAccept = 'image' | 'video' | 'mix'

export type DirectionType = 'horizontal' | 'vertical'

export type AlignType = 'left' | 'right' | 'center'
