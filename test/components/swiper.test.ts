import { nextTick } from 'vue';
import Swiper from '../../src/uni_modules/stellar-ui-plus/components/ste-swiper/ste-swiper.vue';
import SwiperItem from '../../src/uni_modules/stellar-ui-plus/components/ste-swiper-item/ste-swiper-item.vue';
import { mount } from '@vue/test-utils';

describe('Swiper Component', async () => {
	const wrapper = mount(Swiper, {
		propsData: {
			disabled: false,
			width: 750,
			height: 1334,
			duration: 300,
			swipeThreshold: 0.35,
			indicatorDots: false,
			indicatorColor: "#ffffff",
			indicatorActiveColor: "#ffffff",
			autoplay: false,
			interval: 3000,
			circular: false,
			previousMargin: 0,
			nextMargin: 0
		}
	})

	await nextTick();


	test("disabled", () => {
		expect(wrapper.props().disabled).toBe(false)
	})

	test("autoplay", () => {
		expect(wrapper.props().autoplay).toBe(false)
	})

	test("current", () => {
		expect(wrapper.props().current).toBe(0)
	})

	test("interval", () => {
		expect(wrapper.props().interval).toBe(3000)
	})

	test("circular", () => {
		expect(wrapper.props().circular).toBe(false)
	})

	test("previousMargin", () => {
		expect(wrapper.props().previousMargin).toBe(0)
	})

	test("nextMargin", () => {
		expect(wrapper.props().nextMargin).toBe(0)
	})
});
