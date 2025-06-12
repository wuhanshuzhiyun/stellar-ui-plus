import { mount } from '@vue/test-utils';
import steSearchBox from '../../src/uni_modules/stellar-ui-plus/components/ste-search-box/ste-search-box.vue';

import { nextTick } from 'vue';

describe('SearchBox', async () => {
    test('value', async () => {
        const wrapper = mount(steSearchBox, { propsData: { value: '123' } });

        await nextTick();
        const inputWrapper = wrapper.get('input');
        expect(inputWrapper.element.value).toBe('123');
    });

    test('type', async () => {
        const wrapper = mount(steSearchBox);

        await nextTick();
        const leftAction = wrapper.get('.action-item');
        leftAction.trigger('click');
        await nextTick();
        await new Promise(resolve => setTimeout(resolve, 100));
        const comp = wrapper.find('.ste-calendar-root');
        expect(comp.exists()).toBe(true);
    });
});
