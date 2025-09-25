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
    emits: { (e: 'change', index: number, source: 'autoplay' | 'touch'): void };
}) {
    const initializing = ref(true);
    const setInitializing = (val: boolean) => (initializing.value = val);

    const moveing = ref(false);
    const setMoveing = (val: boolean) => (moveing.value = val);

    const reseting = ref(false);
    const setReseting = (val: boolean) => (reseting.value = val);

    const dataIndex = ref(0);
    const setDataIndex = (val: number) => (dataIndex.value = val);

    watch(
        () => props.current,
        v => {
            if (!children.length) {
                setDataIndex(v);
                return;
            }
            setDataIndex(v < 0 ? 0 : v >= children.length ? children.length - 1 : v);
        },
        { immediate: true }
    );

    const touch = new TouchEvent();

    const boxWidth = ref<number>();
    const setBoxWidth = (val: number | undefined) => (boxWidth.value = val);

    const boxHeight = ref<number>();
    const setBoxHeight = (val: number | undefined) => (boxHeight.value = val);

    const translateX = ref(0);
    const setTranslateX = (val: number) => (translateX.value = val);

    const translateY = ref(0);
    const setTranslateY = (val: number) => (translateY.value = val);

    let childrenTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
    const setChildrenTimeout = (callback: () => void, time: number) => {
        clearTimeout(childrenTimeout);
        childrenTimeout = setTimeout(() => {
            callback();
        }, time);
    };

    let durationTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
    const setDurationTimeout = (callback: () => void, time: number) => {
        clearTimeout(durationTimeout);
        durationTimeout = setTimeout(() => {
            callback();
        }, time);
    };

    let autoplayTimeout: ReturnType<typeof setTimeout> | undefined = undefined;
    const setAutoplayTimeout = (callback: () => void, time: number) => {
        clearInterval(autoplayTimeout);
        autoplayTimeout = setInterval(() => {
            if (!props.autoplay || children?.length < 2) {
                clearInterval(autoplayTimeout);
                return;
            }
            callback();
        }, time);
    };

    onBeforeUnmount(() => {
        clearInterval(autoplayTimeout);
        clearTimeout(durationTimeout);
        clearTimeout(childrenTimeout);
    });

    const source = ref<'autoplay' | 'touch'>('autoplay');
    const setSource = (val: 'autoplay' | 'touch') => (source.value = val);

    const cmpDuration = computed(() => (props.autoplay && props.duration >= props.interval ? props.interval : props.duration));

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
                    ? `0  ${utils.formatPx(props.nextMargin)} 0 ${utils.formatPx(props.previousMargin)}`
                    : `${utils.formatPx(props.previousMargin)} 0 ${utils.formatPx(props.nextMargin)} 0`,
        };
    });

    const cmpBoxStyle = computed(() => {
        const style: CSSProperties = {};
        if (props.direction === 'horizontal') style.gridTemplateColumns = `repeat(${children.length || 'auto-fill'}, 100%)`;
        else if (props.direction === 'vertical') style.gridTemplateRows = `repeat(${children.length || 'auto-fill'}, 100%)`;

        return style;
    });

    const cmpBoxTransform = computed(() => {
        let transform = '';
        if (props.direction === 'horizontal') transform = `translateX(${translateX.value}px)`;
        else if (props.direction === 'vertical') transform = `translateY(${translateY.value}px)`;

        const duration = initializing.value || moveing.value || reseting.value ? 'inherit' : `${cmpDuration.value}ms`;
        return { transform, transitionDuration: duration };
    });

    const cmpStartComponent = computed(() => children[0]);

    const cmpEndComponent = computed(() => children[children.length - 1]);

    const getBoxSize = async () => {
        if (Number(boxWidth.value) > 0 || Number(boxHeight.value) > 0) return;
        const boxEl = await utils.querySelector<false>('.swipe-content-view', thas);
        setBoxWidth(boxEl.width);
        setBoxHeight(boxEl.height);
    };

    const isMover = (moveX = 0, moveY = 0) => {
        if (children.length < 2) return false;
        if (props.circular) return true;
        if (props.direction === 'horizontal' && ((dataIndex.value === 0 && moveX > 0) || (dataIndex.value === children.length - 1 && moveX < 0))) return false;

        if (props.direction === 'vertical' && ((dataIndex.value === 0 && moveY > 0) || (dataIndex.value === children.length - 1 && moveY < 0))) return false;

        return true;
    };

    const setBoundary = (moveX = 0, moveY = 0) => {
        if (!props.circular) return;
        if (children.length < 2) return;
        const startComponent = cmpStartComponent.value;
        const endComponent = cmpEndComponent.value;
        const length = children.length;
        const width = boxWidth.value;
        const height = boxHeight.value;
        if (dataIndex.value <= 0) {
            startComponent.selfValue?.setTransform({});
            if (props.direction === 'horizontal' && moveX > 0) endComponent.selfValue?.setTransform({ x: -length * Number(width) });
            else if (props.direction === 'vertical' && moveY > 0) endComponent.selfValue?.setTransform({ y: -length * Number(height) });
        } else if (dataIndex.value >= length - 1) {
            endComponent.selfValue?.setTransform({});
            if (props.direction === 'horizontal' && moveX < 0) startComponent.selfValue?.setTransform({ x: length * Number(width) });
            else if (props.direction === 'vertical' && moveY < 0) startComponent.selfValue?.setTransform({ y: length * Number(height) });
        }
    };

    const setTransform = (moveX = 0, moveY = 0) => {
        if (children.length < 2) return;
        const bool = isMover(moveX, moveY);
        if (!bool) return;
        if (props.direction === 'horizontal') {
            if (Math.abs(moveX) < Math.abs(moveY)) return;
            const x = -dataIndex.value * Number(boxWidth.value) + moveX;
            if (moveX !== 0 && Math.abs(translateX.value - x) < 3) return;
            setTranslateX(x);
            setBoundary(moveX);

            // 滑动时实时更新缩放效果（只支持水平方向）
            if (props.highlightActive) {
                updateLinearScale(moveX);
            }
        } else if (props.direction === 'vertical') {
            if (Math.abs(moveX) > Math.abs(moveY)) return;
            const y = -dataIndex.value * Number(boxHeight.value) + moveY;
            if (moveY !== 0 && Math.abs(translateY.value - y) < 3) return;
            setTranslateY(y);
            setBoundary(0, moveY);
            // 纵向滑动不支持突出显示模式
        }
    };

    const resetBoundary = () => {
        setReseting(true);
        setTimeout(() => {
            let change = false;
            if (dataIndex.value === -1) {
                setDataIndex(children.length - 1);
                change = true;
            } else if (dataIndex.value === children.length) {
                setDataIndex(0);
                change = true;
            }
            if (change) emits('change', dataIndex.value, source.value);

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
            setTimeout(() => {
                setReseting(false);
            }, 50);
        }, 50);
    };

    const setAutoplay = () => {
        setAutoplayTimeout(() => {
            let next = dataIndex.value + 1 <= children.length - 1 ? dataIndex.value + 1 : 0;
            if (props.circular) next = dataIndex.value + 1;
            setBoundary(-1, -1);
            setSource('autoplay');
            setDataIndex(next);
            if (next >= 0 && next <= children.length - 1) emits('change', next, source.value);
            setDurationTimeout(() => {
                resetBoundary();
                if (props.highlightActive) {
                    setTimeout(() => {
                        updateLinearScale();
                    }, cmpDuration.value / 3);
                }
            }, cmpDuration.value - 20);
        }, props.interval);
    };

    const init = () => {
        setChildrenTimeout(async () => {
            await getBoxSize();
            setTransform();
            resetBoundary();
            setAutoplay();

            setTimeout(() => {
                setInitializing(false);
            }, 25);
        }, 25);
    };

    onMounted(init);

    watch(
        () => dataIndex.value,
        () => {
            if (!children.length) return;
            nextTick(async () => {
                await getBoxSize();
                setTransform();
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

    const onTouchstart = async (e: UniTouchEvent | MouseEvent) => {
        if (props.disabled) return;
        if (children.length < 2) return;
        setMoveing(true);
        await getBoxSize();
        clearInterval(autoplayTimeout);
        resetBoundary();
        touch.touchStart(e as UniTouchEvent);
    };

    const onTouchmove = (e: UniTouchEvent | MouseEvent) => {
        if (props.disabled) return;
        if (children?.length < 2) return;
        const res = touch.touchMove(e as UniTouchEvent);
        if (!res) return;
        setMoveing(true);
        const { moveX, moveY } = res;
        setTransform(moveX, moveY);
    };

    const updateLinearScale = (moveX = 0) => {
        if (!children.length) return;
        // 只有水平方向支持突出显示
        if (props.direction !== 'horizontal') return;

        // 处理边界情况下的索引
        let actualIndex = dataIndex.value;
        const length = children.length;

        // 处理循环边界情况
        if (props.circular) {
            if (actualIndex === -1)
                actualIndex = length - 1; // 从第一个滑到最后一个
            else if (actualIndex === length) actualIndex = 0; // 从最后一个滑到第一个
        }

        const itemSize = Number(boxWidth.value);

        // 计算当前视口中心位置，需要考虑边界切换的实际视觉位置
        let currentPosition: number;
        if (props.circular) {
            if (dataIndex.value === -1) {
                // 从第一个滑到最后一个，视觉中心在左边
                currentPosition = -itemSize - moveX;
            } else if (dataIndex.value === length) {
                // 从最后一个滑到第一个，视觉中心在右边
                currentPosition = length * itemSize - moveX;
            } else {
                // 正常情况
                currentPosition = actualIndex * itemSize - moveX;
            }
        } else {
            currentPosition = actualIndex * itemSize - moveX;
        }

        // 判断是否有前后边距（可以看到相邻元素）
        const hasMargin = Number(props.previousMargin) > 0 || Number(props.nextMargin) > 0;

        // 确定需要处理的元素索引
        const visibleIndices = new Set();
        visibleIndices.add(actualIndex); // 当前元素

        if (hasMargin && length > 1) {
            // 前一个元素
            const prevIndex = (actualIndex - 1 + length) % length;
            visibleIndices.add(prevIndex);

            // 后一个元素
            const nextIndex = (actualIndex + 1) % length;
            visibleIndices.add(nextIndex);

            // 如果正在滑动，可能需要处理更多元素
            if (moveX !== 0) {
                // 滑动过程中可能会看到第4个元素
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

        // 只处理可见元素的缩放
        children.forEach((component, index) => {
            if (!visibleIndices.has(index)) {
                // 不可见元素直接设为最小缩放
                component.selfValue?.setLinearScale?.(0.8);
                return;
            }

            let itemCenter = index * itemSize;

            // 在循环模式下，处理边界元素的特殊位置
            if (props.circular && length > 2) {
                // 当从第一个滑到最后一个时，最后一个元素在第一个元素左边
                if (dataIndex.value === -1 && index === length - 1) {
                    itemCenter = -itemSize;
                }
                // 当从最后一个滑到第一个时，第一个元素在最后一个元素右边
                else if (dataIndex.value === length && index === 0) {
                    itemCenter = length * itemSize;
                }
                // 处理正常循环中的边界情况
                else if (actualIndex === 0 && index === length - 1 && moveX > 0) {
                    // 向右滑动查看最后一个元素
                    itemCenter = -itemSize;
                } else if (actualIndex === length - 1 && index === 0 && moveX < 0) {
                    // 向左滑动查看第一个元素
                    itemCenter = length * itemSize;
                }
            }

            // 计算相对于当前视口中心的距离
            const distance = Math.abs(itemCenter - currentPosition);
            // 将距离转换为相对于一个项目宽度的比例
            const distanceRatio = distance / itemSize;

            // 计算缩放比例：距离中心越近越大，最大1.0，最小0.8
            const scale = Math.max(0.8, 1 - distanceRatio * 0.2);

            component.selfValue?.setLinearScale?.(scale);
        });
    };

    const onTouchend = (e: UniTouchEvent | MouseEvent) => {
        if (props.disabled) return;
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
        if (props.direction === 'horizontal' && Math.abs(moveX) > Number(boxWidth.value) * props.swipeThreshold) index = moveX > 0 ? index - 1 : index + 1;
        else if (props.direction === 'vertical' && Math.abs(moveY) > Number(boxHeight.value) * props.swipeThreshold) index = moveY > 0 ? index - 1 : index + 1;

        if (dataIndex.value === index) {
            setTransform();
            return;
        }
        setSource('touch');
        setDataIndex(index);
        if (index < 0 || index >= children.length) return;
        emits('change', index, source.value);
    };

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
