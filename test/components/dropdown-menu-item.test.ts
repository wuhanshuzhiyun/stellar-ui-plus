import { mount } from '@vue/test-utils';
import steDropdownMenuItem from '@/uni_modules/stellar-ui-plus/components/ste-dropdown-menu-item/ste-dropdown-menu-item.vue';
import { DEOP_DOWN_MENU_KEY } from '@/uni_modules/stellar-ui-plus/components/ste-dropdown-menu/props';

describe('DropdownMenuItem', () => {
    const internalChildren = [];
    const mockParent = {
        props: {
            direction: 'column',
            type: 'normal',
        },
        updateItems: vi.fn(),
        chooseItems: [],
        choose: vi.fn(),
        cmpDuration: { value: 0.3 },
        add: vi.fn(child => {
            internalChildren.push(child);
        }),
        remove: vi.fn(child => {
            const index = internalChildren.indexOf(child);
            if (index > -1) {
                internalChildren.splice(index, 1);
            }
        }),
        internalChildren,
    };
    test('基本渲染', () => {
        const wrapper = mount(steDropdownMenuItem, {
            global: {
                provide: {
                    [DEOP_DOWN_MENU_KEY]: mockParent,
                },
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('设置值和标题', () => {
        const wrapper = mount(steDropdownMenuItem, {
            global: {
                provide: {
                    [DEOP_DOWN_MENU_KEY]: mockParent,
                },
            },
            props: {
                value: 'option1',
                title: '选项1',
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('禁用状态', () => {
        const wrapper = mount(steDropdownMenuItem, {
            global: {
                provide: {
                    [DEOP_DOWN_MENU_KEY]: mockParent,
                },
            },
            props: {
                disabled: true,
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('只读状态', () => {
        const wrapper = mount(steDropdownMenuItem, {
            global: {
                provide: {
                    [DEOP_DOWN_MENU_KEY]: mockParent,
                },
            },
            props: {
                readonly: true,
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('设置最大选择数量', () => {
        const wrapper = mount(steDropdownMenuItem, {
            global: {
                provide: {
                    [DEOP_DOWN_MENU_KEY]: mockParent,
                },
            },
            props: {
                max: 3,
            },
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('完整属性配置', () => {
        const wrapper = mount(steDropdownMenuItem, {
            global: {
                provide: {
                    [DEOP_DOWN_MENU_KEY]: mockParent,
                },
            },
            props: {
                value: 'test-value',
                title: '测试选项',
                disabled: false,
                readonly: false,
                max: 1,
            },
        });
        expect(wrapper.exists()).toBe(true);
    });
});
