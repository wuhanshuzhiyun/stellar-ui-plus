<script setup lang="ts">
import { computed } from 'vue';
import utils from '../../utils/utils';
import { badgeProps, badgeEmits } from './props';
import { CLICK_EVENT } from '../../common/_constants/event';

const props = defineProps(badgeProps);
const emit = defineEmits(badgeEmits);

const cmpContentStyle = computed(() => {
  let style = {} as any;
  if (props.background) {
    style = { backgroundColor: 'transparent', ...utils.bg2style(props.background) };
  }
  if (props.offsetX != 'auto' || props.offsetY != 'auto' || props.offsetX == 0 || props.offsetY == 0) {
    style.transform = 'translate(0,0)';

    switch (props.position) {
      case 'topLeft':
        style.left = utils.addUnit(props.offsetX);
        style.top = utils.addUnit(props.offsetY);
        break;
      case 'bottomLeft':
        style.left = utils.addUnit(props.offsetX);
        style.bottom = utils.addUnit(props.offsetY);
        break;
      case 'bottomRight':
        style.right = utils.addUnit(props.offsetX);
        style.bottom = utils.addUnit(props.offsetY);
        break;
      default:
        style.right = utils.addUnit(props.offsetX);
        style.top = utils.addUnit(props.offsetY);
        break;
    }
  }
  if (props.showBorder) {
    style.border = 'solid 1px ' + props.borderColor;
  }
  style['z-index'] = props.zIndex;

  return style;
});

const cmpShowContent = computed(() => {
  return props.showZero ? true : props.content && props.content != '0';
});

const cmpContent = computed(() => {
  if (utils.isNumber(props.content) && props.content > props.max) {
    return `${props.max}+`;
  } else {
    return String(props.content);
  }
});

function handleClick(event: any) {
  emit(CLICK_EVENT, event);
}
</script>

<script lang="ts">
const componentName = `ste-badge`;
export default defineComponent({
  name: componentName,
});
</script>

<template>
  <view class="ste-badge-root" :style="[rootStyle, { display: isInline ? 'inline-block' : 'block' }]">
    <view
      class="ste-badge-content"
      :style="[cmpContentStyle]"
      :class="'ste-badge-' + position"
      v-if="showDot || cmpShowContent || $slots.content"
    >
      <view v-if="showDot" class="dot-box" />
      <view
        v-else
        class="content-box"
        :class="{ 'no-padding': $slots.content || (content && (content.length == 1 || content < 10)) }"
      >
        <slot name="content">
          <view class="ste-badge-content-text">{{ cmpContent }}</view>
        </slot>
      </view>
    </view>
    <slot></slot>
  </view>
</template>

<style lang="scss" scoped>
$default-size: 28rpx;
.ste-badge-root {
  position: relative;

  .ste-badge-content {
    display: inline-block;
    position: absolute;
    font-size: 24rpx;
    color: #ffffff;
    background-color: #ee0a24;
    border-radius: 99999rpx;
    width: fit-content;

    .content-box {
      display: flex;
      align-items: center;
      justify-content: center;
      height: $default-size;
      max-height: $default-size;
      min-height: $default-size;
      width: auto;
      min-width: $default-size;
      overflow: hidden;

      padding: 0 8rpx;
      line-height: 0;

      &.no-padding {
        padding: 0;
      }
    }

    .dot-box {
      height: 12rpx;
      width: 12rpx;
    }

    &-text {
      font-size: 22rpx;
      color: #ffffff;
      line-height: $default-size;
      vertical-align: middle;
      position: relative;
      // #ifdef  H5
      top: -0.5rpx;
      // #endif
      // #ifdef  MP-WEIXIN
      // top: -0.5rpx;
      // #endif
      // #ifdef  MP-ALIPAY
      // top: 0.5rpx;
      // #endif
    }
  }

  .ste-badge- {
    &topRight {
      top: 0;
      right: 0;
      transform: translate(50%, -50%);
    }
    &topLeft {
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
    }
    &bottomLeft {
      bottom: 0;
      left: 0;
      transform: translate(-50%, 50%);
    }
    &bottomRight {
      bottom: 0;
      right: 0;
      transform: translate(50%, 50%);
    }
  }
}
</style>
