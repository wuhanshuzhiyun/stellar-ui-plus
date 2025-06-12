import { mount } from '@vue/test-utils';
import steLoginInfo from '../../src/uni_modules/stellar-ui-plus/components/ste-login-info/ste-login-info.vue';

import { nextTick } from 'vue';

describe('LoginInfo', async () => {
    test('login', async () => {
        const propsData = {
            avatar: 'https://image.whzb.com/chain/StellarUI/头像/付宇威1.png',
            nickname: '小百食的名称',
            loginStatus: 1 as const,
        };
        const wrapper = mount(steLoginInfo, {
            propsData,
        });

        await nextTick();

        expect(wrapper.get('.name-text').text()).toBe(propsData.nickname);
    });

    test('no-login', async () => {
        const propsData = {
            loginUrl: 'https://image.whzb.com/chain/StellarUI/头像/付宇威1.png',
            loginTitle: '欢迎来到中百食堂~',
            loginInfo: '马上登录，在线即点',
        };
        const wrapper = mount(steLoginInfo, {
            propsData,
        });

        await nextTick();

        expect(wrapper.get('.name-text').text()).toBe(propsData.loginTitle);
    });
});
