import { mount } from '@vue/test-utils';
import steAreaChart from '@/uni_modules/stellar-ui-plus/components/ste-area-chart/ste-area-chart.vue';

describe('AreaChart', () => {
    test('基本渲染', () => {
        const wrapper = mount(steAreaChart);
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义宽度和高度', () => {
        const wrapper = mount(steAreaChart, {
            props: {
                width: '800',
                height: '400'
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('显示数据标签', () => {
        const wrapper = mount(steAreaChart, {
            props: {
                dataLabel: true
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义颜色', () => {
        const wrapper = mount(steAreaChart, {
            props: {
                color: ['#FF0000', '#00FF00', '#0000FF']
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('带数据的渲染', () => {
        const wrapper = mount(steAreaChart, {
            props: {
                series: [
                    {
                        name: '销量',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    }
                ],
                categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义 padding', () => {
        const wrapper = mount(steAreaChart, {
            props: {
                padding: [20, 20, 20, 20]
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('多系列数据', () => {
        const wrapper = mount(steAreaChart, {
            props: {
                series: [
                    {
                        name: '销量',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '收入',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    }
                ],
                categories: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
        });
        expect(wrapper.exists()).toBe(true);
    });
});