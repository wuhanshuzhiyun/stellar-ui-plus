import { mount } from '@vue/test-utils';
import steButton from '../../src/uni_modules/stellar-ui-plus/components/ste-button/ste-button.vue';
import { fontSize } from '../methods';
import { nextTick } from 'vue';

describe('Button', async () => {
    test('mode', async () => {
        const wrapper = mount(steButton);
        let rootEl: any = wrapper.get('[data-test="button"]');
        await nextTick();
        expect(fontSize(rootEl.element.style._values['font-size'])).toContain('14px');
    });

    test('round', async () => {
        const wrapper = mount(steButton);
        let rootEl: any = wrapper.get('[data-test="button"]');
        await nextTick();
        expect(rootEl.element.style._values['border-radius']).toContain('24px');
    });

    test('disabled', async () => {
        const wrapper = mount(steButton, {
            props: {
                disabled: true,
            },
        });
        let rootEl: any = wrapper.get('[data-test="button"]');
        await nextTick();
        expect(rootEl.attributes().disabled).toBe('true');
    });

    test('color', async () => {
        const wrapper = mount(steButton, {
            props: {
                color: 'rgb(0, 0, 0)',
                background: 'rgb(255, 30, 25)',
                borderColor: 'rgb(225, 10, 8)',
            },
        });
        let rootEl: any = wrapper.get('[data-test="button"]');
        await nextTick();
        expect(rootEl.element.style.color).toBe('rgb(0, 0, 0)');
        expect(rootEl.element.style.backgroundColor).toBe('rgb(255, 30, 25)');
        expect(rootEl.element.style.borderColor).toBe('rgb(225, 10, 8)');
    });
});
