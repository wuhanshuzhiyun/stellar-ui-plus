const path = require('node:path')
const fs = require('node:fs')
const { getDir } = require('./utils')

module.exports = function (components) {
  components.forEach((component) => {
    const filePath = path.join(getDir(), '/components', `${component}/${component}.easycom.json`)
    const configFilePath = path.join(getDir(), '/components', `${component}/config.json`)

    // 组件没有easycom和config文件为内置组件，无需提示和生成
    if (!fs.existsSync(filePath)) {
      if (fs.existsSync(configFilePath))
        console.error(`组件【${component}】没有定义.easycom.json说明文件`)

      return
    }
    // 读取文件内容
    let content = fs.readFileSync(filePath, 'utf-8')
    if (!content) {
      console.error(`组件【${component}】的说明文件内容为空`)
      return
    }
    content = content.replaceAll('|', '/')
    const data = JSON.parse(content)

    if (data.attributes?.length) {
      let props = `#### Props\n`
      props += `| 属性名 | 说明  | 类型 | 默认值  | 可选值 | 支持版本 |\n| ----- | ----- | --- | ------- | ------ | -------- |\n`
      let event = `#### Events\n`
      event += `| 事件名 | 说明  | 回调参数 | 支持版本 |\n| ----- | ----- | ------- | -------- |\n`
      data.attributes.forEach((item) => {
        if (item.name?.indexOf('[event]') === 0) {
          const name = item.name.replace('[event]', '')
          event += `| \`${name}\` | ${item.description || '-'} | ${item.params?.length ? item.params.map(param => `\`${param.name}\`：${param.description}`).join('<br/>') : '-'} | ${item.version ? `\`${item.version}\`` : '-'} |\n`
        }
        else {
          props += `| \`${item.name}\` | ${item.description || '-'} | \`${item.type}\` | ${item.default ? `\`${item.default}\`` : '-'} | ${item.values?.length ? item.values.map(value => `\`${value.name}\`：${value.description}`).join('<br/>') : '-'} | ${item.version ? `\`${item.version}\`` : '-'} |\n`
        }
      })
      props += '\n\n'
      const mdFile = path.join(getDir(), '/components', `${component}/ATTRIBUTES.md`)
      fs.writeFileSync(mdFile, props + event, 'utf-8')
    }
  })
}
