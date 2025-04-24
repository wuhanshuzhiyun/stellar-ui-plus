import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import MediaPreview from '../../src/uni_modules/stellar-ui-plus/components/ste-media-preview/ste-media-preview.vue';
import { expect } from 'vitest';

describe('MediaPreview Component', async () => {
	const wrapper = mount(MediaPreview, {
		props: {
			show: true,
			urls: ["https://www.baidu.com/img/flexible/logo/pc/result.png", "https://www.baidu.com/img/flexible/logo/pc/result.png"],
			autoplay: 0,
			loop: false,
			index: null,
			showIndex: true,
			scale: false,
			showmenu: true,
		},
	});
	await nextTick();
	test('show', async () => {
		const upload = wrapper.find('[data-test="media-preview"]');
		expect(upload.exists()).toBe(true);
	});
	test('urls', async () => {
		const upload = wrapper.findAll('[data-test="media-preview-item"]');
		expect(upload.length).toBe(2);
	});
	test('autoplay', async () => {
		expect(wrapper.props('autoplay')).toBe(0);
	})
	test('loop', async () => {
		expect(wrapper.props('loop')).toBe(false);
	})
	test('index', async () => {
		expect(wrapper.props('index')).toBe(null);
	})
	test('showIndex', async () => {
		expect(wrapper.props('showIndex')).toBe(true);
	})
	test('scale', async () => {
		expect(wrapper.props('scale')).toBe(false);
	})
	test('showmenu', async () => {
		expect(wrapper.props('showmenu')).toBe(true);
	})
});
