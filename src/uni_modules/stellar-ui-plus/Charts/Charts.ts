// @ts-ignore
import Ucharts from './u-charts.min.js';
import type { ChartsOptions, ChartsType } from './types.js';

class Charts<T extends ChartsType> extends Ucharts {
    constructor(props: Partial<ChartsOptions<T>>) {
        super(props);
    }
}

export default Charts;
