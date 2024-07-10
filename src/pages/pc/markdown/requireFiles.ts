import type { Group, Markdown } from '../types.js'

const parser = new DOMParser()

function templateFiles() {
  const deg = /.+\/(\w+)\.(md|json)$/
  const map: Obj = {}
  const mds: { [key: string]: Markdown } = import.meta.glob('../../../uni_modules/stellar-plus/template/*.md', { eager: true })
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

function formatHtml(html: string) {
  const doc = parser.parseFromString(html, 'text/html')
  const pres = doc.querySelectorAll('body>pre')
  pres.forEach((pre) => {
    const codedom = pre.querySelector('code')
    const code = codedom?.textContent
    const btn = document.createElement('button')
    btn.innerHTML = '复制'
    btn.setAttribute('content', code || '')
    btn.classList.add('code-copy-button')
    pre.innerHTML = ''
    const div = document.createElement('div')
    div.classList.add('code-body-box')
    if (codedom)
      div.appendChild(codedom)
    pre.appendChild(div)
    pre.appendChild(btn)
  })

  const tables = doc.querySelectorAll('table')
  tables.forEach((table) => {
    table.setAttribute('border', '1')
  })

  return doc.body.innerHTML
}

export function restsFiles() {
  const deg = /\.\/(\w+)\/(\d+)?\-?(.+)\.(md|json)$/
  const groupJson: Obj = import.meta.glob('./**/*.json', { eager: true })
  const groupData: Obj = {}
  for (const k in groupJson) {
    const groupKey = k.replace(deg, '$1')
    groupData[groupKey] = groupJson[k].default
  }
  const markdowns: { [key: string]: Markdown } = import.meta.glob('./**/*.md', { eager: true })

  const map: Obj = {}
  for (const k in markdowns) {
    const html = formatHtml(assembleTemplate(markdowns[k].html))
    const group = k.replace(deg, '$1')
    const sort = k.replace(deg, '$2')
    const name = k.replace(deg, '$3')
    if (!map[group])
      map[group] = {}
    map[group][name] = { html, sort: sort || 100 }
  }
  const datas: Group[] = Object.keys(map).map((group) => {
    const contents = Object.keys(map[group]).map((name) => {
      return {
        name,
        key: `${group}-${name}`,
        ...map[group][name],
      }
    })

    contents.sort((a, b) => a.sort - b.sort)

    return {
      key: group,
      ...groupData[group],
      contents,
    }
  })
  datas.sort((a, b) => a.sort - b.sort)
  return datas
}
