import { defineConfig } from 'vite'
import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import mdPlugin, { Mode } from 'vite-plugin-markdown'
import selfPlugin from './src/pages/pc/stellar-plus-plugin/index'
import md2HtmlPlugin from './src/pages/pc/stellar-plus-plugin/md-to-html'

import vue3InsetLoaderPlugin from './plugins/vue3-inset-loader'

export default defineConfig({
  plugins: [
    vue3InsetLoaderPlugin,
    md2HtmlPlugin(),
    mdPlugin({ mode: [Mode.HTML] }),
    UniHelperManifest(),
    UniHelperPages({
      homePage: 'pages/pc/index',
      dts: 'src/uni-pages.d.ts',
      exclude: ['**/components/**/*.*'],
    }),
    UniHelperComponents({
      dts: 'src/components.d.ts',
      directoryAsNamespace: true,
    }),
    Uni(),
    selfPlugin(),
  ],
  build: {
    // 开启sourcemap
    sourcemap: true,
  },
})
