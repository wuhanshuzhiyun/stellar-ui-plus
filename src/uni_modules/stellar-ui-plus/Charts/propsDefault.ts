// 公共默认配置
export const propsDefault = {
    // 图表宽度
    width: { type: [Number, String], default: () => '600' },
    // 图表高度
    height: { type: [Number, String], default: () => '400' },
    // canvas2d模式，用于解决小程序层级过高及拖拽卡顿问题，小程序平台开启后context及canvas的格式不同
    canvas2d: true,
    // 设备像素比，解决开启canvas2d后画布模糊的问题
    pixelRatio: 1,
    // 是否动画展示图表
    animation: true,
    // 图表动画效果，可选值：'easeOut'由快到慢,'easeIn'由慢到快,'easeInOut'慢快慢,'linear'匀速
    timing: 'easeOut',
    // 动画展示时长，单位毫秒
    duration: '1000',
    // 横屏模式
    rotate: false,
    // 横屏锁定模式，如果开启横屏模式后，图表交互每次都会旋转90度，请赋值true
    rotateLock: false,
    // 背景颜色，开启滚动条后请赋值
    background: 'rgba(0,0,0,0)',
    // 主题颜色，16进制颜色格式
    color: { type: Array as any, default: () => ['#165DFF', '#14C9C9', '#F7BA1E', '#3491FA', '#722ED1', '#9FDB1D'] },
    // 	画布填充边距，顺序为上右下左，例如[10,15,25,15]
    padding: [5, 5, 5, 5],
    // 全局默认字体大小
    fontSize: 13,
    // 全局默认字体颜色，16进制颜色格式
    fontColor: '#666666',
    // 是否显示图表区域内数据点上方的数据文案
    dataLabel: true,
    // 是否显示数据点的图形标识
    dataPointShape: true,
    // 图形标识点显示类型，可选值：'solid'实心,'hollow'空心
    dataPointShapeType: 'solid',
    // 图表拖拽时，每秒重新渲染的帧数（用于图表拖拽卡顿，可以降低js与视图层交互的次数，理论上24帧/秒就够用了）
    touchMoveLimit: 60,
    // 开启滚动条，X轴配置里需要配置itemCount单屏幕数据点数量
    enableScroll: false,
    // 是否启用标记线功能，也可做为隐藏图表区域内的标记线的开关
    enableMarkLine: false,
    // 连续更新数据时，滚动条的位置。可选值："current"当前位置,"left"左对齐,"right"右对齐
    scrollPosition: 'current',

    // 图表数据
    series: { type: Object as any, default: () => ({}) },
    // X轴配置
    xAxis: { type: Object as any, default: () => ({}) },
    // Y轴配置
    yAxis: { type: Object as any, default: () => ({}) },
    // 图例配置
    legend: {
        type: Object as any,
        default: () => ({}),
    },
    // 标题配置 注意：标题配置仅适用于ring、arcbar、gauge，直角坐标系图表可在X轴配置/Y轴配置中设置标题。其他标题请在图表外面自行处理。
    title: { type: Object as any, default: () => ({}) },
    subtitle: { type: Object as any, default: () => ({}) },
    // 额外配置
    extra: { type: Object as any, default: () => ({}) },
};
