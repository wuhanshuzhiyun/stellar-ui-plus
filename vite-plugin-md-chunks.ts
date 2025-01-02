// plugins/md-split-plugin.ts
import type { Plugin } from 'vite'
import mdPlugin, { Mode } from 'vite-plugin-markdown'

function shouldSplitFile(id: string): boolean {
  // 只有 uni_modules/stellar-ui-plus/components 目录下的 README.md 文件需要分割
  return id.includes('uni_modules/stellar-ui-plus/components') && id.endsWith('README.md')
}

// 还原md文件为原始状态
function processMdContent(content: string): string {
  // 先找到第一个 ---$ 并替换成 {{compatibility}}
  const firstReplaced = content.replace('---$', '{{compatibility}}')

  // 然后删除剩余的所有 ---$
  return firstReplaced.replace(/---\$/g, '')
}

function splitMarkdown(content: string) {
  try {
    // 使用 ---$ 分割内容
    const parts = content.split('---$').map(part => part.trim())

    if (parts.length < 4) {
      console.error('请按照正确格式，用---$分割 README.md 文件')
      return {
        desc: content,
        demo: '',
        api: '',
        guide: '',
        html: '',
      }
    }

    const customStr = `{{compatibility}} \n\t\n \n\t\n ### 贡献者 \n\t\n <div class="con-box"> \n\t\n ${parts[3]} \n\t\n </div>`
    return {
      desc: parts[0],
      demo: parts[1],
      api: parts[2],
      guide: customStr,
      html: '',
    }
  }
  catch (error) {
    console.error('Error splitting markdown:', error)
    return {
      desc: content,
      demo: '',
      api: '',
      guide: '',
      html: '',
    }
  }
}

function extractHtmlFromCode(code: string): string {
  const match = code.match(/const html = "(.*?)"\n/s)
  if (match)
    return JSON.parse(`"${match[1]}"`) // 解析转义的字符串

  return ''
}

export default function mdSplitPlugin(): Plugin {
  const originalPlugin = mdPlugin({ mode: [Mode.HTML] })

  return {
    name: 'vite-plugin-md-split',

    async transform(code: string, id: string) {
      if (!id.endsWith('.md'))
        return null

      if (typeof originalPlugin.transform !== 'function') {
        console.error('请检查vite-plugin-markdown插件是否正确安装')
        return null
      }

      // 如果不是需要分割的文件，直接使用原始插件处理
      if (!shouldSplitFile(id))
        return await originalPlugin.transform.call(this, code, id)

      // 分割内容
      const sections = splitMarkdown(code)
      sections.html = processMdContent(code)

      // 使用原始插件处理每个部分
      const processedSections: Record<string, string> = {}

      for (const [key, content] of Object.entries(sections)) {
        try {
          const result = await originalPlugin.transform.call(this, content, id)
          if (result?.code)
            processedSections[key] = extractHtmlFromCode(result.code)
        }
        catch (error) {
          console.error(`Error processing section ${key}:`, error)
          processedSections[key] = ''
        }
      }

      // 生成最终的代码
      return {
        code: `
                export const html = ${JSON.stringify(processedSections.html)};
          export const desc = ${JSON.stringify(processedSections.desc)};
          export const demo = ${JSON.stringify(processedSections.demo)};
          export const api = ${JSON.stringify(processedSections.api)};
          export const guide = ${JSON.stringify(processedSections.guide)};
        `,
        map: null,
      }
    },
  }
}
