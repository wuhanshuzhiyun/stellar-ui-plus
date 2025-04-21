import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Tour from '../../src/uni_modules/stellar-ui-plus/components/ste-tour/ste-tour.vue';

describe('Tour Vue Component', async () => {
    const wrapper = mount(Tour, {
        propsData: {
            show: true,
            steps: [{ message: '点这里', target: 'test-button1' }],
            offset: [0, 0],
            showTitleBar: false,
            showFooter: true,
            mask: true,
            maskColse: true,
            showPrevStep: true,
            background: 'rgba(0,0,0,.5)',
            radius: 18,
            messageBg: '#ffffff',
            messageColor: '#000000',
            nextStepTxt: '下一步',
            prevStepTxt: '上一步',
            completeTxt: '完成',
        },
    });

    await new Promise(p => setTimeout(p, 500));

    test('offset', () => {
        expect(wrapper.props('offset')).toEqual([0, 0]);
    });
    test('showTitleBar', () => {
        expect(wrapper.props('showTitleBar')).toBe(false);
    });
    test('showFooter', () => {
        expect(wrapper.props('showFooter')).toBe(true);
    });
    test('mask', () => {
        expect(wrapper.props('mask')).toBe(true);
    });
    test('maskColse', () => {
        expect(wrapper.props('maskColse')).toBe(true);
    });
    test('showPrevStep', () => {
        expect(wrapper.props('showPrevStep')).toBe(true);
    });
    test('background', () => {
        expect(wrapper.props('background')).toBe('rgba(0,0,0,.5)');
    });
    test('radius', () => {
        expect(wrapper.props('radius')).toBe(18);
    });
    test('messageBg', () => {
        expect(wrapper.props('messageBg')).toBe('#ffffff');
    });
    test('messageColor', () => {
        expect(wrapper.props('messageColor')).toBe('#000000');
    });
    test('nextStepTxt', () => {
        expect(wrapper.props('nextStepTxt')).toBe('下一步');
    });
    test('prevStepTxt', () => {
        expect(wrapper.props('prevStepTxt')).toBe('上一步');
    });
    test('completeTxt', () => {
        expect(wrapper.props('completeTxt')).toBe('完成');
    });
});
