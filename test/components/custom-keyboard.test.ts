import { mount } from '@vue/test-utils';
import steCustomKeyboard from '@/uni_modules/stellar-ui-plus/components/ste-custom-keyboard/ste-custom-keyboard.vue';

describe('CustomKeyboard', () => {
    test('基本渲染', () => {
        const wrapper = mount(steCustomKeyboard);
        expect(wrapper.exists()).toBe(true);
    });

    test('popup 模式', () => {
        const wrapper = mount(steCustomKeyboard, {
            props: {
                mode: 'popup'
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('page 模式', () => {
        const wrapper = mount(steCustomKeyboard, {
            props: {
                mode: 'page'
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('数字类型', () => {
        const wrapper = mount(steCustomKeyboard, {
            props: {
                type: 'number'
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('折扣类型', () => {
        const wrapper = mount(steCustomKeyboard, {
            props: {
                type: 'discount',
                discounts: [0.8, 0.9, 0.95]
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('身份证类型', () => {
        const wrapper = mount(steCustomKeyboard, {
            props: {
                type: 'idcard'
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('显示状态', () => {
        const wrapper = mount(steCustomKeyboard, {
            props: {
                show: true
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('设置最大长度', () => {
        const wrapper = mount(steCustomKeyboard, {
            props: {
                maxlength: 10
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义按键', () => {
        const wrapper = mount(steCustomKeyboard, {
            props: {
                customKeys: ['A', 'B', 'C']
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('随机按键', () => {
        const wrapper = mount(steCustomKeyboard, {
            props: {
                randomKeys: true
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('隐藏右侧按键', () => {
        const wrapper = mount(steCustomKeyboard, {
            props: {
                rightKeys: false
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('隐藏清除按钮', () => {
        const wrapper = mount(steCustomKeyboard, {
            props: {
                showClear: false
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义确认按钮文字', () => {
        const wrapper = mount(steCustomKeyboard, {
            props: {
                confirmText: '提交'
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('禁用确认按钮', () => {
        const wrapper = mount(steCustomKeyboard, {
            props: {
                confirmDisabled: true
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义样式', () => {
        const wrapper = mount(steCustomKeyboard, {
            props: {
                textColor: '#333333',
                textSize: 24,
                confirmBg: '#007AFF',
                confirmColor: '#FFFFFF',
                keyBg: '#F5F5F5',
                background: '#E5E5E5'
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('多输入框支持', () => {
        const wrapper = mount(steCustomKeyboard, {
            props: {
                activeInputRef: 'phone',
                inputValues: {
                    phone: '13800138000',
                    code: '1234'
                }
            }
        });
        expect(wrapper.exists()).toBe(true);
    });
});