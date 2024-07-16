import type { ExtractPropTypes } from 'vue'
import { makeNumberProp, makeNumericProp, makeStringProp, truthProp } from '../../utils/props'
import type { DigitsType, StyleType, UnitType } from './type'

export const priceProps = {
  value: [String, Number],
  valueUnit: makeStringProp<UnitType>('fen'),
  digits: makeNumberProp<DigitsType>(-1),
  showUnit: truthProp,
  unitSymbol: makeStringProp('¥'),
  fontSize: makeNumericProp('30'),
  color: makeStringProp('#FF1E19'),
  linePriceColor: makeStringProp('#999999'),
  lineHeight: makeNumberProp(-1),
  isSuggestPrice: Boolean,
  marginLeft: makeNumericProp(0),
  marginRight: makeNumericProp(0),
  marginTop: makeNumericProp(0),
  marginBottom: makeNumericProp(0),
  styleType: makeNumericProp<StyleType>(2),
  bold: Boolean,
  formatter: {
    type: Function,
    default: null,
  },
}

export type PriceProps = ExtractPropTypes<typeof priceProps>
