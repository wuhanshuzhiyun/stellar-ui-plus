<script setup lang="ts">
import { inject } from 'vue';
import type { MarkdownData } from '../types.d.ts';

const datas = inject<MarkdownData>('datas');
</script>

<template>
    <div class="left-component">
        <div v-for="(group, index) in datas?.contents.value" :key="index" class="left-group">
            <div class="left-group-title">
                {{ group.group }}
            </div>
            <div class="left-group-contents">
                <div v-for="(item, i) in group.contents" :key="i" class="left-group-item" :class="{ active: datas?.active.value === item.key }" @click="datas?.setActive(item.key)">
                    <div class="name">
                        {{ item.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.left-component {
    padding: 48px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    border-right: 1px solid #ddd;
    background-color: #fff;

    z-index: 1;
    background-color: #ffffff;

    .left-group-title:not(:first-child) {
        padding-top: 0;
    }

    .left-group-title {
        font-weight: bold;
        font-size: 16px;
        padding: 24px 0 0 8px;
        line-height: 28px;
    }

    .left-group-contents {
        .left-group-item {
            border-radius: 8px;
            font-size: 14px;
            color: #666;
            cursor: pointer;

            .name {
                padding: 10px 16px;
                margin: 4px 0;
                font-size: 13px;
                line-height: 20px;
                color: #606266;
            }

            &:hover {
                background-color: #f2f4f7;

                .name {
                    color: var(--pc-main-color);
                }
            }

            &.active {
                background: rgba(64, 158, 255, 0.1);
                font-weight: bold;

                .name {
                    color: var(--pc-main-color);
                }
            }
        }
    }
}
</style>
