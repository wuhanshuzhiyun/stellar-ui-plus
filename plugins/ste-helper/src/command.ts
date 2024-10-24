import { type ExtensionContext, Selection, commands, window } from 'vscode'

// 注册vscode事件
export function registerCommand(context: ExtensionContext) {
  const moveCursor = (characterDelta: number) => {
    const active = window.activeTextEditor!.selection.active!
    const position = active.translate({ characterDelta })
    window.activeTextEditor!.selection = new Selection(position, position)
  }

  context.subscriptions.push(commands.registerCommand('ste-helper.move-cursor', moveCursor))
}
