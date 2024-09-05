export const TAB_KEY = Symbol('ste-tabs')

export interface SteTabsProps {
  active: number | string
  type: string
  showImage: boolean
  showTitle: boolean
  showSubtitle: boolean
  color: string
  background: string
  radius: number | string
  duration: number | string
  showLine: boolean
  lineWidth: number | string
  lineHeight: number | string
  border: boolean
  ellipsis: boolean
  tabWidth: number | string
  tabPadding: number | string
  tabSpace: number | string
  divideNum: number
  sticky: boolean
  offsetTop: number | string
  swipeable: boolean
  titleColor: string
  activeTitleColor: string
  titleHeight: number | string
  subColor: string
  activeSubColor: string
  subTitleHeight: number | string
  subTitleRadius: number | string
  imageWidth: number | string
  imageHeight: number | string
  imageRadius: number | string
  imageBorderWidth: number | string
  showGapLine: boolean
  lock: boolean
  disabled: boolean
  pullDown: boolean
  placeholder: string
  maskTop: number | string
  maskRight: number | string
  maskBottom: number | string
  maskLeft: number | string
  maskZindex: number | string
}

export default {
  // 当前激活的选项支持sync双向绑定（类型为number时绑定index，类型为string时绑定name）
  active: { type: [Number, String], default: () => 0 },
  // 样式风格类型，可选值为 line  card
  type: { type: String, default: () => 'line' },
  // 是否显示图片
  showImage: { type: Boolean, default: () => false },
  // 是否显示主标题
  showTitle: { type: Boolean, default: () => true },
  // 是否显示副标题
  showSubtitle: { type: Boolean, default: () => false },
  // 主题色（滑块颜色，边框颜色，选中的背景色，激活下拉列表中选项颜色）
  color: { type: String, default: () => '#0090FF' },
  // 背景
  background: { type: String, default: () => '' },
  // 圆角
  radius: { type: [String, Number], default: () => 0 },
  // 动画时间，单位秒，设置为 0 可以禁用动画
  duration: { type: [String, Number], default: () => 0.3 },
  // 底部条是否显示，默认true（显示副标题的情况下会自动隐藏）
  showLine: { type: Boolean, default: () => true },
  // 底部条宽度，默认单位rpx
  lineWidth: { type: [String, Number], default: () => 52 },
  // 底部条高度，默认单位rpx
  lineHeight: { type: [String, Number], default: () => 6 },
  // 是否显示标签栏外边框，仅在 type="line" 时有效
  border: { type: Boolean, default: () => false },
  // 是否省略过长的标题文字
  ellipsis: { type: Boolean, default: () => false },
  // tab内容的宽度
  tabWidth: { type: [String, Number], default: () => 'auto' },
  // 选项内边距，默认24，单位rpx
  tabPadding: { type: [Number, String], default: () => 24 },
  // tab间距rpx
  tabSpace: { type: [Number, String], default: () => 0 },
  // tab等分数量，设置为 0 ，则不等分
  divideNum: { type: Number, default: () => 4 },
  // 是否使用粘性布局
  sticky: { type: Boolean, default: () => false },
  // 粘性布局下吸顶时与顶部的距离，单位rpx
  offsetTop: { type: [String, Number], default: () => 0 },
  // 是否开启手势左右滑动切换
  swipeable: { type: Boolean, default: () => false },
  // 主标题字体颜色和下拉列表中选项颜色
  titleColor: { type: String, default: () => '#000000' },
  // 激活主标题字体颜色
  activeTitleColor: { type: String, default: () => '#000000' },
  // 标题高度
  titleHeight: { type: [Number, String], default: () => 48 },
  // 子标题字体颜色和下拉列表中选项颜色
  subColor: { type: String, default: () => '#000' },
  // 激活子标题字体颜色和下拉列表中选项颜色
  activeSubColor: { type: String, default: () => '#fff' },
  // 子标题高度
  subTitleHeight: { type: [Number, String], default: () => 42 },
  // 子标题圆角
  subTitleRadius: { type: [Number, String], default: () => 21 },
  // 图片宽度，默认80，单位rpx
  imageWidth: { type: [Number, String], default: () => 80 },
  // 图片高度，默认80，单位rpx
  imageHeight: { type: [Number, String], default: () => 80 },
  // 图片圆角，默认50%，单位rpx
  imageRadius: { type: [Number, String], default: () => '50%' },
  // 选中图片边框宽度，默认4，单位rpx
  imageBorderWidth: { type: [Number, String], default: () => 4 },
  // 是否显示分隔符
  showGapLine: { type: Boolean, default: () => false },
  // 是否锁定tab(无法切换)
  lock: { type: Boolean, default: () => false },
  // 是否禁用tab(所有功能失效)
  disabled: { type: Boolean, default: () => false },
  // 是否有下拉选择按钮
  pullDown: { type: Boolean, default: () => false },
  // 下拉占位符
  placeholder: { type: String, default: () => '请选择' },
  // 下拉蒙层顶部距离
  maskTop: { type: [String, Number], default: () => 0 },
  // 下拉蒙层右侧距离
  maskRight: { type: [String, Number], default: () => 0 },
  // 下拉蒙层底部距离
  maskBottom: { type: [String, Number], default: () => 0 },
  // 下拉蒙层左侧距离
  maskLeft: { type: [String, Number], default: () => 0 },
  // 下拉蒙层层级
  maskZindex: { type: [String, Number], default: () => 1001 },
}
