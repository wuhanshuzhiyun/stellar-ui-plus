import { mount } from '@vue/test-utils';
import steCodeInput from '../../src/uni_modules/stellar-ui-plus/components/ste-code-input/ste-code-input.vue';

describe('CodeInput', async () => {
    test('code', () => {
        const wrapper: any = mount(steCodeInput, {
            props: {
                maxlength: 4,
            },
        });

        const itemEls = wrapper.findAll('.ste-code-input-item');
        expect(itemEls.length).toBe(4);
    });

    test('mode', () => {
        const wrapper: any = mount(steCodeInput, {
            props: {
                mode: 'line',
            },
        });

        const itemEls = wrapper.findAll('.ste-code-input-item-line');

        expect(itemEls.length).toBe(6);
    });

    test('space', () => {
        const wrapper: any = mount(steCodeInput, {
            props: {
                space: 0,
                maxlength: 4,
            },
        });

        const itemEls = wrapper.findAll('.ste-code-input-item');
        expect(itemEls.at(0).element.style.marginRight).toBe('0px');
        expect(itemEls.at(1).element.style.marginRight).toBe('0px');
        expect(itemEls.at(2).element.style.marginRight).toBe('0px');
        expect(itemEls.at(3).element.style.marginRight).toBe('0px');
    });

    test('value', () => {
        const value = '123';
        const formatter = '.';
        const wrapper: any = mount(steCodeInput, {
            props: {
                maxlength: 4,
                formatter,
                value,
            },
        });

        const inputWrapper = wrapper.get('input');
        expect(inputWrapper.element.value).toBe(value);

        const valueEl = wrapper.get('.ste-code-input-item');
        expect(valueEl.text()).toBe(formatter);
    });
});
