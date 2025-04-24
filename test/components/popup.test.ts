import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import stePopup from '../../src/uni_modules/stellar-ui-plus/components/ste-popup/ste-popup.vue';

describe('Popup', async () => {
    let backgroundColor = 'red';
    let offset = 10;
    let zIndex = 1000;
    const wrapper: any = mount(stePopup, {
        props: {
            show: true,
            width: 300,
            height: 300,
            backgroundColor,
            showMask: true,
            round: true,
            showClose: true,
            position: 'top',
            offsetX: offset,
            offsetY: offset,
            zIndex,
        },
    });
    let content = wrapper.get('.content');
    await nextTick();

    test('width && height', async () => {
        const rootEl = wrapper.get('.ste-popup .content');
        expect(rootEl.element.style._values.width).toBe('150px');
        expect(rootEl.element.style._values.height).toBe('150px');
    });

    test('backgroundColor', async () => {
        expect(content.element.style._values['background-color']).toBe(backgroundColor);
    });

    test('showMask', async () => {
        expect(wrapper.element.style._values['background-color']).toBe('rgba(0, 0, 0, 0.6)');
    });

    test('round', async () => {
        expect(wrapper.element.style._values['--content-border-radius']).toBe('16px');
    });

    test('position && showClose', async () => {
        expect(wrapper.find('.close-icon-box').exists('')).toBe(true);
    });

    test('zIndex', async () => {
        expect(wrapper.element.style._values['z-index']).toBe(zIndex);
    });
});
