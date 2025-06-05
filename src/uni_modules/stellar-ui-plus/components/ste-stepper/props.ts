import type { BaseEvent } from '@uni-helper/uni-app-types';
import type { PropType } from 'vue';
import type { AroundPositionType } from '../../types';

type CardType = 'card' | 'line' | 'add';

const stepperProps = {
    modelValue: { type: [Number, String], default: 1 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: Number.POSITIVE_INFINITY },
    step: { type: Number, default: 1 },
    inputWidth: { type: [Number, String], default: 64 },
    btnSize: { type: [Number, String] as PropType<number | string | undefined>, default: undefined },
    precision: { type: Number, default: 0 },
    theme: { type: String as PropType<CardType>, default: 'card' },
    mainColor: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    disablePlus: { type: Boolean, default: false },
    disableMinus: { type: Boolean, default: false },
    disableInput: { type: Boolean, default: false },
    readonlyInput: { type: Boolean, default: false },
    background: { type: String, default: '#ee0a24' },
    showDot: { type: Boolean, default: false },
    offsetX: { type: [String, Number], default: 'auto' },
    offsetY: { type: [String, Number], default: 'auto' },
    showZero: { type: Boolean, default: false },
    position: { type: String as PropType<AroundPositionType>, default: 'topRight' },
    badgeMax: { type: Number, default: 99 },
};

export interface StepperEmits {
    (e: 'update:modelValue', val: number): void;
    (e: 'focus', event: BaseEvent): void;
    (e: 'blur', event: BaseEvent): void;
    (e: 'change', value: number | string): void;
    (e: 'plus', value: number | string, suspend: () => void, next: () => void, stop: () => void): void;
    (e: 'minus', value: number | string, suspend: () => void, next: () => void, stop: () => void): void;
    (e: 'click-input'): void;
}

export default stepperProps;

export type StepperProps = ExtractPropTypes<typeof stepperProps>;
