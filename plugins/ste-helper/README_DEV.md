## 开发流程

### 初始化

-   `pnpm install`

-   进入vscode调试界面，选择`vscode扩展开发`，开始调试

#### 注意事项

-   有新组件增加或者更新组件文档需要执行`pnpm run gen`命令
-   本地打包插件执行`pnpm run package`
-   在`package.json`中版本号加一
-   发布前执行`pnpm run login`，然后输入下面的token，再执行`pnpm run publish`

#### 相关地址账号

-   微软账号密码：`StellarUI@proton.me` / `Stellar-ui-dev`
-   微软账号辅助邮箱: `StellarUI@proton.me` / `1234Abcd_`
-   [微软账号登录地址](https://login.live.com) [插件发布管理页](https://marketplace.visualstudio.com/manage/publishers/stellarui) [辅助邮箱地址](https://protonmail.com/)
-   发布前登录token: `vlbepgif26s7bywy5lbovpmoowk6lu2egoyxc4vn4in4u6sh52uq`，若到期失效需要重新生成[地址](https://dev.azure.com/stellarUI/_usersSettings/tokens)
