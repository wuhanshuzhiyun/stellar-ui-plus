import sdk from '@stackblitz/sdk';
import PACKAGE_JSON from './example/package.json';
import TSCONFIG_JSON from './example/tsconfig.json';
import APP_VUE from './example/src/App.vue?raw';
import MAIN_TS from './example/src/main.ts?raw';
import VITE_CONFIG from './example/vite.config.ts?raw';
import INDEX_HTML from './example/index.html?raw';
import PAGES_JSON from './example/pages.json';
import MANIFEST_JSON from './example/manifest.json';
import PAGES_INDEX from './example/src/pages/index.vue?raw';
import PNPM_LOCK from './example/pnpm-lock.yaml?raw';

export default function (codeValue: string) {
    if (!codeValue) return;
    const project = {
        title: 'Stellar-UI-plus',
        description: 'Stellar-UI-plus demo',
        template: 'node' as any,
        files: {
            'package.json': JSON.stringify(PACKAGE_JSON),
            'pnpm-lock.yaml': PNPM_LOCK,
            'tsconfig.json': JSON.stringify(TSCONFIG_JSON),
            'vite.config.ts': VITE_CONFIG,
            'index.html': INDEX_HTML,
            'src/main.ts': MAIN_TS,
            'src/App.vue': APP_VUE,
            'src/pages.json': JSON.stringify(PAGES_JSON),
            'src/manifest.json': JSON.stringify(MANIFEST_JSON),
            'src/pages/index.vue': codeValue,
        },
    };

    const openOptions = { openFile: ['src/pages/demo.vue'] };
    sdk.openProject(project, openOptions);
}
