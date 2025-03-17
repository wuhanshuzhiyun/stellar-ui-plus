<script lang="ts" setup>
import { ref } from 'vue';
const rows = ref([
    { name: '张三', birth: '2023.12.31', sex: '男', state: 1 },
    { name: '李四', birth: '2024.01.01', sex: '女', state: 2 },
    { name: '王五', birth: '2024.11.01', sex: '女', state: 1 },
    { name: '赵六', birth: '2024.11.01', sex: '女', state: 2 },
    { name: '王七', birth: '2024.01.01', sex: '男', state: 1 },
]);

const colorConfig = {
    main: '#077edb',
    disabled: '#E6E6E6',
    unSelected: '#bbbbbb',
    readonly: 'rgba(7, 126, 219, 0.4)',
};
</script>

<template>
    <view class="page">
        <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="测试"></page-nav>
        <view class="content">
            <view class="demo-item">
                <view class="title">测试</view>
                <view class="item-block">
                    <view>
                        <ste-icon code="&#xe689;" :size="60" :color="'#e1e'"></ste-icon>
                    </view>
                    <view style="width: 100%">
                        <ste-table :data="rows" :selectionIconColor="colorConfig">
                            <template v-slot="{ row }">
                                <ste-table-column label="选择" type="checkbox" align="center" customKey="checkbox"></ste-table-column>
                                <ste-table-column label="姓名" prop="name"></ste-table-column>
                                <ste-table-column label="生日" prop="birth"></ste-table-column>
                                <ste-table-column label="性别" prop="sex"></ste-table-column>
                            </template>
                        </ste-table>
                        <ste-table :data="rows" :selectionIconColor="colorConfig">
                            <template v-slot="{ row }">
                                <ste-table-column label="选择" type="radio" align="center" customKey="checkbox"></ste-table-column>
                                <ste-table-column label="姓名" prop="name"></ste-table-column>
                                <ste-table-column label="生日" prop="birth"></ste-table-column>
                                <ste-table-column label="性别" prop="sex"></ste-table-column>
                            </template>
                        </ste-table>
                    </view>

                    <view>
                        <ste-button :mode="100">你好</ste-button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.page {
    .content {
        .demo-item {
            .item-block {
                > view {
                    margin: 0 8px 8px 0;
                }
            }
        }
    }
}
</style>
