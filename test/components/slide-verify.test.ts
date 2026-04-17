import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steSlideVerify from '../../src/uni_modules/stellar-ui-plus/components/ste-slide-verify/ste-slide-verify.vue';

describe('SlideVerify', () => {
    test('modelValue true should show success state', async () => {
        const wrapper = mount(steSlideVerify, {
            propsData: {
                modelValue: true,
            },
        });

        await Promise.resolve();
        await nextTick();

        const rootEl = wrapper.get('.ste-slide-verify-root');
        expect(rootEl.classes()).toContain('ste-slide-verify-success');
    });

    test('image mode should render image block', async () => {
        const wrapper = mount(steSlideVerify, {
            propsData: {
                mode: 'image',
                imageUrl: 'https://example.com/demo.png',
            },
        });

        await nextTick();

        expect(wrapper.find('.ste-slide-verify-image').exists()).toBe(true);
    });

    test('drag to end should emit success', async () => {
        const wrapper = mount(steSlideVerify);

        await Promise.resolve();
        await nextTick();

        const slider = wrapper.get('.ste-slide-verify-slider');

        await slider.trigger('touchstart', {
            touches: [{ clientX: 0 }],
        });
        await slider.trigger('touchmove', {
            touches: [{ clientX: 9999 }],
        });
        await slider.trigger('touchend');

        expect(wrapper.emitted('success')).toBeTruthy();
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true]);
    });
});
