import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steInput from '../../src/uni_modules/stellar-ui-plus/components/ste-input/ste-input.vue';

describe('Input', () => {
    test('value', () => {
        const value = '123';
        const wrapper = mount(steInput, {
            props: { value },
        });

        const inputEl = wrapper.getComponent('input');
        expect(inputEl.element.value).toBe(value);
    });

    test('type', () => {
        const value = '123';
        const wrapper = mount(steInput, {
            props: { value, type: 'password' },
        });

        expect(wrapper.props().type).toBe('password');
    });

    test('placeholder', () => {
        const placeholder = '请输入';
        const wrapper = mount(steInput, {
            props: { placeholder },
        });

        const inputEl = wrapper.getComponent('input');
        expect(inputEl.attributes('placeholder')).toBe(placeholder);
    });

    test('disabled', () => {
        const wrapper = mount(steInput, {
            props: { disabled: true },
        });

        const inputEl = wrapper.getComponent('input');
        expect(inputEl.attributes('disabled')).toBe('disabled');
    });

    test('words nums', () => {
        const wrapper = mount(steInput, {
            props: { type: 'textarea', showWordLimit: true, maxlength: 140 },
        });

        const inputEl = wrapper.get('.count-text');
        expect(inputEl);
    });

    test('font style', () => {
        const wrapper = mount(steInput, {
            props: { fontSize: '36', fontColor: '#f00' },
        });

        const inputEl = wrapper.get('.ste-input-root');
        expect(inputEl.element.style.getPropertyValue('--input-font-size')).toBe('18px');
        expect(inputEl.element.style.getPropertyValue('--input-font-color')).toBe('#f00');
    });

    test('shape', async () => {
        const wrapper = mount(steInput, {
            props: { shape: 'cicle' },
        });

        let inputEl = wrapper.get('.ste-input-root');
        expect(inputEl.classes()).toContain('ste-input-cicle');

        wrapper.setProps({ shape: 'line' });
        await nextTick();

        inputEl = wrapper.get('.ste-input-root');
        expect(inputEl.classes()).toContain('ste-input-line');
    });
});
