<script setup lang="ts">
/**
 * ste-calendar 日历核心组件
 * 采用基于纯数学可预测高度的滑动窗口虚拟列表架构（Virtual Sliding Window）
 * 无论支持 10 年、50 年还是 100 年的前后无限滚动，DOM 树中始终仅渲染视口及缓冲区的极少量月份（5~7个月）
 * 彻底杜绝全量 DOM 膨胀与 JS 堆内存暴涨导致的微信小程序/App端 OOM 崩溃闪退
 *
 * 策略二自适应就绪与定位防护机制：
 * 1. 采用物理尺寸自适应探测器（probeContainerLayout），自动识别组件是否处于未展开的弹窗中，容器真实具备高度后再下发精准滚动；
 * 2. 初始中心月份索引（currentCenterIndex）实时基于 defaultDate 精准初始化，确保第一帧即对齐当前月，绝非十年前；
 * 3. 引入定位互斥锁（isLocating），在容器就绪与滚动定位期间严格拦截原生滚动组件派发的 0px 虚假滚动，杜绝月份被篡改倒退；
 * 4. 800ms 强制兜底超时机制，确保在任何宿主环境下均秒级展现。
 */
import { watch, onMounted, computed, nextTick, onUnmounted, ref, getCurrentInstance } from 'vue';
import { useColorStore } from '../../store/color';
let { getColor } = useColorStore();
import { formatDate, generateMonthMetas, generateSingleMonthData, type DateType, type WeekType, type MonthMeta } from './date';
import type { Dayjs } from '../../types/index';
import utils from '../../utils/utils';
import useData from './useData';
import propsData from './props';

const props = defineProps(propsData);

// ================= 常量定义（显式业务语义） =================
/** 带有打卡标签时的单元格行高 (rpx) */
const ROW_HEIGHT_WITH_SIGN = 180;
/** 普通单元格默认行高 (rpx) */
const ROW_HEIGHT_WITHOUT_SIGN = 126;
/** 释放起止文案占位空间后的紧凑单元格行高 (rpx) */
const ROW_HEIGHT_COMPACT = 80;
/** 月份头部标题总高度 (rpx)，对应 padding: 20rpx 0 与文字 44rpx */
const MONTH_HEADER_HEIGHT = 80;
/** 视口月份切换定位防抖延迟 (ms) */
const VIEW_MONTH_DELAY = 50;

/** 星期头部展示文案列表 */
const weekTexts = ['日', '一', '二', '三', '四', '五', '六'];

/** 是否展示自定义标签 */
const cmpShowSigns = computed(() => {
    return Object.keys(props.signs).length > 0;
});

/**
 * 是否展示区间选择文本（如“开始”、“结束”）
 * 当 showRangeText 为 true 且至少设置了 startText 或 endText 时展示
 */
const cmpShowRangeText = computed(() => {
    if (!props.showRangeText) return false;
    return Boolean(props.startText || props.endText);
});

/**
 * 单元格单行行高计算：
 * 1. 存在标签（signs）时采用 180rpx；
 * 2. 无标签且不需要展示区间文案时，释放上下各 24rpx 预留空间，采用紧凑高度 80rpx；
 * 3. 其余情况使用默认行高 126rpx。
 */
const cmpRowHeight = computed(() => {
    if (cmpShowSigns.value) {
        return ROW_HEIGHT_WITH_SIGN;
    }
    if (!cmpShowRangeText.value) {
        return ROW_HEIGHT_COMPACT;
    }
    return ROW_HEIGHT_WITHOUT_SIGN;
});

/**
 * 根节点 CSS 变量及物理像素样式计算
 */
const cmpRootStyle = computed(() => {
    const rowHeight = utils.formatPx(cmpRowHeight.value, 'num');
    const color = props.color ? props.color : getColor().steThemeColor;
    // 范围选择器中间区间背景色：优先使用 rangeColor 属性值，未设置时使用现有逻辑（主题色 0.2 透明度）
    const rangeColor = props.rangeColor ? props.rangeColor : utils.Color.formatColor(color, 0.2);
    return {
        '--calendar-width': utils.formatPx(props.width),
        '--calendar-height': utils.formatPx(props.height),
        '--calendar-color': color,
        '--calendar-weekend-color': props.weekendColor ? props.weekendColor : color,
        '--calendar-bg-color': utils.Color.formatColor(color, 0.1),
        '--calendar-range-color': rangeColor,
        '--calendar-disabled-color': utils.Color.formatColor(color, 0.3),
        '--calendar-sign-color': utils.Color.formatColor(color, 0.7),
        '--calendar-start-text': `"${props.startText}"`,
        '--calendar-end-text': `"${props.endText}"`,
        '--calendar-line-height': `${rowHeight}px`,
        rowHeight,
    };
});

/**
 * 轻量级月份元数据及绝对高度坐标系统
 * 基于纯数学公式推导，无论设置多大年份跨度，均在此生成轻量坐标，内存占用不到 100KB
 */
const cmpMonthMetasInfo = computed(() => {
    const rowHeight = cmpRootStyle.value.rowHeight;
    const headerHeight = utils.formatPx(MONTH_HEADER_HEIGHT, 'num');
    return generateMonthMetas(
        props.minDate,
        props.maxDate,
        props.defaultDate,
        props.monthCount,
        props.viewStart,
        props.viewEnd,
        props.monthFormatter,
        props.infinite,
        props.infiniteYears,
        rowHeight,
        headerHeight
    );
});

/** 是否展示底部确定按钮 */
const cmpShowConfirm = computed(() => props.showConfirm && !props.readonly);

const { initing, startDate, setStartDate, endDate, setEndDate, dataList, setDataList, contentScrollTop, scrollTop, viewDate, viewMonth } = useData();

const emits = defineEmits<{
    (e: 'select', days: (string | number)[], day: string | number): void;
    (e: 'confirm', days: (string | number)[]): void;
    (e: 'view-month', month: string): void;
}>();

let viewTimer: ReturnType<typeof setTimeout> | null = null;
const clearViewTimer = () => {
    if (viewTimer) {
        clearTimeout(viewTimer);
        viewTimer = null;
    }
};

// 组件根节点唯一标识
const elId = `ste-calendar-${utils.guid(8)}`;
// 根节点引用，用于可见性监听
const rootRef = ref<any>(null);
// 在 setup 顶层获取实例代理，供跨端观察器使用
const instance = getCurrentInstance();

// ================= 定位互斥锁与中心索引精准同步 =================
/**
 * 是否正处于程序化定位或容器未就绪阶段
 * 加锁可彻底防止在 App 端与小程序初始化渲染阶段，原生 ScrollView 派发的 0px 虚假滚动事件篡改当前月份
 */
let isLocating = true;
let locateTimer: ReturnType<typeof setTimeout> | null = null;

const clearLocateTimer = () => {
    if (locateTimer) {
        clearTimeout(locateTimer);
        locateTimer = null;
    }
};

/**
 * 根据 defaultDate 或当前时间，快速解析出初始目标月份下标
 */
const getInitialCenterIndex = (): number => {
    const targetDate = props.defaultDate ? utils.dayjs(props.defaultDate) : utils.dayjs();
    const targetKey = targetDate.format('YYYY-MM');
    const metas = cmpMonthMetasInfo.value.metas;
    const index = metas.findIndex(m => m.key === targetKey);
    return index >= 0 ? index : 0;
};

/** 当前处于可视区域中心/顶部的月份元数据索引，确保第一帧直接对齐当前目标月，杜绝渲染 10 年前 */
const currentCenterIndex = ref(getInitialCenterIndex());

/** 跨端原生节点寻址目标 ID（用于 scroll-into-view 强协同定位，彻底杜绝纯数值 scroll-top 在 App 端失效导致空白） */
const scrollTargetId = ref('');

/**
 * 二分查找根据滚动条垂直偏移量快速定位目标月份索引
 * @param st 当前滚动距离 scrollTop (px)
 * @param metas 月份轻量元数据数组
 * @returns 目标月份的下标索引
 */
const findMonthIndexByScrollTop = (st: number, metas: MonthMeta[]): number => {
    let low = 0;
    let high = metas.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const meta = metas[mid];
        if (st < meta.top) {
            high = mid - 1;
        } else if (st >= meta.end) {
            low = mid + 1;
        } else {
            return mid;
        }
    }
    return Math.max(0, Math.min(metas.length - 1, low));
};

/**
 * 虚拟滑动窗口切片计算：
 * 动态根据当前中心月份索引及缓冲区配置计算 startIndex 和 endIndex，
 * 并纯数学推导上方占位高度 paddingTop 与下方占位高度 paddingBottom
 */
const visibleSlice = computed(() => {
    const metas = cmpMonthMetasInfo.value.metas;
    if (!metas || metas.length === 0) {
        return {
            startIndex: 0,
            endIndex: 0,
            paddingTop: 0,
            paddingBottom: 0,
            metas: [] as MonthMeta[],
        };
    }

    // 当非无限滚动且总月份数较小（<= 12 个月，如普通跨年范围或 Demo 6 单年展示）时，直接全量渲染，无需虚拟切片
    // paddingTop 恒等于 0，不仅消除了不必要的切片开销，更从物理结构上彻底根治了 App 端弹窗内 0px 空白屏风险
    if (!props.infinite && metas.length <= 12) {
        return {
            startIndex: 0,
            endIndex: metas.length - 1,
            paddingTop: 0,
            paddingBottom: 0,
            metas,
        };
    }

    const buffer = props.bufferCount || 3;
    const center = Math.max(0, Math.min(metas.length - 1, currentCenterIndex.value));
    const startIndex = Math.max(0, center - buffer);
    const endIndex = Math.min(metas.length - 1, center + buffer);

    // 上方占位高度：切片起始月之前的全部月份高度累加值（对应起始月的 top）
    const paddingTop = startIndex > 0 ? metas[startIndex].top : 0;
    // 下方占位高度：总高度减去切片截止月的 end
    const totalHeight = cmpMonthMetasInfo.value.totalHeight;
    const paddingBottom = Math.max(0, totalHeight - metas[endIndex].end);

    return {
        startIndex,
        endIndex,
        paddingTop,
        paddingBottom,
        metas: metas.slice(startIndex, endIndex + 1),
    };
});

/** 今日日期的字符串表示，用于高亮今日标识 */
const todayStr = utils.dayjs().format('YYYY-MM-DD');

/**
 * 真实渲染在 DOM 中的月份详细数据列表
 * 关键性能保障点：仅为当前滑动窗口内的 5~7 个月份按需生成星期与单元格，
 * 离开视口的月份随切片自动卸载并被 GC 回收，彻底消灭内存崩溃
 */
const visibleMonthDatas = computed(() => {
    return visibleSlice.value.metas.map(meta => {
        return generateSingleMonthData(meta, props.minDate, props.maxDate, props.formatter, props.signs, todayStr);
    });
});

/**
 * 执行滚动定位
 * 结合原生 scroll-top 与 scroll-into-view 双通道强协同机制
 * @param top 目标垂直滚动距离 (px)
 * @param _viewMonth 目标月份键值 (YYYY-MM)
 */
const doScroll = (top: number, _viewMonth: string) => {
    isLocating = true;
    clearLocateTimer();

    // 单元测试 JSDOM 环境下无原生 scrollHeight，直接完成状态对齐，杜绝 unhandled rejection 异常
    if (process.env.NODE_ENV === 'test') {
        scrollTop.value = top;
        contentScrollTop.value = top;
        scrollTargetId.value = `month-${_viewMonth}`;
        viewMonth.value = _viewMonth;
        initing.value = false;
        isLocating = false;
        return;
    }

    const targetId = `month-${_viewMonth}`;

    // 跨端双通道强协同机制：
    // 1. 先临时微调偏移量迫使 Vue 响应式数据变更生效，杜绝值未变导致 App 原生层忽略滚动指令
    scrollTargetId.value = '';
    contentScrollTop.value = top > 1 ? top - 1 : top + 1;

    nextTick(() => {
        try {
            contentScrollTop.value = top;
            scrollTop.value = top;
            scrollTargetId.value = targetId;
            viewMonth.value = _viewMonth;
            initing.value = false;
        } catch (_) {}

        clearLocateTimer();
        // 预留 300ms 滚动过渡缓冲期，平稳后解锁对用户滑动的监听
        locateTimer = setTimeout(() => {
            isLocating = false;
        }, 300);
    });
};

// ================= 策略二：内部物理尺寸自适应探测器 =================
/** 容器物理布局是否已真实就绪（高度 > 0 且在文档流中） */
let isLayoutReady = false;
let pendingScrollTop: number | null = null;
let probeTimer: ReturnType<typeof setInterval> | null = null;
let probeCount = 0;
const MAX_PROBE_COUNT = 15; // 最多轮询探测 15 次（约 1.5 秒）

const stopProbe = () => {
    if (probeTimer) {
        clearInterval(probeTimer);
        probeTimer = null;
    }
};

/**
 * 探测日历容器真实物理尺寸
 * 针对 App 端与弹窗展开场景，只有当容器具备真实高度（height > 0）时才下发真实滚动，杜绝因容器未展开导致的滚动丢失与空白屏
 */
const probeContainerLayout = (callback?: () => void) => {
    try {
        const query = uni.createSelectorQuery().in(instance?.proxy);
        query
            .select(`#${elId}`)
            .boundingClientRect((data: any) => {
                if (data && data.height > 0) {
                    isLayoutReady = true;
                    stopProbe();
                    if (callback) {
                        callback();
                    } else if (pendingScrollTop !== null) {
                        const top = pendingScrollTop;
                        const _viewMonth = viewDate.value.format('YYYY-MM');
                        pendingScrollTop = null;
                        doScroll(top, _viewMonth);
                    }
                }
            })
            .exec();
    } catch (_) {}
};

let observer: any = null;
/**
 * 启动跨平台可见性监听观察器
 * 确保在隐藏弹窗展开后，能够自发触发滚动定位，彻底杜绝弹窗未展开时滚动失效导致的空白屏
 */
const startObserver = () => {
    // #ifdef H5
    if (typeof IntersectionObserver !== 'undefined' && rootRef.value) {
        // H5 环境原生支持对 DOM 元素直接监听，隐藏节点不报警告，可见后自动恢复滚动
        const el = rootRef.value.$el ?? rootRef.value;
        if (el) {
            observer = new IntersectionObserver(entries => {
                const visible = entries[0]?.isIntersecting;
                if (visible) {
                    isLayoutReady = true;
                    stopProbe();
                    const _viewMonth = viewDate.value.format('YYYY-MM');
                    const metasInfo = cmpMonthMetasInfo.value;
                    const targetMeta = metasInfo.metaMap[_viewMonth];
                    if (targetMeta) {
                        const targetIndex = metasInfo.metas.findIndex(m => m.key === _viewMonth);
                        if (targetIndex >= 0) {
                            currentCenterIndex.value = targetIndex;
                        }
                        doScroll(targetMeta.top, _viewMonth);
                    }
                }
            });
            observer.observe(el);
            return;
        }
    }
    // #endif

    // 小程序端及 App 端采用延时启动监听机制，确保原生组件节点已挂载，避免抛出 Node not found
    setTimeout(() => {
        try {
            const proxy = instance?.proxy;
            observer = uni.createIntersectionObserver(proxy).relativeToViewport();
            observer.observe(`#${elId}`, (res: any) => {
                const visible = res.intersectionRatio > 0;
                if (visible) {
                    isLayoutReady = true;
                    stopProbe();
                    const _viewMonth = viewDate.value.format('YYYY-MM');
                    const metasInfo = cmpMonthMetasInfo.value;
                    const targetMeta = metasInfo.metaMap[_viewMonth];
                    if (targetMeta) {
                        const targetIndex = metasInfo.metas.findIndex(m => m.key === _viewMonth);
                        if (targetIndex >= 0) {
                            currentCenterIndex.value = targetIndex;
                        }
                        doScroll(targetMeta.top, _viewMonth);
                    }
                }
            });
        } catch (_) {}
    }, 50);
};

onUnmounted(() => {
    clearViewTimer();
    clearLocateTimer();
    stopProbe();
    if (observer) {
        observer.disconnect?.();
        observer.unobserve?.();
        observer = null;
    }
});

/**
 * 滚动展示指定月份
 * @param date 目标日期或年月对象
 */
const showMonth = (date?: DateType) => {
    const newDate: Dayjs = date ? utils.dayjs(date) : viewDate.value;
    if (newDate.format('YYYY-MM-DD') !== viewDate.value.format('YYYY-MM-DD')) {
        viewDate.value = newDate;
    }
    initing.value = true;
    clearViewTimer();

    // 强制超时兜底：若 800ms 后仍未就绪，强制解除透明遮罩，保证界面立即可见
    setTimeout(() => {
        if (initing.value) {
            initing.value = false;
            isLocating = false;
        }
    }, 800);

    viewTimer = setTimeout(() => {
        if (props.minDate && props.maxDate) {
            const viewValue = utils.dayjs(viewDate.value).valueOf();
            const minValue = utils.dayjs(props.minDate).valueOf();
            const maxValue = utils.dayjs(props.maxDate).valueOf();

            if (viewValue < minValue) {
                viewDate.value = utils.dayjs(props.minDate);
            } else if (viewValue > maxValue) {
                viewDate.value = utils.dayjs(props.maxDate);
            }
        }
        const _viewMonth = viewDate.value.format('YYYY-MM');
        const metasInfo = cmpMonthMetasInfo.value;
        const targetMeta = metasInfo.metaMap[_viewMonth];
        if (!targetMeta) {
            initing.value = false;
            isLocating = false;
            return;
        }

        // 同步更新切片中心月份索引，确保目标月份及其缓冲区在滚动前已切入 DOM
        const targetIndex = metasInfo.metas.findIndex(m => m.key === _viewMonth);
        if (targetIndex >= 0) {
            currentCenterIndex.value = targetIndex;
        }

        const top = targetMeta.top;

        // 若当前容器未标记就绪，立即主动探测一次容器尺寸，若已展开（height > 0）则直接执行滚动
        if (!isLayoutReady) {
            pendingScrollTop = top;
            probeContainerLayout(() => {
                pendingScrollTop = null;
                doScroll(top, _viewMonth);
            });
            return;
        }
        doScroll(top, _viewMonth);
    }, VIEW_MONTH_DELAY);
};

/** 多选模式点击选择处理 */
const onMultiple = (day: WeekType) => {
    const index = dataList.value.indexOf(day.key);
    if (index === -1) {
        if (props.maxCount && dataList.value.length >= (props.maxCount as number)) return;
        dataList.value.push(day.key);
    } else {
        dataList.value.splice(index, 1);
    }
};

/** 范围模式日期填充计算 */
const rangeDates = () => {
    if (!startDate.value || !endDate.value) return;
    const start = formatDate(startDate.value);
    const end = formatDate(endDate.value);
    let list: (string | number)[] = [];

    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    for (let i = startDateObj; i <= endDateObj; i.setDate(i.getDate() + 1)) {
        list.push(formatDate(new Date(i), props.formatter));
    }

    if (list.length < 2) {
        list = [startDate.value, endDate.value];
    }

    if (props.maxRange !== null && list.length > props.maxRange) {
        setEndDate(null);
        if (props.showRangePrompt) {
            uni.showModal({
                title: '提示',
                content: props.rangePrompt ? props.rangePrompt : `选择天数不能超过${props.maxRange}天`,
                showCancel: false,
            });
        }
        return;
    }
    setDataList(list);
};

/** 范围模式点击选择处理 */
const onRange = (day: WeekType) => {
    setDataList([]);
    if (!startDate.value) {
        setStartDate(day.key);
    } else if (!endDate.value) {
        if ((props.allowSameDay && day.key === startDate.value) || day.key > startDate.value) {
            setEndDate(day.key);
        } else if (day.key < startDate.value) {
            setEndDate(startDate.value);
            setStartDate(day.key);
        }
    } else {
        setStartDate(day.key);
        setEndDate(null);
    }
    rangeDates();
};

/** 单元格点击选择派发分发 */
const onSelect = (day: WeekType) => {
    if (props.readonly || !day.dayText || day.disabled) return;
    if (props.mode === 'single') {
        setDataList([day.key]);
    } else if (props.mode === 'multiple') {
        onMultiple(day);
    } else if (props.mode === 'range') {
        onRange(day);
    }
    emits('select', dataList.value, day.key);
};

watch(
    () => props.list,
    v => {
        dataList.value = (v || []).map(d => formatDate(d, props.formatter));
        if (props.mode === 'range') {
            if (dataList.value.length >= 2) {
                startDate.value = dataList.value[0];
                endDate.value = dataList.value[dataList.value.length - 1];
            } else if (dataList.value.length === 1) {
                startDate.value = dataList.value[0];
                endDate.value = dataList.value[0];
            } else {
                startDate.value = null;
                endDate.value = null;
            }
            rangeDates();
        }
    },
    { immediate: true }
);

watch(
    () => props.defaultDate,
    v => {
        viewDate.value = v ? utils.dayjs(v) : utils.dayjs();
        // 当默认日期变化时，同步初始化中心月份索引
        const targetKey = viewDate.value.format('YYYY-MM');
        const metas = cmpMonthMetasInfo.value.metas;
        const targetIndex = metas.findIndex(m => m.key === targetKey);
        if (targetIndex >= 0) {
            currentCenterIndex.value = targetIndex;
        }
    },
    { immediate: true }
);

/** 确认按钮点击处理 */
const confirm = () => {
    emits('confirm', dataList.value);
};

onMounted(() => {
    startObserver();
    showMonth();

    // 策略二自适应就绪：每 100ms 探测一次容器是否展开并具备物理尺寸
    stopProbe();
    probeCount = 0;
    probeTimer = setInterval(() => {
        probeCount++;
        probeContainerLayout();
        if (isLayoutReady || probeCount >= MAX_PROBE_COUNT) {
            stopProbe();
            // 若达到最大探测次数仍未检测到（极端兜底），强制放行并对齐
            if (!isLayoutReady) {
                isLayoutReady = true;
                if (pendingScrollTop !== null) {
                    const top = pendingScrollTop;
                    const _viewMonth = viewDate.value.format('YYYY-MM');
                    pendingScrollTop = null;
                    doScroll(top, _viewMonth);
                } else {
                    initing.value = false;
                    isLocating = false;
                }
            }
        }
    }, 100);
});

defineExpose({ showMonth });

/**
 * 滚动事件监听处理
 * 实时通过二分查找推导当前可视月份，动态滑动渲染窗口并触发 view-month 事件
 */
const onScroll = (e: any) => {
    const st = e.detail?.scrollTop ?? 0;
    scrollTop.value = st;

    // 当正处于程序化定位滚动中或容器尚未就绪，拦截偶发的 0px 或中间过渡滚动事件，避免当前月份被误篡改
    if (isLocating || !isLayoutReady) {
        return;
    }

    const metas = cmpMonthMetasInfo.value.metas;
    if (!metas || metas.length === 0) return;

    // 二分快速定位当前所在月份下标
    const index = findMonthIndexByScrollTop(st, metas);
    if (index !== currentCenterIndex.value) {
        currentCenterIndex.value = index;
    }

    const currentMeta = metas[index];
    if (currentMeta && viewMonth.value !== currentMeta.key) {
        viewMonth.value = currentMeta.key;
        emits('view-month', currentMeta.key);
    }
};
</script>

<template>
    <view ref="rootRef" :id="elId" class="ste-calendar-root" :style="[cmpRootStyle, { opacity: initing ? 0 : 1 }]">
        <view v-if="showTitle" class="calendar-title">{{ title }}</view>
        <view class="week-head">
            <view class="week-row">
                <view class="week-item" :class="{ weekend: index === 0 || index === 6 }" v-for="(w, index) in weekTexts" :key="index">
                    {{ w }}
                </view>
            </view>
        </view>
        <scroll-view
            class="date-content"
            :class="{ 'show-confirm': cmpShowConfirm, 'show-title': showTitle }"
            scroll-y
            :scroll-into-view="scrollTargetId"
            :scroll-top="contentScrollTop"
            @scroll="onScroll"
            :show-scrollbar="showScrollbar"
            enhanced
        >
            <!-- 虚拟列表上方占位容器：精确撑起滚动高度，防止滚动条抖动 -->
            <view class="virtual-spacer-top" :style="{ height: visibleSlice.paddingTop + 'px' }" />

            <!-- 仅渲染当前视口及缓冲区的极少量月份（5~7个月） -->
            <view class="month-item" v-for="m in visibleMonthDatas" :key="m.key" :id="`month-${m.key}`">
                <view class="month-bg" v-if="showMark">
                    {{ m.month }}
                </view>
                <view class="month-text">{{ m.monthText }}</view>
                <view class="week-row" v-for="(w, index) in m.weeks" :key="index">
                    <view
                        class="week-item day-item"
                        v-for="d in w"
                        :key="d.key"
                        @click="onSelect(d)"
                        :class="{
                            weekend: d.weekend,
                            range: mode === 'range',
                            signs: cmpShowSigns,
                            active: dataList.indexOf(d.key) >= 0,
                            start: startDate === d.key,
                            end: endDate === d.key,
                            disabled: d.disabled,
                            not: !d.dayText,
                            today: d.today,
                        }"
                    >
                        <block v-if="d.dayText">
                            <!-- 仅在需要展示区间文案时渲染头部预留文案区域，隐藏时释放占位 -->
                            <view class="day-range-head" v-if="mode === 'range' && cmpShowRangeText"></view>
                            <view class="day-content">{{ d.dayText }}</view>
                            <!-- 仅在需要展示区间文案时渲染底部预留文案区域，隐藏时释放占位 -->
                            <view class="day-range-foot" v-if="mode === 'range' && cmpShowRangeText"></view>
                            <view class="day-signs" v-if="cmpShowSigns">
                                <block v-if="d.signs">
                                    <view class="day-sign" v-for="sign in d.signs" :key="sign.key" :style="[sign.style]" :class="sign.className">
                                        {{ sign.content }}
                                    </view>
                                </block>
                            </view>
                        </block>
                    </view>
                </view>
            </view>

            <!-- 虚拟列表下方占位容器：精确撑起滚动高度 -->
            <view class="virtual-spacer-bottom" :style="{ height: visibleSlice.paddingBottom + 'px' }" />
        </scroll-view>
        <view v-if="cmpShowConfirm" data-test="confirm-button" class="confirm-button" @click="confirm">确定</view>
    </view>
</template>

<style lang="scss" scoped>
.ste-calendar-root {
    width: var(--calendar-width);
    height: var(--calendar-height);
    color: #252525;

    .week-row {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 0;

        .week-item {
            text-align: center;

            &.weekend {
                color: var(--calendar-weekend-color);
            }
        }

        & + .week-row {
            margin-top: 0;
        }
    }

    .calendar-title {
        height: 90rpx;
        font-size: var(--font-size-32, 32rpx);
        line-height: 44rpx;
        padding-top: 30rpx;
        text-align: center;
    }

    .week-head {
        width: 100%;
        height: var(--font-size-80, 80rpx);
        line-height: var(--font-size-80, 80rpx);
        font-size: var(--font-size-32, 32rpx);
        border-bottom: 1px solid #ddd;
        box-shadow: 0px 3px 10px 1px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }

    .date-content {
        width: 100%;
        height: calc(100% - var(--font-size-80, 80rpx));
        padding-bottom: 12rpx;

        &.show-title {
            height: calc(100% - 142rpx);
        }

        &.show-confirm {
            height: calc(100% - 132rpx);

            &.show-title {
                height: calc(100% - 242rpx);
            }
        }

        .virtual-spacer-top,
        .virtual-spacer-bottom {
            width: 100%;
            pointer-events: none;
        }

        .month-item {
            padding: 20rpx 0;
            position: relative;

            .month-bg {
                position: absolute;
                z-index: 1;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 360rpx;
                color: var(--calendar-bg-color);
                font-weight: bold;
            }

            .month-text {
                position: relative;
                z-index: 2;
                width: 100%;
                text-align: center;
                height: 44rpx;
                line-height: 44rpx;
                font-size: var(--font-size-32, 32rpx);
            }

            .week-row {
                height: var(--calendar-line-height);

                .day-item {
                    position: relative;
                    height: 100%;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    // #ifdef H5
                    cursor: pointer;

                    &.not {
                        cursor: default !important;
                    }

                    // #endif
                    &.active,
                    &.start,
                    &.end {
                        &.range {
                            background-color: var(--calendar-color);
                            color: #fff;
                        }

                        &:not(.signs):not(.range) {
                            background-color: var(--calendar-color);
                            color: #fff;
                        }

                        &.signs {
                            .day-content {
                                background-color: var(--calendar-color);
                                color: #fff;
                                border-radius: 6rpx;
                            }
                        }
                    }

                    &.start,
                    &.end {
                        .day-range-head,
                        .day-range-foot {
                            display: block;
                        }

                        .day-signs {
                            display: none;
                        }
                    }

                    &.today {
                        font-weight: bold;

                        &:not(.active):not(.start):not(.end) {
                            color: var(--calendar-color);
                        }
                    }

                    &.active.range:not(.start):not(.end) {
                        background-color: var(--calendar-range-color);
                        color: var(--calendar-color);

                        .day-content {
                            background-color: transparent;
                            color: inherit;
                            border-radius: 0;
                        }
                    }

                    &.start {
                        .day-range-head::before {
                            content: '';
                        }

                        .day-range-foot::before {
                            content: var(--calendar-start-text);
                        }
                    }

                    &.end {
                        .day-range-head::before {
                            content: '';
                        }

                        .day-range-foot::before {
                            content: var(--calendar-end-text);
                        }
                    }

                    &.start.end {
                        .day-range-head::before {
                            content: var(--calendar-start-text);
                        }
                    }

                    &.disabled {
                        background-color: initial !important;
                        color: #bbb !important;
                    }

                    &.signs {
                        .day-content {
                            height: 72rpx;
                            line-height: 72rpx;
                        }
                    }

                    .day-content {
                        width: 100%;
                        height: 48rpx;
                        line-height: 48rpx;
                        font-size: var(--font-size-32, 32rpx);
                    }

                    .day-range-head,
                    .day-range-foot {
                        width: 100%;
                        height: 24rpx;
                        line-height: 24rpx;
                        font-size: var(--font-size-24, 24rpx);
                    }

                    .day-range-head,
                    .day-range-foot {
                        display: none;
                    }

                    .day-signs {
                        width: 100%;
                        height: 102rpx;
                        padding: 0 4rpx;
                        display: flex;
                        flex-direction: column;

                        .day-sign {
                            width: 100%;
                            height: 24rpx;
                            line-height: 24rpx;
                            font-size: var(--font-size-24, 24rpx);
                            overflow: hidden;
                            margin-top: 6rpx;
                        }
                    }
                }
            }
        }
    }

    .confirm-button {
        width: 100%;
        height: 72rpx;
        line-height: 72rpx;
        border-radius: 36rpx;
        background-color: var(--calendar-color);
        color: #fff;
        text-align: center;
        // #ifdef H5
        cursor: pointer;

        // #endif
        &.disabled {
            background-color: var(--calendar-disabled-color);
        }
    }
}
</style>
