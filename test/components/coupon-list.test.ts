import { mount } from '@vue/test-utils';
import steCouponList from '@/uni_modules/stellar-ui-plus/components/ste-coupon-list/ste-coupon-list.vue';

// Mock uni object
global.uni = {
    createSelectorQuery: () => ({
        select: () => ({
            fields: () => ({
                exec: () => Promise.resolve([{ node: { width: 100, height: 100 } }]),
            }),
        }),
    }),
};

describe('CouponList', () => {
    test('基本渲染', () => {
        const wrapper = mount(steCouponList);
        expect(wrapper.exists()).toBe(true);
    });

    test('显示基础数据', () => {
        const data = {
            title: '优惠券标题',
            desc: '优惠券描述',
            image: 'https://example.com/coupon.jpg',
            price: '100元',
            constraint: '满200元可用',
            footers: ['限时优惠', '全场通用'],
        };

        const wrapper = mount(steCouponList, {
            props: {
                data,
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('显示结束时间', () => {
        const wrapper = mount(steCouponList, {
            props: {
                endTime: '2024-12-31 23:59:59',
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('显示剩余数量', () => {
        const wrapper = mount(steCouponList, {
            props: {
                residue: 50,
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('显示进度条', () => {
        const wrapper = mount(steCouponList, {
            props: {
                progress: 75,
                progressText: '已使用75%',
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义按钮文字', () => {
        const wrapper = mount(steCouponList, {
            props: {
                buttonText: '立即领取',
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('禁用按钮', () => {
        const wrapper = mount(steCouponList, {
            props: {
                buttonDisabled: true,
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义背景颜色', () => {
        const wrapper = mount(steCouponList, {
            props: {
                backgroundColor: '#f0f0f0',
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('完整数据渲染', () => {
        const data = {
            title: '新年特惠',
            desc: '全场商品8折优惠',
            image: 'https://example.com/newyear.jpg',
            price: '8',
            constraint: '满100元可用',
            footers: ['限时3天', '全场通用'],
        };

        const wrapper = mount(steCouponList, {
            props: {
                data,
                endTime: new Date('2024-12-31'),
                residue: 100,
                progress: 50,
                progressText: '已使用50%',
                buttonText: '立即购买',
                buttonDisabled: false,
                backgroundColor: '#ffffff',
            },
        });
        expect(wrapper.exists()).toBe(true);
    });
});
