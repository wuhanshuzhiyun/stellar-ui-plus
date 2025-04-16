import { mount } from '@vue/test-utils';
import steAnimate from '../../src/uni_modules/stellar-ui-plus/components/ste-animate/ste-animate.vue';
import { nextTick } from 'vue';
describe('Animate ', async () => {
    let duration = 5000;
    const wrapper = mount(steAnimate, {
        props: {
            show: true,
            loop: true,
            duration,
        },
        slots: {
            default: `<ste-button>shakeX-横向</ste-button>`,
        },
    });
    const rootEl: any = wrapper.get('[data-test="animate"]');
    await nextTick();

    test('loop', () => {
        expect(rootEl.classes().includes('loop')).toBe(true);
    });

    test('duration', () => {
        let duration1 = duration / 1000 + 's';
        expect(rootEl.element.style._values['animation-duration']).toBe(duration1);
    });

    test('type', async () => {
        let typeArr = ['shake', 'ripple', 'breath', 'float', 'slide-right', 'slide-left', 'slide-top', 'slide-bottom', 'jump', 'twinkle', 'flicker'];
        for (let value of typeArr) {
            const wrapper = mount(steAnimate, {
                props: {
                    show: true,
                    loop: true,
                    type: value,
                },
                slots: {
                    default: `<ste-button>shakeX-横向</ste-button>`,
                },
            });
            const rootEl: any = wrapper.get('[data-test="animate"]');
            await nextTick();
            let typeClass = 'ste-animate-' + value;
            expect(rootEl.classes().includes(typeClass)).toBe(true);
        }
    });
});
