import { mount } from '@vue/test-utils';
import steSlider from '../../src/uni_modules/stellar-ui-plus/components/ste-slider/ste-slider.vue';

describe('Slider', () => {
    test('value', () => {
        const value = 30;
        const wrapper = mount(steSlider, {
            propsData: {
                value,
            },
        });

        const lineEl = wrapper.get('.active-box.line');
        expect(lineEl.element.style.width).toBe(value + '%');
    });

    test('vertical', () => {
        const value = 30;
        const wrapper = mount(steSlider, {
            propsData: {
                vertical: true,
                value,
            },
        });

        const rootEl = wrapper.get('.ste-slider-root');
        expect(rootEl.classes()).toContain('ste-slider-vertical');
    });

    test('style', () => {
        const value = 30;
        const barHeight = 26;
        const wrapper = mount(steSlider, {
            propsData: {
                barHeight,
                value,
            },
        });

        const rootEl = wrapper.get('.ste-slider-root');
        expect(rootEl.element.style.getPropertyValue('--progress-height')).toBe(`${barHeight / 2}px`);
    });

    test('disabled', () => {
        const value = 30;
        const wrapper = mount(steSlider, {
            propsData: {
                disabled: true,
                value,
            },
        });

        const rootEl = wrapper.get('.ste-slider-root');
        expect(rootEl.classes()).toContain('ste-slider-disabled');
    });

    test('range', () => {
        const wrapper = mount(steSlider, {
            propsData: {
                range: true,
                value: [10, 30],
            },
        });

        const rangeEls = wrapper.findAll('.slider-bar-box');
        expect(rangeEls.length).toBe(2);
    });
});
