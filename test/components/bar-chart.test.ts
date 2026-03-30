import { mount } from '@vue/test-utils';
import steBarChart from '@/uni_modules/stellar-ui-plus/components/ste-bar-chart/ste-bar-chart.vue';

describe('BarChart', () => {
    test('基本渲染', () => {
        const wrapper = mount(steBarChart);
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义宽度和高度', () => {
        const wrapper = mount(steBarChart, {
            props: {
                width: '800',
                height: '300',
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('显示数据标签', () => {
        const wrapper = mount(steBarChart, {
            props: {
                dataLabel: true,
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('带数据的渲染', () => {
        const wrapper = mount(steBarChart, {
            props: {
                series: [
                    {
                        name: '销量',
                        data: [120, 132, 101, 134, 90, 230, 210],
                    },
                ],
                categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义 padding', () => {
        const wrapper = mount(steBarChart, {
            props: {
                padding: [20, 20, 20, 20],
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('多系列数据', () => {
        const wrapper = mount(steBarChart, {
            props: {
                series: [
                    {
                        name: '销量',
                        data: [120, 132, 101, 134, 90, 230, 210],
                    },
                    {
                        name: '收入',
                        data: [220, 182, 191, 234, 290, 330, 310],
                    },
                ],
                categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('空数据渲染', () => {
        const wrapper = mount(steBarChart, {
            props: {
                series: [],
                categories: [],
            },
        });
        expect(wrapper.exists()).toBe(true);
    });
});
