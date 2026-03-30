// 告诉 TS：所有以 .vue 结尾的文件都是一个 Vue 组件模块
declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// 如果是 uni-app x，可能还需要识别 .uvue
declare module '*.uvue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
