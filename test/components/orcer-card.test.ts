import { mount } from '@vue/test-utils';
import steOrderCard from '../../src/uni_modules/stellar-ui-plus/components/ste-order-card/ste-order-card.vue';

import { nextTick } from 'vue';

describe('OrderCard', async () => {
    test('base', async () => {
        const data = [
            {
                image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
                title: '梅姨家常菜馆',
                subTitle: '商品描述',
            },
        ];
        const propsData = {
            title: '梅姨家常菜馆',
            image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
            data,
            statusText: '待核销',
            tagText: '标签',
            helperText: '辅助信息：XXXX-XX-XX',
            mainBtnText: '主要功能',
            subBtnText: '次要功能',
        };
        const wrapper = mount(steOrderCard, {
            propsData,
        });

        await nextTick();

        expect(wrapper.get('.head-title').text()).toBe(propsData.title);
        expect(wrapper.get('.order-card-head-r').text()).toBe(propsData.statusText);
        expect(wrapper.get('.sub-tag').text()).toBe(propsData.tagText);

        expect(wrapper.get('.sub-helper').text()).toBe(propsData.helperText);
    });

    test('detail', async () => {
        const data = [
            {
                image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
                title: '梅姨家常菜馆',
                subTitle: '商品描述',
            },
        ];
        const propsData = {
            title: '梅姨家常菜馆',
            image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
            data,
            statusText: '待核销',
            tagText: '标签',
            helperText: '辅助信息：XXXX-XX-XX',
            mainBtnText: '主要功能',
            subBtnText: '次要功能',
            showDetail: true,
        };
        const wrapper = mount(steOrderCard, {
            propsData,
        });

        await nextTick();
        expect(wrapper.get('.info-f').text()).toContain('详情');
    });

    test('moreData', async () => {
        const data = [
            {
                image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
                title: '梅姨家常菜馆',
                subTitle: '商品描述',
            },
            {
                image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
                title: '梅姨家常菜馆',
                subTitle: '商品描述',
            },
            {
                image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
                title: '梅姨家常菜馆',
                subTitle: '商品描述',
            },
        ];
        const propsData = {
            title: '梅姨家常菜馆',
            image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
            data,
            statusText: '待核销',
            tagText: '标签',
            helperText: '辅助信息：XXXX-XX-XX',
            mainBtnText: '主要功能',
            subBtnText: '次要功能',
        };
        const wrapper = mount(steOrderCard, {
            propsData,
        });

        await nextTick();

        expect(wrapper.findAll('.content-item').length).toBe(data.length);
    });

    test('showMore', async () => {
        const data = [
            {
                image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
                title: '梅姨家常菜馆',
                subTitle: '商品描述',
            },
        ];
        const propsData = {
            title: '梅姨家常菜馆',
            image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg',
            data,
            statusText: '待核销',
            tagText: '标签',
            helperText: '辅助信息：XXXX-XX-XX',
            mainBtnText: '主要功能',
            subBtnText: '次要功能',
            showMore: true,
        };
        const wrapper = mount(steOrderCard, {
            propsData,
        });

        await nextTick();
        expect(wrapper.find('.footer-btns-l').text()).toBe('更多');
    });
});
