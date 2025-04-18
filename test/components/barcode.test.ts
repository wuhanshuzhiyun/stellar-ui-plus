import { mount } from '@vue/test-utils';
import steBarcode from '../../src/uni_modules/stellar-ui-plus/components/ste-barcode/ste-barcode.vue';

describe('Barcode', () => {
    test('value', () => {
        const width = 310;
        const height = 110;
        const wrapper = mount(steBarcode, {
            propsData: {
                content: '123987456abc',
                width,
                height,
            },
        });

        const canvas = wrapper.find('canvas');
        expect(canvas.exists()).toBe(true);
        expect(canvas.element.style.width).toBe(width + 'px');
        expect(canvas.element.style.height).toBe(height + 'px');
    });
});
