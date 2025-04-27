import { computed, ref } from 'vue';
import type { ChartsProps } from './props';
import utils from '../../utils/utils';
import type { ChartsType } from '../../Charts/types';
export default function useData<T extends ChartsType>(props: ChartsProps<T>) {
    const size = computed(() => ({ width: utils.formatPx(props.width), height: utils.formatPx(props.height) }));

    return { size };
}
