import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Steps from '../../src/uni_modules/stellar-ui-plus/components/ste-steps/ste-steps.vue';

describe('Steps', async () => {
    const wrapper: any = mount(Steps, {
        props: {
            direction: 'row',
            dot: false,
        },
        slots: {
            default: `<uni-view data-v-6a806df8="" data-v-03d55523="" class="ste-step ste-step-row" style="---color: #0090FF; ---bg-color: #0090FF; ---num-color: #ffffff; ---desc-color: #999999; ---line-color: #EEEEEE; ---dot-color: #0090FF;"><uni-view data-v-6a806df8="" class="ste-step-head"><uni-view data-v-6a806df8="" class="ste-step-line"></uni-view><uni-view data-v-6a806df8="" class="ste-step-icon is-text"><uni-view data-v-6a806df8="" class="ste-step-inner">1</uni-view></uni-view></uni-view><uni-view data-v-6a806df8="" class="ste-step-content ste-step-content-row"><uni-view data-v-6a806df8="" class="ste-step-title"><span data-v-6a806df8="">第1步</span></uni-view><!----></uni-view></uni-view><uni-view data-v-6a806df8="" data-v-03d55523="" class="ste-step ste-step-row" style="---color: #cccccc; ---bg-color: #ffffff; ---num-color: #cccccc; ---desc-color: #cccccc; ---line-color: #EEEEEE; ---dot-color: #DDDDDD;"><uni-view data-v-6a806df8="" class="ste-step-head"><uni-view data-v-6a806df8="" class="ste-step-line"></uni-view><uni-view data-v-6a806df8="" class="ste-step-icon is-text"><uni-view data-v-6a806df8="" class="ste-step-inner">2</uni-view></uni-view></uni-view><uni-view data-v-6a806df8="" class="ste-step-content ste-step-content-row"><uni-view data-v-6a806df8="" class="ste-step-title"><span data-v-6a806df8="">第2步</span></uni-view><!----></uni-view></uni-view><uni-view data-v-6a806df8="" data-v-03d55523="" class="ste-step ste-step-row" style="---color: #cccccc; ---bg-color: #ffffff; ---num-color: #cccccc; ---desc-color: #cccccc; ---line-color: #EEEEEE; ---dot-color: #DDDDDD;"><uni-view data-v-6a806df8="" class="ste-step-head"><!----><uni-view data-v-6a806df8="" class="ste-step-icon is-text"><uni-view data-v-6a806df8="" class="ste-step-inner">3</uni-view></uni-view></uni-view><uni-view data-v-6a806df8="" class="ste-step-content ste-step-content-row"><uni-view data-v-6a806df8="" class="ste-step-title"><span data-v-6a806df8="">第3步</span></uni-view><!----></uni-view></uni-view>`,
        },
    });
    const list = wrapper.findAll('.ste-step');
    const head = wrapper.findAll('.ste-step-head');
    await nextTick();

    test('init', async () => {
        expect(list.length).toBe(3);
    });

    test('active', async () => {
        expect(list[0].element.style._values['---color']).toBe('#0090FF');
    });

    test('direction', () => {
        expect(list[0].classes().includes('ste-step-row')).toBe(true);
    });

    test('dot', () => {
        expect(head[0].classes().includes('head-is-dot')).toBe(false);
    });
});
