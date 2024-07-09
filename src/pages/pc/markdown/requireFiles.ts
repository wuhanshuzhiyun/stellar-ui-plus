interface MarkDown {
  html: string
}

function templateFiles() {
  const deg = /.+\/(\w+)\.(md|json)$/
  const map: Obj = {}
  const mds: { [key: string]: MarkDown } = import.meta.glob('../../../uni_modules/stellar-plus/template/*.md', { eager: true })
  for (const k in mds) {
    const name = k.replace(deg, '$1')
    map[name] = mds[k].html
  }
  return map
}

const templates = templateFiles()

function assembleTemplate(html: string) {
  const kReg = /\<p\>\{\{(\w+)\}\}\<\/p\>/
  let result = html
  let key = result.match(kReg)
  while (key) {
    if (!templates[key[1]]) {
      console.error(`模板 ${key[1]} 不存在`)
      break
    }
    result = result.replace(kReg, templates[key[1]])
    key = result.match(kReg)
  }
  return result
}

function restsFiles() {
  const deg = /\.\/(\w+)\/(\d+)?\-?(.+)\.(md|json)$/
  const groupJson: Obj = import.meta.glob('./**/*.json', { eager: true })
  const groupData: Obj = {}
  for (const k in groupJson) {
    const groupKey = k.replace(deg, '$1')
    groupData[groupKey] = groupJson[k].default
  }
  const markdowns: { [key: string]: MarkDown } = import.meta.glob('./**/*.md', { eager: true })

  const map: Obj = {}
  for (const k in markdowns) {
    const html = assembleTemplate(markdowns[k].html)
    const group = k.replace(deg, '$1')
    const sort = k.replace(deg, '$2')
    const name = k.replace(deg, '$3')
    if (!map[group])
      map[group] = {}
    map[group][name] = { html, sort: sort || 100 }
  }
  const datas = Object.keys(map).map((group) => {
    const children = Object.keys(map[group]).map((name) => {
      return {
        name,
        ...map[group][name],
      }
    })

    children.sort((a, b) => a.sort - b.sort)

    return {
      key: group,
      ...groupData[group],
      children,
    }
  })
  datas.sort((a, b) => a.sort - b.sort)
  return datas
}

restsFiles()
