import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Select from '../../src/uni_modules/stellar-ui-plus/components/ste-select/ste-select.vue';
import { style2obj } from '../methods';

describe('Select Component', async () => {
	const wrapper = mount(Select, {
		props: {
			value: "",
			list: [{ label: '测试1', value: '1' }, { label: '测试2', value: '2' }],
			mode: "default",
			minDate: "2020-01-01",
			maxDate: "2020-12-31",
			dateUnit: false,
			width: 200,
			height: 64,
			fontSize: 28,
			background: "#ffffff",
			maskClose: true,
			optionsWidth: "auto",
			placeholder: "请选择",
			labelKey: "label",
			valueKey: "value",
			childrenKey: "children",
			multiple: false,
			allowCreate: false,
			autoFilterable: false,
			loading: false,
			total: 0,
			borderColor: "#ebebeb",
			borderRadius: 8,
			optionsPosition: "auto"
		},
	});
	await nextTick();

	test('list', async () => {
		expect(wrapper.props("list")?.length).toBe(2);
	})

	test('mode', async () => {
		expect(wrapper.props("mode")).toBe("default");
	})
	test('minDate', async () => {
		expect(wrapper.props("minDate")).toBe("2020-01-01");
	})
	test('maxDate', async () => {
		expect(wrapper.props("maxDate")).toBe("2020-12-31");
	})
	test('dateUnit', async () => {
		expect(wrapper.props("dateUnit")).toBe(false);
	})
	const nav = wrapper.find('.ste-select-root');
	const style = style2obj(nav)
	test('width', async () => {
		expect(style["--ste-select-width"]).toBe('100px');
	})
	test('height', async () => {
		expect(style["--ste-select-height"]).toBe('32px');
	})
	test('fontSize', async () => {
		expect(style["--ste-select-font-size"]).toBe("var(--font-size-28,14px)");
	})
	test('background', async () => {
		expect(style["--ste-select-background"]).toBe('#ffffff');
	})
	test('maskClose', async () => {
		expect(wrapper.props("maskClose")).toBe(true);
	})
	test('optionsWidth', async () => {
		expect(wrapper.props("optionsWidth")).toBe("auto");
	})
	test('placeholder', async () => {
		expect(wrapper.props("placeholder")).toBe("请选择");
	})
	test('labelKey', async () => {
		expect(wrapper.props("labelKey")).toBe("label");
	})
	test('valueKey', async () => {
		expect(wrapper.props("valueKey")).toBe("value");
	})
	test('childrenKey', async () => {
		expect(wrapper.props("childrenKey")).toBe("children");
	})
	test('multiple', async () => {
		expect(wrapper.props("multiple")).toBe(false);
	})
	test('allowCreate', async () => {
		expect(wrapper.props("allowCreate")).toBe(false);
	})
	test('autoFilterable', async () => {
		expect(wrapper.props("autoFilterable")).toBe(false);
	})
	test('loading', async () => {
		expect(wrapper.props("loading")).toBe(false);
	})
	test('total', async () => {
		expect(wrapper.props("total")).toBe(0);
	})
	test('borderColor', async () => {
		expect(style["--ste-select-border"]).toBe('1px solid #ebebeb');
	})
	test('borderRadius', async () => {
		expect(style["--ste-select-border-radius"]).toBe('4px');
	})
	test('optionsPosition', async () => {
		expect(wrapper.props("optionsPosition")).toBe("auto");
	})
});
