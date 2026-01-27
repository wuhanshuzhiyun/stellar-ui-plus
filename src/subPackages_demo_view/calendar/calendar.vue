<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useToast } from '@/uni_modules/stellar-ui-plus/composables';
import type { RefCalendar } from '@/uni_modules/stellar-ui-plus/types/refComponents';
import utils from '@/uni_modules/stellar-ui-plus/utils/utils';
import type { SignType } from '@/uni_modules/stellar-ui-plus/components/ste-calendar/date';
const show1 = ref(false);
const show2 = ref(false);
const show3 = ref(false);
const show4 = ref(false);
const show5 = ref(false);
const show6 = ref(false);
const show7 = ref(false);
const show8 = ref(false);
const show9 = ref(false);
const show10 = ref(false);
const show11 = ref(false);
const show12 = ref(false);
const show13 = ref(false);
let taost = useToast();
const handleConfirm = (v: (string | number)[]) => {
    taost.showToast({
        title: '确定选择：' + v.join(' '),
        icon: 'none',
        duration: 1500,
    });
};

const defaultMonth = ref<RefCalendar>();

const setViewMonth = () => {
    defaultMonth.value?.showMonth('2024-07');
};

const defaultDate = ref(utils.dayjs().format('YYYY-MM'));
const signs = reactive<{ [key: string]: SignType }>({
    [utils.dayjs().format('YYYY-MM-DD')]: [
        { content: 'XXXXX', className: 'test-signs' },
        { content: 'XXXXX', className: 'test-signs' },
        { content: 'XXXXX', className: 'test-signs' },
    ],
    [utils.dayjs(Date.now() + 1000 * 60 * 60 * 24).format('YYYY-MM-DD')]: [
        { content: 'XXXXX', style: { color: '#666', background: '#f5f5f5' } },
        { content: 'XXXXX', style: { color: '#666', background: '#f5f5f5' } },
    ],
});
</script>
<template>
    <page-layout title="日历" contentStyle="padding: 0">
        <view class="description">
            <view class="cmp-name">Calendar 日历</view>
            <view class="cmp-desc">按照日历形式展示数据或日期的容器</view>
        </view>
        <view class="demo-item">
            <view class="title">基础用法</view>
            <ste-calendar height="720" :showTitle="false" @confirm="handleConfirm" ref="Calendar" />
        </view>
        <view class="demo-item">
            <view class="item-content">
                <view class="type-block">
                    <view>01 组件类型</view>
                </view>
                <view class="demo-code">
                    <ste-button @click="show1 = true" width="100%">默认(单个日期)</ste-button>
                    <ste-popup v-model:show="show1" height="60vh" position="bottom">
                        <div style="padding-bottom: 20px; height: 100%">
                            <ste-calendar @confirm="handleConfirm" />
                        </div>
                    </ste-popup>
                </view>

                <view class="demo-code">
                    <ste-button @click="show2 = true" width="100%">多个日期</ste-button>
                    <ste-popup v-model:show="show2" height="60vh" position="bottom">
                        <div style="padding-bottom: 20px; height: 100%">
                            <ste-calendar mode="multiple" @confirm="handleConfirm" />
                        </div>
                    </ste-popup>
                </view>

                <view class="demo-code">
                    <ste-button @click="show3 = true" width="100%">日期范围</ste-button>
                    <ste-popup v-model:show="show3" height="60vh" position="bottom">
                        <div style="padding-bottom: 20px; height: 100%">
                            <ste-calendar mode="range" @confirm="handleConfirm" />
                        </div>
                    </ste-popup>
                </view>
                <view class="type-block">
                    <view>02 组件样式</view>
                </view>
                <view class="demo-code">
                    <ste-button @click="show4 = true" width="100%">自定义主题色</ste-button>
                    <ste-popup v-model:show="show4" height="60vh" position="bottom">
                        <div style="padding-bottom: 20px; height: 100%">
                            <ste-calendar color="#ff0000" @confirm="handleConfirm" />
                        </div>
                    </ste-popup>
                </view>
                <view class="demo-code">
                    <ste-button @click="show5 = true" width="100%">自定义文案</ste-button>
                    <ste-popup v-model:show="show5" height="60vh" position="bottom">
                        <div style="padding-bottom: 20px; height: 100%">
                            <ste-calendar mode="range" title="酒店预约" startText="住店" endText="离店" @confirm="handleConfirm" />
                        </div>
                    </ste-popup>
                </view>
                <view class="type-block">
                    <view>03 组件状态</view>
                </view>
                <view class="demo-code">
                    <ste-button @click="show6 = true" width="100%">日期最大范围</ste-button>
                    <ste-popup v-model:show="show6" height="60vh" position="bottom">
                        <div style="padding-bottom: 20px; height: 100%">
                            <ste-calendar mode="range" minDate="2024-05-10" maxDate="2024-05-20" view-start="2024-01" view-end="2024-12" @confirm="handleConfirm" />
                        </div>
                    </ste-popup>
                </view>
                <view class="demo-code">
                    <ste-button @click="show7 = true" width="100%">多选数量限制</ste-button>
                    <ste-popup v-model:show="show7" height="60vh" position="bottom">
                        <div style="padding-bottom: 20px; height: 100%">
                            <ste-calendar mode="multiple" :maxCount="5" @confirm="handleConfirm" />
                        </div>
                    </ste-popup>
                </view>
                <view class="demo-code">
                    <ste-button @click="show8 = true" width="100%">范围数量限制</ste-button>
                    <ste-popup v-model:show="show8" height="60vh" position="bottom">
                        <div style="padding-bottom: 20px; height: 100%">
                            <ste-calendar mode="range" :maxRange="5" @confirm="handleConfirm" />
                        </div>
                    </ste-popup>
                </view>
                <view class="demo-code">
                    <ste-button @click="show9 = true" width="100%">默认选择日期</ste-button>
                    <ste-popup v-model:show="show9" height="60vh" position="bottom">
                        <div style="padding-bottom: 20px; height: 100%">
                            <ste-calendar :list="[Date.now()]" @confirm="handleConfirm" />
                        </div>
                    </ste-popup>
                </view>
                <view class="demo-code">
                    <ste-button @click="show10 = true" width="100%">默认展示月份</ste-button>
                    <ste-popup v-model:show="show10" position="bottom" height="60vh" @open-after="setViewMonth">
                        <div style="padding-bottom: 20px; height: 100%">
                            <ste-calendar ref="defaultMonth" minDate="2024-05-20" maxDate="2024-08-01" @confirm="handleConfirm" />
                        </div>
                    </ste-popup>
                </view>
                <view class="demo-code">
                    <ste-button @click="show11 = true" width="100%">隐藏确定按钮</ste-button>
                    <ste-popup v-model:show="show11" position="bottom" height="60vh">
                        <div style="padding-bottom: 20px; height: 100%">
                            <ste-calendar minDate="2024-05-20" maxDate="2024-08-01" @select="handleConfirm" :showConfirm="false" />
                        </div>
                    </ste-popup>
                </view>
                <view class="demo-code">
                    <ste-button @click="show12 = true" width="100%">只读</ste-button>
                    <ste-popup v-model:show="show12" position="bottom" height="60vh">
                        <div style="padding-bottom: 20px; height: 100%">
                            <ste-calendar minDate="2024-05-20" maxDate="2024-06-10" readonly :list="['2024-05-21']" />
                        </div>
                    </ste-popup>
                </view>
                <view class="demo-code">
                    <ste-button @click="show13 = true" width="100%">隐藏背景月份</ste-button>
                    <ste-popup v-model:show="show13" position="bottom" height="60vh">
                        <div style="padding-bottom: 20px; height: 100%">
                            <ste-calendar :showMark="false" @select="handleConfirm" />
                        </div>
                    </ste-popup>
                </view>
            </view>
        </view>

        <view class="demo-item">
            <view class="type-block" style="padding: 0 30rpx">
                <view>03 组件自定义</view>
            </view>

            <ste-select mode="month" v-model="defaultDate" width="200" options-width="420" border-color="transparency">
                <template v-slot:icon>
                    <ste-icon code="&#xe699;"></ste-icon>
                </template>
            </ste-select>

            <ste-calendar @select="handleConfirm" weekendColor="#999" color="#09f" :signs="signs" :defaultDate="defaultDate" :monthCount="1" :showConfirm="false" :showTitle="false" />
        </view>
    </page-layout>
</template>
<style scoped lang="scss">
.content {
    padding: 0;

    .description {
        padding: 0 30rpx;
    }

    .type-block {
        margin: 30rpx 0;
    }

    .demo-item {
        .title {
            padding: 0 30rpx;
        }

        .item-content {
            padding: 0 30rpx;

            .demo-code {
                // display: inline-block;
                margin: 0 12rpx 12rpx 0;
            }
        }

        :deep(.test-signs) {
            color: #fff;
            background-color: #000;
        }
    }
}
</style>
