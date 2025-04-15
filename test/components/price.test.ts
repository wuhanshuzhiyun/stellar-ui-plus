import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import stePrice from '../../src/uni_modules/stellar-ui-plus/components/ste-price/ste-price.vue';
import utils from '../../src/uni_modules/stellar-ui-plus/utils/utils';
import { fontSize } from '../methods';
describe('Price', () => {
    const props = {
        value: 9527,
        unitSymbol: '¥',
        valueUnit: 'fen',
    };

    test('value', async () => {
        let wrapper: any = mount(stePrice, {
            props,
        });
        await nextTick();

        const realValue = utils.fenToYuan(props.value, 2, '', 0);
        const valueArr = realValue.split('.');
        expect(wrapper.text()).toBe(`${props.unitSymbol}${valueArr[0]}.${valueArr[1]}`);
    });

    test('unit', async () => {
        let wrapper: any = mount(stePrice, {
            props: Object.assign(props, {
                valueUnit: 'yuan',
            }),
        });
        await nextTick();

        expect(wrapper.text()).toBe(`${props.unitSymbol}${props.value}`);
    });

    test('digits', async () => {
        let wrapper: any = mount(stePrice, {
            props: Object.assign(props, {
                digits: -1,
            }),
        });
        await nextTick();
        expect(wrapper.text()).toBe(`${props.unitSymbol}${props.value}`);
    });

    test('showUnit', async () => {
        let wrapper: any = mount(stePrice, {
            props: Object.assign(props, {
                showUnit: false,
                valueUnit: 'fen',
            }),
        });
        await nextTick();
        const realValue = utils.fenToYuan(props.value, 2, '', 0);
        const valueArr = realValue.split('.');
        expect(wrapper.text()).toBe(`${valueArr[0]}.${valueArr[1]}`);
    });

    test('unitSymbol', async () => {
        let unitSymbol = '$';
        let wrapper: any = mount(stePrice, {
            props: Object.assign(props, {
                unitSymbol,
                showUnit: true,
            }),
        });
        await nextTick();
        const realValue = utils.fenToYuan(props.value, 2, '', 0);
        const valueArr = realValue.split('.');
        expect(wrapper.text()).toBe(`${unitSymbol}${valueArr[0]}.${valueArr[1]}`);
    });

    test('fontSize', async () => {
        let size = 50;
        let wrapper: any = mount(stePrice, {
            props: Object.assign(props, {
                fontSize: size,
            }),
        });
        await nextTick();
        let size1 = size / 2 + 'px';
        expect(fontSize(wrapper.find('.yuan-price').element.style.fontSize)).toBe(size1);
    });

    test('color', async () => {
        let wrapper: any = mount(stePrice, {
            props: Object.assign(props, {
                color: 'green',
            }),
        });
        await nextTick();
        expect(wrapper.find('.content').element.style.color).toBe('green');
    });

    test('lineprice', async () => {
        let wrapper: any = mount(stePrice, {
            props: Object.assign(props, {
                linePriceColor: '#666666',
                isSuggestPrice: true,
            }),
        });
        await nextTick();
        const unit = wrapper.find('.unit');
        const fen = wrapper.find('.yuan-price');
        const yuan = wrapper.find('.fen-price');
        expect(unit.element.style.textDecoration).toBe('line-through');
        expect(fen.element.style.textDecoration).toBe('line-through');
        expect(yuan.element.style.textDecoration).toBe('line-through');
    });

    test('lineHeight', async () => {
        let wrapper: any = mount(stePrice, {
            props: Object.assign(props, {
                lineHeight: 1,
            }),
        });
        await nextTick();
        expect(wrapper.find('.content').element.style.lineHeight).toBe('0.5px');
    });

    test('margin', async () => {
        const margin = 4;
        let wrapper: any = mount(stePrice, {
            props: Object.assign(props, {
                marginTop: margin,
                marginRight: margin,
                marginBottom: margin,
                marginLeft: margin,
            }),
        });
        await nextTick();
        expect(wrapper.find('.content').element.style.margin).toBe(`${margin / 2}px ${margin / 2}px ${margin / 2}px ${margin / 2}px`);
    });

    test('styleType', async () => {
        let wrapper: any = mount(stePrice, {
            props: Object.assign(props, {
                styleType: 1,
            }),
        });
        await nextTick();
        const fen = wrapper.find('.yuan-price');
        const yuan = wrapper.find('.fen-price');
        expect(fen.element.style.fontSize).toBe(yuan.element.style.fontSize);
    });

    test('bold', async () => {
        let wrapper: any = mount(stePrice, {
            props: Object.assign(props, {
                bold: true,
            }),
        });
        await nextTick();
        expect(wrapper.find('.content').element.style.fontWeight).toBe('bold');
    });
});
