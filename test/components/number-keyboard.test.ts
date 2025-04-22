import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import NumberKeyboard from '../../src/uni_modules/stellar-ui-plus/components/ste-number-keyboard/ste-number-keyboard.vue';
import { style2obj, fontSize } from '../methods';
describe('NumberKeyboard', async () => {
    let textSize = 48;
    const wrapper = mount(NumberKeyboard, {
        props: {
            mode: 'page',
            modelValue: 1,
            maxlength: null,
            show: false,
            rightKeys: true,
            randomKeys: false,
            confirmText: '确定',
            confirmDisabled: false,
            customKeys: [],
            showClear: true,
            textColor: '#000000',
            textSize,
            confirmBg: '',
            confirmColor: '#ffffff',
        },
    });

    const el = wrapper.find('[data-test="number-keyboard"]');
    const style = style2obj(el);
    await nextTick();
    test('mode=page: NumberKeyboard number', async () => {
        const keyboards = wrapper.get('[data-test="number-keyboard-item"]').findAll('.number-keyboard-item');
        expect(keyboards.length).toBe(13);
    });
    test('value', async () => {
        expect(wrapper.props('modelValue')).toBe(1);
    });
    test('maxlength', async () => {
        expect(wrapper.props('maxlength')).toBe(null);
    });
    test('show', async () => {
        expect(wrapper.props('show')).toBe(false);
    });
    test('rightKeys', async () => {
        expect(wrapper.props('rightKeys')).toBe(true);
    });
    test('randomKeys', async () => {
        expect(wrapper.props('randomKeys')).toBe(false);
    });
    test('confirmText', async () => {
        expect(wrapper.props('confirmText')).toBe('确定');
    });
    test('confirmDisabled', async () => {
        expect(wrapper.props('confirmDisabled')).toBe(false);
    });
    test('customKeys', async () => {
        expect(wrapper.props('customKeys')).toEqual([]);
    });
    test('showClear', async () => {
        expect(wrapper.props('showClear')).toBe(true);
    });
    test('textColor', async () => {
        expect(style['--ste-number-keyboard-text-color']).toBe('#000000');
    });
    test('textSize', async () => {
        expect(fontSize(style['--ste-number-keyboard-text-size'])).toBe(textSize / 2 + 'px');
        expect(fontSize(style['--ste-number-keyboard-clear-text-size'])).toBe(textSize / 2 + 'px');
        expect(fontSize(style['--ste-number-keyboard-confirm-text-size'])).toBe(textSize / 2 + 'px');
    });

    test('confirmBg', async () => {
        expect(style['--ste-number-keyboard-confirm-bg']).toBe('#0090FF');
    });

    test('confirmColor', async () => {
        expect(style['--ste-number-keyboard-confirm-color']).toBe('#ffffff');
    });
});
