import type { ExtractPropTypes } from 'vue'
import { makeNumberProp, makeNumericProp, makeStringProp, truthProp } from '../../utils/props'
import type { DigitsType, StyleType, UnitType } from './type'

export const priceProps = {
  /**
   * @description 金额 默认值 0
   */
  value: [String, Number],
  /**
   * @description 金额单位，fen 分(默认值){String}，yuan 元{String}
   */
  valueUnit: makeStringProp<UnitType>('fen'),
  /**
   * @description 精度 默认值 -1，-1 不处理（默认值）{Number}， 0 取整（四舍五入）{Number}，1 保留1位小数（四舍五入）{Number}，2 保留2位小数（四舍五入）{Number}
   */
  digits: makeNumberProp<DigitsType>(-1),
  /**
   * @description 是否显示符号
   */
  showUnit: truthProp,
  /**
   * @description 符号标记，默认值 ¥
   */
  unitSymbol: makeStringProp('¥'),
  /**
   * @description 金额文字尺寸 默认值 30
   */
  fontSize: makeNumericProp('30'),
  /**
   * @description 文字颜色 默认值 #ff1e19
   */
  color: makeStringProp('#FF1E19'),
  /**
   * @description 划线价文字颜色 默认值 #999999
   */
  linePriceColor: makeStringProp('#999999'),
  /**
   * @description 行高，Number，单位rpx，String，同原生 默认值 1
   */
  lineHeight: makeNumberProp(-1),
  /**
   * @description 是否划线价 默认值 false
   */
  isSuggestPrice: Boolean,
  /**
   * @description 左边距
   */
  marginLeft: makeNumericProp(0),
  /**
   * @description 右边距
   */
  marginRight: makeNumericProp(0),
  /**
   * @description 上边距
   */
  marginTop: makeNumericProp(0),
  /**
   * @description 下边距
   */
  marginBottom: makeNumericProp(0),
  /**
   * @description 金额样式
   */
  styleType: makeNumericProp<StyleType>(2),
  /**
   * @description 是否加粗
   */
  bold: Boolean,
  /**
   * @description 用来格式化内容
   */
  formatter: {
    type: Function,
    default: null,
  },
}

export type PriceProps = ExtractPropTypes<typeof priceProps>
