import { mount } from '@vue/test-utils';
import steFilterTool from '../../src/uni_modules/stellar-ui-plus/components/ste-filter-tool/ste-filter-tool.vue';

import { nextTick } from 'vue';

describe('FilterTool', async () => {
    test('data', async () => {
        const data = [
            {
                title: '商品分类',
                key: 'category',
                children: [
                    { title: '电子产品', value: 'electronics' },
                    { title: '服装鞋', value: 'clothing' },
                    { title: '家居用', value: 'home' },
                    { title: '运动户', value: 'sports' },
                    { title: '美妆护肤', value: 'beauty' },
                    { title: '食品饮料', value: 'food' },
                    { title: '母婴用品', value: 'baby' },
                    { title: '图书音像', value: 'books' },
                ],
            },
            {
                title: '商品状态',
                key: 'status',
                children: [
                    { title: '正常销售', value: 'active' },
                    { title: '暂时下架', value: 'inactive' },
                    { title: '库存不足', value: 'low_stock' },
                    { title: '预售中', value: 'presale' },
                    { title: '已售罄', value: 'sold_out' },
                    { title: '待审核', value: 'pending' },
                ],
            },
        ];
        const wrapper = mount(steFilterTool, {
            propsData: { data },
            slots: {
                default: `<view>筛选</view>`,
            },
        });

        await nextTick();

        const dataLength = data[0].children.length + data[1].children.length;
        expect(wrapper.findAll('.menu-item-child').length).toBe(dataLength);
    });

    test('color', async () => {
        const activeColor = '#ff0000';
        const inactiveColor = '#f1f1f1';
        const wrapper = mount(steFilterTool, {
            propsData: { activeColor, inactiveColor },
            slots: {
                default: `<view>筛选</view>`,
            },
        });

        await nextTick();

        expect(wrapper.element.style.getPropertyValue('--active-color')).toBe(activeColor);
        expect(wrapper.element.style.getPropertyValue('--inactive-color')).toBe(inactiveColor);
    });

    test('default-value', async () => {
        const data = [
            {
                title: '商品分类',
                key: 'category',
                children: [
                    { title: '电子产品', value: 'electronics' },
                    { title: '服装鞋', value: 'clothing' },
                    { title: '家居用', value: 'home' },
                    { title: '运动户', value: 'sports' },
                    { title: '美妆护肤', value: 'beauty' },
                    { title: '食品饮料', value: 'food' },
                    { title: '母婴用品', value: 'baby' },
                    { title: '图书音像', value: 'books' },
                ],
            },
            {
                title: '商品状态',
                key: 'status',
                children: [
                    { title: '正常销售', value: 'active' },
                    { title: '暂时下架', value: 'inactive' },
                    { title: '库存不足', value: 'low_stock' },
                    { title: '预售中', value: 'presale' },
                    { title: '已售罄', value: 'sold_out' },
                    { title: '待审核', value: 'pending' },
                ],
            },
        ];
        const wrapper = mount(steFilterTool, {
            propsData: {
                data,
                value: [
                    {
                        key: 'category',
                        values: ['beauty'],
                    },
                ],
            },
            slots: {
                default: `<view>筛选</view>`,
            },
        });

        await nextTick();
        expect(wrapper.findAll('.menu-item-child.active').at(0)?.html()).toContain('美妆护肤');
    });

    test('showCategory', async () => {
        const data = [
            {
                title: '商品分类',
                key: 'category',
                children: [
                    { title: '电子产品', value: 'electronics' },
                    { title: '服装鞋', value: 'clothing' },
                    { title: '家居用', value: 'home' },
                    { title: '运动户', value: 'sports' },
                    { title: '美妆护肤', value: 'beauty' },
                    { title: '食品饮料', value: 'food' },
                    { title: '母婴用品', value: 'baby' },
                    { title: '图书音像', value: 'books' },
                ],
            },
            {
                title: '商品状态',
                key: 'status',
                children: [
                    { title: '正常销售', value: 'active' },
                    { title: '暂时下架', value: 'inactive' },
                    { title: '库存不足', value: 'low_stock' },
                    { title: '预售中', value: 'presale' },
                    { title: '已售罄', value: 'sold_out' },
                    { title: '待审核', value: 'pending' },
                ],
            },
        ];
        const wrapper = mount(steFilterTool, {
            propsData: {
                data,
                showCategory: false,
            },
            slots: {
                default: `<view>筛选</view>`,
            },
        });

        await nextTick();
        expect(wrapper.findAll('.category-item').length).toBe(0);
    });
});
