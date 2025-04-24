import TouchSwipe from '../../src/uni_modules/stellar-ui-plus/components/ste-touch-swipe/ste-touch-swipe.vue';
import TouchSwipeItem from '../../src/uni_modules/stellar-ui-plus/components/ste-touch-swipe-item/ste-touch-swipe-item.vue';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

describe('TouchSwipe Component', async () => {
	const wrapper = mount(TouchSwipe, {
		propsData: {
			index: 0,
			direction: "horizontal",
			width: "100%",
			height: "100%",
			duration: 0.3,
			swipeThreshold: 0.35,
			disabled: false,
			childrenLength: 0,
			disabledIndexs: []
		}
	})

	await nextTick()


	test("TouchSwipe disabled", () => {
		expect(wrapper.props().disabled).toBe(false)
	})
	test("TouchSwipe direction", () => {
		expect(wrapper.props().direction).toBe("horizontal")
	})
	test("TouchSwipe width", () => {
		expect(wrapper.props().width).toBe("100%")
	})
	test("TouchSwipe height", () => {
		expect(wrapper.props().height).toBe("100%")
	})
	test("TouchSwipe duration", () => {
		expect(wrapper.props().duration).toBe(0.3)
	})
	test("TouchSwipe swipeThreshold", () => {
		expect(wrapper.props().swipeThreshold).toBe(0.35)
	})
	test("TouchSwipe disabledIndexs", () => {
		expect(wrapper.props().disabledIndexs).toEqual([])
	})
	test("TouchSwipe childrenLength", async () => {
	  expect(wrapper.props().childrenLength).toBe(0)
	})
});
