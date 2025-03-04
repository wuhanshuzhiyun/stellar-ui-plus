import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { components, rests } from '../markdown/index';
import type { Group, MarkdownData } from '../types';
import { btnCopy, scrollToView } from '../markdown/requireFiles';

export default function useMarkdown(): MarkdownData {
    const active = ref<string>('handbook-介绍');
    const contents = ref<Group[]>(rests);
    const isComponent = computed(() => !active.value.includes('handbook') && !active.value.includes('devGuide'));

    const activeBtns = () => {
        nextTick(() => {
            const btns = document.querySelectorAll<HTMLButtonElement>('button.code-copy-button');
            btns.forEach(btn => (btn.onclick = () => btnCopy(btn)));

            const as = document.querySelectorAll<HTMLAnchorElement>('a.header-anchor');
            as.forEach(a => (a.onclick = e => scrollToView(e, a)));
        });
    };

    const setActive = (value: string) => {
        window.history.pushState(null, '', `#/?active=${value}`);

        active.value = value;
        const d = document.querySelector('.pc-page-body>.content>.right');
        if (d) d.scrollTop = 0;
        activeBtns();
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
        activeBtns();
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
        } else {
            return `#/pages/mp/demo-views/${active.value}/${active.value}`;
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
