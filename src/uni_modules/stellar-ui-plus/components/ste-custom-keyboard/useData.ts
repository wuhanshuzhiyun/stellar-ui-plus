import { computed, nextTick, ref, watch } from 'vue';
import utils from '../../utils/utils';
import { useColorStore } from '../../store/color';
import type { NumberKeyboardProps } from './props';

const { getColor } = useColorStore();
export default function useData({
    props,
    emits,
}: {
    props: NumberKeyboardProps;
    emits: {
        (e: 'change', value: string): void;
        (e: 'input', value: string): void;
        (e: 'update:modelValue', value: string): void;
        (e: 'clear'): void;
        (e: 'backspace'): void;
        (e: 'confirm', value: string): void;
        (e: 'click', key: string): void;
        (e: 'beforeinput', key: string, suspend: () => void, next: () => void, stop: () => void): void;
        (e: 'close'): void;
        (e: 'update:show', show: boolean): void;
        (e: 'open'): void;
        // 新增事件
        (e: 'update:inputValues', values: Record<string, string>): void; // 更新多输入框值的事件
    };
}) {
    const dataValue = ref('');
    const setDataValue = (value: string) => {
        if (value === dataValue.value) return;
        if (value === null || value === undefined) dataValue.value = '';
        else if (typeof value === 'string') dataValue.value = value;
        else dataValue.value = String(value);

    };

    watch(() => dataValue.value, (v) => {
        nextTick(() => {
            emits('update:modelValue', v);
            emits('change', v);
        })
    }, { immediate: true });

    const dataShow = ref(false);
    const setDataShow = (value: boolean) => {
        if (value === dataShow.value) return;
        dataShow.value = value;
    };

    const cmpNumbers = computed(() => {
        let keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        if (props.randomKeys) keys = utils.randomArray(keys);
        if (props.type === "idcard") {
            keys.push('X');
        }
        if (Array.isArray(props.customKeys) && props.customKeys.length) {
            keys.push(...props.customKeys);
        }

        if (!props.rightKeys) {
            if (!props.showClear) {
                keys.push('backspace');
                return;
            }
            const d = keys.length % 3;
            if (d === 1) {
                const end = keys.pop();
                keys.push('clear', end || '', 'backspace');
            } else {
                keys.push('clear', 'backspace');
            }
        }
        return keys;
    });

    const cmpRootStyle = computed(() => {
        return {
            '--ste-number-keyboard-text-color': props.textColor,
            '--ste-number-keyboard-text-size': `var(--font-size-${props.textSize},${utils.formatPx(props.textSize)})`,
            '--ste-number-keyboard-clear-text-size': `var(--font-size-${props.textSize},${utils.formatPx(Number(props.textSize) - 8)})`,
            '--ste-number-keyboard-confirm-text-size': `var(--font-size-${props.textSize},${utils.formatPx(Number(props.textSize) - 3)})`,
            '--ste-number-keyboard-confirm-bg': props.confirmBg ? props.confirmBg : getColor().steThemeColor,
            '--ste-number-keyboard-confirm-bg-active': utils.Color.formatColor(props.confirmBg, 0.8),
            '--ste-number-keyboard-confirm-color': props.confirmColor,
        };
    });

    watch(() => props.modelValue, setDataValue, { immediate: true });
    watch(() => props.show, setDataShow, { immediate: true });

    watch(
        () => props.activeInputRef,
        val => {
            if (!val) return;
            dataValue.value = props.inputValues[val];
        },
        { immediate: true }
    );

    const onClose = () => {
        setDataShow(false);
        emits('update:show', false);
        emits('close');
    };

    const beforInput = async (value: string) => {
        let next = true;
        const stop = new Promise((resolve, reject) => {
            emits(
                'beforeinput',
                value,
                () => (next = false),
                () => resolve('next'),
                () => reject(new Error('beforInput stop'))
            );
        });
        if (!next) await stop;

        /* eslint prefer-promise-reject-errors: "error" */
    };

    const onChange = async (value: string) => {
        try {
            if (value === 'confirm') {
                emits('confirm', dataValue.value);
                onClose();
                return;
            }
            switch (value) {
                case 'backspace':
                    setDataValue(dataValue.value.slice(0, dataValue.value.length - 1));
                    emits('backspace');
                    break;
                case 'clear':
                    setDataValue('');
                    emits('clear');
                    break;
                default:
                    await beforInput(value);
                    emits('click', value);
                    if (props.maxlength && dataValue.value.length >= Number(props.maxlength)) return;
                    if (value === "." && dataValue.value.includes(".")) return;
                    dataValue.value += value;
                    break;
            }
            emits('input', dataValue.value);


            if (props.activeInputRef) {
                const values = props.inputValues;
                values[props.activeInputRef] = dataValue.value;
                emits('update:inputValues', values);
            }
        } catch (e) {
            if (e) console.error(e);
        }
    };

    const onOpen = () => emits('open');

    const title = computed(() => {
        switch (props.type) {
            case 'number':
                return '数字键盘';
            case 'discount':
                return '折扣键盘';
            case 'idcard':
                return '身份证键盘';
        }
    })

    return { cmpNumbers, cmpRootStyle, dataShow, title, onClose, onChange, onOpen };
}
