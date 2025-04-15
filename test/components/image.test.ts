import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Image from '../../src/uni_modules/stellar-ui-plus/components/ste-image/ste-image.vue';
import { style2obj } from '../methods';
describe('Image', async () => {
    const wrapper = mount(Image, {
        props: {
            src: 'https://image.whzb.com/chain/StellarUI/%E6%94%AF%E4%BB%98%E5%AE%9D.png',
            mode: 'scaleToFill',
            width: 120,
            height: 120,
            radius: 60,
            hiddenLoading: true,
            hiddenError: true,
            showMenuByLongpress: true,
            lazyLoad: true,
            display: 'inline-flex',
        },
    });
    await nextTick();

    const view = wrapper.find('.ste-image-root');
    const style = style2obj(view);

    test('width', async () => {
        expect(style['--image-root-width']).toEqual('60px');
    });

    test('height', async () => {
        expect(style['--image-root-height']).toEqual('60px');
    });

    test('radius', async () => {
        expect(style['--image-root-radius']).toEqual('30px');
    });
    test('hiddenLoading', async () => {
        expect(wrapper.props().hiddenLoading).toBe(true);
    });

    test('hiddenError', async () => {
        expect(wrapper.props().hiddenError).toBe(true);
    });

    test('showMenuByLongpress', async () => {
        expect(wrapper.props().showMenuByLongpress).toBe(true);
    });

    test('lazyLoad', async () => {
        expect(wrapper.props().lazyLoad).toBe(true);
    });

    test('display', async () => {
        const view = wrapper.find('.ste-image-root');
        const style = style2obj(view);
        expect(style['--image-root-display']).toEqual('inline-flex');
    });
});
