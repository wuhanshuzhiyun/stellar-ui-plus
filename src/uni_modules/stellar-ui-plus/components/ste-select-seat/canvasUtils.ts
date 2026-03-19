/**
 * Canvas 绘制工具函数（纯函数，无外部依赖）
 */

/**
 * 绘制圆角矩形路径（不填充/描边，需调用方自行 fill/stroke）
 */
export const drawRoundRect = (ctx: any, x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
};

/**
 * 在指定中心点绘制勾选标记（stroke）
 * 视觉上尽量贴近 ste-radio 里的选中 icon，但保持纯 Canvas path，
 * 避免依赖 iconfont 在各端 Canvas 中的字体加载能力。
 * @param cx 中心 x
 * @param cy 中心 y
 * @param size 座位宽度，用于计算线宽与比例
 * @param color 线条颜色
 */
export const drawCheck = (ctx: any, cx: number, cy: number, size: number, color: string) => {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1.4, size * 0.1);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const s = size * 0.34;
    ctx.moveTo(cx - s * 0.62, cy - s * 0.02);
    ctx.lineTo(cx - s * 0.14, cy + s * 0.42);
    ctx.lineTo(cx + s * 0.62, cy - s * 0.36);
    ctx.stroke();
};
