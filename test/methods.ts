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

export function style2obj(el: any): { [key: string]: string } {
    const style = {};
    el.attributes()
        .style.split(';')
        .forEach(item => {
            const [key, value] = item.split(':');
            if (key && value) {
                style[key.trim()] = value.trim();
            }
        });
    Object.assign(style, window.getComputedStyle(el.element));
    return style;
}

/*RGB转换为16进制*/
export function colorRgbToHex(rgbStr: string) {
    //十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8}|[0-9a-fA-f]{6}[0-9]{2})$/;
    if (reg.test(rgbStr)) {
        return rgbStr;
    } else {
        const rgbArray = rgbStr.replace(/(?:\(|\)|rgba|rgb|RGBA|RGB)*/g, '').split(',');
        let strHex = '#';
        for (let i = 0; i < rgbArray.length; i++) {
            if (i !== 3) {
                if (rgbArray[i] == '0') {
                    strHex += '00';
                } else {
                    let newItem = Number(rgbArray[i]).toString(16);
                    if (newItem.length < 2) {
                        newItem = '0' + newItem;
                    }
                    strHex += newItem;
                }
            } else {
                strHex += rgbArray[i] == '0' ? '' : Number(rgbArray[i]) * 100;
            }
        }
        return strHex;
    }
}
