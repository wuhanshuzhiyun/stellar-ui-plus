import { mount } from '@vue/test-utils';
import steCategory from '../../src/uni_modules/stellar-ui-plus/components/ste-category/ste-category.vue';

import { nextTick } from 'vue';

describe('Category', async () => {
    test('data', async () => {
        const data = [
            { title: '全部商品', value: 'all', count: 11 },
            { title: '零食', value: 'linghsi', count: 3 },
            { title: '清洁用品', value: 'qingjie', count: 4 },
            { title: '粮油', value: 'liangyou', count: 10 },
            { title: '肉类', value: 'roulei', count: 12 },
            { title: '水果', value: 'shuiguo', count: 13 },
        ];
        const wrapper = mount(steCategory, {
            propsData: {
                data,
            },
        });

        await nextTick();

        const itemEls = wrapper.findAll('.category-item');
        expect(itemEls.length).toBe(data.length);
        itemEls.forEach((item, index) => {
            expect(item.get('.title').text()).toBe(data[index].title);
        });
    });

    test('value', async () => {
        const data = [
            { title: '全部商品', value: 'all', count: 11 },
            { title: '零食', value: 'linghsi', count: 3 },
            { title: '清洁用品', value: 'qingjie', count: 4 },
            { title: '粮油', value: 'liangyou', count: 10 },
            { title: '肉类', value: 'roulei', count: 12 },
            { title: '水果', value: 'shuiguo', count: 13 },
        ];
        const active = { value: 'roulei', title: '肉类' };
        const wrapper = mount(steCategory, {
            propsData: {
                data,
                value: active.value,
            },
        });

        await nextTick();

        const activeItem = wrapper.find('.category-item.active');
        expect(activeItem.text()).toBe(active.title);
    });
});
