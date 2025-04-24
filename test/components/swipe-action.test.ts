import { expect, test,  describe } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import SwipeAction from '../../src/uni_modules/stellar-ui-plus/components/ste-swipe-action/ste-swipe-action.vue';
import SwipeActionGroup from '../../src/uni_modules/stellar-ui-plus/components/ste-swipe-action-group/ste-swipe-action-group.vue';

describe('Test SwipeActionGroup', async () => {
	const wrapper = mount(SwipeActionGroup, {
		props: {
			mode: "right",
			autoClose: true,
			disabled: false,
			swipeThreshold: 0.35,
			duration: 300,
			leftIcon: false,
			rightIcon: false,
		},
	});

	test('mode', async () => {
		expect(wrapper.props('mode')).toBe('right');
	})
	test('autoClose', async () => {
		expect(wrapper.props('autoClose')).toBe(true);
	})
	test('disabled', async () => {
		expect(wrapper.props('disabled')).toBe(false);
	})
	test('swipeThreshold', async () => {
		expect(wrapper.props('swipeThreshold')).toBe(0.35);
	})
	test('duration', async () => {
		expect(wrapper.props('duration')).toBe(300);
	})
	test('leftIcon', async () => {
		expect(wrapper.props('leftIcon')).toBe(false);
	})
	test('rightIcon', async () => {
		expect(wrapper.props('rightIcon')).toBe(false);
	})

});
