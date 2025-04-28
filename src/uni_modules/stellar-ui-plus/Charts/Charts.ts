import type { ChartsOptions, ChartsType } from './types';
// @ts-ignore
import Ucharts from './u-charts.min.js';

/** 提示窗ToolTip方法参数 */
export interface ToolTipOptions {
    /** 强制选中的索引，即无论选择的位置是什么，都强制选中index的数据 */
    index?: number;
    /** 自定义ToolTip显示位置，格式为{x: Number, y: Number} */
    offset?: { x: number; y: number };
    /** 自定义ToolTip文案，格式为[{text: 显示的字符串, color: null或16进制颜色值, legendShape: 图例形状，请参考series.legendShape赋值}] */
    textList?: { text: string; color?: string; legendShape?: string }[];
    /** 格式化显示文字，格式为(item, category, index, opts) => { return string xxx } */
    formatter?: (item: any, category: string, index: number, opts: any) => string;
}

/** 图例点击交互参数 */
export interface TouchLegendOptions {
    /** 点击图例交互时是否开启动画效果，默认false关闭动画 */
    animation: boolean;
}

class Charts<T extends ChartsType> extends Ucharts {
    constructor(props: ChartsOptions<T>) {
        super(props);
    }

    /**
     * 更新配置或数据
     * @param data 配置项数据
     * @returns
     */
    updateData(data: ChartsOptions<T>) {
        return super.updateData(data);
    }

    /**
     * 提示窗ToolTip
     * @param e 标准event事件，可绑定在tap，touchstart，touchmove，touchend中
     * @param options 自定义ToolTip配置
     * @returns
     */
    showToolTip(e: Event, options: ToolTipOptions) {
        return super.showToolTip(e, options);
    }

    /**
     * 图例点击交互
     * @param e 标准event事件，可绑定在tap，touchstart，touchmove，touchend中
     * @param options 配置参数
     * @returns
     */
    touchLegend(e: Event, options: TouchLegendOptions) {
        return super.touchLegend(e, options);
    }

    /**
     * 获取图表点击索引
     * @param e 标准event事件，可绑定在tap，touchstart，touchmove，touchend中
     * @returns
     */
    getCurrentDataIndex(e: Event) {
        return super.getCurrentDataIndex(e);
    }

    /**
     * 获取图例点击索引
     * @param e 标准event事件，可绑定在tap，touchstart，touchmove，touchend中
     * @returns
     */
    getLegendDataIndex(e: Event) {
        return super.getLegendDataIndex(e);
    }

    /**
     * 滚动条拖拽事件(绑定在touchstart)
     */
    scrollStart(e: Event) {
        return super.scrollStart(e);
    }
    /**
     * 滚动条拖拽事件(绑定在touchmove)
     */
    scroll(e: Event) {
        return super.scroll(e);
    }
    /**
     * 滚动条拖拽事件(绑定在touchend)
     */
    scrollEnd(e: Event) {
        return super.scrollEnd(e);
    }

    /**
     * 动态设置滚动条
     * @param distance 图表滚动条的横向偏移距离，应为负数，一般用于图表联动
     * @returns
     */
    translate(distance: number) {
        return super.translate(distance);
    }

    /**
     * 图表缩放
     * @param v 缩放比例系数，此数值同opts.xAxis.itemCount作用一致，通过修改单屏显示数据数量来控制数据显示密度
     * @returns
     */
    zoom(v: number) {
        return super.zoom(v);
    }

    /**
     * 双指缩放
     * @param e 标准event事件，需要分别绑定在touchmove中
     * @returns
     */
    dobuleZoom(e: Event) {
        return super.dobuleZoom(e);
    }

    /**
     * 添加监听事件
     * @param type 监听事件名，可选值为renderComplete(渲染完成事件)、scrollLeft(滚动条滚动到最左侧事件)、scrollRight(滚动条滚动到最右侧事件)
     * @param callback 监听到事件后的回调方法，可在此方法中处理相关业务
     * @returns
     */
    addEventListener(type: 'renderComplete' | 'scrollLeft' | 'scrollRight', callback: () => void) {
        return super.addEventListener(type, callback);
    }

    /**
     * 移除监听事件
     * @param type 监听事件名，可选值为renderComplete(渲染完成事件)、scrollLeft(滚动条滚动到最左侧事件)、scrollRight(滚动条滚动到最右侧事件)
     * @returns
     */
    delEventListener(type: 'renderComplete' | 'scrollLeft' | 'scrollRight') {
        return super.delEventListener(type);
    }

    /**
     * 停止动画展示
     */
    stopAnimation() {
        return super.stopAnimation();
    }
}

export default Charts;
