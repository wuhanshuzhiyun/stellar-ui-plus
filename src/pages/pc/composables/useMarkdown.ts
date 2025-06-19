import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { components, rests } from '../markdown/index';
import type { Group, MarkdownData } from '../types';
import { btnCopy, btnDebug, scrollToView, setCodePartActive } from '../markdown/utils';

export default function useMarkdown(): MarkdownData {
    const active = ref<string>('handbook-介绍');
    const contents = ref<Group[]>(rests);
    const isComponent = computed(() => !active.value.includes('handbook') && !active.value.includes('devGuide'));

    // 绑定操作事件
    const bindActions = () => {
        nextTick(() => {
            document.querySelectorAll<HTMLPreElement>('.markdown-view > pre').forEach(pre => {
                const copyEle = pre.querySelector<HTMLButtonElement>('.btn.copy');
                if (copyEle) {
                    copyEle.onclick = () => btnCopy(copyEle);
                }

                const debugEle = pre.querySelector<HTMLButtonElement>('.btn.debug');
                if (debugEle) {
                    debugEle.onclick = () => btnDebug(debugEle);
                }

                pre.querySelectorAll<HTMLElement>('.tag').forEach(tag => {
                    tag.onclick = () => setCodePartActive(tag?.getAttribute('content'), pre);
                });
            });

            const as = document.querySelectorAll<HTMLAnchorElement>('a.header-anchor');
            as.forEach(a => (a.onclick = e => scrollToView(e, a)));
        });
    };

    const setActive = (value: string) => {
        window.history.pushState(null, '', `#/?active=${value}`);

        active.value = value;
        const d = document.querySelector('.pc-page-body>.content>.right');
        if (d) d.scrollTop = 0;
        bindActions();
    };

    watch(
        () => uni.getLaunchOptionsSync().query,
        v => {
            if (v.active) {
                if (v.active.includes('handbook')) {
                    // 开发指南
                    contents.value = rests;
                } else {
                    // 组件
                    contents.value = components;
                }

                setActive(v.active as string);
            }
        },
        { immediate: true }
    );

    onMounted(() => {
        bindActions();
    });

    const h5url = computed(() => {
        if (active.value.includes('handbook') || active.value.includes('devGuide')) {
            if (active.value.includes('自定义主题')) {
                // 自定义主题打开小程序
                return '#/pages/mp/color/color';
            } else if (active.value.includes('个性化')) {
                return '#/pages/mp/font-size/font-size';
            }
            return '#/pages/mp/index';
        } else if (active.value.indexOf('page_') === 0) {
            const name = active.value.replace('page_', '');
            return `#/subPackages_pages_view/${name}/${name}`;
        } else {
            return `#/subPackages_demo_view/${active.value}/${active.value}`;
        }
    });

    const viewMarkdown = computed(() => {
        const targetGroup = contents.value.find(group => group.contents.some(item => item.key === active.value));
        if (!targetGroup) return { html: '', key: '', name: '', sort: 999 };

        return targetGroup.contents.find(item => item.key === active.value) || { html: '', key: '', name: '', sort: 999 };
    });

    return {
        contents,
        viewMarkdown,
        isComponent,
        active,
        setActive,
        h5url,
    };
}
