import { mount } from '@vue/test-utils';
import steFunctionList from '../../src/uni_modules/stellar-ui-plus/components/ste-function-list/ste-function-list.vue';
import { nextTick } from 'vue';

describe('FunctionList ', async () => {
    test('base', async () => {
        const data = [{ title: '早餐   梅姨家常菜', subhead: '红烧牛肉面、海盐芝士燕麦奶、黑胡椒香煎鸡蛋', statusText: '当前不可取消', image: 'https://image.whzb.com/chain/StellarUI/bg1.jpg' }];
        let title = '今日餐食';
        let subhead = '食刻准备 到点开吃';
        let buttonText = '核销';
        let buttonIcon = '&#xe693;';
        const wrapper = mount(steFunctionList, {
            props: {
                title,
                subhead,
                buttonText,
                buttonIcon,
                data,
            },
        });
        const rootEl: any = wrapper.get('[data-test="function-list"]');
        const titleDom = rootEl.get('.ste-function-list-title');
        const subheadDom = rootEl.get('.ste-function-list-subhead');

        await nextTick();
        expect(titleDom.text()).toBe(title);
        expect(subheadDom.text()).toBe(subhead);
    });
});
