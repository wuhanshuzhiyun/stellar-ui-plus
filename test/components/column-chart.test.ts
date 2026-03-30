import { mount } from '@vue/test-utils';
import steColumnChart from '@/uni_modules/stellar-ui-plus/components/ste-column-chart/ste-column-chart.vue';

describe('ColumnChart', () => {
    test('基本渲染', () => {
        const wrapper = mount(steColumnChart);
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义颜色', () => {
        const wrapper = mount(steColumnChart, {
            props: {
                color: ['#FF0000', '#00FF00', '#0000FF'],
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('显示图例', () => {
        const wrapper = mount(steColumnChart, {
            props: {
                legend: {
                    show: true,
                },
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('带数据的渲染', () => {
        const wrapper = mount(steColumnChart, {
            props: {
                series: {
                    name: '销量',
                    data: [120, 132, 101, 134, 90, 230, 210],
                },
                categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('空数据渲染', () => {
        const wrapper = mount(steColumnChart, {
            props: {
                series: {},
                categories: [],
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义图例配置', () => {
        const wrapper = mount(steColumnChart, {
            props: {
                legend: {
                    show: true,
                    position: 'top',
                },
            },
        });
        expect(wrapper.exists()).toBe(true);
    });
});
