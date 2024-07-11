import type { ExtractPropTypes } from 'vue'
import { makeNumberProp, makeStringProp, truthProp } from '../../utils/props'
import type { DigitsType, StyleType, UnitType } from './type'

export const priceProps = {
  value: [String, Number],
  valueUnit: makeStringProp<UnitType>('fen'),
  digits: makeNumberProp<DigitsType>(-1),
  showUnit: truthProp,
  unitSymbol: makeStringProp('¥'),
  fontSize: makeNumberProp('30'),
  color: makeStringProp('#FF1E19'),
  linePriceColor: makeStringProp('#999999'),
  lineHeight: makeNumberProp(-1),
  isSuggestPrice: Boolean,
  marginLeft: makeNumberProp(0),
  marginRight: makeNumberProp(0),
  marginTop: makeNumberProp(0),
  marginBottom: makeNumberProp(0),
  styleType: makeStringProp<StyleType>(2),
  bold: Boolean,
  formatter: {
    type: Function,
    default: null,
  },
}

export type PriceProps = ExtractPropTypes<typeof priceProps>
