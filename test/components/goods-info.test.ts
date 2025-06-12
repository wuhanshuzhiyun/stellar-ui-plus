import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import GoodsInfo from '../../src/uni_modules/stellar-ui-plus/components/ste-goods-info/ste-goods-info.vue';

describe('GoodsInfo Component', async () => {
    const wrapper = mount(GoodsInfo, {
        props: {
            data: {},
            background: '#fff',
            imageSize: 120,
            imageRadius: 12,
            hidePrice: false,
            priceSize: 30,
            priceColor: '#000',
            tagBg: '#000',
            titleStyle: {},
            checkbox: 'left',
            checkboxDisabled: false,
            checked: false,
            watermark: '',
            watermarkStyle: {},
            number: 1,
            stepper: true,
        },
    });
    await nextTick();

    test('data', async () => {
        expect(wrapper.props('data')).toEqual({});
    });

    test('title', async () => {
        expect(wrapper.props('background')).toBe('#fff');
    });
    test('imageSize', async () => {
        expect(wrapper.props('imageSize')).toBe(120);
    });
    test('imageRadius', async () => {
        expect(wrapper.props('imageRadius')).toBe(12);
    });
    test('hidePrice', async () => {
        expect(wrapper.props('hidePrice')).toBe(false);
    });
    test('priceSize', async () => {
        expect(wrapper.props('priceSize')).toBe(30);
    });
    test('priceColor', async () => {
        expect(wrapper.props('priceColor')).toBe('#000');
    });
    test('tagBg', async () => {
        expect(wrapper.props('tagBg')).toBe('#000');
    });
    test('titleStyle', async () => {
        expect(wrapper.props('titleStyle')).toEqual({});
    });
    test('checkbox', async () => {
        expect(wrapper.props('checkbox')).toBe('left');
    });
    test('checkboxDisabled', async () => {
        expect(wrapper.props('checkboxDisabled')).toBe(false);
    });
    test('checked', async () => {
        expect(wrapper.props('checked')).toBe(false);
    });
    test('watermark', async () => {
        expect(wrapper.props('watermark')).toBe('');
    });
    test('watermarkStyle', async () => {
        expect(wrapper.props('watermarkStyle')).toEqual({});
    });
    test('number', async () => {
        expect(wrapper.props('number')).toBe(1);
    });
    test('stepper', async () => {
        expect(wrapper.props('stepper')).toBe(true);
    });
});
