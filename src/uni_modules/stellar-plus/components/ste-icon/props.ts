export default {
  code: { type: String, default: '', required: true },
  size: { type: [String, Number], default: 28 },
  scale: { type: Number, default: 1 },
  color: String,
  bold: Boolean,
  marginLeft: { type: Number, default: 0 },
  marginRight: { type: Number, default: 0 },
  marginTop: { type: Number, default: 0 },
  marginBottom: { type: Number, default: 0 },
  fontFamily: String,
  showBorder: Boolean,
  inlineBlock: { type: Boolean, default: true },
}
