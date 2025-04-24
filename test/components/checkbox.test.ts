import { mount } from '@vue/test-utils';
import CheckboxGroup from '../../src/uni_modules/stellar-ui-plus/components/ste-checkbox-group/ste-checkbox-group.vue';
import Checkbox from '../../src/uni_modules/stellar-ui-plus/components/ste-checkbox/ste-checkbox.vue';

describe('Checkbox Component', async () => {

	const wrapper = mount(CheckboxGroup, {
		props: {
			value: [],
			direction: "column",
			disabled: false,
			readonly: false,
			shape: "square",
			iconSize: 36,
			checkedColor: "",
			textPosition: "right",
			textSize: 28,
			textInactiveColor: "#000000",
			textActiveColor: "#000000",
			textDisabled: false,
			max: 0,
			marginLeft: 0,
			marginRight: 0,
			columnGap: 0,
		}
	})


	await new Promise(resolve => setTimeout(resolve, 1000));

	test("direction", async () => {
		expect(wrapper.props().direction).toBe("column");
	})

	test("disabled", async () => {
		expect(wrapper.props().disabled).toBe(false);
	})
	test("readonly", async () => {
		expect(wrapper.props().readonly).toBe(false);
	})
	test("shape", async () => {
		expect(wrapper.props().shape).toBe("square");
	})
	test("iconSize", async () => {
		expect(wrapper.props().iconSize).toBe(36);
	})
	test("checkedColor", async () => {
		expect(wrapper.props().checkedColor).toBe("");
	})
	test("textPosition", async () => {
		expect(wrapper.props().textPosition).toBe("right");
	})
	test("textSize", async () => {
		expect(wrapper.props().textSize).toBe(28);
	})
	test("textInactiveColor", async () => {
		expect(wrapper.props().textInactiveColor).toBe("#000000");
	})
	test("textActiveColor", async () => {
		expect(wrapper.props().textActiveColor).toBe("#000000");
	})
	test("textDisabled", async () => {
		expect(wrapper.props().textDisabled).toBe(false);
	})
	test("max", async () => {
		expect(wrapper.props().max).toBe(0);
	})
	test("margin-left", async () => {
		expect(wrapper.props().marginLeft).toBe(0);
	})
	test("margin-right", async () => {
		expect(wrapper.props().marginRight).toBe(0);
	})
	test("column-gap", async () => {
		expect(wrapper.props().columnGap).toBe(0);
	})
});
