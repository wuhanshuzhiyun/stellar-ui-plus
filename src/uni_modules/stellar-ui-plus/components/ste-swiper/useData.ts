import { type CSSProperties, computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type ComponentPublicInstance } from 'vue';
import TouchEvent from '../ste-touch-swipe/TouchEvent';
import type { UniTouchEvent } from '../../types/event';
import type { SelfComponentInternalInstance } from '../../utils/mixin';
import utils from './../../utils/utils';
import type { SwiperProps } from './props';

export default function useData({
    props,
    children,
    thas,
    emits,
}: {
    props: SwiperProps;
    children: SelfComponentInternalInstance[];
    thas: ComponentPublicInstance | null | undefined;
    emits: {
        (e: 'change', index: number, source: 'autoplay' | 'touch'): void;
        (e: 'error', error: Error, context: string): void;
    };
}) {
    // 状态管理
    const initializing = ref(true);
    const moveing = ref(false);
    const reseting = ref(false);
    const dataIndex = ref(0);
    const source = ref<'autoplay' | 'touch'>('autoplay');

    // 尺寸管理
    const boxWidth = ref<number>();
    const boxHeight = ref<number>();
    const translateX = ref(0);
    const translateY = ref(0);

    // 定时器管理
    let childrenTimeout: ReturnType<typeof setTimeout> | undefined;
    let durationTimeout: ReturnType<typeof setTimeout> | undefined;
    let autoplayTimeout: ReturnType<typeof setInterval> | undefined;
    let boundaryTimeout: ReturnType<typeof setTimeout> | undefined;

    // 清理回调数组
    const cleanupCallbacks: Array<() => void> = [];

    // 工具函数
    const setInitializing = (val: boolean) => (initializing.value = val);
    const setMoveing = (val: boolean) => (moveing.value = val);
    const setReseting = (val: boolean) => (reseting.value = val);
    const setDataIndex = (val: number) => (dataIndex.value = val);
    const setSource = (val: 'autoplay' | 'touch') => (source.value = val);
    const setBoxWidth = (val: number | undefined) => (boxWidth.value = val);
    const setBoxHeight = (val: number | undefined) => (boxHeight.value = val);
    const setTranslateX = (val: number) => (translateX.value = val);
    const setTranslateY = (val: number) => (translateY.value = val);

    // 注册清理回调
    const registerCleanup = (callback: () => void) => {
        cleanupCallbacks.push(callback);
    };

    // 执行清理
    const executeCleanup = () => {
        cleanupCallbacks.forEach(callback => {
            try {
                callback();
            } catch (error) {
                console.error('清理回调执行失败:', error);
            }
        });
        cleanupCallbacks.length = 0;
    };

    // 错误处理
    const handleError = (error: Error, context: string) => {
        console.error(`[Swiper ${context}] 错误:`, error);
        emits('error', error, context);
    };

    // 定时器管理函数
    const setChildrenTimeout = (callback: () => void, time: number) => {
        clearTimeout(childrenTimeout);
        childrenTimeout = setTimeout(() => {
            try {
                callback();
            } catch (error) {
                handleError(error as Error, 'childrenTimeout');
            }
        }, time);
    };

    const setDurationTimeout = (callback: () => void, time: number) => {
        clearTimeout(durationTimeout);
        durationTimeout = setTimeout(() => {
            try {
                callback();
            } catch (error) {
                handleError(error as Error, 'durationTimeout');
            }
        }, time);
    };

    const setAutoplayTimeout = (callback: () => void, time: number) => {
        clearInterval(autoplayTimeout);
        autoplayTimeout = setInterval(() => {
            if (!props.autoplay || children?.length < 2) {
                clearInterval(autoplayTimeout);
                return;
            }
            try {
                callback();
            } catch (error) {
                handleError(error as Error, 'autoplayTimeout');
                clearInterval(autoplayTimeout);
            }
        }, time);
    };

    const setBoundaryTimeout = (callback: () => void, time: number) => {
        clearTimeout(boundaryTimeout);
        boundaryTimeout = setTimeout(() => {
            try {
                callback();
            } catch (error) {
                handleError(error as Error, 'boundaryTimeout');
            }
        }, time);
    };

    // 清理所有定时器
    const clearAllTimeouts = () => {
        clearTimeout(childrenTimeout);
        clearTimeout(durationTimeout);
        clearTimeout(boundaryTimeout);
        clearInterval(autoplayTimeout);
        executeCleanup();
    };

    // 生命周期钩子
    onBeforeUnmount(() => {
        clearAllTimeouts();
    });

    // 触摸事件处理
    const touch = new TouchEvent();

    // 计算属性
    const cmpDuration = computed(() =>
        props.autoplay && props.duration >= props.interval ? props.interval : props.duration
    );

    const cmpRootStyle = computed(() => {
        let width = props.direction === 'horizontal' ? '100%' : 'auto';
        let height = props.direction === 'vertical' ? '100%' : 'auto';

        if (props.width) width = utils.formatPx<'str'>(props.width);
        if (props.height) height = utils.formatPx<'str'>(props.height);

        return {
            '--swiper-width': width,
            '--swiper-height': height,
            '--swiper-indicator-color': props.indicatorColor,
            '--swiper-indicator-active-color': props.indicatorActiveColor,
            '--swiper-root-padding':
                props.direction === 'horizontal'
                    ? `0 ${utils.formatPx(props.nextMargin)} 0 ${utils.formatPx(props.previousMargin)}`
                    : `${utils.formatPx(props.previousMargin)} 0 ${utils.formatPx(props.nextMargin)} 0`,
        };
    });

    const cmpBoxStyle = computed(() => {
        const style: CSSProperties = {};
        if (props.direction === 'horizontal') {
            style.gridTemplateColumns = `repeat(${children.length || 'auto-fill'}, 100%)`;
        } else if (props.direction === 'vertical') {
            style.gridTemplateRows = `repeat(${children.length || 'auto-fill'}, 100%)`;
        }
        return style;
    });

    const cmpBoxTransform = computed(() => {
        let transform = '';
        if (props.direction === 'horizontal') {
            transform = `translateX(${translateX.value}px)`;
        } else if (props.direction === 'vertical') {
            transform = `translateY(${translateY.value}px)`;
        }

        const duration = initializing.value || moveing.value || reseting.value ? 'inherit' : `${cmpDuration.value}ms`;
        return { transform, transitionDuration: duration };
    });

    const cmpStartComponent = computed(() => children[0]);
    const cmpEndComponent = computed(() => children[children.length - 1]);

    // 核心功能函数
    const getBoxSize = async () => {
        if (Number(boxWidth.value) > 0 || Number(boxHeight.value) > 0) return;

        if (!thas?.$el) {
            console.warn('无法获取DOM元素');
            return;
        }

        try {
            const boxEl = await utils.querySelector<false>('.swipe-content-view', thas);
            if (boxEl && typeof boxEl.width === 'number' && typeof boxEl.height === 'number') {
                setBoxWidth(boxEl.width);
                setBoxHeight(boxEl.height);
            }
        } catch (error) {
            handleError(error as Error, 'getBoxSize');
        }
    };

    const isMover = (moveX = 0, moveY = 0) => {
        if (children.length < 2) return false;
        if (props.circular) return true;

        if (props.direction === 'horizontal') {
            return !(dataIndex.value === 0 && moveX > 0) && !(dataIndex.value === children.length - 1 && moveX < 0);
        }

        if (props.direction === 'vertical') {
            return !(dataIndex.value === 0 && moveY > 0) && !(dataIndex.value === children.length - 1 && moveY < 0);
        }

        return true;
    };

    const setBoundary = (moveX = 0, moveY = 0) => {
        if (!props.circular) return;
        if (children.length < 2) return;

        try {
            const startComponent = cmpStartComponent.value;
            const endComponent = cmpEndComponent.value;
            const length = children.length;
            const width = boxWidth.value;
            const height = boxHeight.value;

            if (dataIndex.value <= 0) {
                startComponent.selfValue?.setTransform({});
                if (props.direction === 'horizontal' && moveX > 0) {
                    endComponent.selfValue?.setTransform({ x: -length * Number(width) });
                } else if (props.direction === 'vertical' && moveY > 0) {
                    endComponent.selfValue?.setTransform({ y: -length * Number(height) });
                }
            } else if (dataIndex.value >= length - 1) {
                endComponent.selfValue?.setTransform({});
                if (props.direction === 'horizontal' && moveX < 0) {
                    startComponent.selfValue?.setTransform({ x: length * Number(width) });
                } else if (props.direction === 'vertical' && moveY < 0) {
                    startComponent.selfValue?.setTransform({ y: length * Number(height) });
                }
            }
        } catch (error) {
            handleError(error as Error, 'setBoundary');
        }
    };

    const setTransform = (moveX = 0, moveY = 0) => {
        try {
            if (children.length < 2) return;
            const bool = isMover(moveX, moveY);
            if (!bool) return;

            if (props.direction === 'horizontal') {
                if (Math.abs(moveX) < Math.abs(moveY)) return;
                const x = -dataIndex.value * Number(boxWidth.value) + moveX;
                if (moveX !== 0 && Math.abs(translateX.value - x) < 3) return;
                setTranslateX(x);
                setBoundary(moveX);

                if (props.highlightActive) {
                    updateLinearScale(moveX);
                }
            } else if (props.direction === 'vertical') {
                if (Math.abs(moveX) > Math.abs(moveY)) return;
                const y = -dataIndex.value * Number(boxHeight.value) + moveY;
                if (moveY !== 0 && Math.abs(translateY.value - y) < 3) return;
                setTranslateY(y);
                setBoundary(0, moveY);
            }
        } catch (error) {
            handleError(error as Error, 'setTransform');
        }
    };

    const resetBoundary = () => {
        let change = false;
        if (dataIndex.value === -1) {
            setDataIndex(children.length - 1);
            change = true;
        } else if (dataIndex.value === children.length) {
            setDataIndex(0);
            change = true;
        }

        if (change) {
            emits('change', dataIndex.value, source.value);
            setReseting(true);
        }

        try {
            const length = children.length;
            children.forEach((component, index) => {
                let x = 0;
                let y = 0;
                if (props.circular) {
                    if (index === length - 1 && dataIndex.value === 0 && length > 2) {
                        x = props.direction === 'horizontal' ? -length * Number(boxWidth.value) : 0;
                        y = props.direction === 'vertical' ? -length * Number(boxHeight.value) : 0;
                    } else if (index === 0 && dataIndex.value === length - 1 && length > 2) {
                        x = props.direction === 'horizontal' ? length * Number(boxWidth.value) : 0;
                        y = props.direction === 'vertical' ? length * Number(boxHeight.value) : 0;
                    }
                }
                component.selfValue?.setTransform({ x, y });
            });

            setBoundaryTimeout(() => {
                setReseting(false);
            }, cmpDuration.value);
        } catch (error) {
            handleError(error as Error, 'resetBoundary');
        }
    };

    const setAutoplay = () => {
        setAutoplayTimeout(() => {
            try {
                let next = dataIndex.value + 1 <= children.length - 1 ? dataIndex.value + 1 : 0;
                if (props.circular) next = dataIndex.value + 1;
                setBoundary(-1, -1);
                setSource('autoplay');
                setDataIndex(next);
                if (next >= 0 && next <= children.length - 1) {
                    emits('change', next, source.value);
                }
                setDurationTimeout(() => {
                    resetBoundary();
                    if (props.highlightActive) {
                        setTimeout(() => {
                            updateLinearScale();
                        }, 50);
                    }
                }, cmpDuration.value);
            } catch (error) {
                handleError(error as Error, 'setAutoplay');
            }
        }, props.interval);
    };

    const init = () => {
        clearAllTimeouts();
        setChildrenTimeout(async () => {
            try {
                await getBoxSize();
                setTransform();
                resetBoundary();
                setAutoplay();
                setChildrenTimeout(() => {
                    setInitializing(false);
                }, 25);
            } catch (error) {
                handleError(error as Error, 'init');
            }
        }, 25);
    };

    // 监听器
    watch(
        () => props.current,
        v => {
            if (!children.length) {
                setDataIndex(v);
                return;
            }
            const newIndex = v < 0 ? 0 : v >= children.length ? children.length - 1 : v;
            if (dataIndex.value !== newIndex) {
                setDataIndex(newIndex);
            }
        },
        { immediate: true, flush: 'post' }
    );

    watch(
        () => dataIndex.value,
        () => {
            if (!children.length) return;
            nextTick(async () => {
                try {
                    await getBoxSize();
                    setTransform();
                } catch (error) {
                    handleError(error as Error, 'dataIndex watcher');
                }
            });
        },
        { immediate: true }
    );

    watch(
        () => children.length,
        () => {
            nextTick(() => {
                init();
            });
        },
        { immediate: true }
    );

    // 触摸事件处理器
    const onTouchstart = async (e: UniTouchEvent | MouseEvent) => {
        if (props.disabled) return;
        if (children.length < 2) return;

        try {
            setMoveing(true);
            await getBoxSize();
            clearAllTimeouts();
            resetBoundary();
            touch.touchStart(e as UniTouchEvent);
        } catch (error) {
            handleError(error as Error, 'onTouchstart');
        }
    };

    const onTouchmove = (e: UniTouchEvent | MouseEvent) => {
        if (props.disabled) return;
        if (children?.length < 2) return;

        try {
            const res = touch.touchMove(e as UniTouchEvent);
            if (!res) return;

            if (!moveing.value) {
                setMoveing(true);
            }

            const { moveX, moveY } = res;
            if (Math.abs(moveX) > 2 || Math.abs(moveY) > 2) {
                setTransform(moveX, moveY);
            }
        } catch (error) {
            handleError(error as Error, 'onTouchmove');
        }
    };

    const onTouchend = (e: UniTouchEvent | MouseEvent) => {
        if (props.disabled) return;

        try {
            setMoveing(false);
            const { moveX, moveY } = touch.touchEnd(e as UniTouchEvent);

            if (props.direction === 'horizontal' && !moveX) return;
            else if (props.direction === 'vertical' && !moveY) return;

            const bool = isMover(moveX, moveY);
            if (!bool) return;

            setDurationTimeout(() => {
                setAutoplay();
                resetBoundary();
            }, cmpDuration.value);

            let index = dataIndex.value;
            if (props.direction === 'horizontal' && Math.abs(moveX) > Number(boxWidth.value) * props.swipeThreshold) {
                index = moveX > 0 ? index - 1 : index + 1;
            } else if (props.direction === 'vertical' && Math.abs(moveY) > Number(boxHeight.value) * props.swipeThreshold) {
                index = moveY > 0 ? index - 1 : index + 1;
            }

            if (dataIndex.value === index) {
                setTransform();
                return;
            }

            setSource('touch');
            setDataIndex(index);
            if (index >= 0 && index < children.length) {
                emits('change', index, source.value);
            }
        } catch (error) {
            handleError(error as Error, 'onTouchend');
        }
    };

    // 缩放更新函数
    const updateLinearScale = (moveX = 0) => {
        if (!children.length) return;
        if (props.direction !== 'horizontal') return;

        try {
            let actualIndex = dataIndex.value;
            const length = children.length;
            const itemSize = Number(boxWidth.value);

            if (props.circular) {
                if (actualIndex === -1) actualIndex = length - 1;
                else if (actualIndex === length) actualIndex = 0;
            }

            let currentPosition: number;
            if (props.circular) {
                if (dataIndex.value === -1) {
                    currentPosition = -itemSize - moveX;
                } else if (dataIndex.value === length) {
                    currentPosition = length * itemSize - moveX;
                } else {
                    currentPosition = actualIndex * itemSize - moveX;
                }
            } else {
                currentPosition = actualIndex * itemSize - moveX;
            }

            const hasMargin = Number(props.previousMargin) > 0 || Number(props.nextMargin) > 0;
            const visibleIndices = new Set([actualIndex]);

            if (hasMargin && length > 1) {
                const prevIndex = (actualIndex - 1 + length) % length;
                const nextIndex = (actualIndex + 1) % length;
                visibleIndices.add(prevIndex);
                visibleIndices.add(nextIndex);

                if (moveX !== 0) {
                    if (moveX > itemSize / 2) {
                        const prevPrevIndex = (actualIndex - 2 + length) % length;
                        visibleIndices.add(prevPrevIndex);
                    }
                    if (moveX < -itemSize / 2) {
                        const nextNextIndex = (actualIndex + 2) % length;
                        visibleIndices.add(nextNextIndex);
                    }
                }
            }

            children.forEach((component, index) => {
                if (!visibleIndices.has(index)) {
                    component.selfValue?.setLinearScale?.(0.8);
                    return;
                }

                let itemCenter = index * itemSize;
                if (props.circular && length > 2) {
                    if (dataIndex.value === -1 && index === length - 1) {
                        itemCenter = -itemSize;
                    } else if (dataIndex.value === length && index === 0) {
                        itemCenter = length * itemSize;
                    } else if (actualIndex === 0 && index === length - 1 && moveX > 0) {
                        itemCenter = -itemSize;
                    } else if (actualIndex === length - 1 && index === 0 && moveX < 0) {
                        itemCenter = length * itemSize;
                    }
                }

                const distance = Math.abs(itemCenter - currentPosition);
                const distanceRatio = distance / itemSize;
                const scale = Math.max(0.8, 1 - distanceRatio * 0.2);
                component.selfValue?.setLinearScale?.(scale);
            });
        } catch (error) {
            handleError(error as Error, 'updateLinearScale');
        }
    };

    // 初始化
    onMounted(init);

    return {
        initializing,
        dataIndex,
        cmpRootStyle,
        cmpBoxStyle,
        cmpBoxTransform,
        onTouchstart,
        onTouchmove,
        onTouchend,
    };
}