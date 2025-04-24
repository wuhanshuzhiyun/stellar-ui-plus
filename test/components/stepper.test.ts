import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Stepper from '../../src/uni_modules/stellar-ui-plus/components/ste-stepper/ste-stepper.vue';

describe('Stepper', async () => {
    const wrapper = mount(Stepper, {
        props: {
            modelValue: 2,
            min: 1,
            max: 100,
            precision: 0,
            inputWidth: 64,
            btnSize: 48,
            mainColor: '#0090ff',
            disabled: false,
            disablePlus: false,
            disableMinus: false,
            disablelnput: false,
            theme: 'card',
        },
    });
    const ipt: any = wrapper.get('input ');

    await nextTick();
    test('value', async () => {
        expect(ipt.wrapperElement.value).toBe('2');
    });

    test('min', () => {
        expect(wrapper.props('min')).toBe(1);
    });

    test('max', () => {
        expect(wrapper.props('max')).toBe(100);
    });

    test('precision', () => {
        expect(wrapper.props('precision')).toBe(0);
    });

    test('inputWidth', () => {
        expect(wrapper.props('inputWidth')).toBe(64);
    });

    test('btnSize', () => {
        expect(wrapper.props('btnSize')).toBe(48);
    });

    test('mainColor', () => {
        expect(wrapper.props('mainColor')).toBe('#0090ff');
    });

    test('disabled', () => {
        expect(wrapper.props('disabled')).toBe(false);
    });

    test('disablePlus', () => {
        expect(wrapper.props('disablePlus')).toBe(false);
    });

    test('disableMinus', () => {
        expect(wrapper.props('disableMinus')).toBe(false);
    });

    test('disableInput', () => {
        expect(wrapper.props('disableInput')).toBe(false);
    });

    test('theme', () => {
        expect(wrapper.props('theme')).toBe('card');
    });
});
