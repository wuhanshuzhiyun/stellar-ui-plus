<template>
    <view class="ste-login-form-item--root" :style="[compRootStyle]">
        <view class="input-type select" v-if="config.type === 'select'">
            <view class="label">{{ config.title }}</view>
            <view class="system-account-number">
                <ste-select
                    height="94"
                    width="580"
                    fontSize="32"
                    borderRadius="16rpx"
                    borderColor="#EBEBEB"
                    optionsPosition="bottom"
                    v-model="value"
                    :list="config.selectData"
                    labelKey="title"
                    valueKey="key"
                    @change="handleChange"
                    :disabled="config.disabled"
                ></ste-select>
            </view>
        </view>
        <view class="input-type txt" v-if="config.type === 'txt'">
            <view class="label">{{ config.title }}</view>
            <view class="tips">{{ config.value }}</view>
        </view>
        <view class="input-type number" v-if="config.type === 'number'">
            <view class="label">{{ config.title }}</view>
            <view class="account-number-input">
                <ste-input
                    :placeholder="config.placeholder || defaultConfig.placeholder"
                    confirmType="next"
                    rootClass="ste-login-input--root"
                    fontSize="32"
                    border
                    borderColor="#EBEBEB"
                    v-model="value"
                    :maxlength="config.maxlength"
                    :disabled="config.disabled"
                    @input="handleChange"
                >
                    <template v-slot:prefix>
                        <view :style="[inputIconStyle]">
                            <ste-icon :code="config.icon || '&#xe631;'" size="40" :color="config.style?.iconColor || color"></ste-icon>
                        </view>
                    </template>
                </ste-input>
            </view>
        </view>
        <view class="input-type password" v-if="config.type === 'password'">
            <view class="label">{{ config.title }}</view>
            <view class="account-number-input">
                <ste-input
                    :placeholder="config.placeholder || defaultConfig.placeholder"
                    type="password"
                    confirmType="next"
                    rootClass="ste-login-input--root"
                    fontSize="32"
                    border
                    borderColor="#EBEBEB"
                    v-model="value"
                    :maxlength="config.maxlength"
                    :disabled="config.disabled"
                    @input="handleChange"
                >
                    <template v-slot:prefix>
                        <view :style="[inputIconStyle]">
                            <ste-icon :code="config.icon || '&#xe630;'" size="40" :color="config.style?.iconColor || color"></ste-icon>
                        </view>
                    </template>
                </ste-input>
            </view>
        </view>
        <view class="input-type password" v-if="config.type === 'validate'">
            <view class="label">{{ config.title }}</view>
            <view class="account-number-input">
                <ste-input
                    :placeholder="config.placeholder || defaultConfig.placeholder"
                    v-model="value"
                    :maxlength="config.maxlength"
                    :disabled="config.disabled"
                    confirmType="next"
                    rootClass="ste-login-input--root"
                    fontSize="32"
                    border
                    borderColor="#EBEBEB"
                    @input="handleChange"
                >
                    <template v-slot:prefix>
                        <view :style="[inputIconStyle]">
                            <ste-icon :code="config.icon || '&#xe630;'" size="40" :color="config.style?.iconColor || color"></ste-icon>
                        </view>
                    </template>
                    <template v-slot:suffix>
                        <view :style="[{ color, opacity: count > 0 ? 1 : 0.35, fontSize: 'var(--font-size-28, 28rpx)' }]" @click="getCode">
                            {{ count <= 0 ? '获取验证码' : count + '秒后获取' }}
                        </view>
                    </template>
                </ste-input>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import type { LoginItem } from '../type';
import type { PropType } from 'vue';
import { ref, nextTick, computed } from 'vue';
const props = defineProps({
    color: { type: String, default: '' },
    config: { type: Object as PropType<LoginItem>, default: () => {} },
    modelValue: { type: [String], default: '' },
});
const emits = defineEmits(['update:modelValue', 'change', 'getCode']);

console.log('config is ', props.config);

const defaultConfig = {
    placeholder: '请输入',
};

const value = ref(props.modelValue);
const count = ref(0);

const compRootStyle = computed(() => {
    return {
        '--main-color': props.color,
        '--login-item-background': props.config.style?.background || '',
    };
});

const inputIconStyle = {
    marginRight: '20rpx',
    display: 'flex',
    alignItems: 'center',
};

const handleChange = () => {
    nextTick(() => {
        emits('change', value.value);
    });
};

const defaultCountValue = 60;
let codeTimer: any;
const getCode = () => {
    if (count.value > 0) return;
    count.value = defaultCountValue;
    emits('getCode');
    codeTimer = setInterval(() => {
        if (count.value <= 0) {
            clearInterval(codeTimer);
        }
        count.value--;
    }, 1000);
};
</script>

<style lang="scss" scoped>
.ste-login-form-item--root {
    // margin: 60rpx 66rpx 0;
    .label {
        width: 112rpx;
        height: 40rpx;
        font-size: var(--font-size-28, 28rpx);
    }
    .system-account-number {
        margin: 12rpx 0 24rpx;
    }
    .tips {
        width: 580rpx;
        // height: 120rpx;
        background: var(--login-item-background);
        border-radius: 16rpx;
        padding: 20rpx;
        font-size: var(--font-size-28, 28rpx);
        margin-top: 20rpx;
    }
    .account-number-input {
        width: 580rpx;
        // height: 92rpx;
        // background: #ffffff;
        border-radius: 16rpx;
        margin: 12rpx 0 24rpx;
    }
}
</style>

<style lang="scss">
.ste-login-input--root {
    height: 92rpx;
    line-height: 92rpx;
    .content {
        padding: 0 0 0 24rpx !important;
        .input-box {
            height: 92rpx;
            input {
                height: 100%;
            }
        }
    }

    .validate-action {
        margin-right: 32rpx;
        color: var(--main-color);
        font-size: var(--font-size-28, 28rpx);

        &.validate-action-disable {
            opacity: 0.35;
        }
    }

    .icon {
        display: flex;
        align-items: center;

        &.prefix {
            margin-right: 20rpx;
        }
    }
}
</style>
