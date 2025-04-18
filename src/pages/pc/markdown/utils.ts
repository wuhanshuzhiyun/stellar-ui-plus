import onlinePreview from '../../../common/stackblitz';

// 锚点跳转事件
export function scrollToView($event: Event, ele: HTMLAnchorElement) {
    // #ifdef WEB
    $event.preventDefault();
    if (ele) ele.scrollIntoView({ behavior: 'smooth' });

    // #ifdef WEB
}
// 代码复制事件
export function btnCopy(btn: HTMLButtonElement) {
    const code = btn.parentElement?.getAttribute('content');
    if (!code) {
        console.error('没有找到复制的内容');
        return;
    }
    if (btn.innerHTML === '复制成功') return;

    uni.setClipboardData({
        data: code,
        showToast: false,
        success: () => {
            uni.showToast({ title: '复制成功', icon: 'success' });
        },
        fail: () => {
            uni.showToast({ title: '复制失败', icon: 'fail' });
        },
    });
}
// 代码在线调试
export function btnDebug(btn: HTMLButtonElement) {
    const code = btn.parentElement?.getAttribute('content');
    onlinePreview(code || '');
}

export function setCodePartActive(partName: string | null, partEle: HTMLElement) {
    if (!partName) return;
    partEle.querySelectorAll<HTMLElement>('.tag').forEach(tag => {
        tag.classList.remove('active');
    });
    partEle.querySelector('.tag.' + partName)?.classList.add('active');

    partEle.querySelectorAll<HTMLElement>('.code-body-box .hljs.language-html').forEach(part => {
        part.classList.remove('active');
    });
    partEle.querySelector('.code-body-box .hljs.language-html.' + partName)?.classList.add('active');
}
