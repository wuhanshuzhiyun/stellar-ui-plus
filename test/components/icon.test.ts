import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steIcon from '../../src/uni_modules/stellar-ui-plus/components/ste-icon/ste-icon.vue';
import { fontSize } from '../methods';

describe('Icon', async () => {
    let code = '&#xe653;';
    let size = 50;
    let color = '#1989fa';
    let bold = true;
    let margin = 10;
    let fontFamily = 'iconfont';
    let inlineBlock = false;
    const wrapper = mount(steIcon, {
        propsData: {
            code,
            size,
            color,
            bold,
            marginLeft: margin,
            marginRight: margin,
            marginTop: margin,
            marginBottom: margin,
            fontFamily,
            inlineBlock,
        },
    });
    const icon: any = wrapper.get('[data-test="icon"]');
    await nextTick();

    test('code', () => {
        let code1 = String.fromCharCode(Number(code.replace('&#', '0').replace(';', '')));
        expect(icon.text()).toBe(code1);
    });

    test('size', () => {
        let size1 = 50 / 2 + 'px';
        expect(fontSize(icon.element.style._values['--size'])).toBe(size1);
    });

    test('color', () => {
        expect(icon.element.style._values['--color']).toBe(color);
    });

    test('bold', () => {
        let weight = bold ? 'bold' : 'normal';
        expect(icon.element.style._values['--weight']).toBe(weight);
    });

    test('margin', () => {
        let margin1 = margin / 2 + 'px';
        expect(icon.element.style._values['--margin-left']).toBe(margin1);
        expect(icon.element.style._values['--margin-right']).toBe(margin1);
        expect(icon.element.style._values['--margin-top']).toBe(margin1);
        expect(icon.element.style._values['--margin-bottom']).toBe(margin1);
    });

    test('fontFamily', () => {
        expect(icon.element.style._values['--font-family']).toBe(fontFamily);
    });

    test('inlineBlock', () => {
        let inlineBlock1 = inlineBlock ? 'inline-block' : 'inline-flex';
        expect(icon.element.style._values['--display']).toBe(inlineBlock1);
    });
});
