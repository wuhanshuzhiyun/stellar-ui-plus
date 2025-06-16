import { mount } from '@vue/test-utils';
import steDateUser from '../../src/uni_modules/stellar-ui-plus/components/ste-date-user/ste-date-user.vue';
import { nextTick } from 'vue';
describe('DateUser ', async () => {
    test('type is user', async () => {
        let avatar = 'https://image.whzb.com/chain/StellarUI/图片.jpg';
        let nickname = 'test';
        const wrapper = mount(steDateUser, {
            props: {
                avatar,
                nickname,
                type: 'user',
            },
        });
        const rootEl: any = wrapper.get('[data-test="date-user"]');
        let yearDom = rootEl.get('.year');
        await nextTick();
        expect(yearDom.text()).toBe(nickname);
    });
});
