import type { PropType } from 'vue'
import type { SteSelectSeatItem, SteSelectSeatValue } from './types'

export default {
  // 已选座位 v-model
  modelValue: { type: Array as PropType<SteSelectSeatValue[]>, default: () => [] },
  // 行数
  rows: { type: Number, default: 0 },
  // 列数
  cols: { type: Number, default: 0 },
  // 组件宽度(px)
  width: { type: Number, default: 350 },
  // 组件高度(px)
  height: { type: Number, default: 400 },
  // 自定义座位数据
  seats: { type: Array as PropType<SteSelectSeatItem[]>, default: () => [] },
  // 座位尺寸(rpx)
  seatSize: { type: Number, default: 40 },
  // 座位间距(rpx)
  seatGap: { type: Number, default: 8 },
  // 座位圆角(rpx)
  borderRadius: { type: Number, default: 8 },
  // 边框宽度
  borderWidth: { type: Number, default: 1 },
  // 座位背景色
  bgColor: { type: String, default: '#ffffff' },
  // 边框颜色
  borderColor: { type: String, default: '#e5e5e5' },
  // 选中背景色（默认用主题色）
  selectedBgColor: { type: String, default: '' },
  // 选中图标颜色
  selectedColor: { type: String, default: '#ffffff' },
  // 禁用背景色
  disabledBgColor: { type: String, default: '#cccccc' },
  // 显示行号
  showRowLabels: { type: Boolean, default: true },
}
