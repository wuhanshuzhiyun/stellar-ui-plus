import { mount } from '@vue/test-utils';
import steUserInfo from '../../src/uni_modules/stellar-ui-plus/components/ste-user-info/ste-user-info.vue';
import { nextTick } from 'vue';
import { colorRgbToHex } from '../methods';
describe('UserInfo ', async () => {
    test('base', async () => {
        let avatar = 'https://image.whzb.com/chain/StellarUI/图片.jpg';
        let nickname = '张三';
        let list = [
            { title: '数据1', value: '100' },
            { title: '数据2', value: '8' },
            { title: '数据3', value: '8' },
        ];
        let codeSrc = 'https://image.whzb.com/chain/StellarUI/image/code1.png';
        let codeTitle = '核销码';
        let codeTitleColor = '#ec3e1a';

        const wrapper = mount(steUserInfo, {
            props: {
                avatar,
                nickname,
                list,
                codeSrc,
                codeTitle,
                codeTitleColor,
            },
        });
        const rootEl: any = wrapper.get('[data-test="user-info"]');
        const nameDom = rootEl.get('.name');
        const codeTitleDom = rootEl.get('.bottom');
        const itemDom = rootEl.findAll('.item');
        await nextTick();
        expect(nameDom.text()).toBe(nickname);
        expect(itemDom.length).toBe(list.length);
        expect(codeTitleDom.text()).toBe(codeTitle);
        expect(colorRgbToHex(codeTitleDom.element.style._values['color'])).toBe(codeTitleColor);
    });

    test('login', async () => {
        let loginStatus = 0;
        let loginSrc = 'https://image.whzb.com/chain/StellarUI/头像/数智云巡店助手头像.png';
        let loginTitle = '欢迎来到中百食堂~';
        let loginInfo = '马上登录，在线即点';
        let loginBtnText = '注册';
        let loginBtnBg = '#ec3e1a';
        const wrapper = mount(steUserInfo, {
            props: {
                loginStatus,
                loginSrc,
                loginTitle,
                loginInfo,
                loginBtnText,
                loginBtnBg,
            },
        });

        const rootEl: any = wrapper.get('[data-test="user-info"]');
        const loginTitleDom = rootEl.get('.user-box .title');
        const loginInfoDom = rootEl.get('.user-box .info');
        const btnDom = rootEl.get('[data-test="button"]');
        expect(loginTitleDom.text()).toBe(loginTitle);
        expect(loginInfoDom.text()).toBe(loginInfo);
        expect(btnDom.text()).toBe(loginBtnText);
        expect(colorRgbToHex(btnDom.element.style._values['background-color'])).toBe(loginBtnBg);
    });
});
