const fs = require('node:fs')
const path = require('node:path')
const { convertToCamelCase, getDir } = require('./utils')

module.exports = function (components) {
  try {
    let importStr = ''
    let comType = ''
    let refType = ''
    let exportCom = ''

    components.forEach((comontent) => {
      const name = convertToCamelCase(comontent)
      const type = name.charAt(0).toUpperCase() + name.slice(1)
      importStr += `import ${name} from "../components/${comontent}/${comontent}.vue"\n`
      comType += `\t\t${type}: typeof ${name};\n`
      refType
        += `export type ${type.replace(/^Ste/, 'Ref')} = InstanceType<typeof ${name}>\n`
      exportCom += `import ${name} from "./components/${comontent}/${comontent}.vue"\nexport const ${type} = ${name}\n`
    })
    const result = `import '@vue/runtime-core'\n\ndeclare module '@vue/runtime-core' {\n\texport interface GlobalComponents {\n${comType}\t}\n}\n`
    const outfile = path.join(getDir(), '/types/components.d.ts')
    fs.writeFileSync(outfile, importStr + result)
    const refOutfile = path.join(getDir(), '/types/refComponents.d.ts')
    fs.writeFileSync(refOutfile, importStr + refType)

    const exportfile = path.join(getDir(), '/index.ts')
    fs.writeFileSync(exportfile, exportCom)
  }
  catch (error) {
    console.error(error)
  }
}
