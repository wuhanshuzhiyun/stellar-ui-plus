import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steRate from '../../src/uni_modules/stellar-ui-plus/components/ste-rate/ste-rate.vue';
import { fontSize, iconFormart } from '../methods';

describe('Rate', async () => {
    let gutter = 20;
    const wrapper = mount(steRate, {
        propsData: {
            modelValue: 3.2,
            count: 6,
            score: 2,
            size: 50,
            inactiveColor: '#eee',
            activeColor: 'red',
            inactiveCode: '&#xe685;',
            activeCode: '&#xe687;',
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
        let value = 3.2;
        let score = 2;
        let sum = 0;
        actives.forEach(value => {
            let width = value.element.style._values.width;
            width = Number(width.replace('%', '').replace('px', ''));
            sum += width;
        });
        expect(value).toBe((sum * score) / 100);
    });

    test('count', () => {
        let count = 6;
        expect(count).toBe(items.length);
    });

    test('size', () => {
        let size = 50 / 2 + 'px';
        expect(fontSize(icon.element.style._values['--size'])).toBe(size);
    });

    test('inactiveColor', () => {
        const inactiveColor = '#eee';
        expect(inactiveIcon.element.style._values['--color']).toBe(inactiveColor);
    });

    test('activeColor', () => {
        let activeColor = 'red';
        expect(activeIcon.element.style._values['--color']).toBe(activeColor);
    });

    test('inactiveCode', () => {
        let inactiveCode = iconFormart('&#xe685;');
        expect(inactiveIcon.text()).toBe(inactiveCode);
    });

    test('activeCode', () => {
        let activeCode = iconFormart('&#xe687;');
        expect(activeIcon.text()).toBe(activeCode);
    });

    test('gutter', () => {
        let columnGap = gutter / 2 + 'px';
        expect(items[0].element.style._values['margin-right']).toBe(columnGap);
    });

    test('iconData', async () => {
        let iconData = ['&#xe686;', '&#xe687;', '&#xe671;', '&#xe66a;', '&#xe66b;'];
        for (let i = 0; i < iconData.length; i++) {
            const wrapper1 = mount(steRate, {
                propsData: {
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
