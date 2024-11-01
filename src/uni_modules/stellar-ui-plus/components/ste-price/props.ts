type UnitType = 'fen' | 'yuan'
type DigitsType = -1 | 0 | 1 | 2
type StyleType = 1 | 2 | 3

export default {
  value: [String, Number],
  valueUnit: { type: String as PropType<UnitType>, default: 'fen' },
  digits: { type: Number as PropType<DigitsType>, default: -1 },
  showUnit: { type: Boolean, default: true },
  unitSymbol: { type: String, default: '¥' },
  fontSize: { type: [String, Number], default: '30' },
  color: { type: String, default: '#FF1E19' },
  linePriceColor: { type: String, default: '#999999' },
  lineHeight: { type: Number, default: -1 },
  isSuggestPrice: Boolean,
  marginLeft: { type: [String, Number], default: 0 },
  marginRight: { type: [String, Number], default: 0 },
  marginTop: { type: [String, Number], default: 0 },
  marginBottom: { type: [String, Number], default: 0 },
  styleType: { type: Number as PropType<StyleType>, default: 2 },
  bold: Boolean,
  formatter: { type: Function, default: null },
}
