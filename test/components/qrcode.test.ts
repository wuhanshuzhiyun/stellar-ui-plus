import { mount } from '@vue/test-utils';
import steQRcode from '../../src/uni_modules/stellar-ui-plus/components/ste-qrcode/ste-qrcode.vue';

describe('QRcode', () => {
    test('value', () => {
        const size = 100;
        const wrapper = mount(steQRcode, {
            propsData: {
                content: '123987456abc',
                size,
            },
        });

        const canvas = wrapper.find('canvas');
        expect(canvas.exists()).toBe(false);
    });
});
