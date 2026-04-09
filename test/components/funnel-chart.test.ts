import { mount } from '@vue/test-utils';
import steFunnelChart from '@/uni_modules/stellar-ui-plus/components/ste-funnel-chart/ste-funnel-chart.vue';

describe('FunnelChart', () => {
    test('基本渲染', () => {
        const wrapper = mount(steFunnelChart);
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义颜色', () => {
        const wrapper = mount(steFunnelChart, {
            props: {
                color: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('带数据的渲染', () => {
        const wrapper = mount(steFunnelChart, {
            props: {
                series: [
                    {
                        name: '访问',
                        data: 1000,
                    },
                    {
                        name: '注册',
                        data: 800,
                    },
                    {
                        name: '下单',
                        data: 500,
                    },
                    {
                        name: '支付',
                        data: 300,
                    },
                    {
                        name: '成交',
                        data: 200,
                    },
                ],
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('空数据渲染', () => {
        const wrapper = mount(steFunnelChart, {
            props: {
                series: [],
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('单数据渲染', () => {
        const wrapper = mount(steFunnelChart, {
            props: {
                series: [
                    {
                        name: '测试数据',
                        data: 500,
                    },
                ],
            },
        });
        expect(wrapper.exists()).toBe(true);
    });
});
