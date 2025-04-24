import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Upload from '../../src/uni_modules/stellar-ui-plus/components/ste-upload/ste-upload.vue';
import { style2obj } from '../methods';
import { expect } from 'vitest';

describe('Upload Component', async () => {
	const wrapper = mount(Upload, {
		props: {
			value: [],
			accept: "image",
			capture: ['album', 'camera'],
			camera: 'back',
			compressed: true,
			maxDuration: 60,
			previewWidth: 300,
			previewHeight: 400,
			previewImage: true,
			previewFullImage: true,
			multiple: false,
			disabled: false,
			showUpload: true,
			deletable: true,
			maxSize: 0,
			maxCount: 9,
			uploadIcon: "&#xe69b;",
			uploadText: "点击上传",
			radius: 10,
			flexWrap: "wrap"
		},
	});
	await nextTick();
	const upload = wrapper.find('[data-test="upload"]');
	const style = style2obj(upload);

	test("accept", async () => {
		expect(wrapper.props("accept")).toBe("image");
	})

	test("capture", async () => {
		expect(wrapper.props("capture")).toEqual(['album', 'camera']);
	})

	test("camera", async () => {
		expect(wrapper.props("camera")).toBe('back');
	})

	test("compressed", async () => {
		expect(wrapper.props("compressed")).toBe(true);
	})

	test("maxDuration", async () => {
		expect(wrapper.props("maxDuration")).toBe(60);
	})

	test("previewWidth", async () => {
		expect(style['--ste-upload-width']).toBe('150px');
	})

	test("previewHeight", async () => {
		expect(style['--ste-upload-height']).toBe('200px');
	})

	test("previewImage", async () => {
		expect(wrapper.props("previewImage")).toBe(true);
	})

	test("previewFullImage", async () => {
		expect(wrapper.props("previewFullImage")).toBe(true);
	})

	test("multiple", async () => {
		expect(wrapper.props("multiple")).toBe(false);
	})

	test("disabled", async () => {
		expect(wrapper.props("disabled")).toBe(false);
	})

	test("deletable", async () => {
		expect(wrapper.props("deletable")).toBe(true);
	})

	test("maxSize", async () => {
		expect(wrapper.props("maxSize")).toBe(0);
	})

	test("maxCount", async () => {
		expect(wrapper.props("maxCount")).toBe(9);
	})

	test('uploadIcon', async () => {
		expect(wrapper.props("uploadIcon")).toBe("&#xe69b;");
	})

	test('uploadText', async () => {
		const upload = wrapper.find('[data-test="upload-text"]');
		expect(upload.text()).toBe('点击上传');
	})
	test('showUpload', async () => {
		const upload = wrapper.find('[data-test="upload-add-file"]');
		expect(upload.exists()).toBe(true);
	})
	test('radius', async () => {
		expect(style['--ste-upload-radius']).toBe('5px');
	})
	test('flexWrap', async () => {
		expect(style['--ste-upload-flex-wrap']).toBe('wrap');
	})


});
