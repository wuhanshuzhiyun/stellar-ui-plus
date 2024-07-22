const fs = require('node:fs')
const path = require('node:path')

function convertToCamelCase(str) {
  return str.split('-')
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join('')
}

module.exports = function () {
  // eslint-disable-next-line node/prefer-global/process
  const dir = path.join(process.cwd(), 'src/uni_modules/stellar-plus/components')
  // 查找目录下所有文件夹名称
  const folders = fs.readdirSync(dir).filter(item => fs.statSync(path.join(dir, item)).isDirectory())
  let importStr = ''
  let comType = ''
  let refType = ''
  folders.forEach((comontent) => {
    const name = convertToCamelCase(comontent)
    const type = name.charAt(0).toUpperCase() + name.slice(1)
    importStr += `import ${name} from "../components/${comontent}/${comontent}.vue"\n`
    comType += `\t\t${type}: typeof ${name};\n`
    refType
      += `export type ${type.replace(/^Ste/, 'Ref')} = InstanceType<typeof ${name}>\n`
  })
  const result = `import '@vue/runtime-core'\n\ndeclare module '@vue/runtime-core' {\n\texport interface GlobalComponents {\n${comType}\t}\n}\n`
  // eslint-disable-next-line node/prefer-global/process
  const outfile = path.join(process.cwd(), 'src/uni_modules/stellar-plus/types/components.d.ts')
  fs.writeFileSync(outfile, importStr + result)
  // eslint-disable-next-line node/prefer-global/process
  const refOutfile = path.join(process.cwd(), 'src/uni_modules/stellar-plus/types/refComponents.d.ts')
  fs.writeFileSync(refOutfile, importStr + refType)
}
