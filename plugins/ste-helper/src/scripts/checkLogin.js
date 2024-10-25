const { execSync } = require('node:child_process')
const process = require('node:process')

try {
  // 执行 vsce ls-publishers 查看当前已登录的 Publisher
  const result = execSync('vsce ls-publishers').toString()

  if (!result.includes('StellarUI')) {
    console.log('未检测到登录信息。正在登录...')
    execSync('vsce login StellarUI', { stdio: 'inherit' })
  }
  else {
    console.log('已登录到 StellarUI，无需重复登录。')
  }
}
catch (error) {
  console.error('检测登录状态失败，请确保已安装 vsce 并配置正确：', error.message)
  process.exit(1)
}
