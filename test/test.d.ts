import '@vue/test-utils';

declare module '@vue/test-utils' {
    interface VueWrapper<T> {
        props(): Record<string, any>;
        props(key: string): any;
    }
}
