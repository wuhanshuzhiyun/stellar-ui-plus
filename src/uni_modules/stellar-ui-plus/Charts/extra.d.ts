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
export interface ChartsRadarExtra {}

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
}
