import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steSkeleton from '../../src/uni_modules/stellar-ui-plus/components/ste-skeleton/ste-skeleton';

describe('Skeleton', async () => {
    test('loading prop - true', async () => {
        const wrapper = mount(steSkeleton, {
            props: {
                loading: true,
            },
        });
        await nextTick();
        expect(wrapper.classes()).toContain('ste-skeleton--loading');
    });

    test('loading prop - false', async () => {
        const wrapper = mount(steSkeleton, {
            props: {
                loading: false,
            },
            slots: {
                default: '<div>Content</div>',
            },
        });
        await nextTick();
        expect(wrapper.classes()).not.toContain('ste-skeleton--loading');
        expect(wrapper.text()).toContain('Content');
    });

    test('type prop - text', async () => {
        const wrapper = mount(steSkeleton, {
            props: {
                loading: true,
                type: 'text',
            },
        });
        await nextTick();
        expect(wrapper.classes()).toContain('ste-skeleton--text');
    });

    test('type prop - image', async () => {
        const wrapper = mount(steSkeleton, {
            props: {
                loading: true,
                type: 'image',
            },
        });
        await nextTick();
        expect(wrapper.classes()).toContain('ste-skeleton--image');
    });

    test('type prop - circle', async () => {
        const wrapper = mount(steSkeleton, {
            props: {
                loading: true,
                type: 'circle',
            },
        });
        await nextTick();
        expect(wrapper.classes()).toContain('ste-skeleton--circle');
    });

    test('type prop - button', async () => {
        const wrapper = mount(steSkeleton, {
            props: {
                loading: true,
                type: 'button',
            },
        });
        await nextTick();
        expect(wrapper.classes()).toContain('ste-skeleton--button');
    });

    test('default props', async () => {
        const wrapper = mount(steSkeleton);
        await nextTick();
        expect(wrapper.classes()).toContain('ste-skeleton--loading');
        expect(wrapper.classes()).toContain('ste-skeleton--text');
    });

    test('slot content when loading is false', async () => {
        const wrapper = mount(steSkeleton, {
            props: {
                loading: false,
            },
            slots: {
                default: '<div class="test-content">Test Content</div>',
            },
        });
        await nextTick();
        const content = wrapper.find('.test-content');
        expect(content.exists()).toBe(true);
        expect(content.text()).toBe('Test Content');
    });

    test('no slot content when loading is true', async () => {
        const wrapper = mount(steSkeleton, {
            props: {
                loading: true,
            },
            slots: {
                default: '<div class="test-content">Test Content</div>',
            },
        });
        await nextTick();
        const content = wrapper.find('.test-content');
        expect(content.exists()).toBe(false);
    });

    test('component name', async () => {
        const wrapper = mount(steSkeleton);
        await nextTick();
        expect(wrapper.vm.$options.name).toBe('ste-skeleton');
    });

    test('dynamic loading change', async () => {
        const wrapper = mount(steSkeleton, {
            props: {
                loading: true,
            },
            slots: {
                default: '<div>Dynamic Content</div>',
            },
        });
        await nextTick();
        expect(wrapper.classes()).toContain('ste-skeleton--loading');

        await wrapper.setProps({ loading: false });
        await nextTick();
        expect(wrapper.classes()).not.toContain('ste-skeleton--loading');
        expect(wrapper.text()).toContain('Dynamic Content');
    });

    test('dynamic type change', async () => {
        const wrapper = mount(steSkeleton, {
            props: {
                loading: true,
                type: 'text',
            },
        });
        await nextTick();
        expect(wrapper.classes()).toContain('ste-skeleton--text');

        await wrapper.setProps({ type: 'image' });
        await nextTick();
        expect(wrapper.classes()).toContain('ste-skeleton--image');
        expect(wrapper.classes()).not.toContain('ste-skeleton--text');
    });
});
