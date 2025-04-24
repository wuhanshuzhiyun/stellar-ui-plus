import { mount } from '@vue/test-utils';
import Sticky from '../../src/uni_modules/stellar-ui-plus/components/ste-sticky/ste-sticky.vue';
import { nextTick } from 'vue';
import { style2obj } from '../methods';

describe('Sticky', async () => {
    const wrapper = mount(Sticky, {  
		props:{
			offsetTop: 120,
			customNavHeight: 0,
			disabled: false,
			background: "#f00",
			zIndex: 98,
		}
	 });
	await nextTick()
	const view = wrapper.find('[data-test="sticky"]');
	const style = style2obj(view);
	console.log(style);
	test('offsetTop', async () => {
		expect(style.top).toBe('60px');
	});

	test('customNavHeight', async () => {
		expect(wrapper.props().customNavHeight).toBe(0);
	})
	test('disabled', async () => {
		expect(style.position).toBe("sticky");
	});

	test('background', async () => {
		expect(style['background']).toBe('rgb(255, 0, 0)');
	})

	test('zIndex', async () => {
		expect(style['z-index']).toBe("98");
	})
});
