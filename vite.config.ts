/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import Uni from '@dcloudio/vite-plugin-uni';
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest';
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages';
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components';

import selfPlugin from './src/pages/pc/stellar-plus-plugin/index';
import md2HtmlPlugin from './src/pages/pc/stellar-plus-plugin/md-to-html';

import fs from 'node:fs';
import path from 'node:path';

import vue3InsetLoaderPlugin from './plugins/vue3-inset-loader';

/**
 * 确保普通 Vue/TS 文件在导入省略后缀的模块时，优先匹配 .ts/.js 而非同名 .uts，
 * 彻底消除 uni-app 官方 extensions 数组中 .uts 优先级高于 .ts 导致的 Web 端导入冲突。
 */
function prioritizeTsPlugin() {
    return {
        name: 'prioritize-ts',
        enforce: 'pre' as const,
        resolveId(source: string, importer?: string) {
            if (!importer || importer.endsWith('.uvue') || importer.endsWith('.uts')) {
                return null;
            }
            let target: string | null = null;
            if (source.startsWith('.')) {
                target = path.resolve(path.dirname(importer), source);
            } else if (source.startsWith('@/')) {
                target = path.resolve(__dirname, 'src', source.slice(2));
            }
            if (target && !path.extname(target)) {
                if (fs.existsSync(target + '.ts')) return target + '.ts';
                if (fs.existsSync(target + '.js')) return target + '.js';
                if (fs.existsSync(path.join(target, 'index.ts'))) return path.join(target, 'index.ts');
                if (fs.existsSync(path.join(target, 'index.js'))) return path.join(target, 'index.js');
            }
            return null;
        },
    };
}

export default defineConfig({
    plugins: [
        prioritizeTsPlugin(),
        vue3InsetLoaderPlugin,
        md2HtmlPlugin(),
        UniHelperManifest(),
        UniHelperPages({
            homePage: 'pages/pc/index',
            dts: 'src/uni-pages.d.ts',
            exclude: ['**/components/**/*.*'],
            subPackages: ['src/subPackages_demo_view', 'src/subPackages_pages_view'],
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
