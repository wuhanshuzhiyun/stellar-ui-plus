const uni = require('@uni-helper/eslint-config')

module.exports = uni({
  rules: {
    'no-console': 'off',
    'no-unexpected-multiline': 'off', // 或 'warn'，如果你不希望此规则严格生效
  },
})
