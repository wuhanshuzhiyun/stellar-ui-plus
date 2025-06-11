import { mount } from '@vue/test-utils';
import steLoginInfo from '../../src/uni_modules/stellar-ui-plus/components/ste-login-info/ste-login-info.vue';

import { nextTick } from 'vue';

describe('LoginInfo', async () => {
    test('text', async () => {
        const propsData = {
            avatarUrl: 'https://image.whzb.com/chain/StellarUI/头像/付宇威1.png',
            title: '小百食的名称',
            subTitle: '武汉数智云科技有限公司',
            subTitleIcon: '&#xe677;',
            mainColor: '#EC3E1A',
        };
        const wrapper = mount(steLoginInfo, {
            propsData,
        });

        await nextTick();

        expect(wrapper.get('.name-text').text()).toBe(propsData.title);
        expect(wrapper.get('.desc').text()).toContain(propsData.subTitle);
        expect(wrapper.element.style.getPropertyValue('--main-color')).toBe(propsData.mainColor);
    });
});
