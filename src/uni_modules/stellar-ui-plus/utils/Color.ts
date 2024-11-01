const rgbReg = /^rgb\(\s?(\d{1,3})\s?\,\s?(\d{1,3})\s?\,\s?(\d{1,3})\s?\)/
const rgbaReg = /^rgba\(\s?(\d{1,3}\s?\,\s?\d{1,3}\s?\,\s?\d{1,3})\s?\,\s?([\d\.]+)\s?\)/
const hexReg = /^\#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
const hexaReg = /^\#([0-9a-fA-F]{4}|[0-9a-fA-F]{8})$/

class Color {
  static hex2rgba(hex: string, a = 1) {
    const str = hex.toLowerCase()
    const result = []
    let sColor = str.replace(hexReg, '$1')
    if (sColor.length === 3)
      sColor = sColor.split('').map(s => s + s).join('')

    for (let i = 0; i < 6; i += 2)
      result.push(Number.parseInt(sColor.slice(i, i + 2), 16))

    return `rgba(${result.join(',')},${a})`
  }

  static hexa2rgba(hexa: string, a: number) {
    const str = hexa.toLowerCase()
    const result = []

    let sColor = str.replace(hexaReg, '$1')
    if (sColor.length === 4)
      sColor = sColor.split('').map(s => s + s).join('')

    for (let i = 0; i < 6; i += 2)
      result.push(Number.parseInt(sColor.slice(i, i + 2), 16))

    const _a = a || Number(Number.parseInt(sColor.slice(6, 8), 16) / 255).toFixed(2)
    return `rgba(${result.join(',')},${_a})`
  }

  static rgb2rgba(rgb: string, a = 1) {
    const result = []
    for (let i = 1; i <= 3; i++)
      result.push(rgb.replace(rgbReg, `$${i}`))

    return `rgba(${result.join(',')},${a})`
  }

  static setRgbaDiaphaneity(rgba: string, a: number) {
    const _rgb = rgba.replace(rgbaReg, '$1')
    const _a = a || rgba.replace(rgbaReg, '$2')
    return `rgba(${_rgb},${_a})`
  }

  static formatColor(color: string, a: number) {
    if (hexReg.test(color))
      return Color.hex2rgba(color, a)

    if (hexaReg.test(color))
      return Color.hexa2rgba(color, a)

    if (rgbReg.test(color))
      return Color.rgb2rgba(color, a)

    if (rgbaReg.test(color) && a)
      return Color.setRgbaDiaphaneity(color, a)

    return color
  }
}

export default Color
