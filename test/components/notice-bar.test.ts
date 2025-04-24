import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steNoticeBar from '../../src/uni_modules/stellar-ui-plus/components/ste-notice-bar/ste-notice-bar.vue';

describe('NoticeBar', async () => {
    let list = ['第一条:1111111111111111111111111111'];
    let direction = 'vertical';
    let closeMode = true;
    let color = 'red';
    let background = 'blue';
    let width = 200;
    let scrollable = false;
    const wrapper: any = mount(steNoticeBar, {
        props: {
            list,
            direction,
            closeMode,
            color,
            background,
            width,
            scrollable,
        },
    });
    const noticeBar = wrapper.get('[data-test="notice-bar"]');
    const richTexts = noticeBar.get('[data-test="rich-text"]').get('.rich-text');
    const nodes = richTexts.attributes().nodes;
    const center = noticeBar.find('.center');
    await nextTick();

    test('list', () => {
        expect(list[0]).toBe(nodes);
    });

    test('direction', () => {
        expect(center.classes('center')).toBe(true);
    });

    test('closeMode', () => {
        expect(noticeBar.find('.right-icon').exists()).toBe(true);
    });

    test('color', () => {
        expect(noticeBar.element.style._values['color']).toBe(color);
    });

    test('background', () => {
        expect(noticeBar.element.style._values['background']).toBe(background);
    });

    test('width', () => {
        let width1 = width / 2 + 'px';
        expect(noticeBar.element.style._values['width']).toBe(width1);
    });

    test('scrollable', () => {
        let classString = wrapper.get('.center').classes().join();
        expect(classString.includes('play-infinite')).toBe(false);
    });
});
