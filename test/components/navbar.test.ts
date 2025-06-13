import { mount } from '@vue/test-utils';
import steNavbar from '../../src/uni_modules/stellar-ui-plus/components/ste-navbar/ste-navbar.vue';
import { nextTick } from 'vue';
import { colorRgbToHex, iconFormart } from '../methods';
describe('Navbar ', async () => {
    let autoBack = true;
    let backColor = '#ffffff';
    let backCode = '&#xe653;';
    let backBackgroundColor = '#000000';
    let backBorderColor = '#000000';
    let backOpacity = 0.8;

    let title = 'test';
    let titleColor = 'red';
    let titleAlignment = 2;
    let fixed = true;
    let safeAreaInsetTop = false;

    let zIndex = 100;
    let backgroundColor = 'red';
    const wrapper = mount(steNavbar, {
        props: {
            autoBack,
            backColor,
            backCode,
            backBackgroundColor,
            backBorderColor,
            backOpacity,
            title,
            titleColor,
            titleAlignment,
            fixed,
            safeAreaInsetTop,
            zIndex,
            backgroundColor,
        },
    });
    const rootEl: any = wrapper.get('[data-test="navbar"]');
    const back: any = rootEl.get('.back');
    const icon: any = wrapper.get('[data-test="icon"]');
    const titleDom: any = rootEl.get('.title-center');
    const nav: any = rootEl.get('.nav');
    await nextTick();

    test('back btn', () => {
        expect(rootEl.exists()).toBe(autoBack);
        expect(icon.text()).toBe(iconFormart(backCode));
        expect(icon.element.style._values['--color']).toBe(backColor);
        expect(colorRgbToHex(back.element.style._values['background-color'])).toBe(backBackgroundColor);
        expect(colorRgbToHex(back.element.style._values['border-color'])).toBe(backBorderColor);
        expect(Number(back.element.style._values['opacity'])).toBe(backOpacity);
    });

    test('title', () => {
        expect(titleDom.exists()).toBe(titleAlignment == 2);
        expect(titleDom.text()).toBe(title);
        expect(titleDom.element.style._values['color']).toBe(titleColor);
        expect(rootEl.element.style._values['position']).toBe('fixed');
        expect(rootEl.element.style._values['top']).toBe('0px');
    });

    test('nav', () => {
        expect(Number(rootEl.element.style._values['z-index'])).toBe(zIndex);
        expect(nav.element.style._values['background-color']).toBe(backgroundColor);
    });
});
