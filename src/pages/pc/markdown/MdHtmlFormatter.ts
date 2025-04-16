interface VueComponentParts extends Record<string, string | undefined> {
    template?: string;
    script?: string;
    style?: string;
}

// 按钮配置接口
interface CodeButton {
    type: string;
    label: string;
    iconSrc: string;
}

// 格式化器配置接口
interface MdFormatterOptions {
    enableDebugButton?: boolean;
    codeBtnArr?: CodeButton[];
}

// 默认按钮配置
const DEFAULT_CODE_BUTTONS: CodeButton[] = [
    {
        type: 'debug',
        label: 'stackblitz',
        iconSrc: 'https://image.whzb.com/chain/StellarUI/image/debug.png',
    },
    {
        type: 'copy',
        label: '复制',
        iconSrc: 'https://image.whzb.com/chain/StellarUI/image/copy.png',
    },
];

/**
 * MD HTML 格式化器
 * 用于处理从 Markdown 转换的 HTML 内容
 */
export class MdHtmlFormatter {
    private parser: DOMParser;
    private doc: Document;
    private options: MdFormatterOptions;

    /**
     * 创建一个新的 MD HTML 格式化器
     * @param html 要格式化的 HTML 字符串
     * @param options 格式化选项
     */
    constructor(html: string, options: MdFormatterOptions = {}) {
        this.parser = new DOMParser();
        this.doc = this.parser.parseFromString(html, 'text/html');
        this.options = {
            enableDebugButton: true,
            codeBtnArr: DEFAULT_CODE_BUTTONS,
            ...options,
        };
    }

    /**
     * 执行格式化并返回结果 HTML
     */
    format(): string {
        this.processCodeBlocks();
        this.processTables();
        this.processHeaders();

        return this.doc.body.innerHTML;
    }

    /**
     * 处理文档中的代码块
     */
    private processCodeBlocks(): void {
        const pres = this.doc.querySelectorAll('body>pre');

        pres.forEach(pre => {
            const codedom = pre.querySelector('code');
            if (!codedom) return;

            const codeContent = codedom.textContent;
            if (!codeContent) return;
            // 解析 Vue 组件代码（只解析一次）
            const codeObj = this.parseVueComponent(codeContent);

            if (this.options.enableDebugButton && !codeObj.code && codedom.classList.contains('language-html')) {
                // 隐藏原始代码元素
                codedom.style.display = 'none';

                // 创建代码组和按钮
                this.createCodeGroups(pre, codeObj);
            } else {
                const codeBoxDiv = document.createElement('div');
                codeBoxDiv.classList.add('code-body-box');
                codedom.classList.add('hljs', 'active');
                codeBoxDiv.appendChild(codedom);
                pre.appendChild(codeBoxDiv);
            }
            this.addCodeButtons(pre, codeContent, codeObj);
        });
    }

    /**
     * 解析 Vue 组件代码，分离不同部分
     */
    private parseVueComponent(code: string): VueComponentParts {
        if (!code) return {} as VueComponentParts;

        // 创建结果对象
        const result: VueComponentParts = {
            template: '',
            script: '',
            style: '',
        };

        // 定义辅助函数来提取完整标签
        function extractTag(tag: string, code: string): string {
            const startTag = `<${tag}`;
            const endTag = `</${tag}>`;

            // 查找开始标签的位置
            const startPos = code.indexOf(startTag);
            if (startPos === -1) return '';

            // 查找最后一个结束标签的位置
            const endPos = code.lastIndexOf(endTag) + endTag.length;
            if (endPos === -1 + endTag.length) return ''; // 如果找不到结束标签

            // 返回完整的标签内容，包括开始和结束标签
            return code.substring(startPos, endPos);
        }

        // 提取各部分
        result.template = extractTag('template', code);
        result.script = extractTag('script', code);
        result.style = extractTag('style', code);

        if (!result.template && !result.script && !result.style) {
            result.code = code; // 如果没有任何部分，保留原始代码
        }
        return result;
    }

    /**
     * 创建代码组 UI
     */
    private createCodeGroups(codeEle: Element, codeObj: VueComponentParts): void {
        const codeBoxDiv = document.createElement('div');
        codeBoxDiv.classList.add('code-body-box');

        const tagBoxDiv = document.createElement('div');
        tagBoxDiv.classList.add('tag-container');

        // 为每个代码部分创建标签和代码区域
        Object.entries(codeObj).forEach(([key, value]) => {
            if (!value) return;

            // 创建代码区域
            const ele = document.createElement('code');
            if (key === 'template') ele.classList.add('active');
            ele.classList.add('hljs', `language-html`, key);
            ele.textContent = value;
            codeBoxDiv.appendChild(ele);

            // 创建标签
            const tagDiv = document.createElement('div');
            tagDiv.setAttribute('content', key);
            tagDiv.classList.add('tag', key);
            if (key === 'template') tagDiv.classList.add('active');
            tagDiv.textContent = key;
            tagBoxDiv.appendChild(tagDiv);
        });

        codeEle.appendChild(tagBoxDiv);
        codeEle.appendChild(codeBoxDiv);
    }

    /**
     * 添加代码操作按钮
     */
    private addCodeButtons(codeEle: Element, codeContent: string, codeObj: VueComponentParts): void {
        // 按钮盒子
        const btnDiv = document.createElement('div');
        btnDiv.classList.add('btn-box');
        btnDiv.setAttribute('content', codeContent);

        // 添加按钮
        (this.options.codeBtnArr ?? DEFAULT_CODE_BUTTONS).forEach(btn => {
            // 根据配置决定是否添加 debug 按钮
            if (btn.type === 'debug' && (!this.options.enableDebugButton || codeObj.code)) return;

            const tipDiv = document.createElement('div');
            tipDiv.classList.add('tip');
            tipDiv.innerHTML = btn.label;

            const btnEle = document.createElement('a');
            btnEle.classList.add('btn', btn.type);

            const iconImg = document.createElement('img');
            iconImg.src = btn.iconSrc;
            iconImg.classList.add('img');

            btnEle.appendChild(iconImg);
            btnEle.appendChild(tipDiv);

            btnDiv.appendChild(btnEle);
        });

        // 添加按钮盒子
        codeEle.appendChild(btnDiv);
    }

    /**
     * 处理表格
     */
    private processTables(): void {
        const tables = this.doc.querySelectorAll('table');
        tables.forEach(table => {
            table.setAttribute('border', '1');
        });
    }

    /**
     * 处理标题，添加锚点可点击跳转
     */
    private processHeaders(): void {
        const headers = this.doc.querySelectorAll('h2, h3, h4');
        headers.forEach(header => {
            // 获取纯文本内容
            const slug = header.textContent || '';

            // 创建锚点链接
            const anchor = document.createElement('a');
            anchor.href = `#${slug}`;
            anchor.className = 'header-anchor';
            anchor.setAttribute('aria-hidden', 'true');
            anchor.textContent = '#';

            // 设置标题 ID
            header.id = slug;

            // 创建包装容器
            const wrapper = document.createElement('div');
            wrapper.className = 'header-anchor-wrapper';
            wrapper.style.position = 'relative';

            // 将标题移动到包装容器中
            header.parentNode?.insertBefore(wrapper, header);
            wrapper.appendChild(header);

            // 在标题内容后添加锚点链接
            header.appendChild(document.createTextNode(' '));
            header.appendChild(anchor);
        });
    }
}

/**
 * 格式化 MD 转换的 HTML
 * @param html HTML 字符串
 * @param options 格式化选项
 * @returns 格式化后的 HTML 字符串
 */
export function formatHtml(html: string, options: MdFormatterOptions = {}): string {
    const formatter = new MdHtmlFormatter(html, options);
    return formatter.format();
}

// 使用示例：
// const formattedHtml = formatHtml(html, { enableDebugButton: true });
