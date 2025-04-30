import { type PropType } from 'vue';
import type { ChartsType, ChartsOptions, ChartsXAxis, ChartsYAxis } from './types';
import type { ChartsExtra } from './extra';

// 设备像素比
let pixelRatio = uni.getSystemInfoSync();
// 公共默认配置
export const propsDefault = () => ({
    // 图表宽度
    width: {
        type: [Number, String] as PropType<ChartsOptions<ChartsType>['width']>,
        default: '750',
    },

    // 图表高度
    height: {
        type: [Number, String] as PropType<ChartsOptions<ChartsType>['height']>,
        default: '500',
    },

    // canvas2d模式
    canvas2d: {
        type: Boolean as PropType<ChartsOptions<ChartsType>['canvas2d']>,
        default: true,
    },

    // 设备像素比
    pixelRatio: {
        type: Number as PropType<ChartsOptions<ChartsType>['pixelRatio']>,
        // #ifdef MP-WEIXIN
        // default: pixelRatio?.pixelRatio || 1,
        default: 1,
        // #endif
        // #ifndef MP-WEIXIN
        default: 1,
        // #endif
    },

    // 是否动画展示图表
    animation: {
        type: Boolean as PropType<ChartsOptions<ChartsType>['animation']>,
        default: true,
    },

    // 图表动画效果
    timing: {
        type: String as PropType<ChartsOptions<ChartsType>['timing']>,
        default: 'easeOut',
    },

    // 动画展示时长
    duration: {
        type: [Number, String] as PropType<ChartsOptions<ChartsType>['duration']>,
        default: '1000',
    },

    // 横屏模式
    rotate: {
        type: Boolean as PropType<ChartsOptions<ChartsType>['rotate']>,
        default: false,
    },

    // 横屏锁定模式
    rotateLock: {
        type: Boolean as PropType<ChartsOptions<ChartsType>['rotateLock']>,
        default: false,
    },

    // 背景颜色
    background: {
        type: String as PropType<ChartsOptions<ChartsType>['background']>,
        default: 'rgba(0,0,0,0)',
    },

    // 主题颜色
    color: {
        type: Array as PropType<ChartsOptions<ChartsType>['color']>,
        default: () => ['#165DFF', '#14C9C9', '#F7BA1E', '#3491FA', '#722ED1', '#9FDB1D'],
    },

    // 画布填充边距
    padding: {
        type: Array as unknown as PropType<ChartsOptions<ChartsType>['padding']>,
        default: () => [5, 5, 5, 5],
    },

    // 全局默认字体大小
    fontSize: {
        type: Number as PropType<ChartsOptions<ChartsType>['fontSize']>,
        default: 13,
    },

    // 全局默认字体颜色
    fontColor: {
        type: String as PropType<ChartsOptions<ChartsType>['fontColor']>,
        default: '#666666',
    },

    // 是否显示图表区域内数据点上方的数据文案
    dataLabel: {
        type: Boolean as PropType<ChartsOptions<ChartsType>['dataLabel']>,
        default: true,
    },

    // 是否显示数据点的图形标识
    dataPointShape: {
        type: Boolean as PropType<ChartsOptions<ChartsType>['dataPointShape']>,
        default: true,
    },

    // 图形标识点显示类型
    dataPointShapeType: {
        type: String as PropType<ChartsOptions<ChartsType>['dataPointShapeType']>,
        default: 'solid',
    },

    // 图表拖拽时每秒重新渲染的帧数
    touchMoveLimit: {
        type: Number as PropType<ChartsOptions<ChartsType>['touchMoveLimit']>,
        default: 24,
    },

    // 开启滚动条
    enableScroll: {
        type: Boolean as PropType<ChartsOptions<ChartsType>['enableScroll']>,
        default: false,
    },

    // 是否启用标记线功能
    enableMarkLine: {
        type: Boolean as PropType<ChartsOptions<ChartsType>['enableMarkLine']>,
        default: false,
    },

    // 连续更新数据时，滚动条的位置
    scrollPosition: {
        type: String as PropType<ChartsOptions<ChartsType>['scrollPosition']>,
        default: 'current',
    },
    // X轴配置
    xAxis: {
        type: Object as PropType<ChartsXAxis>,
        default: () => ({}),
    },

    // Y轴配置
    yAxis: {
        type: Object as PropType<ChartsYAxis>,
        default: () => ({}),
    },

    // 图例配置
    legend: {
        type: Object,
        default: () => ({}),
    },

    // 标题配置
    title: {
        type: Object,
        default: () => ({}),
    },

    subtitle: {
        type: Object,
        default: () => ({}),
    },

    // 额外配置
    extra: {
        type: Object as PropType<ChartsExtra>,
        default: () => ({}),
    },
});
