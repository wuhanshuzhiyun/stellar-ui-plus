import type { TypeSkeleton } from '../../types';
import { type PropType } from 'vue';

export default {
    loading: { type: Boolean, default: true },
    type: { type: String as PropType<TypeSkeleton>, default: 'text' },
};
