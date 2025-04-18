import { mount } from '@vue/test-utils';
import steDropdownMenu from '../../src/uni_modules/stellar-ui-plus/components/ste-dropdown-menu/ste-dropdown-menu.vue';
import steDropdownMenuItem from '../../src/uni_modules/stellar-ui-plus/components/ste-dropdown-menu-item/ste-dropdown-menu-item.vue';
import { describe, test, expect, beforeEach, afterEach } from 'vitest';

describe('DropdownMenu', () => {
    let wrapper;

    const createWrapper = (props = {}) => {
        return mount(steDropdownMenu, {
            global: {
                // Vue 3中使用global而不是直接在mount选项中
                components: {
                    'ste-dropdown-menu-item': steDropdownMenuItem,
                },
            },
            props: {
                // Vue 3中使用props而不是propsData
                title: '标题',
                value: '2',
                ...props, // 允许覆盖默认props
            },
            slots: {
                default: `
          <ste-dropdown-menu-item value="1" title="全部商品" />
          <ste-dropdown-menu-item value="2" title="新款商品" />
          <ste-dropdown-menu-item value="3" title="活动商品" />
        `,
            },
        });
    };

    beforeEach(async () => {
        wrapper = createWrapper();
        await wrapper.vm.$nextTick();
    });

    afterEach(() => {
        wrapper.unmount(); // Vue 3中使用unmount而不是destroy
    });

    test('title', async () => {
        expect(wrapper.find('.title').text()).toBe('标题');
    });

    test('color', async () => {
        // 使用setProps并等待更新
        wrapper = createWrapper({ activeColor: '#e9e', inactiveColor: '#53e' });
        await wrapper.setProps({ activeColor: '#e9e', inactiveColor: '#53e' });

        // 如果样式更新有延迟，尝试等待一段时间
        await new Promise(r => setTimeout(r, 100));
        console.log('after delay activeColor:', wrapper.html());
        expect(wrapper.element.style.getPropertyValue('--active-color')).toBe('#e9e');
        expect(wrapper.element.style.getPropertyValue('--inactive-color')).toBe('#53e');
    });
});
