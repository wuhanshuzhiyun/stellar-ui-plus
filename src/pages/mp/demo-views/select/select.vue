<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { SelectOption, SelectValue } from '@/uni_modules/stellar-ui-plus/components/ste-select/props';
const listAll = [
    { label: '选项211', value: 211 },
    { label: '选项212', value: 212 },
    { label: '选项213', value: 213 },
    { label: '选项214', value: 214 },
    { label: '选项215', value: 215 },
    { label: '选项216', value: 216 },
    { label: '选项217', value: 217 },
    { label: '选项218', value: 218 },
    { label: '选项219', value: 219 },
    { label: '选项220', value: 220 },
    { label: '选项221', value: 221 },
    { label: '选项222', value: 222 },
    { label: '选项223', value: 223 },
    { label: '选项224', value: 224 },
    { label: '选项225', value: 225 },
    { label: '选项226', value: 226 },
    { label: '选项227', value: 227 },
    { label: '选项228', value: 228 },
    { label: '选项229', value: 229 },
    { label: '选项230', value: 230 },
    { label: '选项231', value: 231 },
    { label: '选项232', value: 232 },
    { label: '选项233', value: 233 },
    { label: '选项234', value: 234 },
    { label: '选项235', value: 235 },
    { label: '选项236', value: 236 },
    { label: '选项237', value: 237 },
    { label: '选项238', value: 238 },
    { label: '选项239', value: 239 },
    { label: '选项240', value: 240 },
    { label: '选项241', value: 241 },
    { label: '选项242', value: 242 },
    { label: '选项243', value: 243 },
    { label: '选项244', value: 244 },
    { label: '选项245', value: 245 },
    { label: '选项246', value: 246 },
    { label: '选项247', value: 247 },
    { label: '选项248', value: 248 },
    { label: '选项249', value: 249 },
    { label: '选项250', value: 250 },
    { label: '选项251', value: 251 },
];

const value1 = ref(null);
const value2 = ref([]);
const value3 = ref([]);
const value4 = ref([]);
const value5 = ref([]);

const list1 = [
    { label: '选项2011', value: 2011 },
    { label: '选项2012', value: 2012 },
    { label: '选项2013', value: 2013 },
    { label: '选项2014', value: 2014 },
    { label: '选项2015', value: 2015 },
    { label: '选项2016', value: 2016 },
    { label: '选项2017', value: 2017 },
    { label: '选项2018', value: 2018 },
    { label: '选项2019', value: 2019 },
];

const list3 = [
    [
        { label: '选项1-1', value: 11 },
        { label: '选项1-2', value: 22 },
    ],
    [
        { label: '选项2-1', value: 21 },
        { label: '选项2-2', value: 22 },
    ],
];

const list4 = [
    {
        label: '湖北',
        value: 1,
        children: [
            { label: '武汉', value: 11 },
            { label: '荆州', value: 12 },
        ],
    },
    {
        label: '湖南',
        value: 2,
        children: [
            { label: '长沙', value: 21 },
            { label: '株洲', value: 22 },
        ],
    },
];

const list6 = ref<{ label: string; value: number }[]>([]);
const loading6 = ref(false);
const time6 = ref(0);

const pageSize = ref(10);
const list7 = ref<{ label: string; value: number }[]>([]);
const loading7 = ref(false);

const onChange = (val: SelectValue, option: SelectOption) => {
    console.log('onChange', val, option);
};

const onInputFilterable = (v: string) => {
    // 防抖
    clearTimeout(time6.value);
    time6.value = setTimeout(() => {
        console.log('?????????????', v);
        if (loading6.value) return;
        loading6.value = true;
        // 模拟远程搜索
        setTimeout(() => {
            loading6.value = false;
            console.log(v);
            if (v) {
                list6.value = listAll.filter(item => item.label.indexOf(v) !== -1);
            } else {
                list6.value = listAll.map(item => item);
            }
            console.log(list6.value);
        }, 1000);
    }, 500);
};

const getList7 = () => {
    if (loading7.value) return;
    loading7.value = true;
    // 模拟远程请求
    setTimeout(() => {
        loading7.value = false;
        const newData = Array.from({ length: pageSize.value }).map((_, i) => {
            const value = list7.value.length + i + 1;
            return { label: `选项${value}`, value };
        });
        list7.value = [...list7.value, ...newData];
    }, 1000);
};
onMounted(getList7);
const loadMore = () => {
    console.log('触底了');
    getList7();
};
</script>
<template>
    <page-layout title="选择框">
        <view class="description">
            <view class="cmp-name">Select 下拉选</view>
            <view class="cmp-desc">当选项过多时，使用下拉菜单展示并选择内容。</view>
        </view>
        <view class="type-block">
            <view>01 组件类型</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <ste-select :list="list1" v-model="value1" @change="onChange"></ste-select>
        </view>
        <view class="demo-item">
            <view class="title">多选</view>
            <ste-select :list="list1" multiple v-model="value2" @change="onChange"></ste-select>
        </view>
        <view class="demo-item">
            <view class="title">多列选择</view>
            <ste-select :list="list3" v-model="value3" @change="onChange"></ste-select>
        </view>
        <view class="demo-item">
            <view class="title">树形选择</view>
            <ste-select mode="tree" :list="list4" @change="onChange"></ste-select>
        </view>
        <view class="demo-item">
            <view class="title">日期选择</view>
            <ste-select mode="date" @change="onChange"></ste-select>
        </view>
        <view class="demo-item">
            <view class="title">时间选择</view>
            <ste-select mode="time" @change="onChange"></ste-select>
        </view>
        <view class="demo-item">
            <view class="title">年月选择</view>
            <ste-select mode="month" @change="onChange"></ste-select>
        </view>
        <view class="demo-item">
            <view class="title">时分选择</view>
            <ste-select mode="minute" @change="onChange"></ste-select>
        </view>
        <view class="demo-item">
            <view class="title">日期时间选择</view>
            <ste-select mode="datetime" @change="onChange"></ste-select>
        </view>
        <view class="demo-item">
            <view class="title">搜索</view>
            <ste-select :list="list1" mode="filterable" @change="onChange"></ste-select>
        </view>
        <view class="demo-item">
            <view class="title">创建条目</view>
            <ste-select :list="list1" mode="filterable" allowCreate @change="onChange"></ste-select>
        </view>
        <view class="type-block">
            <view>02 组件自定义</view>
        </view>
        <view class="demo-item">
            <view class="title">远程搜索</view>
            <ste-select :list="list6" mode="filterable" :autoFilterable="false" :loading="loading6" @inputFilterable="onInputFilterable"></ste-select>
        </view>
        <view class="demo-item">
            <view class="title">分页</view>
            <ste-select :list="list7" :loading="loading7" :pageSize="pageSize" @loadMore="loadMore"></ste-select>
        </view>
        <view class="demo-item">
            <view class="title">自定义图标</view>
            <ste-select :list="list1">
                <template v-slot:icon>
                    <ste-icon code="&#xe699;"></ste-icon>
                </template>
            </ste-select>
        </view>
    </page-layout>
</template>
<style lang="scss" scoped>
.page {
    .content {
        .demo-item {
            .item-block {
            }
        }
    }
}
</style>
