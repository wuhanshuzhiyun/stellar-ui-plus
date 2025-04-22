import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steInput from '../../src/uni_modules/stellar-ui-plus/components/ste-input/ste-input.vue';
import { fontSize } from '../methods';

describe('Input', () => {
    test('value', () => {
        const value = '123';
        const wrapper: any = mount(steInput, {
            props: { value },
        });

        const inputEl = wrapper.get('input');
        console.log('wrapper', wrapper.html());
        console.log('inputEl', inputEl.attributes());

        expect(inputEl.attributes().value).toBe(value);
    });

    test('type', () => {
        const value = '123';
        const wrapper: any = mount(steInput, {
            props: { value, type: 'password' },
        });

        expect(wrapper.props().type).toBe('password');
    });

    test('placeholder', () => {
        const placeholder = '请输入';
        const wrapper: any = mount(steInput, {
            props: { placeholder },
        });

        const inputEl = wrapper.get('.uni-input-placeholder');
        expect(inputEl.text()).toBe(placeholder);
    });

    test('disabled', () => {
        const wrapper: any = mount(steInput, {
            props: { disabled: true },
        });
        const inputEl = wrapper.get('.uni-input-placeholder');
        expect(inputEl.element.style.getPropertyValue('color')).toBe('rgb(187, 187, 187)');
    });

    test('words nums', () => {
        const wrapper: any = mount(steInput, {
            props: { type: 'textarea', showWordLimit: true, maxlength: 140 },
        });

        const inputEl = wrapper.get('.count-text');
        expect(inputEl);
    });

    test('font style', () => {
        const wrapper: any = mount(steInput, {
            props: { fontSize: '36', fontColor: '#f00' },
        });

        const inputEl = wrapper.get('.ste-input-root');
        expect(fontSize(inputEl.element.style.getPropertyValue('--input-font-size'))).toBe('18px');
        expect(inputEl.element.style.getPropertyValue('--input-font-color')).toBe('#f00');
    });

    test('shape', async () => {
        let wrapper: any = mount(steInput, {
            props: { shape: 'cicle' },
        });

        let inputEl = wrapper.get('.ste-input-root');
        await nextTick();
        expect(inputEl.classes().includes('ste-input-cicle')).toBe(true);

        wrapper = mount(steInput, {
            props: { shape: 'line' },
        });
        inputEl = wrapper.get('.ste-input-root');
        await nextTick();
        expect(inputEl.classes().includes('ste-input-line')).toBe(true);
    });
});
