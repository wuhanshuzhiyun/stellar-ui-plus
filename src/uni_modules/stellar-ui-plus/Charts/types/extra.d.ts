import type Charts from '../Charts';

/** 提示窗配置 */
export interface ChartsTooltipExtra {
    /** 是否显示提示窗的方框及内部文字 */
    showBox?: boolean;
    /** 是否显示旁边的小三角箭头 */
    showArrow?: boolean;
    /** 是否显示顶部category标题（x轴对应点位） */
    showCategory?: boolean;
    /** 提示窗口的边框宽度 */
    borderWidth?: number;
    /** 提示窗口的四角圆弧半径 */
    borderRadius?: number;
    /** 提示窗口的边框颜色 */
    borderColor?: string;
    /** 提示窗口的边框颜色透明度 */
    borderOpacity?: number;
    /** 提示窗口的背景颜色 */
    bgColor?: string;
    /** 提示窗口的背景颜色透明度 */
    bgOpacity?: number;
    /** 分割线线型，可选值：'solid'实线,'dash'虚线 */
    gridType?: 'solid' | 'dash';
    /** 分割线为虚线时，单段虚线长度 */
    dashLength?: number;
    /** 分割线颜色 */
    gridColor?: string;
    /** 提示窗边框填充距离 */
    boxPadding?: number;
    /** 提示窗字体大小配置 */
    fontSize?: number;
    /** 提示窗文字行高 */
    lineHeight?: number;
    /** 提示窗内的文字颜色 */
    fontColor?: string;
    /** 是否显示左侧图例 */
    legendShow?: boolean;
    /** 图例形状，图例标识样式，有效值为 auto自动跟随图例, diamond◆, circle●, triangle▲, square■, rect▬, line- */
    legendShape?: string;
    /** 是否显示垂直竖线 */
    splitLine?: boolean;
    /** 是否显示水平横线 */
    horizentalLine?: boolean;
    /** 是否显示X轴数据标签 */
    xAxisLabel?: boolean;
    /** 是否显示Y轴数据标签 */
    yAxisLabel?: boolean;
    /** 数据标签背景颜色 */
    labelBgColor?: string;
    /** 数据标签背景颜色透明度 */
    labelBgOpacity?: number;
    /** 数据标签文字颜色 */
    labelFontColor?: string;
}

/** 标记线数据项 */
export interface ChartsMarkLineDataItem {
    /** 标记线数值 */
    value?: number;
    /** 自定义标签显示文字，定义后上面值无效 */
    labelText?: string;
    /** 标记线颜色，默认#DE4A42 */
    lineColor?: string;
    /** 是否在相应坐标轴上显示数据标签 */
    showLabel?: boolean;
    /** 标签相对图表区域显示位置 */
    labelAlign?: 'left' | 'right' | 'center';
    /** 标签水平位置偏移距离 */
    labelOffsetX?: number;
    /** 标签垂直位置偏移距离 */
    labelOffsetY?: number;
    /** 标签边框内填充距离 */
    labelPadding?: number;
    /** 数据标签字体大小 */
    labelFontSize?: number;
    /** 数据标签文字颜色 */
    labelFontColor?: string;
    /** 数据标签背景颜色 */
    labelBgColor?: string;
    /** 数据标签背景颜色透明度 */
    labelBgOpacity?: number;
}

/** 标记线配置 */
export interface ChartsMarkLineExtra {
    /** 标记线线型，可选值：'solid'实线,'dash'虚线 */
    type?: 'solid' | 'dash';
    /** 单段虚线长度 */
    dashLength?: number;
    /** 标记线数据 */
    data?: ChartsMarkLineDataItem[];
}

/**
 * 柱状图配置
 */
export interface ChartsColumnExtra {
    /** 柱状图类型，可选值：'group'分组柱状图,'stack'堆叠柱状图,'meter'温度计式图 */
    type?: 'group' | 'stack' | 'meter';
    /** 柱状图每个柱子的图形宽度 */
    width?: number;
    /** 多series每个柱子之间的间距 */
    seriesGap?: number;
    /** 每个category点位（X轴点）柱子组之间的间距 */
    categoryGap?: number;
    /** 启用分组柱状图半圆边框 */
    barBorderCircle?: boolean;
    /** 自定义4个圆角半径[左上,右上,右下,左下] */
    barBorderRadius?: [number, number, number, number];
    /** 渐变类型，可选值："none"关闭渐变,"opacity"透明渐变,"custom"自定义颜色 */
    linearType?: 'none' | 'opacity' | 'custom';
    /** 透明渐变的透明度（值范围0到1，值越小越透明） */
    linearOpacity?: number;
    /** 自定义渐变颜色，数组类型对应series的数组长度以匹配不同series颜色的不同配色方案，例如["#FA7D8D", "#EB88E2"] */
    customColor?: string[];
    /** 渐变色的显示比例（值范围0到1，值越大自定义颜色程度越高） */
    colorStop?: number;
    /** 温度计式图表的边框宽度 */
    meterBorder?: number;
    /** 温度计式图表的空余填充颜色 */
    meterFillColor?: string;
    /** 当前点击柱状图的背景颜色 */
    activeBgColor?: string;
    /** 当前点击柱状图的背景颜色透明度 */
    activeBgOpacity?: number;
    /** 数据标签位置，有效值为"outside"外部,"insideTop"内顶部,"center"内中间,"bottom"内底部 */
    labelPosition?: 'outside' | 'insideTop' | 'center' | 'bottom';
}

/** 山峰图 */
export interface ChartsMountExtra {
    /** 山峰图类型，可选值："mount"圆角,"sharp"尖角,"triangle"三角,"bar"直角 */
    type?: 'mount' | 'sharp' | 'triangle' | 'bar';
    /** 山峰图每个山峰的图形宽度比例0-2之间 */
    widthRatio?: number;
    /** 边框线条宽度 */
    borderWidth?: number;
    /** 类型为bar的柱状图顶部圆角 */
    barBorderCircle?: boolean;
    /** 类型为bar的柱状图自定义4个圆角半径[左上,右上,右下,左下] */
    barBorderRadius?: [number, number, number, number];
    /** 渐变类型，可选值："none"关闭渐变,"opacity"透明渐变,"custom"自定义颜色 */
    linearType?: 'none' | 'opacity' | 'custom';
    /** 透明渐变的透明度（值范围0到1，值越小越透明） */
    linearOpacity?: number;
    /** 自定义渐变颜色，数组类型对应series的数组长度以匹配不同series颜色的不同配色方案，例如["#FA7D8D", "#EB88E2"] */
    customColor?: string[];
    /** 渐变色的显示比例（值范围0到1，值越大自定义颜色程度越高） */
    colorStop?: number;
}

/** 条形图 */
export interface ChartsBarExtra {
    /** 条状图类型，可选值："group"分组条状图,"stack"堆叠条状图 */
    type?: 'group' | 'stack';
    /** 条状图每个柱子的图形宽度 */
    width?: number;
    /** 多series每个柱子之间的间距 */
    seriesGap?: number;
    /** 每个category点位（X轴点）柱子组之间的间距 */
    categoryGap?: number;
    /** 启用分组柱状图半圆边框 */
    barBorderCircle?: boolean;
    /** 自定义4个圆角半径[左上,右上,右下,左下] */
    barBorderRadius?: [number, number, number, number];
    /** 渐变类型，可选值："none"关闭渐变,"opacity"透明渐变,"custom"自定义颜色 */
    linearType?: 'none' | 'opacity' | 'custom';
    /** 透明渐变的透明度（值范围0到1，值越小越透明） */
    linearOpacity?: number;
    /** 自定义渐变颜色，数组类型对应series的数组长度以匹配不同series颜色的不同配色方案，例如["#FA7D8D", "#EB88E2"] */
    customColor?: string[];
    /** 渐变色的显示比例（值范围0到1，值越大自定义颜色程度越高） */
    colorStop?: number;
    /** 当前点击柱状图的背景颜色 */
    activeBgColor?: string;
    /** 当前点击柱状图的背景颜色透明度 */
    activeBgOpacity?: number;
    /** 边框 */
    meterBorde?: number;
    /** 颜色 */
    meterFillColor?: string;
}

/** 折线图 */
export interface ChartsLineExtra {
    /** 折线图类型，可选值："straight"尖角折线模式,"curve"曲线圆滑模式,"step"时序图模式 */
    type?: 'straight' | 'curve' | 'step';
    /** 折线的宽度 */
    width?: number;
    /** 激活指示点类型，可选值："none"不启用激活指示点,"hollow"空心点模式,"solid"实心点模式 */
    activeType?: 'none' | 'hollow' | 'solid';
    /** 渐变色类型，可选值 "none"关闭渐变色，"custom"自定义渐变色。使用自定义渐变色时请赋值serie.linearColor作为颜色值 */
    linearType?: 'none' | 'custom';
    /** 是否开启折线阴影，开启后请赋值serie.setShadow阴影设置 */
    onShadow?: boolean;
    /** 动画效果方向，可选值为"vertical" 垂直动画效果，"horizontal" 水平动画效果 */
    animation?: 'vertical' | 'horizontal';
}

/** 区域图 */
export interface ChartsAreaExtra {
    /** 区域图类型，可选值："straight"尖角折线模式,"curve"曲线圆滑模式,"step"时序图模式 */
    type?: 'straight' | 'curve' | 'step';
    /** 区域图透明度 */
    opacity?: number;
    /** 是否叠加相应的折线 */
    addLine?: boolean;
    /** 叠加的折线宽度 */
    width?: number;
    /** 是否开启区域图渐变色 */
    gradient?: boolean;
    /** 激活指示点类型，可选值："none"不启用激活指示点,"hollow"空心点模式,"solid"实心点模式 */
    activeType?: 'none' | 'hollow' | 'solid';
}

/** 散点图 */
export interface ChartsScatterExtra {}

/** 气泡图 */
export interface ChartsBubbleExtra {
    /** 气泡边框宽度 */
    border?: number;
    /** 气泡内部透明度 */
    opacity?: number;
}

/** 混合图 */
export interface ChartsMixExtra {
    /** 柱状图 */
    column?: {
        /** 柱状图每个柱子的图形宽度 */
        width?: number;
        /** 多series每个柱子之间的间距 */
        seriesGap?: number;
        /** 启用分组柱状图半圆边框 */
        barBorderCircle?: boolean;
        /** 自定义4个圆角半径[左上,右上,右下,左下] */
        barBorderRadius?: [number, number, number, number];
        /** 渐变类型，可选值："none"关闭渐变,"opacity"透明渐变,"custom"自定义颜色 */
        linearType?: 'none' | 'opacity' | 'custom';
        /** 透明渐变的透明度（值范围0到1，值越小越透明） */
        linearOpacity?: number;
        /** 自定义渐变颜色，数组类型对应series的数组长度以匹配不同series颜色的不同配色方案，例如["#FA7D8D", "#EB88E2"] */
        customColor?: string[];
        /** 渐变色的显示比例（值范围0到1，值越大自定义颜色程度越高） */
        colorStop?: number;
    };
    /** 区域图 */
    area?: {
        /** 区域图是否开启渐变色 */
        gradient?: boolean;
        /** 区域图透明度 */
        opacity?: number;
    };
    /** 折线图 */
    line?: {
        /** 折线的宽度 */
        width?: number;
    };
}

/** 饼状图 */
export interface ChartsPieExtra {
    /** 启用Tooltip点击时，突出部分的透明度 */
    activeOpacity?: number;
    /** 启用Tooltip点击时，突出部分的宽度（最大值不得超过labelWidth） */
    activeRadius?: number;
    /** 起始角度偏移度数，顺时针方向，起点为3点钟位置为0度（比如要设置起点为12点钟位置，即逆时针偏移90度，传入-90即可） */
    offsetAngle?: number;
    /** 自定义半径（一般不需要传值，饼图会自动计算半径，自定义半径可能会导致显示图表显示不全） */
    customRadius?: number;
    /** 数据标签到饼图外圆连线的长度 */
    labelWidth?: number;
    /** 是否绘制各类别中间的分割线 */
    border?: boolean;
    /** 分割线的宽度 */
    borderWidth?: number;
    /** 分割线的颜色 */
    borderColor?: string;
    /** 渐变类型，可选值："none"关闭渐变,"custom"开启渐变 */
    linearType?: 'none' | 'custom';
    /** 自定义渐变颜色，数组类型对应series的数组长度以匹配不同series颜色的不同配色方案，例如["#FA7D8D", "#EB88E2"] */
    customColor?: string[];
}

/** 圆环图 */
export interface ChartsRingExtra {
    /** 圆环的宽度 */
    ringWidth?: number;
    /** 中间填充圆形的颜色 */
    centerColor?: string;
    /** 启用Tooltip点击时，突出部分的透明度 */
    activeOpacity?: number;
    /** 启用Tooltip点击时，突出部分的宽度（最大值不得超过labelWidth） */
    activeRadius?: number;
    /** 起始角度偏移度数，顺时针方向，起点为3点钟位置为0度（比如要设置起点为12点钟位置，即逆时针偏移90度，传入-90即可） */
    offsetAngle?: number;
    /** 自定义半径（一般不需要传值，饼图会自动计算半径，自定义半径可能会导致显示图表显示不全） */
    customRadius?: number;
    /** 数据标签到饼图外圆连线的长度 */
    labelWidth?: number;
    /** 是否绘制各类别中间的分割线 */
    border?: boolean;
    /** 分割线的宽度 */
    borderWidth?: number;
    /** 分割线的颜色 */
    borderColor?: string;
    /** 渐变类型，可选值："none"关闭渐变,"custom"开启渐变 */
    linearType?: 'none' | 'custom';
    /** 自定义渐变颜色，数组类型对应series的数组长度以匹配不同series颜色的不同配色方案，例如["#FA7D8D", "#EB88E2"] */
    customColor?: string[];
}

/** 玫瑰图 */
export interface ChartsRoseExtra {
    /** 玫瑰图样式，可选值："area"面积模式,"radius"半径模式 */
    type?: 'area' | 'radius';
    /** 最小半径值，默认为图形半径的50% */
    minRadius?: number;
    /** 启用Tooltip点击时，突出部分的透明度 */
    activeOpacity?: number;
    /** 启用Tooltip点击时，突出部分的宽度（最大值不得超过labelWidth） */
    activeRadius?: number;
    /** 起始角度偏移度数，顺时针方向，起点为3点钟位置为0度（比如要设置起点为12点钟位置，即逆时针偏移90度，传入-90即可） */
    offsetAngle?: number;
    /** 数据标签到饼图外圆连线的长度 */
    labelWidth?: number;
    /** 是否绘制各类别中间的分割线 */
    border?: boolean;
    /** 分割线的宽度 */
    borderWidth?: number;
    /** 分割线的颜色，默认#FFFFFF */
    borderColor?: string;
    /** 渐变类型，可选值："none"关闭渐变,"custom"开启渐变 */
    linearType?: 'none' | 'custom';
    /** 自定义渐变颜色，数组类型对应series的数组长度以匹配不同series颜色的不同配色方案，例如["#FA7D8D", "#EB88E2"] */
    customColor?: string[];
}

/**
 * 雷达图
 */
export interface ChartsRadarExtra {
    /** 雷达图网格类型，可选值："radar"蜘蛛网格样式,"circle"圆形背景网格 */
    gridType?: 'radar' | 'circle';
    /** 雷达图网格颜色 */
    gridColor?: string;
    /** 雷达图网格数量 */
    gridCount?: number;
    /** 数据点位网格抽希 */
    gridEval?: number;
    /** 自定义雷达图半径 */
    radius?: number;
    /** 刻度点值是否显示 */
    axisLabel?: boolean;
    /** 刻度点值小数位数 */
    axisLabelTofix?: number;
    /** 是否显示各项标识文案 */
    labelShow?: boolean;
    /** 各项标识文案的颜色 */
    labelColor?: string;
    /** 是否显示末端刻度圆点 */
    labelPointShow?: boolean;
    /** 刻度圆点的半径 */
    labelPointRadius?: number;
    /** 刻度圆点的颜色 */
    labelPointColor?: string;
    /** 主图区域透明度 */
    opacity?: number;
    /** 是否绘制主图区域描边线 */
    border?: boolean;
    /** 描边线的宽度 */
    borderWidth?: number;
    /** data的最大值，数据区间最大值，用于调整数据显示的比例 */
    max?: number;
    /** 渐变类型，可选值："none"关闭渐变,"custom"开启渐变 */
    linearType?: 'none' | 'custom';
    /** 自定义渐变颜色，数组类型对应series的数组长度以匹配不同series颜色的不同配色方案，例如["#FA7D8D", "#EB88E2"] */
    customColor?: string[];
}

/** 漏斗图 */
export interface ChartsFunnelExtra {
    /** 漏斗图类型，可选值："funnel"基本漏斗图,"triangle"倒三角漏斗图,"pyramid"金字塔漏斗图 */
    type?: 'funnel' | 'triangle' | 'pyramid';
    /** 启用Tooltip点击时，突出部分的透明度 */
    activeOpacity?: number;
    /** 启用Tooltip点击时，突出部分的宽度（最大值不得超过labelWidth） */
    activeWidth?: number;
    /** 是否绘制各类别中间的分割线 */
    border?: boolean;
    /** 分割线的宽度 */
    borderWidth?: number;
    /** 分割线的颜色，默认#FFFFFF */
    borderColor?: string;
    /** 漏斗图主体透明度 */
    fillOpacity?: number;
    /** 最小值的最小宽度 */
    minSize?: number;
    /** 数据标签显示位置，可选值："right","left" */
    labelAlign?: 'right' | 'left';
    /** 渐变类型，可选值："none"关闭渐变,"custom"开启渐变 */
    linearType?: 'none' | 'custom';
    /**
     * 自定义渐变颜色，数组类型对应series的数组长度以匹配不同series颜色的不同配色方案，
     * 例如["#FA7D8D", "#EB88E2"]
     */
    customColor?: string[];
}

/** 进度条 */
export interface ChartsArcbarExtra {
    /** 圆弧进度图样式，可选值："default"半圆弧模式,"circle"整圆模式 */
    type?: 'default' | 'circle';
    /** 动画方向（变换时需要注意起始与结束角度），可选值："cw"顺时针方向,"ccw"逆时针方向 */
    direction?: 'cw' | 'ccw';
    /** 圆弧进度图弧线宽度 */
    width?: number;
    /** 进度条两端样式，可选值："round"圆形线帽,"square"方形线帽,"butt"平直边缘 */
    lineCap?: 'round' | 'square' | 'butt';
    /** 圆弧进度图背景颜色 */
    backgroundColor?: string;
    /** 圆弧进度图起始角度，0-2之间，0为3点钟位置，0.5为6点钟，1为9点钟，1.5为12点钟，默认0.75 */
    startAngle?: number;
    /** 圆弧进度图结束角度，0-2之间，0为3点钟位置，0.5为6点钟，1为9点钟，1.5为12点钟，默认0.25 */
    endAngle?: number;
    /** 圆弧进度图自定义半径（最大半径）（无特殊需求无需填写） */
    radius?: number;
    /** 圆弧进度条的间隔单位px */
    gap?: number;
    /** 自定义圆心x坐标（无特殊需求无需填写） */
    centerX?: number;
    /** 自定义圆心y坐标（无特殊需求无需填写） */
    centerY?: number;
    /** 渐变类型，可选值："none"关闭渐变,"custom"开启渐变 */
    linearType?: 'none' | 'custom';
    /** 自定义渐变颜色，数组类型对应series的数组长度以匹配不同series颜色的不同配色方案，例如["#FA7D8D", "#EB88E2"] */
    customColor?: string[];
}

/** 仪表盘 */
export interface ChartsGaugeExtra {
    /** 仪表盘样式 */
    type?: 'default' | 'progress';
    /** 仪表盘坐标轴（指示盘）线宽度 */
    width?: number;
    /** 仪表盘刻度尺标签文字颜色 */
    labelColor?: string;
    /** 仪表盘标签文字径向偏移距离 */
    labelOffset?: number;
    /** 仪表盘起始角度，0-2之间，0为3点钟位置，0.5为6点钟，1为9点钟，1.5为12点钟 */
    startAngle?: number;
    /** 仪表盘结束角度，0-2之间，0为3点钟位置，0.5为6点钟，1为9点钟，1.5为12点钟 */
    endAngle?: number;
    /** 仪表盘起始数值。说明：仪表盘指针指向的值为比例值，假设起始值是11，结束值是15，想指向12，那就是11-15之间的20%，所以series里的data应为0.2，这个值需要自己算好再传chartData里 */
    startNumber?: number;
    /** 仪表盘结束数值 */
    endNumber?: number;
    /** 仪表盘数据标签自定义，形参为(val,index,opts) */
    formatter?: (val: number, index: number, opts: any) => string;
    /** 仪表盘刻度线 */
    splitLine?: {
        /** 仪表盘刻度线径向偏移量 */
        fixRadius?: number;
        /** 仪表盘刻度线分段总数量 */
        splitNumber?: number;
        /** 仪表盘分割线长度 */
        width?: number;
        /** 仪表盘分割线颜色 */
        color?: string;
        /** 仪表盘子刻度线数量 */
        childNumber?: number;
        /** 仪表盘子刻度线长度 */
        childWidth?: number;
    };
    /** 仪表盘指针 */
    pointer?: {
        /**仪表盘指针宽度 */
        width?: number;
        /** 仪表盘指针颜色，定义为auto时，随仪表盘背景颜色改变,或者可以指定颜色例如#7cb5ec */
        color?: string | 'auto';
    };
}

/** 词云图 */
export interface ChartsWordExtra {
    /** 词云图样式，可选值："normal"水平排列,"vertical"垂直排列 */
    type?: 'normal' | 'vertical';
    /** 是否开启随机颜色，否的话使用opts.colors配色方案(暂未启用) */
    autoColors?: boolean;
}

/** K线图 */
export interface ChartsCandleExtra {
    /** 颜色 */
    color?: {
        /** K线图为涨时线颜色 */
        upLine?: string;
        /** K线图为涨时填充颜色 */
        upFill?: string;
        /** K线图为跌时线颜色 */
        downLine?: string;
        /** K线图为跌时填充颜色 */
        downFill?: string;
    };
    /** 均线 */
    average?: {
        /** 是否叠加显示均线 */
        show?: boolean;
        /** 均线名称（例如["MA5","MA20"]）用于下方图例显示 */
        name?: string[];
        /** 均线单位日期（例如[5,20]为显示5日及20日均线，主要看K线的单位是什么，也就是根据每隔5个或者20个K线值计算） */
        day?: (number | string)[];
        /** 均线颜色，例如["#1890ff", "#2fc25b"] */
        color?: string[];
    };
}

/** 地图 */
export interface ChartsMapExtra {
    /** 是否绘制各类别中间的分割线 */
    border?: boolean;
    /** 是否进行WGS84转墨卡托投影(开启后可能会造成tooltip不跟手，建议自行转换) */
    mercator?: boolean;
    /** 分割线的宽度 */
    borderWidth?: number;
    /** 分割线的颜色 */
    borderColor?: string;
    /** 区域内填充透明度 */
    fillOpacity?: number;
    /** 是否启用下面点击激活变色 */
    active?: boolean;
    /** 点击激活时文字的颜色 */
    activeTextColor?: string;
    /** 点击激活时分割线的颜色 */
    activeBorderColor?: string;
    /** 点击激活时分区域内填充颜色 */
    activeFillColor?: string;
    /** 点击激活时分区域内填充颜色透明度 */
    activeFillOpacity?: number;
}

/** 额外配置 */
export interface ChartsExtra {
    /** 提示窗配置 */
    tooltip?: ChartsTooltipExtra;
    /** 标记线配置 */
    markLine?: ChartsMarkLineExtra;
    /** 柱状图配置 */
    column?: ChartsColumnExtra;
    /** 山峰图 */
    mount?: ChartsMountExtra;
    /** 条状图 */
    bar?: ChartsBarExtra;
    /** 折线图 */
    line?: ChartsLineExtra;
    /** 区域图 */
    area?: ChartsAreaExtra;
    /** 散点图 */
    scatter?: ChartsScatterExtra;
    /** 气泡图 */
    bubble?: ChartsBubbleExtra;
    /** 混合图 */
    mix?: ChartsMixExtra;
    /** 饼状图 */
    pie?: ChartsPieExtra;
    /** 圆环图 */
    ring?: ChartsRingExtra;
    /** 玫瑰图 */
    rose?: ChartsRoseExtra;
    /** 雷达图 */
    radar?: ChartsRadarExtra;
    /** 进度条 */
    arcbar?: ChartsArcbarExtra;
    /** 仪表盘 */
    gauge?: ChartsGaugeExtra;
    /**  漏斗图 */
    funnel?: ChartsFunnelExtra;
    /** 词云图 */
    word?: ChartsWordExtra;
    /** K线图 */
    candle?: ChartsCandleExtra;
    /** 地图 */
    map?: ChartsMapExtra;
}
