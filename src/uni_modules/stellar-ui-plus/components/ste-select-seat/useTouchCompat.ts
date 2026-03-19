/**
 * 跨端触摸事件兼容层（纯函数，无外部依赖）
 *
 * APP 端 touch 坐标字段为 x/y，H5 端为 pageX/pageY。
 * APP 端 touches 是类对象 {0: {...}, 1: {...}}，没有 length 属性。
 */
import type { UniTouch, UniTouchEvent } from '../../types/event';

/** 获取触摸点 X 坐标（兼容 APP / H5） */
export const getTouchX = (touch: UniTouch | undefined | null): number => {
    if (!touch) return 0;
    // #ifdef APP
    if (typeof touch.x === 'number') return touch.x;
    // #endif
    if (typeof touch.pageX === 'number') return touch.pageX;
    if (typeof touch.x === 'number') return touch.x;
    return 0;
};

/** 获取触摸点 Y 坐标（兼容 APP / H5） */
export const getTouchY = (touch: UniTouch | undefined | null): number => {
    if (!touch) return 0;
    // #ifdef APP
    if (typeof touch.y === 'number') return touch.y;
    // #endif
    if (typeof touch.pageY === 'number') return touch.pageY;
    if (typeof touch.y === 'number') return touch.y;
    return 0;
};

/**
 * 将 touches / changedTouches 转为标准数组
 * APP 端返回类对象（无 length），H5/MP 端返回类数组
 */
export const toTouchArray = (
    touches: UniTouchEvent['touches'] | UniTouchEvent['changedTouches'] | undefined | null
): UniTouch[] => {
    if (!touches) return [];
    if (typeof touches.length !== 'number') {
        return Object.keys(touches)
            .filter(k => !isNaN(Number(k)))
            .map(k => (touches as any)[k])
            .filter(Boolean) as UniTouch[];
    }
    return Array.from({ length: touches.length }, (_, index) => touches[index]).filter(Boolean) as UniTouch[];
};

/** 获取触摸点唯一标识（优先 identifier，回退 index） */
export const getTouchIdentifier = (touch: UniTouch | undefined | null, index: number): number | string => {
    if (touch && typeof touch.identifier === 'number') return touch.identifier;
    return `touch-${index}`;
};

/** 计算两指之间的距离 */
export const getTouchDistance = (touches: UniTouch[]): number => {
    if (touches.length < 2) return 0;
    const dx = getTouchX(touches[0]) - getTouchX(touches[1]);
    const dy = getTouchY(touches[0]) - getTouchY(touches[1]);
    return Math.sqrt(dx * dx + dy * dy);
};

/** 计算两指中心坐标 */
export const getTouchCenter = (touches: UniTouch[]): { x: number; y: number } => {
    if (touches.length < 2) {
        return { x: getTouchX(touches[0]), y: getTouchY(touches[0]) };
    }
    return {
        x: (getTouchX(touches[0]) + getTouchX(touches[1])) / 2,
        y: (getTouchY(touches[0]) + getTouchY(touches[1])) / 2,
    };
};

/**
 * 将触摸点转为 canvas 内部本地坐标
 * APP 端 touch.x/y 已是本地坐标；H5 端需减去 bounding rect
 */
export const getTouchLocalPoint = (
    touch: UniTouch | undefined | null,
    rect?: { left?: number; top?: number } | null
): { x: number; y: number } => {
    if (!touch) return { x: 0, y: 0 };
    if (typeof touch.x === 'number' && typeof touch.y === 'number') {
        return { x: touch.x, y: touch.y };
    }
    return {
        x: getTouchX(touch) - (rect?.left ?? 0),
        y: getTouchY(touch) - (rect?.top ?? 0),
    };
};
