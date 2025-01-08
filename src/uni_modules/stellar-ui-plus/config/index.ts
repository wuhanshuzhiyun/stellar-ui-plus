import { reactive } from 'vue'
import System from '../utils/System'

class Config {
  private _options = {
    minSize: 12, // 最小字体
    maxSize: 80, // 最大字体
    fontScale: 1, // 字体缩放比例
  }

  get options() {
    return this._options
  }

  set options(options: typeof this._options) {
    this._options = options
    this._setFontSize()
  }

  private _fontSize: { [key: string]: string } = {}

  get rootStyle() {
    return this._fontSize
  }

  constructor(options?: Partial<typeof this._options>) {
    if (options)
      this.options = Object.assign(this._options, options)
    this._setFontSize()
  }

  private _setFontSize() {
    const style: { [key: string]: string } = {}
    const vw = System.getWindowWidth()
    const scale = this.options.fontScale
    for (let i = this.options.minSize; i <= this.options.maxSize; i += 2) style[`--font-size-${i}`] = `${Number(((vw * i * scale) / 750).toFixed(4))}px`

    this._fontSize = style
  }

  setConfig(options: Partial<typeof this._options>) {
    this.options = Object.assign(this._options, options)
  }
}

const config = new Config()

export default reactive(config)
