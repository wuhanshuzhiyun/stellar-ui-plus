import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steSwitch from '../../src/uni_modules/stellar-ui-plus/components/ste-switch/ste-switch.vue';

describe('Switch', async () => {
    let size = 100;
    const wrapper = mount(steSwitch, {
        props: {
            size,
        },
    });
    const switchDom: any = wrapper.get('[data-test="switch"]');
    await nextTick();

    test('size', () => {
        let width = (size * 2 + 4) / 2 + 'px';
        let height = (size + 4) / 2 + 'px';
        expect(switchDom.element.style._values.width).toBe(width);
        expect(switchDom.element.style._values.height).toBe(height);
    });

    test('activeColor', () => {
        let activeColor = 'red';
        const wrapper: any = mount(steSwitch, {
            props: {
                modelValue: true,
                activeColor,
            },
        });
        const switchDom = wrapper.get('[data-test="switch"]');
        expect(switchDom.element.style._values.background).toBe(activeColor);
    });

    test('inactiveColor', () => {
        let inactiveColor = 'black';
        const wrapper: any = mount(steSwitch, {
            props: {
                inactiveColor,
            },
        });
        const switchDom = wrapper.get('[data-test="switch"]');
        expect(switchDom.element.style._values.background).toBe(inactiveColor);
    });

    test('loading', () => {
        const wrapper: any = mount(steSwitch, {
            props: {
                loading: true,
            },
        });
        expect(wrapper.exists('[data-test="loading"]')).toBe(true);
    });
});
