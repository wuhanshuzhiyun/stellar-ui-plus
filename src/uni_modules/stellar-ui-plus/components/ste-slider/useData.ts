import type { ComponentPublicInstance, SetupContext } from 'vue';
import { ref } from 'vue';
import type { UniTouchEvent } from '../../types/event';
import type { SliderEmits, SliderProps } from './props';
import type { Position } from './type';

export default function useData(props: SliderProps, _emits: SetupContext<SliderEmits>['emit'], _instance: ComponentPublicInstance) {
    const realPercentage = ref(0);
    const realPercentage2 = ref(0);

    const isDrag = ref(false);
    const startPosition = ref<Position>({ clientX: 0, clientY: 0 });
    const startPercentage = ref(0);

    const markList = ref<Obj[]>([]);

    // 通过百分比获取真实值
    function getValueFromPercentage(percentage: number) {
        const value = Number(props.min) + ((Number(props.max) - Number(props.min)) * percentage) / 100;
        return Math.round(value / Number(props.step)) * Number(props.step);
    }

    // 根据真实值获取百分比值
    function getPercentageFromValue(value = 0) {
        // 首先确保值在范围内
        const constrainedValue = Math.max(Math.min(value, Number(props.max)), Number(props.min));

        // 计算百分比
        const range = Number(props.max) - Number(props.min);

        // 避免除以零的情况
        if (range === 0) {
            return 0;
        }

        // 计算并返回百分比值(0-100)
        const percentage = ((constrainedValue - Number(props.min)) / range) * 100;

        return percentage;
    }

    // 根据传入的最大最小值来计算传入的值是否在范围内，并给出范围内的值
    function getRealValue(value = 0, max = props.max, min = props.min) {
        return Math.max(Math.min(value, Number(max)), Number(min));
    }

    function calculateStepMarks() {
        if (!props.showStops) return;
        markList.value = [];
        const min = Number(props.min);
        const max = Number(props.max);

        const marksKeys = Object.keys(props.marks || {});
        if (marksKeys.length > 0) {
            marksKeys.forEach(e => {
                markList.value.push({
                    left: props.vertical ? '0' : `${e}%`,
                    top: props.vertical ? `${e}%` : '0',
                    style: props.marks[e].style,
                    label: typeof props.marks[e] === 'string' ? props.marks[e] : props.marks[e].label,
                });
            });
        } else {
            for (let i = min; i <= max; i += Number(props.step)) {
                // 根据自定义的 marks 对象判断是否需要显示该标记点
                if (i === min || i === max) continue; // 跳过第一个和最后一个标记点

                const percentage = ((i - min) / (max - min)) * 100;
                markList.value.push({
                    left: props.vertical ? '0' : `${percentage}%`,
                    top: props.vertical ? `${percentage}%` : '0',
                });
            }
        }
    }

    // 为了保持web端和移动端事件参数数据结构一致
    function getPosition(e: UniTouchEvent | MouseEvent) {
        if ('touches' in e) return e.touches[0];
        else return { clientX: e.clientX, clientY: e.clientY };
    }

    return {
        isDrag,
        realPercentage,
        realPercentage2,
        startPosition,
        startPercentage,
        markList,
        getRealValue,
        calculateStepMarks,
        getPosition,
        getValueFromPercentage,
        getPercentageFromValue,
    };
}
