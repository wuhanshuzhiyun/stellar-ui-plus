const uni = require('@uni-helper/eslint-config')
<<<<<<< HEAD

module.exports = uni({
  rules: {
    'no-console': 'off',
    'no-unexpected-multiline': 'off', // 或 'warn'，如果你不希望此规则严格生效
  },
})
=======
const unocss = require('@unocss/eslint-plugin')

module.exports = uni(
  {
    rules: {
      'no-console': 'off',
    },
  },
  unocss.configs.flat,
)
>>>>>>> f9c262a (feat(init): init)
