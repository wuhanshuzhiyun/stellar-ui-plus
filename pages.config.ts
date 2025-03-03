import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages';

export default defineUniPages({
    insetLoader: {
        config: {
            toast: "<ste-toast ref='steToast'></ste-toast>",
            messageBox: "<ste-message-box ref='steMessageBox'></ste-message-box>",
        },
        // 全局配置
        label: ['toast', 'messageBox'],
        rootEle: '.*',
    },
    pages: [],
    globalStyle: {
        backgroundColor: '@bgColor',
        backgroundColorBottom: '@bgColorBottom',
        backgroundColorTop: '@bgColorTop',
        backgroundTextStyle: '@bgTxtStyle',
        navigationBarBackgroundColor: '#000000',
        navigationBarTextStyle: '@navTxtStyle',
        navigationBarTitleText: '',
        navigationStyle: 'custom',
        disableScroll: true,
        'mp-alipay': {
            transparentTitle: 'always',
            titlePenetrate: 'YES',
            allowsBounceVertical: 'NO',
            navigationBarTitleText: ' ',
        },
    },
    // tabBar: {
    //   backgroundColor: "@tabBgColor",
    //   borderStyle: "@tabBorderStyle",
    //   color: "@tabFontColor",
    //   selectedColor: "@tabSelectedColor",
    // },
    easycom: {
        autoscan: true,
        custom: {
            '^(.*)': '@/components/$1/$1.vue',
            '^ste-(.*)': '@/uni_modules/stellar-ui-plus/components/ste-$1/ste-$1.vue',
        },
    },
});
