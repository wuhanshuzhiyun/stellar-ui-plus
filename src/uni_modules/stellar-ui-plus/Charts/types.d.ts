import type { ChartsExtra } from './extra';

/** 图表类型 */
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

/** K线图自定义折线数据列表，内容同series，仅在opts.extra.candle.average.show为false时调用此数据，（默认调用此数据） */
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

/** 数据值 */
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

/** 图表数据集 */
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
    linearColor?: [number, string][];
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
    seriesMA?: ChartsSerieDataItem<T>[];
}

/** X轴配置 */
export interface ChartsXAxis {
    /** 不绘制X轴 */
    disabled?: boolean;
    /** 绘制坐标轴轴线 */
    axisLine?: boolean;
    /** 坐标轴轴线颜色 */
    axisLineColor?: string;
    /** 坐标轴刻度线 */
    calibration?: boolean;
    /** 数据点（刻度点）字体颜色 */
    fontColor?: string;
    /** 数据点（刻度点）字体大小 */
    fontSize?: number;
    /** 数据点（刻度点）字体行高 */
    lineHeight?: number;
    /** X轴文字距离轴线的距离（不包含行高） */
    marginTop?: number;
    /** 【旋转】数据点（刻度点）文字 */
    rotateLabel?: boolean;
    /** 开启上面旋转功能后，文字旋转的角度，取值范围(-90至90) */
    rotateAngle?: number;
    /** 数据点文字（刻度点）单屏幕限制显示的数量 */
    labelCount?: number;
    /** 单屏数据密度即图表可视区域内显示的X轴数据点数量，仅在启用enableScroll时有效 */
    itemCount?: number;
    /** 折线图、区域图起画点结束点方法，可选值：'center'两端留空,'justify'两端对齐 */
    boundaryGap?: 'center' | 'justify';
    /** 不绘制纵向网格(即默认绘制网格) */
    disableGrid?: boolean;
    /** X轴网格数量，纵向网格数量(竖着的) */
    splitNumber?: number;
    /** 纵向网格颜色，默认#CCCCCC */
    gridColor?: string;
    /** 纵向网格线型，可选值：'solid'实线,'dash'虚线 */
    gridType?: 'solid' | 'dash';
    /** 纵向网格为虚线时，单段虚线长度 */
    dashLength?: number;
    /** 纵向网格线显示间隔 */
    gridEval?: number;
    /** 是否显示滚动条，配合拖拽滚动使用（即仅在启用【基本配置】的 enableScroll 时有效） */
    scrollShow?: boolean;
    /** 滚动条初始位置，可选值：'left'左对齐,'right'右对齐 */
    scrollAlign?: 'left' | 'right';
    /** 滚动条颜色，默认#A6A6A6 */
    scrollColor?: string;
    /** 滚动条底部背景颜色，默认#EFEBEF */
    scrollBackgroundColor?: string;
    /** X轴起始值（默认数据中的最小值） */
    min?: number;
    /** X轴终止值（默认数据中的最大值） */
    max?: number;
    /** X轴标题文本 */
    title?: string;
    /** 标题字体大小 */
    titleFontSize?: number;
    /** 标题纵向偏移距离，负数为向上偏移，正数向下偏移 */
    titleOffsetY?: number;
    /** 标题横向偏移距离，负数为向左偏移，正数向右偏移 */
    titleOffsetX?: number;
    /** 标题字体颜色，默认#666666 */
    titleFontColor?: string;
    /** 【原生】格式化X轴文案显示，形参为function(value,index,opts){} */
    formatter?: (value: number, index: number, opts: any) => string;
}

/** 多Y轴配置项 */
export interface ChartsYAxisDataItem {
    /** Y轴数据类型，可选值：'value'数值,'categories'类别（条状图需选择为类别） */
    type?: 'value' | 'categories';
    /** 当前Y轴显示位置，可选值：'left','right','center' */
    position?: 'left' | 'right' | 'center';
    /** 不绘制Y轴（刻度和轴线都不绘制） */
    disabled?: boolean;
    /** 坐标轴轴线是否显示（数据还能显示） */
    axisLine?: boolean;
    /** 坐标轴轴线颜色，默认#CCCCCC */
    axisLineColor?: string;
    /** 刻度线是否显示 */
    calibration?: boolean;
    /** 数据点（刻度点）字体颜色，默认#666666 */
    fontColor?: string;
    /** 数据点（刻度点）字体大小 */
    fontSize?: number;
    /** 数据点（刻度点）相对轴线的对齐方式，可选值：'left','right','center' */
    textAlign?: 'left' | 'right' | 'center';
    /** 当前Y轴标题（需要上面showTitle设置为true） */
    title?: string;
    /** 标题字体大小 */
    titleFontSize?: number;
    /** 标题纵向偏移距离，负数为向上偏移，正数向下偏移 */
    titleOffsetY?: number;
    /** 标题横向偏移距离，负数为向左偏移，正数向右偏移 */
    titleOffsetX?: number;
    /** Y轴标题字体颜色，默认#666666 */
    titleFontColor?: string;
    /** 当前Y轴起始值（默认数据中的最小值） */
    min?: number;
    /** 当前Y轴终止值（默认数据中的最大值） */
    max?: number;
    /** Y轴刻度值保留的小数位数 */
    tofix?: number;
    /** Y轴刻度值后附加单位 */
    unit?: string;
    /** 格式化Y轴文案显示，形参为function(value,index,opts){} */
    formatter?: (value: number, index: number, opts: any) => string;
}

/** Y轴配置 */
export interface ChartsYAxis {
    /** 不绘制Y轴 */
    disabled?: boolean;
    /** 不绘制横向向网格(即默认绘制网格) */
    disableGrid?: boolean;
    /** 横向向网格数量，此数量与Y轴数据点是否为小数有关，如果指定了max，请指定为能被max-min整除的数值，如果不传max一般指定为5 */
    splitNumber?: number;
    /** 横向向网格线型，可选值：'solid'实线,'dash'虚线 */
    gridType?: 'solid' | 'dash';
    /** 横向网格为虚线时，单段虚线长度 */
    dashLength?: number;
    /** 横向网格颜色，默认#CCCCCC */
    gridColor?: string;
    /** 多个Y轴间的间距 */
    padding?: number;
    /** 不绘制Y轴标题 */
    showTitle?: boolean;
    /** 多Y轴配置 */
    data?: ChartsYAxisDataItem[];
}

/** 图例配置 */
export interface ChartsLegend {
    /** 是否显示图例标识 */
    show?: boolean;
    /** 图例相对画布的显示位置，可选值：'bottom','top','left','right' */
    position?: 'bottom' | 'top' | 'left' | 'right';
    /** 图例位置对齐方向，可选值：'center','left','right','top','bottom' */
    float?: 'center' | 'left' | 'right' | 'top' | 'bottom';
    /** 图例内填充边距 */
    padding?: number;
    /** 图例外侧填充边距 */
    margin?: number;
    /** 图例背景颜色 */
    backgroundColor?: string;
    /** 图例边框颜色 */
    borderColor?: string;
    /** 图例边框线宽 */
    borderWidth?: number;
    /** 	字体大小 */
    fontSize?: number;
    /** 字体颜色 */
    fontColor?: string;
    /** 字体行高 */
    lineHeight?: number;
    /** 点击隐藏时图例标识及文字颜色 */
    hiddenColor?: string;
    /** 各个分类（类别）之间的间隔 */
    itemGap?: number;
}

/** 标题配置 */
export interface ChartsTitle {
    /** 主标题内容 */
    name?: string;
    /** 主标题字体大小 */
    fontSize?: number;
    /** 主标题颜色 */
    color?: string;
    /** 横向位置偏移量（相对屏幕中心为原点可为负数 */
    offsetX?: number;
    /** 纵向位置偏移量（相对屏幕中心为原点可为负数） */
    offsetY?: number;
}

/** 图表配置项 */
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
    series: ChartsSerie<T>[];
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
    xAxis?: ChartsXAxis;
    /** Y轴配置 */
    yAxis?: ChartsYAxis;
    /** 额外配置 */
    extra?: ChartsExtra;
    /** 图例配置 */
    legend?: ChartsLegend;
    /** 标题配置 */
    title?: ChartsTitle;
    /** 子标题配置 */
    subtitle?: ChartsTitle;
}
