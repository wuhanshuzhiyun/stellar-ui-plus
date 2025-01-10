const progressProps = {
  activeBg: { type: [String], default: '' },
  inactiveBg: { type: [String], default: '#eeeeee' },
  percentage: { type: [Number], default: 0 },
  strokeWidth: { type: [String, Number], default: 24 },
  disabled: { type: [Boolean], default: false },
  width: { type: [String, Number], default: '100%' },
  duration: { type: [Number], default: 0.3 },
  pivotText: { type: [String], default: '' },
  textColor: { type: [String], default: '#ffffff' },
  textAlign: { type: [String], default: 'right' },
  textSize: { type: [String, Number], default: 16 },
  displayTextThreshold: { type: [Number], default: 0 },
}

export default progressProps
