<<<<<<< HEAD
import type { Group, Markdown } from '../types.js'
import ComponentGroups from './componentGroups.json'

const parser = new DOMParser()
=======
interface MarkDown {
  html: string
}
>>>>>>> 88be933 (feat(save): save)

function templateFiles() {
  const deg = /.+\/(\w+)\.(md|json)$/
  const map: Obj = {}
<<<<<<< HEAD
  const mds: { [key: string]: Markdown } = import.meta.glob('../../../uni_modules/stellar-ui-plus/template/*.md', { eager: true })
=======
  const mds: { [key: string]: MarkDown } = import.meta.glob('../../../uni_modules/stellar-plus/template/*.md', { eager: true })
>>>>>>> 88be933 (feat(save): save)
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

<<<<<<< HEAD
function formatHtml(html: string) {
  const doc = parser.parseFromString(html, 'text/html')
  const pres = doc.querySelectorAll('body>pre')
  pres.forEach((pre) => {
    const codedom = pre.querySelector('code')
    codedom?.classList.add('hljs')
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

  // 处理标题
  const headers = doc.querySelectorAll('h2, h3, h4')
  headers.forEach((header) => {
    // 获取纯文本内容
    const slug = header.textContent || ''

    // 创建锚点链接
    const anchor = document.createElement('a')
    anchor.href = `#${slug}`
    anchor.className = 'header-anchor'
    anchor.setAttribute('aria-hidden', 'true')
    anchor.textContent = '#'

    // 设置标题 ID
    header.id = slug

    // 创建包装容器
    const wrapper = document.createElement('div')
    wrapper.className = 'header-anchor-wrapper'
    wrapper.style.position = 'relative'

    // 将标题移动到包装容器中
    header.parentNode?.insertBefore(wrapper, header)
    wrapper.appendChild(header)

    // 在标题内容后添加锚点链接
    header.appendChild(document.createTextNode(' '))
    header.appendChild(anchor)
  })

  return doc.body.innerHTML
}

export function scrollToView($event: Event, ele: HTMLAnchorElement) {
  // #ifdef WEB
  $event.preventDefault()
  if (ele)
    ele.scrollIntoView({ behavior: 'smooth' })

  // #ifdef WEB
}

export function btnCopy(btn: HTMLButtonElement) {
  const code = btn.getAttribute('content')
  if (!code) {
    console.error('没有找到复制的内容')
    return
  }
  if (btn.innerHTML === '复制成功')
    return
  console.log('copy: ', code)
  uni.setClipboardData({
    data: code,
    showToast: false,
    success: () => {
      btn.innerHTML = '复制成功'
      setTimeout(() => {
        btn.innerHTML = '复制'
      }, 2000)
    },
    fail: () => {
      btn.innerHTML = '复制失败'
      setTimeout(() => {
        btn.innerHTML = '复制'
      }, 1000)
    },
  })
}

export function restsFiles() {
=======
function restsFiles() {
>>>>>>> 88be933 (feat(save): save)
  const deg = /\.\/(\w+)\/(\d+)?\-?(.+)\.(md|json)$/
  const groupJson: Obj = import.meta.glob('./**/*.json', { eager: true })
  const groupData: Obj = {}
  for (const k in groupJson) {
    const groupKey = k.replace(deg, '$1')
    groupData[groupKey] = groupJson[k].default
  }
<<<<<<< HEAD
  const markdowns: { [key: string]: Markdown } = import.meta.glob('./**/*.md', { eager: true })

  const map: Obj = {}
  for (const k in markdowns) {
    const html = formatHtml(assembleTemplate(markdowns[k].html))
=======
  const markdowns: { [key: string]: MarkDown } = import.meta.glob('./**/*.md', { eager: true })

  const map: Obj = {}
  for (const k in markdowns) {
    const html = assembleTemplate(markdowns[k].html)
>>>>>>> 88be933 (feat(save): save)
    const group = k.replace(deg, '$1')
    const sort = k.replace(deg, '$2')
    const name = k.replace(deg, '$3')
    if (!map[group])
      map[group] = {}
    map[group][name] = { html, sort: sort || 100 }
  }
<<<<<<< HEAD
  const datas: Group[] = Object.keys(map).map((group) => {
    const contents = Object.keys(map[group]).map((name) => {
      return {
        name,
        key: `${group}-${name}`,
=======
  const datas = Object.keys(map).map((group) => {
    const children = Object.keys(map[group]).map((name) => {
      return {
        name,
>>>>>>> 88be933 (feat(save): save)
        ...map[group][name],
      }
    })

<<<<<<< HEAD
    contents.sort((a, b) => a.sort - b.sort)
=======
    children.sort((a, b) => a.sort - b.sort)
>>>>>>> 88be933 (feat(save): save)

    return {
      key: group,
      ...groupData[group],
<<<<<<< HEAD
      contents,
    }
  })
  datas.sort((a, b) => a.sort - b.sort)

  return datas
}

export function componentFiles() {
  const deg = /.*components\/ste-([\w\-]+)\/[\w\-]+\.(md|json)$/

  const props: { [key: string]: Markdown } = import.meta.glob('../../../uni_modules/stellar-ui-plus/components/**/ATTRIBUTES.md', { eager: true })

  const propsData: Obj = {}
  for (const k in props) {
    const html = props[k].html
    const name = k.replace(deg, '$1')
    propsData[name] = html
  }

  const markdowns: { [key: string]: Markdown } = import.meta.glob('../../../uni_modules/stellar-ui-plus/components/**/README.md', { eager: true })

  const markdownsData: Obj = {}

  for (const k in markdowns) {
    // let html = markdowns[k].html;
    let { html, desc, demo, api, guide } = markdowns[k]
    const name = k.replace(deg, '$1')
    if (propsData[name] && api?.includes('<!-- props -->'))
      api = api.replace('<!-- props -->', propsData[name])
    else console.error(`组件【${name}】Props文档异常，请严格按照规范编写文档`)

    markdownsData[name] = {
      html: formatHtml(assembleTemplate(html)),
      htmlDesc: desc,
      htmlDemo: demo ? formatHtml(assembleTemplate(demo)) : '',
      htmlApi: api ? formatHtml(assembleTemplate(api)) : '',
      htmlGuide: guide ? formatHtml(assembleTemplate(guide)) : '',
    }
  }

  const groupData: { [key: string]: Group } = {}

  const componentJson: Obj = import.meta.glob('../../../uni_modules/stellar-ui-plus/components/**/config.json', { eager: true })
  const componentData: Obj = {}
  for (const k in componentJson) {
    const name = k.replace(deg, '$1')
    const component: { group: keyof typeof ComponentGroups, html: string, title: string, sort: number } = componentJson[k].default
    componentData[name] = component
    const { html, htmlDesc, htmlDemo, htmlApi, htmlGuide } = markdownsData[name]
    componentData[name].html = html
    componentData[name].htmlDesc = htmlDesc
    componentData[name].htmlDemo = htmlDemo
    componentData[name].htmlApi = htmlApi
    componentData[name].htmlGuide = htmlGuide

    if (!groupData[component.group])
      groupData[component.group] = Object.assign({ contents: [] }, ComponentGroups[component.group])
    groupData[component.group].contents.push({ ...component, name: component.title, key: name })
  }

  const datas: Group[] = Object.keys(groupData).map((k) => {
    const group = groupData[k]
    group.contents.sort((a, b) => a.sort - b.sort)
    return group
  })

  datas.sort((a, b) => a.sort - b.sort)
  return datas
}
=======
      children,
    }
  })
  datas.sort((a, b) => a.sort - b.sort)
  return datas
}

restsFiles()
>>>>>>> 88be933 (feat(save): save)
