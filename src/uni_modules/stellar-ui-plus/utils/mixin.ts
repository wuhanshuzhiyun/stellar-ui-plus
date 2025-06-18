import { computed, getCurrentInstance, inject, markRaw, onUnmounted, provide, ref, shallowReactive } from 'vue';
import type { ComponentInternalInstance, ConcreteComponent, InjectionKey, VNode, VNodeNormalizedChildren } from 'vue';
import type { Obj } from '../types';

export interface SelfComponentInternalInstance extends ComponentInternalInstance {
    selfValue?: Obj;
}

type ParentProvide<T> = T & {
    add(child: SelfComponentInternalInstance): void;
    remove(child: SelfComponentInternalInstance): void;
    internalChildren: SelfComponentInternalInstance[];
};

export function useInject<T>(key: InjectionKey<ParentProvide<T>>, selfValue: Obj = {}) {
    const parent = inject(key, null);
    if (parent) {
        const instance: SelfComponentInternalInstance = getCurrentInstance()!;
        const { add, remove, internalChildren } = parent;

        if (instance) instance.selfValue = selfValue;

        add(instance);
        onUnmounted(() => remove(instance));

        const index = computed(() => internalChildren.indexOf(instance));

        return {
            parent,
            index,
            instance,
        };
    }

    return {
        parent: null,
        index: ref(-1),
        instance: null,
    };
}

// TODO: uniapp 不支持 vue 直接导出的 isVNode
export function isVNode(value: any): value is VNode {
    return value ? value.__v_isVNode === true : false;
}

export function flattenVNodes(shouldTraverseChildren: VNodeNormalizedChildren, childName?: string) {
    const result: VNode[] = [];

    const traverse = (children: VNodeNormalizedChildren) => {
        if (!Array.isArray(children)) return;
        children.forEach(child => {
            if (!isVNode(child)) return;

            if (childName) {
                if (child.type && (child.type as ConcreteComponent).name === childName) {
                    result.push(child);
                    return;
                }
            } else {
                result.push(child);
            }

            if (child.component?.subTree) traverse(child.component.subTree.children);

            if (child.children) traverse(child.children);
        });
    };

    traverse(shouldTraverseChildren);

    return result;
}

export function sortChildren(parent: SelfComponentInternalInstance, internalChildren: SelfComponentInternalInstance[], childName?: string) {
    const vnodes = flattenVNodes(parent && parent.subTree && parent.subTree.children, childName);
    internalChildren.sort((a, b) => {
        return vnodes.indexOf(a.vnode) - vnodes.indexOf(b.vnode);
    });
}

// 如果指定组件名称，则只查找此组件并且查到后结束。也就是不关心此组件下的内容，在大部分场景下节省查找消耗。
export function useProvide<ProvideValue>(key: InjectionKey<ProvideValue>, childName?: string) {
    const internalChildren: SelfComponentInternalInstance[] = shallowReactive([]);
    const publicChildren = shallowReactive<any[]>([]);
    const parent = getCurrentInstance()!;

    const add = (child: SelfComponentInternalInstance) => {
        if (!child.proxy) return;
        internalChildren.push(markRaw(child));
        publicChildren.push(markRaw(child.proxy));
        sortChildren(parent, internalChildren, childName);
    };

    const remove = (child: SelfComponentInternalInstance) => {
        if (child.proxy) {
            internalChildren.splice(internalChildren.indexOf(markRaw(child)), 1);
            publicChildren.splice(publicChildren.indexOf(markRaw(child.proxy)), 1);
        }
    };

    return (value?: ProvideValue) => {
        provide(key, {
            add,
            remove,
            internalChildren,
            ...value,
        } as any);

        return {
            internalChildren,
            children: publicChildren,
        };
    };
}

/**
 * 创建组件options
 * @param name 组件名
 * @param customOptions 自定义配置
 * @returns
 */
export const createOptions = (name: string, customOptions: Record<string, any> = {}) => ({
    name,
    options: {
        // 抖音小程序兼容
        // #ifndef MP-TOUTIAO
        virtualHost: true,
        // #endif

        // 通用配置
        multipleSlots: true,

        // 合并自定义配置
        ...customOptions,
    },
});
