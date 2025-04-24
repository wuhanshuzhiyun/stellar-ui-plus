import { mount } from '@vue/test-utils';
import RadioGroup from '../../src/uni_modules/stellar-ui-plus/components/ste-radio-group/ste-radio-group.vue';
import Radio from '../../src/uni_modules/stellar-ui-plus/components/ste-radio/ste-radio.vue';

describe('Radio Component', async () => {

	const wrapper = mount(RadioGroup, {
		props: {
			value: [],
			direction: 'row',
			disabled: false,
			readonly: false,
			shape: "circle",
			iconSize: 36,
			checkedColor: "#0090ff",
			textPosition: "right",
			textSize: 28,
			textInactiveColor: "#000000",
			textActiveColor: "#000000",
			textDisabled: false,
			marginLeft: 0,
			marginRight: 0,
			columnGap: 16
		}
	})


	await new Promise(resolve => setTimeout(resolve, 100));

	test("direction", () => {
		expect(wrapper.props().direction).toBe('row')
	})
	test("disabled", () => {
		expect(wrapper.props().disabled).toBe(false)
	})
	test("readonly", () => {
		expect(wrapper.props().readonly).toBe(false)
	})
	test("shape", () => {
		expect(wrapper.props().shape).toBe('circle')
	})
	test("iconSize", () => {
		expect(wrapper.props().iconSize).toBe(36)
	})
	test("checkedColor", () => {
		expect(wrapper.props().checkedColor).toBe('#0090ff')
	})
	test("textPosition", () => {
		expect(wrapper.props().textPosition).toBe('right')
	})
	test("textSize", () => {
		expect(wrapper.props().textSize).toBe(28)
	})
	test("textInactiveColor", () => {
		expect(wrapper.props().textInactiveColor).toBe('#000000')
	})
	test("textActiveColor", () => {
		expect(wrapper.props().textActiveColor).toBe('#000000')
	})
	test("textDisabled", () => {
		expect(wrapper.props().textDisabled).toBe(false)
	})
	test("marginLeft", () => {
		expect(wrapper.props().marginLeft).toBe(0)
	})
	test("marginRight", () => {
		expect(wrapper.props().marginRight).toBe(0)
	})
	test("columnGap", () => {
		expect(wrapper.props().columnGap).toBe(16)
	})
});
