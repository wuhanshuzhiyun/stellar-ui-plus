import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steText from '../../src/uni_modules/stellar-ui-plus/components/ste-text/ste-text.vue';

describe('Text', async () => {
    test('text', async () => {
        const text = 'Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水';
        const wrapper = mount(steText, {
            slots: {
                default: text,
            },
        });
        const rootEl = wrapper.get('[data-test="text"]');
        await nextTick();
        expect(rootEl.text()).toBe(text);
    });
});
