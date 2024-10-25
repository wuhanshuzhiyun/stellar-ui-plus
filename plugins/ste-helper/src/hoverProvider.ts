import { Hover, MarkdownString, languages } from 'vscode'
import type { ExtensionContext, Position, TextDocument } from 'vscode'

import { bigCamelize, kebabCase } from './utils'
import { componentMap } from './componentMap'
import { BIG_LINK_REG, DOC_URL, LINK_REG, MARKDOWN_LINE, files } from './constant'

export function getComponentTableTemplate(component: string) {
  const { props, events } = componentMap[component]
  let propsTable = ``
  propsTable += `|属性名 |说明  |类型 |默认值 |可选值 |\n| :--- | :--- | :--- | :--- | :--- |\n`
  let eventsTable = ``
  eventsTable += `|事件名 |说明  |事件参数 |\n| :--- | :--- | :--- |\n`

  props?.forEach((item) => {
    const description = item.description || '-'
    const type = `\`${item.type.replace(' | ', '/')}\``
    const def = typeof item.default === 'object' ? `\`${JSON.stringify(item.default)}\`` : item.default !== undefined ? `\`${item.default}\`` : '-'
    const values = item.values?.length ? item.values.map(value => `\`${value.name}\`：${value.description}`).join('\t') : '-'

    propsTable += `| \`${item.name}\` | ${description} | ${type} | ${def} | ${values}  |\n`
  })

  events?.forEach((item) => {
    const description = item.description || '-'
    const name = item.name.replace('[event]', '')
    const params = item.params?.length ? item.params.map(param => `\`${param.name}\`：${param.description}`).join('<br/>') : '-'

    eventsTable += `| \`${name}\` | ${description} | ${params} |\n`
  })

  return {
    propsTable,
    eventsTable: events && events?.length > 0 ? eventsTable : '',
  }
}

export function registerHover(context: ExtensionContext) {
  const provideHover = (document: TextDocument, position: Position) => {
    // 获取当前鼠标上的字符
    const wordRange = document.getWordRangeAtPosition(position)
    const word = document.getText(wordRange)

    // 获取鼠标当前行的字符
    const line = document.lineAt(position)
    const componentLink = line.text.match(LINK_REG) ?? []
    const componentBigLink = line.text.match(BIG_LINK_REG) ?? []
    const components = [...new Set([...componentLink, ...componentBigLink.map(kebabCase)])]

    if (components.length) {
      const text = components
        .filter((item: string) => componentMap[item])
        .map((item: string) => {
          const { props, events } = componentMap[item]
          const docString = `#### StellarUI -> ${bigCamelize(item)} 组件文档 [[地址]](${DOC_URL}${item})\n`
          let subString = ''
          // 鼠标hover在属性或者方法上会显示描述，否则显示当前组件的整体描述
          const propValue = props?.find(e => e.name === word) || events?.find(e => e.name === word)
          if (propValue) {
            subString = ` 描述: ${propValue?.description} \n ${MARKDOWN_LINE}`

            if ('values' in propValue)
              subString += `可选值:  ${propValue.values?.map(value => `\`${value.name}\`(${value.description})`).join(`    `)}`
          }
          else {
            const markdonw = getComponentTableTemplate(item)
            console.log('markdonw.propsTable is ', markdonw.propsTable)
            subString = `${markdonw.propsTable} \n ${markdonw.eventsTable}`
            return new MarkdownString(`${docString} \n ${markdonw.propsTable} \n ${markdonw.eventsTable}`)
          }

          return new MarkdownString(`${docString} \n ${subString}`)
        })

      return new Hover(text)
    }
  }

  context.subscriptions.push(
    languages.registerHoverProvider(files, {
      provideHover,
    }),
  )
}
