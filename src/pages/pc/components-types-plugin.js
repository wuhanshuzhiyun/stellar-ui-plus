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
  let code = ''
  folders.forEach((comontent) => {
    const name = convertToCamelCase(comontent)
    const type = name.charAt(0).toUpperCase() + name.slice(1)
    code
      += `import ${name} from "../components/${comontent}/${comontent}.vue"\nexport type ${type} = InstanceType<typeof ${name}>\n`
  })
  // eslint-disable-next-line node/prefer-global/process
  const outfile = path.join(process.cwd(), 'src/uni_modules/stellar-plus/types/components.d.ts')
  fs.writeFileSync(outfile, code)
}
