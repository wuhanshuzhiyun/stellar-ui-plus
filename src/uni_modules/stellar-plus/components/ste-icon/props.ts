import type { ExtractPropTypes } from 'vue'
import { makeNumberProp, makeNumericProp, makeStringProp, truthProp } from '../../utils/props'

// import type { DigitsType, StyleType, UnitType } from './type';

export const iconProps = {
  /**
   * @description 图标对应的unicode
   */
  code: { ...makeStringProp(''), required: true },
  /**
   * @description 图标大小
   */
  size: makeNumericProp('28'),
  /**
   * @description 图标缩放
   */
  scale: makeNumberProp(1),
  /**
   * @description 图标颜色，默认#000000（黑色）
   */
  color: String,
  /**
   * @description 是否加粗
   */
  bold: Boolean,
  /**
   * @description 左外边距
   */
  marginLeft: makeNumericProp(0),
  /**
   * @description 右外边距
   */
  marginRight: makeNumericProp(0),
  /**
   * @description 上外边距
   */
  marginTop: makeNumericProp(0),
  /**
   * @description 下外边距
   */
  marginBottom: makeNumericProp(0),
  /**
   * @description 字体fontFamily
   */
  fontFamily: makeStringProp(''),
  /**
   * @description 是否显示边框
   */
  showBorder: Boolean,
  /**
   * @description 容器对齐方式，容器对齐方式 true inline-block false inline-flex
   */
  inlineBlock: truthProp,
}

export const iconEmits = {
  click: (evt: MouseEvent) => evt instanceof Object,
}

export type IconProps = ExtractPropTypes<typeof iconProps>
