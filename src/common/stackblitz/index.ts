import sdk from '@stackblitz/sdk';
import PACKAGE_JSON from './example/package.json';
import MAIN_TS from './example/src/main.ts?raw';
import VITE_CONFIG from './example/vite.config.ts?raw';
import INDEX_HTML from './example/index.html?raw';
import PAGES_JSON from './example/pages.json';
import MANIFEST_JSON from './example/manifest.json';
import PNPM_LOCK from './example/pnpm-lock.yaml?raw';

const APP_VUE_TEMPLATE = `<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app';
onLaunch(() => {});

import { nextTick, watch } from 'vue';
import config from 'stellar-ui-plus/config';

// #ifdef H5
watch(
    () => config.rootStyle,
    style => {
        nextTick(() => {
            Object.keys(style).forEach((key: string) => {
                document.documentElement.style.setProperty(key, style[key]);
            });
        });
    },
    { immediate: true }
);
// #endif
</script>`;

const TSCONFIG_JSON_STRING = `{
    "compilerOptions": {
        "lib": ["DOM", "DOM.Iterable", "ESNext"],
        "module": "ESNext",
        "moduleResolution": "Bundler",
        "resolveJsonModule": true,
        "jsx": "preserve",
        "jsxImportSource": "vue",
        "noImplicitThis": true,
        "strict": true,
        "verbatimModuleSyntax": true,
        "target": "ESNext",
        "useDefineForClassFields": true,
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "skipLibCheck": true,
        "baseUrl": ".",
        "paths": {
            "@/*": ["./src/*"]
        },
        "types": ["vite/client", "@dcloudio/types", "@mini-types/alipay", "miniprogram-api-typings", "@uni-helper/uni-types"]
    },
    "include": ["**/*.d.ts", "src/**/*.ts", "src/**/*.tsx", "src/**/*.jsx", "src/**/*.vue"],
    "vueCompilerOptions": {
        "plugins": ["@uni-helper/uni-types/volar-plugin"]
    }
}`;

export default function (codeValue: string) {
    if (!codeValue) return;
    const project = {
        title: 'Stellar-UI-plus',
        description: 'Stellar-UI-plus demo',
        template: 'node' as any,
        files: {
            'package.json': JSON.stringify(PACKAGE_JSON),
            'pnpm-lock.yaml': PNPM_LOCK,
            'tsconfig.json': TSCONFIG_JSON_STRING,
            'vite.config.ts': VITE_CONFIG,
            'index.html': INDEX_HTML,
            'src/main.ts': MAIN_TS,
            'src/App.vue': APP_VUE_TEMPLATE,
            'src/pages.json': JSON.stringify(PAGES_JSON),
            'src/manifest.json': JSON.stringify(MANIFEST_JSON),
            'src/pages/index.vue': codeValue,
        },
    };

    const openOptions = { openFile: ['src/pages/index.vue'] };
    sdk.openProject(project, openOptions);
}
