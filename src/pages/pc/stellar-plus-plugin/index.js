const fs = require('node:fs')
const path = require('node:path')
const { getDir } = require('./utils')
const componentsType = require('./components-type')
const propsMd = require('./props-md')

module.exports = function () {
  const comdir = path.join(getDir(), '/components')
  const components = fs.readdirSync(comdir).filter(item => item.indexOf('ste-') === 0)
  componentsType(components)
  propsMd(components)
}
