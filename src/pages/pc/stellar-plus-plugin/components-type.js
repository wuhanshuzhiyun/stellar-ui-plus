const fs = require('node:fs')
const path = require('node:path')
const { convertToCamelCase, getDir } = require('./utils')

/**
 * 生成组件类型声明内容
 * @param {string[]} components - 组件名称列表
 * @returns {Object} 包含各种生成内容的对象
 */
function generateContent(components) {
  let importStr = ''
  let comType = ''
  let refType = ''
  let exportCom = ''

  components.forEach((component) => {
    const name = convertToCamelCase(component)
    const type = name.charAt(0).toUpperCase() + name.slice(1)
    const refTypeName = type.replace(/^Ste/, 'Ref')

    importStr += `import ${name} from "../components/${component}/${component}.vue"\n`
    comType += `\t\t${type}: typeof ${name};\n`
    refType += `export type ${refTypeName} = InstanceType<typeof ${name}>\n`
    exportCom += `import ${name} from "./components/${component}/${component}.vue"\nexport const ${type} = ${name}\n`
  })

  const globalComponentsType = `
  import '@vue/runtime-core'

  declare module '@vue/runtime-core' {
    export interface GlobalComponents {
      ${comType}  
    }
  }
    
  `

  return { importStr, globalComponentsType, refType, exportCom }
}

/**
 * 写入生成的文件
 * @param {Object} content - 生成的内容对象
 */
function writeFiles(content) {
  const { importStr, globalComponentsType, refType, exportCom } = content
  const baseDir = getDir()

  fs.writeFileSync(
    path.join(baseDir, '/types/components.d.ts'),
    importStr + globalComponentsType
  )

  fs.writeFileSync(
    path.join(baseDir, '/types/refComponents.d.ts'),
    importStr + refType
  )

  fs.writeFileSync(
    path.join(baseDir, '/index.ts'),
    exportCom
  )
}

module.exports = function (components) {
  try {
    const content = generateContent(components)
    writeFiles(content)
  } catch (error) {
    console.error('生成组件类型失败:', error)
  }
}
