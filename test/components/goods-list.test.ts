import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import GoodsList from '../../src/uni_modules/stellar-ui-plus/components/ste-goods-list/ste-goods-list.vue';

describe('GoodsList Component', async () => {
    const wrapper = mount(GoodsList, {
        props: {
            title: '测试列表',
            hideTitleIcon: false,
            titleIcon: '',
            titleStyle: {},
            data: [],
        },
    });
    await nextTick();

    test('data', async () => {
        expect(wrapper.props('data')).toEqual([]);
    });

    test('title', async () => {
        expect(wrapper.props('title')).toBe('测试列表');
    });
    test('hideTitleIcon', async () => {
        expect(wrapper.props('hideTitleIcon')).toBe(false);
    });
    test('titleIcon', async () => {
        expect(wrapper.props('titleIcon')).toBe('');
    });
});
