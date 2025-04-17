import { mount } from '@vue/test-utils';
import steProgress from '../../src/uni_modules/stellar-ui-plus/components/ste-progress/ste-progress.vue';
import { nextTick } from 'vue';
import { fontSize } from '../methods';

describe('Progress', () => {
    const props = {
        percentage: 40,
    };

    test('percentage', async () => {
        let wrapper: any = mount(steProgress, { props });
        await nextTick();
        expect(wrapper.element.style.getPropertyValue('--active-width')).toBe(props.percentage + '%');
    });

    test('bg', async () => {
        let wrapper: any = mount(steProgress, {
            props: Object.assign(props, {
                activeBg: 'https://image.whzb.com/chain/StellarUI/image/p-red.png',
                inactiveBg: '#CCCCCC',
            }),
        });
        await nextTick();
        const inactive = wrapper.find('.inactive-box');
        const active = wrapper.find('.active-box');

        expect(inactive.element.style.backgroundColor).toBe('rgb(204, 204, 204)');
        expect(active.element.style.backgroundImage).toBe(`url(https://image.whzb.com/chain/StellarUI/image/p-red.png)`);
    });

    test('strokeWidth', async () => {
        let wrapper: any = mount(steProgress, {
            props: Object.assign(props, {
                strokeWidth: 10,
            }),
        });
        await nextTick();
        expect(wrapper.element.style.getPropertyValue('--progress-height')).toBe('5px');
    });

    test('disabled', async () => {
        let wrapper: any = mount(steProgress, {
            props: Object.assign(props, {
                disabled: true,
            }),
        });
        await nextTick();
        expect(wrapper.find('.active-box').element.style.backgroundColor).toBe('rgb(204, 204, 204)');
    });

    test('width', async () => {
        let wrapper: any = mount(steProgress, {
            props: Object.assign(props, {
                width: 300,
            }),
        });
        await nextTick();
        expect(wrapper.element.style.getPropertyValue('--progress-width')).toBe('150px');
    });

    test('duration', async () => {
        let wrapper: any = mount(steProgress, {
            props: Object.assign(props, {
                duration: 0.5,
            }),
        });
        await nextTick();
        expect(wrapper.element.style.getPropertyValue('--active-transition-duration')).toBe('0.5s');
    });

    test('text', async () => {
        const options = {
            pivotText: '正在热抢',
            textColor: '#FF1E19',
            textAlign: 'left',
            textSize: 20,
        };
        let wrapper: any = mount(steProgress, { props: Object.assign(props, options) });
        await nextTick();

        expect(wrapper.find('.text').text()).toBe(options.pivotText);
        expect(wrapper.element.style.getPropertyValue('--active-text-color')).toBe(options.textColor);
        expect(wrapper.element.style.getPropertyValue('--active-text-align')).toBe(options.textAlign);
        expect(fontSize(wrapper.element.style.getPropertyValue('--active-text-font-size'))).toBe(options.textSize / 2 + 'px');
    });

    test('displayTextThreshold', async () => {
        let wrapper: any = mount(steProgress, { props: Object.assign(props, { pivotText: '', displayTextThreshold: 20 }) });
        await nextTick();
        expect(wrapper.find('.text').text()).toBe(props.percentage + '%');

        let wrapper2: any = mount(steProgress, { props: Object.assign(props, { displayTextThreshold: 50 }) });
        await nextTick();
        expect(wrapper2.find('.text').text()).toBe('');
    });
});
