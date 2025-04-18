// test/setup.ts
import { vi } from 'vitest';

// 创建Canvas相关模拟
class MockCanvasRenderingContext2D {
    canvas: any;
    fillStyle: string = '#000000';
    strokeStyle: string = '#000000';
    lineWidth: number = 1;
    font: string = '10px sans-serif';
    textAlign: string = 'start';
    textBaseline: string = 'alphabetic';
    globalAlpha: number = 1.0;

    // 基本方法
    beginPath = vi.fn();
    closePath = vi.fn();
    moveTo = vi.fn();
    lineTo = vi.fn();
    bezierCurveTo = vi.fn();
    quadraticCurveTo = vi.fn();
    arc = vi.fn();
    arcTo = vi.fn();
    rect = vi.fn();
    fillRect = vi.fn();
    strokeRect = vi.fn();
    clearRect = vi.fn();
    fill = vi.fn();
    stroke = vi.fn();
    clip = vi.fn();
    isPointInPath = vi.fn().mockReturnValue(false);
    fillText = vi.fn();
    strokeText = vi.fn();
    measureText = vi.fn().mockReturnValue({ width: 0 });
    drawImage = vi.fn();
    createImageData = vi.fn().mockReturnValue({ width: 0, height: 0, data: new Uint8ClampedArray() });
    getImageData = vi.fn().mockReturnValue({ width: 0, height: 0, data: new Uint8ClampedArray() });
    putImageData = vi.fn();
    save = vi.fn();
    restore = vi.fn();
    scale = vi.fn();
    rotate = vi.fn();
    translate = vi.fn();
    transform = vi.fn();
    setTransform = vi.fn();

    constructor() {
        this.canvas = {};
    }
}

// 创建Canvas元素模拟
class MockHTMLCanvasElement extends HTMLElement {
    width: number = 300;
    height: number = 150;

    getContext = vi.fn().mockImplementation(contextType => {
        if (contextType === '2d') {
            return new MockCanvasRenderingContext2D();
        }
        return null;
    });

    toDataURL = vi.fn().mockReturnValue('data:image/png;base64,');
    toBlob = vi.fn();
}

// 创建动画对象的模拟实现
const createAnimationMock = () => {
    return {
        opacity: vi.fn().mockReturnThis(),
        scale: vi.fn().mockReturnThis(),
        step: vi.fn().mockReturnThis(),
        export: vi.fn().mockReturnValue({
            actions: [],
        }),
    };
};

// 创建uni-app API模拟对象
const createUniMock = () => {
    return {
        showToast: vi.fn(),
        hideToast: vi.fn(),
        showLoading: vi.fn().mockResolvedValue(undefined),
        hideLoading: vi.fn().mockResolvedValue(undefined),
        request: vi.fn().mockResolvedValue({ data: {} }),
        uploadFile: vi.fn().mockResolvedValue({ data: {} }),
        setStorage: vi.fn().mockResolvedValue(undefined),
        getStorage: vi.fn().mockResolvedValue({ data: {} }),
        removeStorage: vi.fn().mockResolvedValue(undefined),
        createAnimation: vi.fn().mockImplementation(createAnimationMock),
        createCanvasContext: vi.fn().mockImplementation(() => new MockCanvasRenderingContext2D()),
        canvasToTempFilePath: vi.fn().mockResolvedValue({ tempFilePath: 'mock/path/canvas.png' }),
        canvasPutImageData: vi.fn().mockResolvedValue({}),
        canvasGetImageData: vi.fn().mockResolvedValue({
            width: 0,
            height: 0,
            data: new Uint8ClampedArray(),
        }),
        createIntersectionObserver: vi.fn(),
        createVideoContext: vi.fn(),

        // 窗口事件
        onWindowResize: vi.fn().mockImplementation(callback => {
            (global as any).triggerWindowResize = () => {
                callback({ size: { windowWidth: 375, windowHeight: 667 } });
            };
            return () => {};
        }),
        offWindowResize: vi.fn(),

        // Vue 3 uni-app 特有的API
        getSystemInfo: vi.fn().mockResolvedValue({
            platform: 'android',
            screenWidth: 375,
            screenHeight: 667,
            windowWidth: 375,
            windowHeight: 667,
            statusBarHeight: 20,
            pixelRatio: 2,
        }),

        // 页面路由相关API
        navigateTo: vi.fn().mockResolvedValue(undefined),
        redirectTo: vi.fn().mockResolvedValue(undefined),
        switchTab: vi.fn().mockResolvedValue(undefined),
        navigateBack: vi.fn().mockResolvedValue(undefined),

        // 新增常用API
        getProvider: vi.fn().mockResolvedValue({ provider: ['weixin'] }),
        chooseImage: vi.fn().mockResolvedValue({
            tempFilePaths: ['mock/path/image.png'],
            tempFiles: [{ path: 'mock/path/image.png', size: 12345 }],
        }),

        // 额外的uni-app特定环境
        $scope: {
            $vm: null,
        },
        requireNativePlugin: vi.fn(),
        onNavigationBarButtonTap: vi.fn(),
        onPullDownRefresh: vi.fn(),
        stopPullDownRefresh: vi.fn(),
    };
};

// 注册到全局
(global as any).CanvasRenderingContext2D = MockCanvasRenderingContext2D;
(global as any).HTMLCanvasElement = MockHTMLCanvasElement;

// 创建模拟对象
const uniMock = createUniMock();

// 添加到全局
(global as any).uni = uniMock;
(global as any).getCurrentPages = vi.fn().mockReturnValue([{ $page: { fullPath: '/pages/index/index' } }]);

// Vue 3 Composition API 相关 mock
(global as any).getCurrentInstance = vi.fn().mockReturnValue({
    proxy: null,
    appContext: {
        config: {
            globalProperties: {
                uni: uniMock,
            },
        },
    },
});

export {};
