import { nextTick } from 'vue';
import Tabs from '../../src/uni_modules/stellar-ui-plus/components/ste-tabs/ste-tabs.vue';
import Tab from '../../src/uni_modules/stellar-ui-plus/components/ste-tab/ste-tab.vue';
import { mount } from '@vue/test-utils';

describe('Tabs Component', async () => {
	const wrapper = mount(Tabs, {
		props: {
			active: 0,
			type: "line",
			showImage: false,
			showTitle: true,
			showSubtitle: false,
			color: "#0090ff",
			background: "#000000",
			radius: 0,
			duration: 0.3,
			showLine: true,
			lineWidth: 52,
			lineHeight: 6,
			border: false,
			ellipsis: false,
			tabWidth: "auto",
			tabPadding: 24,
			tabSpace: 0,
			divideNum: 4,
			sticky: false,
			offsetTop: 0,
			swipeable: false,
			titleColor: "#000000",
			activeTitleColor: "#000000",
			titleHeight: 48,
			subColor: "#000000",
			activeSubColor: "#ffffff",
			subTitleHeight: 42,
			subTitleRadius: 21,
			imageWidth: 80,
			imageHeight: 80,
			imageRadius: "50%",
			imageBorderWidth: 4,
			showGapLine: false,
			lock: false,
			disabled: false,
			pullDown: false,
			placeholder: "请选择",
			maskTop: 0,
			maskRight: 0,
			maskBottom: 0,
			maskLeft: 0,
			maskZindex: 1001
		}
	})


	await nextTick();

	test("active", async () => {
		expect(wrapper.props().active).toBe(0);
	})
	test("type", async () => {
		expect(wrapper.props().type).toBe('line');
	})
	test("radius", () => {
		expect(wrapper.props().radius).toBe(0);
	})
	test("titleColor", () => {
		expect(wrapper.props().titleColor).toBe('#000000');
	})
	test("activeTitleColor", () => {
		expect(wrapper.props().activeTitleColor).toBe('#000000');
	})
	test("titleHeight", () => {
		expect(wrapper.props().titleHeight).toBe(48);
	})
	test("subTitleHeight", () => {
		expect(wrapper.props().subTitleHeight).toBe(42);
	})
	test("imageBorderWidth", () => {
		expect(wrapper.props().imageBorderWidth).toBe(4);
	})
	test("showGapLine", () => {
		expect(wrapper.props().showGapLine).toBe(false);
	})
	test("lock", () => {
		expect(wrapper.props().lock).toBe(false);
	})

	test("disabled", () => {
		expect(wrapper.props().disabled).toBe(false);
	})

	test("pullDown", () => {
		expect(wrapper.props().pullDown).toBe(false);
	})

	test("placeholder", () => {
		expect(wrapper.props().placeholder).toBe("请选择");
	})

	test("maskTop", () => {
		expect(wrapper.props().maskTop).toBe(0);
	})

	test("maskBottom", () => {
		expect(wrapper.props().maskBottom).toBe(0)
	})
	test("maskRight", () => {
		expect(wrapper.props().maskRight).toBe(0)
	})
	test("maskLeft", () => {
		expect(wrapper.props().maskLeft).toBe(0)
	})
	test("maskZindex", () => {
		expect(wrapper.props().maskZindex).toBe(1001)
	})
});
