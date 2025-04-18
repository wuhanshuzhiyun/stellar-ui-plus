/***
 * 解析自定义字体
 * @param  {string} fontSize 自定义字体大小
 * @return {string} 解析后的字体大小
 */
export function fontSize(fontSize: string) {
    return Number(fontSize.split(',')[0].replace('var(--font-size-', '')) / 2 + 'px';
}

/***
 * 解析icon的code
 * @param  {string} code icon的code
 * @return {string} 解析后的icon的code
 */
export function iconFormart(code) {
    return String.fromCharCode(Number(code.replace('&#', '0').replace(';', '')));
}
