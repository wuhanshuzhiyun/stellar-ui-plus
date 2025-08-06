import { watch, nextTick, type SetupContext } from 'vue';
import type { BaseFilterItem, FilterItem, FilterValue } from './type';
import type { FilterToolProps, FilterToolEmits } from './props';

/**
 * 简化的筛选逻辑组合式函数
 */
export default function useSimpleFilterLogic(props: FilterToolProps, emits: SetupContext<FilterToolEmits>['emit'], filtersData: FilterItem[]) {
    /**
     * 根据传入的value设置选中状态
     */
    const setValuesFromProps = (values: FilterValue[]) => {
        // 重置所有选中状态
        filtersData.forEach(item => {
            item.children?.forEach(child => {
                child.active = false;
            });
            // 复选框模式重置
            if (props.filterType === 'checkbox') {
                item.activeValue = '';
            }
        });

        // 设置传入的选中值
        values.forEach(filterValue => {
            const item = filtersData.find(f => (f.key || f.value) === filterValue.key);
            if (!item) return;

            if (props.filterType === 'checkbox') {
                // 复选框模式：只选第一个值
                item.activeValue = filterValue.values[0] || '';
            } else {
                // 按钮模式：根据values数组设置active
                item.children?.forEach(child => {
                    child.active = filterValue.values.includes(String(child.value));
                });
            }
        });
    };

    /**
     * 收集当前选中的数据，返回FilterValue[]格式
     */
    const collectCurrentValues = (): FilterValue[] => {
        const results: FilterValue[] = [];

        filtersData.forEach(item => {
            const key = item.key || item.value;
            let selectedValues: string[] = [];

            if (props.filterType === 'checkbox') {
                // 复选框模式
                if (item.activeValue) {
                    selectedValues = [item.activeValue];
                }
            } else {
                // 按钮模式
                if (item.type === 'input') {
                    selectedValues = item.config?.value ? [String(item.config.value)] : [];
                } else {
                    // 默认为按钮
                    const activeChildren = item.children?.filter(child => child.active) || [];
                    selectedValues = activeChildren.map(child => String(child.value));
                }
            }

            // 只有选中了值才加入结果
            if (selectedValues.length > 0) {
                results.push({
                    title: item.title,
                    key,
                    values: selectedValues,
                });
            }
        });

        return results;
    };

    /**
     * 更新值并触发事件
     */
    const updateAndEmitValues = (item: FilterItem) => {
        const currentValues = collectCurrentValues();
        emits('update:value', currentValues);
        emits('itemClick', currentValues.find(e => e.key === item.key) as FilterValue);
    };

    /**
     * 处理按钮模式的筛选项点击
     */
    const handleFilterClick = (item: FilterItem, child: BaseFilterItem) => {
        if (item.multiple) {
            // 多选：切换状态
            child.active = !child.active;
        } else {
            // 单选：重置其他项，激活当前项
            item.children?.forEach(filter => {
                filter.active = false;
            });
            child.active = true;
        }

        updateAndEmitValues(item);
    };

    /**
     * 处理复选框模式的选择
     */
    const handleCheckboxChange = (item: FilterItem, value: string) => {
        item.activeValue = value;
        updateAndEmitValues(item);
    };

    /**
     * 重置所有选择
     */
    const handleReset = () => {
        filtersData.forEach(item => {
            item.children?.forEach(child => {
                child.active = false;
            });
            if (props.filterType === 'checkbox') {
                item.activeValue = '';
            }
        });

        emits('update:value', []);
        emits('reset');
    };

    /**
     * 确认选择
     */
    const handleConfirm = () => {
        const currentValues = collectCurrentValues();
        emits('confirm', currentValues);
    };

    // 监听props.value变化，同步到组件内部状态
    watch(
        () => props.value,
        newValue => {
            if (newValue && Array.isArray(newValue) && newValue.length >= 0) {
                nextTick(() => {
                    setValuesFromProps(newValue);
                });
            }
        },
        { immediate: true, deep: true }
    );

    return {
        handleFilterClick,
        handleCheckboxChange,
        handleReset,
        handleConfirm,
        collectCurrentValues,
        setValuesFromProps,
    };
}
