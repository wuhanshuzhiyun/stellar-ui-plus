import type { ComponentPublicInstance } from 'vue';
import { nextTick } from 'vue';
import utils from '../../utils/utils';
import type { FilterItem } from './type';

/**
 * 滚动位置计算工具类
 */
export class ScrollCalculator {
    private instance: ComponentPublicInstance;
    private filtersData: FilterItem[];

    constructor(instance: ComponentPublicInstance, filtersData: FilterItem[]) {
        this.instance = instance;
        this.filtersData = filtersData;
    }

    /**
     * 计算各项标题的位置偏移
     */
    async calculateItemOffsets(retryCount = 0): Promise<number[]> {
        const maxRetries = 3;

        try {
            await nextTick();

            // 等待DOM完全渲染
            await this.waitForNextFrame();

            const offsets: number[] = [];
            let hasValidOffsets = true;

            const scrollContainer = await utils.querySelector<false>('.menu-items', this.instance);
            if (!scrollContainer || !scrollContainer.top) {
                throw new Error('滚动容器未找到');
            }

            const containerTop = scrollContainer.top;

            // 批量获取所有标题位置
            for (let i = 0; i < this.filtersData.length; i++) {
                try {
                    const titleRect = await utils.querySelector<false>(`.menu-item-block:nth-child(${i + 1}) .menu-item-title`, this.instance);

                    if (titleRect && typeof titleRect.top === 'number' && titleRect.top > 0) {
                        offsets[i] = titleRect.top - containerTop;
                    } else {
                        hasValidOffsets = false;
                        break;
                    }
                } catch (error) {
                    hasValidOffsets = false;
                    break;
                }
            }

            // 重试逻辑
            if (!hasValidOffsets && retryCount < maxRetries) {
                // console.warn(`位置计算失败，第${retryCount + 1}次重试`);
                await this.delay(100 * (retryCount + 1));
                return this.calculateItemOffsets(retryCount + 1);
            }

            // 验证数据合理性
            if (hasValidOffsets && offsets.length === this.filtersData.length) {
                const isValidSequence = offsets.every((offset, index) => index === 0 || offset >= offsets[index - 1]);

                if (isValidSequence) {
                    // console.log('位置计算成功:', offsets);
                    return offsets;
                }
            }

            // 兜底方案
            // console.warn('使用兜底位置估算');
            return this.generateFallbackOffsets();
        } catch (error) {
            // console.error('位置计算失败:', error);
            return this.generateFallbackOffsets();
        }
    }

    /**
     * 等待下一帧
     */
    private waitForNextFrame(): Promise<void> {
        return new Promise(resolve => {
            // #ifdef H5
            requestAnimationFrame(() => resolve());
            // #endif
            // #ifndef H5
            setTimeout(() => resolve(), 16);
            // #endif
        });
    }

    /**
     * 延迟执行
     */
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 生成兜底位置数据
     */
    private generateFallbackOffsets(): number[] {
        return this.filtersData.map((_, index) => index * 120);
    }
}

/**
 * 滚动联动控制器
 */
export class ScrollController {
    private itemOffsets: number[] = [];
    private isScrollingToTarget = false;
    private lastManualClickTime = 0;
    private clickScrollTimer: any = null;

    constructor(
        private scrollTopRef: { value: number },
        private currentActiveIndexRef: { value: number },
        private categoryData: any[]
    ) {}

    /**
     * 更新位置偏移数据
     */
    updateOffsets(offsets: number[]) {
        this.itemOffsets = offsets;
    }

    /**
     * 滚动到指定索引位置
     */
    async scrollToIndex(index: number, calculator: ScrollCalculator) {
        this.lastManualClickTime = Date.now();
        this.isScrollingToTarget = true;

        try {
            // 确保位置数据有效
            if (this.itemOffsets.length === 0 || this.itemOffsets.every(offset => offset === 0)) {
                // console.log('重新计算位置偏移');
                this.itemOffsets = await calculator.calculateItemOffsets();
                await this.delay(50);
            }

            const targetOffset = this.itemOffsets[index] || 0;
            // console.log(`滚动到位置: ${targetOffset}, 目标索引: ${index}`);

            this.clearScrollTimer();

            // 添加偏移量确保标题完全可见
            const adjustedOffset = Math.max(0, targetOffset - 10);

            // 分两步设置滚动确保生效
            this.scrollTopRef.value = adjustedOffset;
            setTimeout(() => {
                this.scrollTopRef.value = adjustedOffset;
            }, 50);

            // 重置滚动标志
            this.clickScrollTimer = setTimeout(() => {
                this.isScrollingToTarget = false;
                // console.log('滚动标志重置');
            }, 1000);
        } catch (error) {
            // console.error('滚动失败:', error);
            this.isScrollingToTarget = false;
        }
    }

    /**
     * 处理滚动联动逻辑
     */
    handleScrollSync(currentScrollTop: number) {
        // 检查基础条件
        if (this.isScrollingToTarget) return;
        if (Date.now() - this.lastManualClickTime < 800) return;
        if (!this.itemOffsets.length) {
            // console.warn('位置数据无效，跳过滚动联动');
            return;
        }

        // 计算目标索引
        const targetIndex = this.calculateTargetIndex(currentScrollTop);

        // 更新激活状态
        if (this.currentActiveIndexRef.value !== targetIndex) {
            // console.log(`滚动联动: ${this.currentActiveIndexRef.value} -> ${targetIndex}, 位置: ${currentScrollTop}`);
            this.updateActiveCategory(targetIndex);
        }
    }

    /**
     * 计算目标索引
     */
    private calculateTargetIndex(scrollTop: number): number {
        const threshold = 50;

        for (let i = this.itemOffsets.length - 1; i >= 0; i--) {
            if (scrollTop >= this.itemOffsets[i] - threshold) {
                return i;
            }
        }
        return 0;
    }

    /**
     * 更新激活分类
     */
    private updateActiveCategory(targetIndex: number) {
        this.categoryData.forEach((item, i) => {
            item.active = i === targetIndex;
        });
        this.currentActiveIndexRef.value = targetIndex;
    }

    /**
     * 清理定时器
     */
    private clearScrollTimer() {
        if (this.clickScrollTimer) {
            clearTimeout(this.clickScrollTimer);
        }
    }

    /**
     * 延迟执行
     */
    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * 组件销毁时清理
     */
    destroy() {
        this.clearScrollTimer();
    }
}

/**
 * 初始化管理器
 */
export class InitializationManager {
    constructor(private calculator: ScrollCalculator) {}

    /**
     * 多次尝试计算位置，确保准确性
     */
    async initializeOffsets() {
        const delays = [100, 300, 500];

        for (const delay of delays) {
            utils.debounce(() => this.calculator.calculateItemOffsets(), { delay })();
        }
    }

    /**
     * 菜单显示时的初始化
     */
    async initializeOnMenuShow() {
        await nextTick();
        const delays = [50, 200, 500];

        for (const delay of delays) {
            utils.debounce(() => this.calculator.calculateItemOffsets(), { delay })();
        }
    }
}

/**
 * 事件处理器工厂
 */
export class EventHandlerFactory {
    static createScrollHandler(controller: ScrollController, filterType: string) {
        return (event: any) => {
            if (filterType === 'checkbox') return;

            const currentScrollTop = event.detail?.scrollTop || event.target?.scrollTop || 0;

            // 使用防抖处理滚动事件
            utils.debounce(() => controller.handleScrollSync(currentScrollTop), { delay: 150 })();
        };
    }

    static createCategoryClickHandler(controller: ScrollController, calculator: ScrollCalculator, categoryData: any[], currentActiveIndex: { value: number }, filterType: string) {
        return (index: number) => {
            if (currentActiveIndex.value === index) return;

            // 使用节流防止频繁点击
            utils.thro(
                () => {
                    // 立即更新UI状态
                    categoryData.forEach((item, i) => {
                        item.active = i === index;
                    });
                    currentActiveIndex.value = index;

                    if (filterType === 'checkbox') return;

                    // 执行滚动
                    controller.scrollToIndex(index, calculator);
                },
                { delay: 200 }
            );
        };
    }

    static createResizeHandler(calculator: ScrollCalculator, showMenu: { value: boolean }) {
        return () => {
            if (showMenu.value) {
                utils.debounce(() => calculator.calculateItemOffsets(), { delay: 200 })();
            }
        };
    }
}
