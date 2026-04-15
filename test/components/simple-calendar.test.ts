import { mount } from '@vue/test-utils';
import steSimpleCalendar from '../../src/uni_modules/stellar-ui-plus/components/ste-simple-calendar/ste-simple-calendar.vue';

describe('SimpleCalendar', () => {
    test('default props', () => {
        const wrapper = mount(steSimpleCalendar);
        expect(wrapper.props('formatter')).toBe('YYYY年M月');
        expect(wrapper.props('weekTexts')).toEqual(['周日', '周一', '周二', '周三', '周四', '周五', '周六']);
        expect(wrapper.props('color')).toBe('#000000');
        expect(wrapper.props('showCalendar')).toBe(true);
    });

    test('custom date string', () => {
        const date = '2024-06-15';
        const wrapper = mount(steSimpleCalendar, {
            props: { date },
        });
        expect(wrapper.props('date')).toBe(date);
    });

    test('custom formatter', () => {
        const wrapper = mount(steSimpleCalendar, {
            props: { formatter: 'YYYY/MM' },
        });
        expect(wrapper.props('formatter')).toBe('YYYY/MM');
    });

    test('custom weekTexts', () => {
        const weekTexts = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const wrapper = mount(steSimpleCalendar, {
            props: { weekTexts },
        });
        expect(wrapper.props('weekTexts')).toEqual(weekTexts);
    });

    test('custom color', () => {
        const wrapper = mount(steSimpleCalendar, {
            props: { color: '#0090FF' },
        });
        expect(wrapper.props('color')).toBe('#0090FF');
    });

    test('showCalendar false', () => {
        const wrapper = mount(steSimpleCalendar, {
            props: { showCalendar: false },
        });
        expect(wrapper.props('showCalendar')).toBe(false);
    });

    test('customClass', () => {
        const wrapper = mount(steSimpleCalendar, {
            props: { customClass: 'my-calendar' },
        });
        expect(wrapper.props('customClass')).toBe('my-calendar');
    });

    test('customStyle', () => {
        const customStyle = { backgroundColor: '#f5f5f5', padding: '10px' };
        const wrapper = mount(steSimpleCalendar, {
            props: { customStyle },
        });
        expect(wrapper.props('customStyle')).toEqual(customStyle);
    });

    test('emit date-change on date prop change', async () => {
        const wrapper = mount(steSimpleCalendar, {
            props: { date: '2024-01-01' },
        });
        await wrapper.setProps({ date: '2024-06-15' });
        const emitted = wrapper.emitted('date-change');
        expect(emitted).toBeTruthy();
        expect(emitted![0][0]).toMatchObject({
            date: '2024-06-15',
            year: 2024,
            month: 6,
            day: 15,
        });
    });

    test('date as timestamp', () => {
        const timestamp = new Date('2024-03-20').getTime();
        const wrapper = mount(steSimpleCalendar, {
            props: { date: timestamp },
        });
        expect(wrapper.props('date')).toBe(timestamp);
    });
});
