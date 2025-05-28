/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import Uni from '@dcloudio/vite-plugin-uni';
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest';
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages';
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components';

import selfPlugin from './src/pages/pc/stellar-plus-plugin/index';
import md2HtmlPlugin from './src/pages/pc/stellar-plus-plugin/md-to-html';

import vue3InsetLoaderPlugin from './plugins/vue3-inset-loader';

export default defineConfig({
    plugins: [
        vue3InsetLoaderPlugin,
        md2HtmlPlugin(),
        UniHelperManifest(),
        UniHelperPages({
            homePage: 'pages/pc/index',
            dts: 'src/uni-pages.d.ts',
            exclude: ['**/components/**/*.*'],
            subPackages: ['src/subPackages_demo_view'],
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
        // 添加esbuild配置
        target: ['es2019'], // 支付宝小程序支持的ES版本
    },
    esbuild: {
        // 针对支付宝小程序特别处理
        target: 'es2019',
        // 如果你需要在产物中保留更多debug信息
        keepNames: true,
    },
    server: {
        // 允许CodeSandbox的主机访问
        allowedHosts: ['7rsqf4-5173.csb.app', '.csb.app'],
    },
    // vitest
    test: {
        // ... Specify options here.
        globals: true,
        environment: 'jsdom',
        dir: 'test',
        setupFiles: ['./test/setup.ts'],
    },
});
