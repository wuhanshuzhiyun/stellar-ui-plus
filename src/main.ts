import { createSSRApp } from 'vue';
import App from './App.vue';

// main.js - 显式指定 .ts 扩展名，防止 Vite 解析同名 color.uts
import useColor from '@/uni_modules/stellar-ui-plus/config/color.ts';

const color = useColor();
color.setColor({ steThemeColor: '#0090FF' });

export function createApp() {
    const app = createSSRApp(App);
    // #ifdef H5
    setTimeout(() => {
        const title = document.head.querySelector('title');
        if (!title) return;
        title.textContent = 'Stellar Plus';
    });
    // #endif
    return { app };
}
