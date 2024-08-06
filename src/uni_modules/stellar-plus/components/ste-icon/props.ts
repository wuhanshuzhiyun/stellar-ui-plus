export default {
  code: { type: String, default: '', required: true },
  size: { type: [String, Number], default: 28 },
  scale: { type: Number, default: 1 },
  color: String,
  bold: Boolean,
  marginLeft: { type: [String, Number], default: 0 },
  marginRight: { type: [String, Number], default: 0 },
  marginTop: { type: [String, Number], default: 0 },
  marginBottom: { type: [String, Number], default: 0 },
  fontFamily: String,
  showBorder: Boolean,
  inlineBlock: { type: Boolean, default: true },
}
