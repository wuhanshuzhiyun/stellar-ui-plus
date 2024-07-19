import type { ExtractPropTypes } from 'vue'
import { makeNumberProp, makeNumericProp, makeStringProp } from '../../utils/props'
import { CLICK_EVENT } from '../../common/_constants/event'
import type { PositionType } from './type'

export const badgeProps = {
  /**
   * @description 徽标内容
   */
  content: [String, Number],
  /**
   * @description 背景
   */
  background: makeStringProp('#ee0a24'),
  /**
   * @description 是否显示为小红点
   */
  showDot: Boolean,
  /**
   * @description 根据徽标位置,设置x轴偏移量 默认 auto
   */
  offsetX: makeNumericProp('auto'),
  /**
   * @description 符号标记，默认值 ¥
   */
  offsetY: makeNumericProp('auto'),
  /**
   * @description 当 content 为数字 0，是否展示徽标，默认 false
   */
  showZero: Boolean,
  /**
   * @description 文字颜色 默认值 #ff1e19
   */
  position: makeStringProp<PositionType>('topRight'),
  /**
   * @description 徽标最大显示值 默认 99
   */
  max: makeNumberProp(99),
  /**
   * @description 是否显示边框 默认 false
   */
  showBorder: Boolean,
  /**
   * @description 边框颜色
   */
  borderColor: String,
  /**
   * @description 层级 默认 2
   */
  zIndex: makeNumericProp(2),
  /**
   * @description display属性是否为inline-block 默认 false
   */
  isInline: Boolean,
  /**
   * @description 样式
   */
  rootStyle: Object,
}

export type BadgeProps = ExtractPropTypes<typeof badgeProps>

export const badgeEmits = {
  [CLICK_EVENT]: (evt: MouseEvent) => evt instanceof Object,
}
