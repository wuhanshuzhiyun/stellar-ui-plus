import type * as vscode from 'vscode'
import { registerHover } from './hoverProvider'
import { registerCommand } from './command'
import { registerCompletions } from './completions'

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "ste-helper" is now active!')
  registerCommand(context)
  registerCompletions(context)
  registerHover(context)
}

export function deactivate() {}
