const path = require('node:path')

class Utils {
  static convertToCamelCase(str) {
    return str
      .split('-')
      .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
      .join('')
  }

  static getDir(dir = 'src/uni_modules/stellar-ui-plus') {
    // eslint-disable-next-line node/prefer-global/process
    return path.join(process.cwd(), dir)
  }
}

module.exports = Utils
