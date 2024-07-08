import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
<<<<<<< HEAD
import selfPlugin from './src/pages/pc/stellar-plus-plugin/index'
import md2HtmlPlugin from './src/pages/pc/stellar-plus-plugin/md-to-html'

// import AutoImport from 'unplugin-auto-import/vite'

import vue3InsetLoaderPlugin from './plugins/vue3-inset-loader'
=======
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
>>>>>>> f9c262a (feat(init): init)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
<<<<<<< HEAD
    vue3InsetLoaderPlugin,
    // comTypes(),
    md2HtmlPlugin(),
=======
>>>>>>> f9c262a (feat(init): init)
    // https://github.com/uni-helper/vite-plugin-uni-manifest
    UniHelperManifest(),
    // https://github.com/uni-helper/vite-plugin-uni-pages
    UniHelperPages({
      homePage: 'pages/pc/index',
      dts: 'src/uni-pages.d.ts',
      exclude: ['**/components/**/*.*'],
    }),
    // https://github.com/uni-helper/vite-plugin-uni-components
    UniHelperComponents({
      dts: 'src/components.d.ts',
      directoryAsNamespace: true,
    }),
    Uni(),
    // https://github.com/antfu/unplugin-auto-import
<<<<<<< HEAD
    // AutoImport({
    //   imports: ['vue', '@vueuse/core', 'uni-app'],
    //   dts: 'src/auto-imports.d.ts',
    //   dirs: ['src/composables', 'src/stores', 'src/utils'],
    //   vueTemplate: true,
    // }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    selfPlugin(),
  ],
  build: {
    // 开启sourcemap
    sourcemap: true,
  },
=======
    AutoImport({
      imports: ['vue', '@vueuse/core', 'uni-app'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores', 'src/utils'],
      vueTemplate: true,
    }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    UnoCSS(),
  ],
>>>>>>> f9c262a (feat(init): init)
})
