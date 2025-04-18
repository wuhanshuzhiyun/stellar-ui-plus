import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Search from '../../src/uni_modules/stellar-ui-plus/components/ste-search/ste-search.vue';

describe('Search Component', async () => {
	const wrapper = mount(Search, {
		props: {
			type: 'default',
			value: "",
			placeholder: '请输入搜索内容',
			hotWords: [],
			interval: 3000,
			autoplay: true,
			disabled: false,
			hiddenLine: false,
			hiddenBtn: false,
			btnText: "搜索",
			hiddenInput: false,
			clearable: true,
			height: 64,
			radius: 32,
			borderColor: '#EEEEEE66',
			background: "#ffffff",
			prefixIconColor: "#bbbbbb",
			placeholderColor: "#bbbbbb",
			inputTextColor: "#000000",
			clearIconColor: "#bbbbbb",
			btnTextColor: "#0090ff",
			btnBackground: "#ffffff",
			focus: false,
		},
	});
	await nextTick();
	test("type", async () => {
		const nav = wrapper.find('[data-test="nav-box"]');
		expect(nav.exists()).toBe(false);

	})

	test('placeholder', async () => {
		expect(wrapper.props('placeholder')).toBe('请输入搜索内容');
	})
	test('hotWords', async () => {
		expect(wrapper.props('hotWords')).toEqual([]);
	})
	test('interval', async () => {
		expect(wrapper.props('interval')).toBe(3000);
	})
	test('autoplay', async () => {
		expect(wrapper.props('autoplay')).toBe(true);
	})
	test('disabled', async () => {
		expect(wrapper.props('disabled')).toBe(false);
	})
	test('hiddenLine', async () => {
		expect(wrapper.props('hiddenLine')).toBe(false);
	})
	test('hiddenBtn', async () => {
		expect(wrapper.props('hiddenBtn')).toBe(false);
	})
	test('btnText', async () => {
		expect(wrapper.props('btnText')).toBe('搜索');
	})
	test('hiddenInput', async () => {
		expect(wrapper.props('hiddenInput')).toBe(false);
	})
	test('clearable', async () => {
		expect(wrapper.props('clearable')).toBe(true);
	})
	test('height', async () => {
		expect(wrapper.props('height')).toBe(64);
	})
	test('radius', async () => {
		expect(wrapper.props('radius')).toBe(32);
	})
	test('borderColor', async () => {
		expect(wrapper.props('borderColor')).toBe('#EEEEEE66');
	})
	test('background', async () => {
		expect(wrapper.props('background')).toBe('#ffffff');
	})
	test('prefixIconColor', async () => {
		expect(wrapper.props('prefixIconColor')).toBe('#bbbbbb');
	})
	test('placeholderColor', async () => {
		expect(wrapper.props('placeholderColor')).toBe('#bbbbbb');
	})
	test('inputTextColor', async () => {
		expect(wrapper.props('inputTextColor')).toBe('#000000');
	})
	test('clearIconColor', async () => {
		expect(wrapper.props('clearIconColor')).toBe('#bbbbbb');
	})
	test('btnTextColor', async () => {
		expect(wrapper.props('btnTextColor')).toBe('#0090ff');
	})
	test('btnBackground', async () => {
		expect(wrapper.props('btnBackground')).toBe('#ffffff');
	})
	test('focus', async () => {
		expect(wrapper.props('focus')).toBe(false);
	})
});
