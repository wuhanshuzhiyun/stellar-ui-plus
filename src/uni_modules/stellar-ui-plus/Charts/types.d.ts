export type ChartsType =
    | 'column'
    | 'mount'
    | 'bar'
    | 'line'
    | 'tline'
    | 'area'
    | 'tarea'
    | 'scatter'
    | 'bubble'
    | 'mix'
    | 'pie'
    | 'ring'
    | 'rose'
    | 'radar'
    | 'arcbar'
    | 'gauge'
    | 'funnel'
    | 'word'
    | 'candle'
    | 'map';

export interface ChartsSerieDataItem<T extends ChartsType> {
    name: string;
    value: number;
    color?: string;
    labelText?: string;
    labelShow?: boolean;
    centerText?: string;
    centerTextSize?: number;
    centerTextColor?: string;
}

export type ChartsSerieData<T extends ChartsType> = T extends 'column' | 'bar' | 'line' | 'area' | 'radar'
    ? number[]
    : T extends 'gauge' | 'arcbar'
      ? number
      : T extends 'tline' | 'tarea' | 'scatter'
        ? [number, number][]
        : T extends 'bubble'
          ? [number, number, number, string][]
          : T extends 'word'
            ? {
                  name: string;
                  textSize: number;
              }[]
            : T extends 'candle'
              ? [number, number, number, number][]
              : T extends 'map'
                ? any
                : {
                      name: string;
                      centerText?: string;
                      value: number | string;
                  }[];

export interface ChartsSerie<T extends ChartsType> {
    /** 多维数据结构索引值，应用于多坐标系 */
    index?: number;
    /** 数据名称 */
    name: string;
    /** 自定义图例显示文字（不传默认显示上面的name值） */
    legendText?: string;
    /** 数据值 */
    data: ChartsSerieData<T>;
    /** 图形显示状态，配合点击图例显示状态，也可默认指定是否显示 */
    show?: boolean;
    /** 图形颜色，例如#7cb5ec 不传入则使用系统默认配色方案 */
    color?: string;
    /** 仅限地图，用于地图设置每个区域透明度方式来实现颜色过度效果 */
    fillOpacity?: number;
    /** 图形上方标注文字的颜色（datalabel文字颜色），例如#7cb5ec 不传入则使用系统默认配色方案 */
    textColor?: string;
    /** 图形上方标注文字的字体大小 */
    textSize?: number;
    /** 图形上方标注文字的偏移距离，负数为向上偏移，正数向下偏移 */
    textOffset?: number;
    /** 渐变色索引，用于对应extra配置中的渐变色数组下标，默认为当前series数组的下标 */
    linearIndex?: number;
    /** 混合图表图形展示方式，有效值为point,line,column,area */
    type?: 'point' | 'line' | 'column' | 'area';
    /** 混合图表中禁止显示ToolTip图例，默认false即默认显示该类别图例 */
    disableLegend?: boolean;
    /** 仅限折线图或区域图断点续连，即跳过null的点位直接连到下个点位 */
    connectNulls?: boolean;
    /** 仅限折线图阴影配置，格式为4位数组：[offsetX,offsetY,blur,color] */
    setShadow?: [number, number, number, string];
    /** 仅限折线图渐变色数组，格式为2维数组[起始位置，颜色值]，例如[[0,'#0EE2F8'],[0.3,'#2BDCA8'],[0.6,'#1890FF'],[1,'#9A60B4']] */
    linearColor: [number, string][];
    /** 暂时定义为混合图表折线图或区域图样式，可选值：'curve'曲线,'straight'直线 */
    style?: 'curve' | 'straight';
    /** 混合图中，是否增加折线或区域图上的标记点，仅针对line,area,mix有效 */
    addPoint?: boolean;
    /** 折线线型，可选值：'solid'为实线,'dash'为虚线，仅针对line,area,mix有效 */
    lineType?: 'solid' | 'dash';
    /** 折线为虚线时，单段虚线长度，仅针对line,area,mix有效 */
    dashLength?: number;
    /** 数据点标识样式，可选值为diamond◆, circle●, triangle▲, square■, none 无 */
    pointShape?: string;
    /** 图例标识样式，有效值为diamond◆, circle●, triangle▲, square■, rect▬, line-, none 无 */
    legendShape?: string;
    /** 自定义显示数据内容，形参为(value,index,series,opts) */
    formatter?: (value: number, index: number, series: any, opts: any) => string;
    /** K线图自定义折线数据列表，内容同series，仅在opts.extra.candle.average.show为false时调用此数据，（默认调用此数据） */
    seriesMA: ChartsSerieDataItem<T>[];
}

export interface ChartsXAxis {}
export interface ChartsYAxis {}
export interface ChartsExtra {}

export interface ChartsOptions<T extends ChartsType> {
    /** 图表类型 */
    type: T;
    /** canvas的上下文 */
    context: CanvasRenderingContext2D | UniNamespace.CanvasContext;
    /** canvas的宽度，单位为px，如果canvas绑定的样式为rpx单位，这里需要转成px */
    width?: number | string;
    /** canvas的高度，单位为px，如果canvas绑定的样式为rpx单位，这里需要转成px */
    height?: number | string;
    /** 图表数据集，部分图表类型不需要categories */
    categories?: string[];
    /** 图表数据集 */
    series: ChartsSerie<T>;
    /** canvas2d模式，用于解决小程序层级过高及拖拽卡顿问题 */
    canvas2d?: boolean;
    /** 设备像素比，解决开启canvas2d后画布模糊的问题 */
    pixelRatio?: number;
    /** 是否动画展示图表 */
    animation?: boolean;
    /** 图表动画效果，可选值：'easeOut'由快到慢,'easeIn'由慢到快,'easeInOut'慢快慢,'linear'匀速 */
    timing?: 'easeOut' | 'easeIn' | 'easeInOut' | 'linear';
    /** 动画展示时长，单位毫秒 */
    duration?: number;
    /** 横屏模式 */
    rotate?: boolean;
    /** 横屏锁定模式，如果开启横屏模式后，图表交互每次都会旋转90度，请赋值true */
    rotateLock?: boolean;
    /** 背景颜色，开启滚动条后请赋值 */
    background?: string;
    /** 主题颜色，16进制颜色格式 */
    color?: string[];
    /** 画布填充边距，顺序为上右下左，例如[10,15,25,15] */
    padding?: [number, number, number, number];
    /** 全局默认字体大小 */
    fontSize?: number;
    /** 全局默认字体颜色，16进制颜色格式 */
    fontColor?: string;
    /** 是否显示图表区域内数据点上方的数据文案 */
    dataLabel?: boolean;
    /** 是否显示数据点的图形标识 */
    dataPointShape?: boolean;
    /** 图形标识点显示类型，可选值：'solid'实心,'hollow'空心 */
    dataPointShapeType?: 'solid' | 'hollow';
    /** 图表拖拽时，每秒重新渲染的帧数（用于图表拖拽卡顿，可以降低js与视图层交互的次数，理论上24帧/秒就够用了） */
    touchMoveLimit?: number;
    /** 开启滚动条，X轴配置里需要配置itemCount单屏幕数据点数量 */
    enableScroll?: boolean;
    /** 是否启用标记线功能，也可做为隐藏图表区域内的标记线的开关 */
    enableMarkLine?: boolean;
    /** 连续更新数据时，滚动条的位置。可选值："current"当前位置,"left"左对齐,"right"右对齐 */
    scrollPosition?: 'current' | 'left' | 'right';
    /** X轴配置 */
    xAxis: ChartsXAxis;
    /** Y轴配置 */
    yAxis: ChartsYAxis;
    /** 额外配置 */
    extra: ChartsExtra;
}
