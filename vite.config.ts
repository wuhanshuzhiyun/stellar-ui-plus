import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'

// import AutoImport from 'unplugin-auto-import/vite'

import mdPlugin, { Mode } from 'vite-plugin-markdown'
import vue3InsetLoaderPlugin from './plugins/vue3-inset-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue3InsetLoaderPlugin,
    // comTypes(),
    mdPlugin({ mode: [Mode.HTML] }),
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
    // AutoImport({
    //   imports: ['vue', '@vueuse/core', 'uni-app'],
    //   dts: 'src/auto-imports.d.ts',
    //   dirs: ['src/composables', 'src/stores', 'src/utils'],
    //   vueTemplate: true,
    // }),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
  ],
  build: {
    // 开启sourcemap
    sourcemap: true,
  },
})
