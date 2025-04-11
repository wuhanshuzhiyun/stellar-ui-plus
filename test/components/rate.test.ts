import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steRate from '../../src/uni_modules/stellar-ui-plus/components/ste-rate/ste-rate.vue';
import { fontSize, iconFormart } from '../methods';

describe('Rate', async () => {
    let modelValue = 3.2;
    let score = 2;
    let count = 6;
    let size = 50;
    const activeColor = 'red';
    const inactiveColor = '#eee';
    let gutter = 20;
    let inactiveCode = '&#xe685;';
    let activeCode = '&#xe687;';
    const wrapper = mount(steRate, {
        props: {
            modelValue,
            count,
            score,
            size,
            inactiveColor,
            activeColor,
            inactiveCode,
            activeCode,
            gutter,
        },
    });
    const rate: any = wrapper.get('[data-test="rate"]');
    const items = rate.findAll('.item');
    const actives = rate.findAll('.active');
    const icon: any = wrapper.get('[data-test="icon"]');
    const activeIcon: any = wrapper.get('.active [data-test="icon"]');
    const inactiveIcon: any = wrapper.get('.inactive [data-test="icon"]');
    await nextTick();

    test('value && score', () => {
        let sum = 0;
        actives.forEach(value => {
            let width = value.element.style._values.width;
            width = Number(width.replace('%', '').replace('px', ''));
            sum += width;
        });
        expect(modelValue).toBe((sum * score) / 100);
    });

    test('count', () => {
        expect(count).toBe(items.length);
    });

    test('size', () => {
        let size1 = size / 2 + 'px';
        expect(fontSize(icon.element.style._values['--size'])).toBe(size1);
    });

    test('inactiveColor', () => {
        expect(inactiveIcon.element.style._values['--color']).toBe(inactiveColor);
    });

    test('activeColor', () => {
        expect(activeIcon.element.style._values['--color']).toBe(activeColor);
    });

    test('inactiveCode', () => {
        expect(inactiveIcon.text()).toBe(iconFormart(inactiveCode));
    });

    test('activeCode', () => {
        expect(activeIcon.text()).toBe(iconFormart(activeCode));
    });

    test('gutter', () => {
        let columnGap = gutter / 2 + 'px';
        expect(items[0].element.style._values['margin-right']).toBe(columnGap);
    });

    test('iconData', async () => {
        let iconData = ['&#xe686;', '&#xe687;', '&#xe671;', '&#xe66a;', '&#xe66b;'];
        for (let i = 0; i < iconData.length; i++) {
            const wrapper1 = mount(steRate, {
                props: {
                    modelValue: i + 1,
                    iconData,
                },
            });
            const icon = wrapper1.get('[data-test="icon"]');
            await nextTick();
            expect(icon.text()).toBe(iconFormart(iconData[i]));
        }
    });
});
