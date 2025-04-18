import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Signature from '../../src/uni_modules/stellar-ui-plus/components/ste-signature/ste-signature.vue';
import { style2obj } from '../methods';

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
		expect(wrapper.classes()).toContain('test-class');
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

	const el = wrapper.find('.test-class');
	const style = style2obj(el)

	test('width', async () => {
		expect(style.width).toBe('50px');
	});
	test('height', async () => {
		expect(style.height).toBe('50px');
	})
});
