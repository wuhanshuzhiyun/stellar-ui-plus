// md文件转成html格式的字符串
let mdPlugin
let Mode

async function initializePlugin() {
  if (!mdPlugin) {
    const module = (await import('vite-plugin-markdown')).default
    mdPlugin = module.default
    Mode = module.Mode
  }
  return mdPlugin({ mode: [Mode.HTML] })
}

function shouldSplitFile(id) {
  return id.includes('uni_modules/stellar-ui-plus/components') && id.endsWith('README.md')
}

function processMdContent(content) {
  const firstReplaced = content.replace('---$', '{{compatibility}}')
  return firstReplaced.replace(/---\$/g, '')
}

function splitMarkdown(content) {
  try {
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

function extractHtmlFromCode(code) {
  const match = code.match(/const html = "(.*?)"\n/s)
  if (match)
    return JSON.parse(`"${match[1]}"`)

  return ''
}

module.exports = function md2HtmlPlugin() {
  let originalPlugin

  return {
    name: 'vite-plugin-md-to-html',

    async configResolved() {
      originalPlugin = await initializePlugin()
    },

    async transform(code, id) {
      if (!id.endsWith('.md'))
        return null

      if (!originalPlugin || typeof originalPlugin.transform !== 'function') {
        console.error('请检查vite-plugin-markdown插件是否正确安装')
        return null
      }

      if (!shouldSplitFile(id))
        return await originalPlugin.transform.call(this, code, id)

      // 组件预览页面的md文件需要分割
      const sections = splitMarkdown(code)
      sections.html = processMdContent(code)

      const processedSections = {}

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
