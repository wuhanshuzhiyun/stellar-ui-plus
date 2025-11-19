<script lang="ts" setup>
import { ref } from 'vue';
const rows = ref([
    { name: '张三', birth: '2023.12.31', sex: '男', state: 1, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },
    { name: '[测试复杂题型]测试时间区间', birth: '2024.01.01', sex: '女', state: 2, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },
    { name: '王五', birth: '2024.11.01', sex: '女', state: 1, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },
    { name: '赵六', birth: '2024.11.01', sex: '女', state: 2, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },
    { name: '王七', birth: '2024.01.01', sex: '男', state: 1, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },

    { name: '王五', birth: '2024.11.01', sex: '女', state: 1, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },
    { name: '赵六', birth: '2024.11.01', sex: '女', state: 2, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },
    { name: '王七', birth: '2024.01.01', sex: '男', state: 1, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },
    { name: '[测试复杂题型]测试时间区间', birth: '2024.01.01', sex: '女', state: 2, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },
    { name: '[测试复杂题型]测试时间区间', birth: '2024.01.01', sex: '女', state: 2, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },
    { name: '[测试复杂题型]测试时间区间', birth: '2024.01.01', sex: '女', state: 2, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },
    { name: '[测试复杂题型]测试时间区间', birth: '2024.01.01', sex: '女', state: 2, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },
    { name: '[测试复杂题型]测试时间区间', birth: '2024.01.01', sex: '女', state: 2, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },
    { name: '王七', birth: '2024.01.01', sex: '男', state: 1, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },
    { name: '王七', birth: '2024.01.01', sex: '男', state: 1, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },
    { name: '王七', birth: '2024.01.01', sex: '男', state: 1, remark: '1243123124sdfsdfadsg地方阿萨德发谁说的嘎达松冈祯丞V型出v' },
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
                        <scroll-view scroll-y height="500" class="scroll-view-box">
                            <ste-table :data="rows" :selectionIconColor="colorConfig" isPopover>
                                <template v-slot="{ row }">
                                    <ste-table-column label="选择" type="checkbox" align="center" customKey="checkbox"></ste-table-column>
                                    <ste-table-column label="姓名" prop="name" :width="100"></ste-table-column>
                                    <ste-table-column label="生日" prop="birth"></ste-table-column>
                                    <ste-table-column label="性别" prop="sex"></ste-table-column>
                                    <ste-table-column label="备注" prop="remark"></ste-table-column>
                                </template>
                            </ste-table>
                        </scroll-view>
                        <!-- <ste-table :data="rows" :selectionIconColor="colorConfig">
                            <template v-slot="{ row }">
                                <ste-table-column label="选择" type="radio" align="center" customKey="checkbox"></ste-table-column>
                                <ste-table-column label="姓名" prop="name"></ste-table-column>
                                <ste-table-column label="生日" prop="birth"></ste-table-column>
                                <ste-table-column label="性别" prop="sex"></ste-table-column>
                            </template>
                        </ste-table> -->
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

                .scroll-view-box {
                    height: 500rpx;
                }
            }
        }
    }
}
</style>
