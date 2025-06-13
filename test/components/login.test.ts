import { mount } from '@vue/test-utils';
import steLogin from '../../src/uni_modules/stellar-ui-plus/components/ste-login/ste-login.vue';

import { nextTick } from 'vue';

describe('Login', async () => {
    test('login', async () => {
        const baseTip = '版本信息 V1.0.0';
        const base = '我已认真阅读、理解并同意';
        const protocolData = [
            { title: '中心仓储用户注册协议', key: 'p1' },
            { title: '数智云隐私政策', key: 'p2' },
        ];

        const primaryBtn = [
            {
                title: '微信一键登录',
                key: 'wx',
            },
        ];

        const secondaryBtn = [
            {
                title: '其他号码登录/注册',
                key: 'other',
            },
            {
                title: '暂不登录',
                key: 'no',
            },
        ];
        const wrapper = mount(steLogin, {
            propsData: {
                baseProtocol: baseTip,
                protocolData,
                primaryBtn,
                secondaryBtn,
                bottomTip: base,
            },
        });

        await nextTick();
        expect(wrapper.findAll('.protocol').length).toBe(protocolData.length);
        expect(wrapper.findAll('.btn-item.primary').length).toBe(primaryBtn.length);
        expect(wrapper.findAll('.btn-item.secondary').length).toBe(secondaryBtn.length);
    });

    test('color', async () => {
        const baseTip = '版本信息 V1.0.0';
        const base = '我已认真阅读、理解并同意';
        const protocolData = [
            { title: '中心仓储用户注册协议', key: 'p1' },
            { title: '数智云隐私政策', key: 'p2' },
        ];

        const primaryBtn = [
            {
                title: '微信一键登录',
                key: 'wx',
            },
        ];

        const secondaryBtn = [
            {
                title: '其他号码登录/注册',
                key: 'other',
            },
            {
                title: '暂不登录',
                key: 'no',
            },
        ];
        const wrapper = mount(steLogin, {
            propsData: {
                baseProtocol: baseTip,
                protocolData,
                primaryBtn,
                secondaryBtn,
                bottomTip: base,
                color: '#e91e63',
            },
        });

        await nextTick();
        expect(wrapper.element.style.getPropertyValue('--main-color')).toBe('#e91e63');
    });

    test('formData', async () => {
        const loginGroup = [
            {
                title: '登录账号',
                key: 'account',
                items: [
                    {
                        title: '选择账号',
                        key: 'account',
                        type: 'select' as const,
                        selectData: [
                            { title: '账号1', key: '1' },
                            { title: '账号2', key: '2' },
                        ],
                    },
                    {
                        title: '提示',
                        key: 'tip',
                        type: 'txt' as const,
                        value: '若账号列表为空或要登录的门店不在列表中，请先绑定账号。',
                    },
                ],
            },
            {
                title: '账号绑定',
                key: 'bind',
                items: [
                    {
                        title: '账号',
                        key: 'username',
                        type: 'number' as const,
                    },
                    {
                        title: '密码',
                        key: 'password',
                        type: 'password' as const,
                    },
                ],
            },
        ];
        const wrapper = mount(steLogin, {
            propsData: {
                mode: 'mode1',
                loginGroup,
            },
        });

        await nextTick();
        expect(wrapper.findAll('.tab-box .tab').length).toBe(loginGroup.length);
    });
});
