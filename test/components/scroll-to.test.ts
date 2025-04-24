import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import ScrollTo from '../../src/uni_modules/stellar-ui-plus/components/ste-scroll-to/ste-scroll-to.vue';
import ScrollToItem from '../../src/uni_modules/stellar-ui-plus/components/ste-scroll-to-item/ste-scroll-to-item.vue';

describe('ScrollTo Component', async () => {

	const wrapper = mount(ScrollTo, {
		propsData: {
			active: 0,
			height: 1334,
		}
	})

	await new Promise((resolve) => setTimeout(resolve, 500));

	test("active", async () => {
		expect(wrapper.props('active')).toBe(0);
	})
	test("height", async () => {
		expect(wrapper.props('height')).toBe(1334);
	})

});
