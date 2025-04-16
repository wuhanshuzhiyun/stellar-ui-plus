import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Calendar from '../../src/uni_modules/stellar-ui-plus/components/ste-calendar/ste-calendar.vue';

describe('Calendar Component', async () => {
	const wrapper = mount(Calendar, {
		// props: {
		// 	title: '选择日期',
		// 	showTitle: true,
		// 	list: [],
		// 	mode: "single",
		// 	startText: "开始",
		// 	endText: "结束",
		// 	color: "#0090ff",
		// 	weekendColor: "#ff0000",
		// 	minDate: "2022-01-01",
		// 	maxDate: "2022-12-31",
		// 	defaultDate: "2022-01-01",
		// 	monthCount: 0,
		// 	maxCount: 0,
		// 	formatter: "YYYY-MM-DD",
		// 	showMark: true,
		// 	readonly: false,
		// 	maxRange: 0,
		// 	rangePrompt: "请选择日期范围",
		// 	showRangePrompt: true,
		// 	allowSameDay: true,
		// 	showConfirm: true,
		// 	signs: {},
		// },
	});
	await nextTick();

	test('title', async () => {
		const title = wrapper.find('.calendar-title');
		expect(title.text()).toBe('选择日期');
	});

	// test('showTitle', async () => {
	// 	const title = wrapper.find('.calendar-title');
	// 	expect(title.exists()).toBe(true);
	// });

	// test('list', async () => {
	// 	expect(wrapper.props('list')).toEqual([]);
	// })
	// test('mode', async () => {
	// 	expect(wrapper.props('mode')).toBe('single');
	// })
	// test('startText', async () => {
	// 	expect(wrapper.props('startText')).toBe('开始');
	// })
	// test('endText', async () => {
	// 	expect(wrapper.props('endText')).toBe('结束');
	// })
	// test('color', async () => {
	// 	expect(wrapper.props('color')).toBe('#0090ff');
	// })
	// test('weekendColor', async () => {
	// 	expect(wrapper.props('weekendColor')).toBe('#ff0000');
	// })
	// test('minDate', async () => {
	// 	expect(wrapper.props('minDate')).toBe('2022-01-01');
	// })
	// test('maxDate', async () => {
	// 	expect(wrapper.props('maxDate')).toBe('2022-12-31');
	// })
	// test('defaultDate', async () => {
	// 	expect(wrapper.props('defaultDate')).toBe('2022-01-01');
	// })
	// test('monthCount', async () => {
	// 	expect(wrapper.props('monthCount')).toBe(0);
	// })
	// test('maxCount', async () => {
	// 	expect(wrapper.props('maxCount')).toBe(0);
	// })
	// test('formatter', async () => {
	// 	expect(wrapper.props('formatter')).toBe('YYYY-MM-DD');
	// })
	// test('showMark', async () => {
	// 	expect(wrapper.props('showMark')).toBe(true);
	// })
	// test('readonly', async () => {
	// 	expect(wrapper.props('readonly')).toBe(false);
	// })
	// test('maxRange', async () => {
	// 	expect(wrapper.props('maxRange')).toBe(0);
	// })
	// test('rangePrompt', async () => {
	// 	expect(wrapper.props('rangePrompt')).toBe('请选择日期范围');
	// })
	// test('showRangePrompt', async () => {
	// 	expect(wrapper.props('showRangePrompt')).toBe(true);
	// })
	// test('allowSameDay', async () => {
	// 	expect(wrapper.props('allowSameDay')).toBe(true);
	// })
	// test('showConfirm', async () => {
	// 	const btn = wrapper.find('[data-test="confirm-button"]');
	// 	expect(btn.exists()).toBe(true);
	// })
	// test('signs', async () => {
	// 	expect(wrapper.props('signs')).toEqual({});
	// })
});
