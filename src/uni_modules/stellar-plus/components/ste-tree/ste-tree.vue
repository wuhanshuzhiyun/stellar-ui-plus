<script setup lang="ts">
import {} from 'vue';
import propsData, { type SteTreeProps } from './props';
import { type TreeNode } from '../../types/index';
import useData from './useData';

const props = defineProps(propsData);

const emits = defineEmits<{
    (e: 'click', node: TreeNode): void;
    (e: 'beforeOpen', node: TreeNode, suspend: () => void, next: (tree?: TreeNode[]) => void, stop: () => void): void;
    (e: 'open', node: TreeNode): void;
    (e: 'close', node: TreeNode): void;
}>();

const { init, viewList, cmpPaddingLeft, onClick, open, closeNode, onOpen, setDataSearchTitle } = useData({ props, emits });

defineExpose({
    init,
    open,
    close: closeNode,
    search: setDataSearchTitle,
});
</script>
<template>
    <view class="ste-tree-root">
        <view v-for="node in viewList" :key="node[valueKey]" class="tree-item" :class="{ open: node.open, children: node.hasChildren }">
            <view class="tree-item-content" :style="{ paddingLeft: `${node.depth * cmpPaddingLeft}px` }">
                <view class="tree-item-head" @click="onClick(node)">
                    <view class="tree-item-right">
                        <slot :node="node" :depth="node.depth">
                            <view class="tree-item-title">{{ node[titleKey] }}</view>
                        </slot>
                    </view>
                    <view class="tree-item-open" v-if="node.hasChildren" @click="onOpen(node)">
                        <slot name="open" :open="node.open">
                            <view class="open-icon">
                                <ste-icon code="&#xe678;" size="30" />
                            </view>
                        </slot>
                    </view>
                </view>
            </view>

            <view class="tree-item-loading" v-if="node.loading">
                <slot name="loading">
                    <ste-loading :size="30" />
                </slot>
            </view>
        </view>
    </view>
</template>
<style scoped lang="scss">
.ste-tree-root {
    width: 100%;
    background-color: #fff;

    .tree-item {
        width: 100%;

        &.open {
            & > .tree-item-content {
                .tree-item-head {
                    box-shadow: 0px 4rpx 10rpx 2rpx rgba(0, 0, 0, 0.04);

                    .tree-item-open .open-icon {
                        transform: rotate(180deg);
                    }
                }
            }

            & > .tree-children {
                display: block;
                margin: 8rpx 0;
            }
        }

        &.children {
            .tree-item-content {
                .tree-item-head {
                    margin-bottom: 8rpx;

                    .tree-item-right {
                        width: calc(100% - 70rpx);
                    }

                    .tree-item-open {
                        width: 70rpx;
                        height: 60rpx;
                        line-height: 30rpx;
                        padding: 15rpx 20rpx;
                        line-height: 30rpx;
                    }
                }
            }
        }

        .tree-item-content {
            width: 100%;

            .tree-item-head {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-family:
                    PingFang SC,
                    PingFang SC;
                font-weight: 500;
                font-size: 28rpx;
                color: #000000;

                .tree-item-right {
                    width: 100%;

                    .tree-item-title {
                        width: 100%;
                        height: 80rpx;
                        line-height: 80rpx;
                        padding-left: 20rpx;
                    }
                }
            }
        }

        .tree-item-loading {
            width: 100%;
            height: 80rpx;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .tree-children {
            display: none;
            width: 100%;
            padding-left: 40rpx;
        }
    }
}
</style>
