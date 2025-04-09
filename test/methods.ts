/***
 * 解析自定义字体
 * @param  {string} fontSize 自定义字体
 * @return {string} 解析后的字体
 */
export function fontSize(fontSize: string) {
    return Number(fontSize.split(',')[0].replace('var(--font-size-', '')) / 2 + 'px';
}
