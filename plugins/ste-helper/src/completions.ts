import { CompletionItem, CompletionItemKind, MarkdownString, Position, Range, languages } from 'vscode'
import type { type CompletionItemProvider, type ExtensionContext, TextDocument } from 'vscode'

import { bigCamelize, kebabCase } from './utils'
import { componentMap } from './componentMap'
import type { ComponentDesc } from './componentDesc'
import { ATTR_RE, files } from './constant'

export function registerCompletions(context: ExtensionContext) {
  const componentsProvider: CompletionItemProvider = {
    provideCompletionItems() {
      const completionItems: CompletionItem[] = []
      Object.keys(componentMap).forEach((key: string) => {
        completionItems.push(new CompletionItem(`ste-${key}`, CompletionItemKind.Field), new CompletionItem(bigCamelize(`nut-${key}`), CompletionItemKind.Field))
      })
      return completionItems
    },
    resolveCompletionItem(item: CompletionItem): any {
      const name = kebabCase(<string>item.label).slice(4)
      const descriptor: ComponentDesc = componentMap[name]

      const propsText = descriptor.attr ? descriptor.attr : ''
      const tagSuffix = `</${item.label}>`
      item.insertText = `<${item.label} ${propsText}>${tagSuffix}`

      item.command = {
        title: 'ste-helper.move-cursor',
        command: 'ste-helper.move-cursor',
        arguments: [-tagSuffix.length - 2],
      }
      return item
    },
  }

  const attrProvider: CompletionItemProvider = {
    provideCompletionItems(document: TextDocument, position: Position) {
      const text = document.getText(new Range(new Position(0, 0), new Position(position.line, position.character)))
      const offset = document.offsetAt(position)
      const lastText = document.getText().substring(offset)
      const nextCharacter = lastText.charAt(0)

      if (nextCharacter !== ' ' && nextCharacter !== '\n' && nextCharacter !== '/' && nextCharacter !== '>')
        return null

      if (!Array.from(text.matchAll(ATTR_RE)).length)
        return null

      let name: string = ''
      let matchedValue: string
      let startIndex = 0

      for (const matched of text.matchAll(ATTR_RE)) {
        name = kebabCase(matched[1] ?? matched[2])
        matchedValue = matched[0]
        startIndex = matched.index!
      }

      const currentIndex = text.length
      const endIndex = startIndex! + matchedValue!.length

      if (currentIndex > endIndex || currentIndex < startIndex!)
        return null

      const tag = componentMap[name.replace(/^ste-/, '')]

      if (!tag)
        return null

      const words = matchedValue!.split(' ')
      const lastWord = words[words.length - 1]
      const hasAt = lastWord.startsWith('@')
      const hasColon = lastWord.startsWith(':')

      const events
                = tag.events?.map((event) => {
                  const item = new CompletionItem(
                    {
                      label: `@${event.name}`,
                      description: event.description,
                    },
                    CompletionItemKind.Event,
                  )

                  item.filterText = event.name
                  item.documentation = new MarkdownString(`\
    事件: ${event.name}
    描述: ${event.description}`)
                  item.insertText = hasAt ? event.name : `@${event.name}`

                  return item
                }) || []

      const props
                = tag.props?.map((attr) => {
                  const item = new CompletionItem(
                    {
                      label: attr.name,
                      description: attr.description,
                    },
                    CompletionItemKind.Value,
                  )

                  item.sortText = '0'

                  item.documentation = new MarkdownString(`\
    属性: ${attr.name}
    描述: ${attr.description}
    类型: ${attr.type}
    默认值: ${attr.default || '-'}`)

                  item.insertText = attr.name

                  item.command = { command: 'extension.triggerCompletion', title: 'Trigger value completion' }

                  return item
                }) || []

      return [...(hasAt ? [] : props), ...(hasColon ? [] : events)]
    },

    resolveCompletionItem(item: CompletionItem) {
      item.command = {
        title: 'varlet.move-cursor',
        command: 'varlet.move-cursor',
        arguments: [-1],
      }
      item.insertText = `${item.insertText}=""`

      //

      return item
    },
  }

  context.subscriptions.push(languages.registerCompletionItemProvider(files, componentsProvider))
  context.subscriptions.push(languages.registerCompletionItemProvider(files, attrProvider, ' ', '@', ':'))
}
