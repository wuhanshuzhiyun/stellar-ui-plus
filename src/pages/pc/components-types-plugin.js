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
  const dir = path.join(process.cwd(), 'src/stellar-plus/components')
  // 查找目录下所有文件夹名称
  const folders = fs.readdirSync(dir).filter(item => fs.statSync(path.join(dir, item)).isDirectory())
  let code = ''
  let components = ''
  folders.forEach((comontent) => {
    const name = convertToCamelCase(comontent)
    const type = name.charAt(0).toUpperCase() + name.slice(1)
    code
      += `import ${name} from "../components/${comontent}/${comontent}.vue"\nexport type ${type.replace(/^Ste/, 'Ref')} = InstanceType<typeof ${name}>\n\n`
    components += `\t\t${type}: typeof ${name};\n`
  })
  const result = `import '@vue/runtime-core'\n\ndeclare module '@vue/runtime-core' {\n\texport interface GlobalComponents {\n${components}\t}\n}\n`
  // eslint-disable-next-line node/prefer-global/process
  const outfile = path.join(process.cwd(), 'src/stellar-plus/types/components.d.ts')
  fs.writeFileSync(outfile, code + result)
}
