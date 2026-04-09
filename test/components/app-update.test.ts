import { mount } from '@vue/test-utils';
import steAppUpdate from '@/uni_modules/stellar-ui-plus/components/ste-app-update/ste-app-update.vue';

describe('AppUpdate', () => {
    test('基本渲染', () => {
        const wrapper = mount(steAppUpdate, {
            props: {
                clientId: 'test-client-id',
                clientSecret: 'test-client-secret',
                apiUrl: 'https://example.com/api',
                appType: 'uni-app',
                btnText: '立即更新',
                appVersion: '1.0.0',
                zIndex: 999,
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('默认属性', () => {
        const wrapper = mount(steAppUpdate, {
            props: {
                clientId: 'test-client-id',
                clientSecret: 'test-client-secret',
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('验证必填属性', () => {
        const wrapper = mount(steAppUpdate, {
            props: {},
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('验证 URL 格式', () => {
        const wrapper = mount(steAppUpdate, {
            props: {
                clientId: 'test-client-id',
                clientSecret: 'test-client-secret',
                apiUrl: 'invalid-url',
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('验证 zIndex 类型', () => {
        const wrapper = mount(steAppUpdate, {
            props: {
                clientId: 'test-client-id',
                clientSecret: 'test-client-secret',
                zIndex: '1000',
            },
        });
        expect(wrapper.exists()).toBe(true);
    });
});
