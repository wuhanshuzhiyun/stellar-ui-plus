import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Signature from '../../src/uni_modules/stellar-ui-plus/components/ste-signature/ste-signature.vue';

describe('Signature Component', async () => {
	const wrapper = mount(Signature, {
		props: {
			customClass: 'test-class',
			lineWidth: 10,
			strokeColor: "#000000",
			background: "#ffffff",
			type: "png",
			width: 100,
			height: 100,

		},
	});
	await nextTick();

	test("customClass", async () => {
		expect(wrapper.props().customClass).toContain('test-class');
	})

	test("lineWidth", async () => {
		expect(wrapper.props().lineWidth).toBe(10);
	})

	test("strokeColor", async () => {
		expect(wrapper.props().strokeColor).toBe("#000000");
	})

	test("background", async () => {
		expect(wrapper.props().background).toBe("#ffffff");
	})

	test("type", async () => {
		expect(wrapper.props().type).toBe("png");
	})
	test("width", async () => {
		expect(wrapper.props().width).toBe(100);
	})
	test("height", async () => {
		expect(wrapper.props().height).toBe(100);
	})
});
