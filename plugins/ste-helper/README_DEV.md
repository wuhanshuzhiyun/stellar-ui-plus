## 开发流程

### 初始化

-   `pnpm install`

-   进入vscode调试界面，选择`vscode扩展开发`，开始调试

#### 发布流程

-   有新组件增加或者更新组件文档需要执行`pnpm run gen`命令
-   本地打包插件执行`pnpm run package`
-   发布前执行`pnpm run login`，然后输入下面的token，再执行`pnpm run publish`

ps: 若执行`publish`或`login`命令出现`401`，前往token管理页重新生成再执行`login`
