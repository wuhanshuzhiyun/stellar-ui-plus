<script setup lang="ts">
import { ref, watch } from 'vue';
import config from '../../../uni_modules/stellar-ui-plus/config';
import { useToast } from '@/uni_modules/stellar-ui-plus/composables';
import { useMessageBox } from '@/uni_modules/stellar-ui-plus/composables';

const fontSize = ref<number>(config.options.fontScale * 10);
watch(
    () => fontSize.value,
    (v: number) => {
        config.options.fontScale = v / 10;
    }
);

const value1 = ref(null);
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

const fontSizeChange = (v: number | number[]) => {
    if (Array.isArray(v)) {
        fontSize.value = v[0];
    } else {
        fontSize.value = v;
    }
};

let checkBox = ref(false);

let radioBox = ref(false);

let rateBox = ref(2);

let stepperBox = ref(1);

let list = ref(['第一条:1111111111111111111111111111', '第二条:2222222222222222222222', '第三条:3333333333333']);

const active = ref(0);

function goToPrev() {
    if (active.value <= 0) return;
    active.value--;
}
const toast = useToast();
const showToast = () => {
    toast.showToast({
        title: '提示内容',
    });
};

let datetime = ref('');

const msg = useMessageBox();
const showMessageBox = () => {
    msg.showMsgBox({
        title: '确认删除订单吗？',
    });
};

const moreStr = ref(
    '浔阳江头夜送客，枫叶荻花秋瑟瑟。主人下马客在船，举酒欲饮无管弦。醉不成欢惨将别，别时茫茫江浸月。 忽闻水上琵琶声，主人忘归客不发。寻声暗问弹者谁，琵琶声停欲语迟。移船相近邀相见，添酒回灯重开宴。千呼万唤始出来，犹抱琵琶半遮面。凝绝不通声暂歇。悄无言，唯见江心秋月白。 沉吟放拨插弦中，整顿衣裳起敛容。自言本是京城女，家在虾蟆陵下住。十三学得琵琶成，名属教坊第一部。曲罢曾教善才服，妆成每被秋娘妒。五陵年少争缠头，一曲红绡不知数。钿头银篦击节碎，血色罗裙翻酒污。今年欢笑复明年，秋月春风等闲度。弟走从军阿姨死，暮去朝来颜色故'
);

const rows = ref([
    { name: '张三', birth: '2023.12.31', sex: '男' },
    { name: '李四', birth: '2024.01.01', sex: '女' },
    { name: '王五', birth: '2024.11.01', sex: '女' },
    { name: '赵六', birth: '2024.11.01', sex: '女' },
    { name: '王七', birth: '2024.01.01', sex: '男' },
]);

const menu1 = ref(1);
</script>
<template>
    <view data-test="font-size-page" :style="[config.rootStyle]">
        <ste-sticky>
            <page-nav :autoBack="true" backColor="#000" titleAlignment="2" title="字体大小配置"></page-nav>
            <view style="background-color: #fff; padding: 24rpx; display: flex; justify-content: center; border-bottom: 1px solid #eee">
                <ste-slider :value="fontSize" :min="5" :max="20" :step="1" @change="fontSizeChange" />
            </view>
        </ste-sticky>
        <view class="demo-content">
            <view class="badge">
                <ste-badge content="1">
                    <view class="avator"></view>
                </ste-badge>
            </view>
            <br />
            <br />
            <ste-icon code="&#xe684;" color="#ee0a24" :size="60"></ste-icon>
            <br />
            <br />
            <ste-image src="1111" width="200" height="200">
                <template v-slot:loading>Loading...</template>
                <template v-slot:error>Error</template>
            </ste-image>
            <br />
            <br />
            <ste-button>按钮</ste-button>
            <br />
            <br />
            <view style="width: 100%; height: 750rpx">
                <ste-calendar />
            </view>
            <br />
            <br />
            <ste-checkbox v-model="checkBox">复选框</ste-checkbox>
            <br />
            <br />
            <ste-code-input :maxlength="4"></ste-code-input>
            <br />
            <br />
            <ste-date-picker :value="datetime"></ste-date-picker>
            <br />
            <br />
            <ste-input value="测试" border borderColor="#f00"></ste-input>
            <br />
            <br />
            <ste-radio v-model="radioBox">单选框</ste-radio>
            <br />
            <br />
            <ste-rate v-model="rateBox"></ste-rate>
            <br />
            <br />
            <ste-search />
            <br />
            <br />
            <ste-select :list="list1" v-model="value1"></ste-select>
            <br />
            <br />
            <ste-stepper v-model="stepperBox"></ste-stepper>
            <br />
            <br />
            <ste-upload />
            <br />
            <br />
            <ste-button @click="showMessageBox">展示弹框</ste-button>
            <br />
            <br />
            <ste-notice-bar :list="list" direstte-notictical></ste-notice-bar>
            <br />
            <br />
            <ste-number-keyboard mode="page" />
            <br />
            <br />
            <ste-read-more>{{ moreStr }}</ste-read-more>
            <br />
            <br />
            <ste-steps :active="active" @clickStep="toToast">
                <ste-step></ste-step>
                <ste-step></ste-step>
                <ste-step></ste-step>
            </ste-steps>
            <br />
            <br />
            <ste-table :data="rows">
                <template v-slot="{ row }">
                    <ste-table-column label="姓名" prop="name"></ste-table-column>
                    <ste-table-column label="生日" prop="birth"></ste-table-column>
                    <ste-table-column label="性别" prop="sex"></ste-table-column>
                </template>
            </ste-table>
            <br />
            <br />
            <ste-button @click="showToast">展示轻提示</ste-button>
            <br />
            <br />
            <ste-video title="视频标题视频标题" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"></ste-video>
            <br />
            <br />
            <ste-dropdown-menu v-model="menu1">
                <ste-dropdown-menu-item value="1" title="全部商品" />
                <ste-dropdown-menu-item value="2" title="新款商品" />
                <ste-dropdown-menu-item value="3" title="活动商品" />
            </ste-dropdown-menu>
            <br />
            <br />
            <ste-price value="9527" />
            <br />
            <br />
            <ste-progress :percentage="40"></ste-progress>
        </view>
    </view>
</template>

<style lang="scss">
.demo-content {
    padding-top: 20rpx;
}
.badge {
    display: inline-block;

    .avator {
        height: 80rpx;
        width: 80rpx;
        border-radius: 8rpx;
        background-color: #f2f3f5;
    }
}
</style>
