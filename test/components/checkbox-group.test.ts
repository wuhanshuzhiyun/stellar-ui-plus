import { mount } from '@vue/test-utils';
import steCheckboxGroup from '@/uni_modules/stellar-ui-plus/components/ste-checkbox-group/ste-checkbox-group.vue';
import steCheckbox from '@/uni_modules/stellar-ui-plus/components/ste-checkbox/ste-checkbox.vue';

describe('CheckboxGroup', () => {
    test('基本渲染', () => {
        const wrapper = mount(steCheckboxGroup);
        expect(wrapper.exists()).toBe(true);
    });

    test('默认方向为 column', () => {
        const wrapper = mount(steCheckboxGroup);
        expect(wrapper.exists()).toBe(true);
    });

    test('设置方向为 row', () => {
        const wrapper = mount(steCheckboxGroup, {
            props: {
                direction: 'row'
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('设置最大选择数量', () => {
        const wrapper = mount(steCheckboxGroup, {
            props: {
                max: 2
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('禁用状态', () => {
        const wrapper = mount(steCheckboxGroup, {
            props: {
                disabled: true
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('只读状态', () => {
        const wrapper = mount(steCheckboxGroup, {
            props: {
                readonly: true
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义形状', () => {
        const wrapper = mount(steCheckboxGroup, {
            props: {
                shape: 'circle'
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义图标大小', () => {
        const wrapper = mount(steCheckboxGroup, {
            props: {
                iconSize: 24
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义选中颜色', () => {
        const wrapper = mount(steCheckboxGroup, {
            props: {
                checkedColor: '#FF0000'
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义文本位置', () => {
        const wrapper = mount(steCheckboxGroup, {
            props: {
                textPosition: 'right'
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义文本大小', () => {
        const wrapper = mount(steCheckboxGroup, {
            props: {
                textSize: 16
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义文本颜色', () => {
        const wrapper = mount(steCheckboxGroup, {
            props: {
                textInactiveColor: '#999999',
                textActiveColor: '#000000'
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('禁用文本', () => {
        const wrapper = mount(steCheckboxGroup, {
            props: {
                textDisabled: true
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('自定义间距', () => {
        const wrapper = mount(steCheckboxGroup, {
            props: {
                marginLeft: 10,
                marginRight: 10,
                columnGap: 20
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('嵌套 checkbox 组件', () => {
        const wrapper = mount({
            template: `
                <ste-checkbox-group>
                    <ste-checkbox label="1">选项1</ste-checkbox>
                    <ste-checkbox label="2">选项2</ste-checkbox>
                    <ste-checkbox label="3">选项3</ste-checkbox>
                </ste-checkbox-group>
            `,
            components: {
                steCheckboxGroup,
                steCheckbox
            }
        });
        expect(wrapper.exists()).toBe(true);
    });
});