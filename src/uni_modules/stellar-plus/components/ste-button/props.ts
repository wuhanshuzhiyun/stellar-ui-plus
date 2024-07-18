import type { ExtractPropTypes } from 'vue'
import type {
  ButtonOnAddgroupappEvent,
  ButtonOnAgreeprivacyauthorizationEvent,
  ButtonOnChooseaddressEvent,
  ButtonOnChooseavatarEvent,
  ButtonOnChooseinvoicetitleEvent,
  ButtonOnErrorEvent,
  ButtonOnGetphonenumberEvent,
  ButtonOnLaunchappEvent,
  ButtonOnLoginEvent,
  ButtonOnOpensettingEvent,
  ButtonOnSubscribeEvent,
  ButtonOpenType,
} from '@uni-helper/uni-app-types'
import { makeNumberProp, makeNumericProp, makeStringProp, truthProp } from '../../utils/props'
import { CLICK_EVENT } from '../../common/_constants/event'
import type { ModeType } from './type'

export const buttonProps = {
  /**
   * @description 按钮尺寸
   */
  mode: makeNumberProp<ModeType>(200),
  /**
   * @description 按钮文本颜色
   */
  color: makeStringProp('#ffffff'),
  /**
   * @description 按钮背景颜色
   */
  background: makeStringProp('#0091ff'),
  /**
   * @description 边框颜色
   */
  borderColor: makeStringProp(''),
  /**
   * @description 宽度 auto 自适应宽度，100% 填满
   */
  width: makeNumericProp('auto'),
  /**
   * @description 是否圆角按钮
   */
  round: truthProp,
  /**
   * @description 是否禁用
   */
  disabled: Boolean,
  /**
   * @description 是否加载
   */
  loading: Boolean,
  /**
   * @description 是否阻止冒泡行为
   */
  stopPropagation: Boolean,
  /**
   * @description 微信开放能力和支付宝开放能力
   */
  openType: String as PropType<ButtonOpenType>,
  /**
   * @description 支付宝开放能力
   */
  scope: makeStringProp(''),
  /**
   * @description 按钮样式属性
   */
  rootStyle: { type: Object, default: () => ({}) },
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export const buttonEmits = {
  [CLICK_EVENT]: (evt: MouseEvent) => evt instanceof Object,
  getphonenumber: (evt: ButtonOnGetphonenumberEvent) => evt instanceof Object,
  getuserinfo: (evt: any) => evt instanceof Object,
  error: (evt: ButtonOnErrorEvent) => evt instanceof Object,
  opensetting: (evt: ButtonOnOpensettingEvent) => evt instanceof Object,
  launchapp: (evt: ButtonOnLaunchappEvent) => evt instanceof Object,
  contact: (evt: any) => evt instanceof Object,
  chooseavatar: (evt: ButtonOnChooseavatarEvent) => evt instanceof Object,
  agreeprivacyauthorization: (evt: ButtonOnAgreeprivacyauthorizationEvent) => evt instanceof Object,
  addgroupapp: (evt: ButtonOnAddgroupappEvent) => evt instanceof Object,
  chooseaddress: (evt: ButtonOnChooseaddressEvent) => evt instanceof Object,
  chooseinvoicetitle: (evt: ButtonOnChooseinvoicetitleEvent) => evt instanceof Object,
  subscribe: (evt: ButtonOnSubscribeEvent) => evt instanceof Object,
  login: (evt: ButtonOnLoginEvent) => evt instanceof Object,
  im: (evt: any) => evt instanceof Object,
  getrealtimephonenumber: (evt: any) => evt instanceof Object,
  greeprivacyauthorization: (evt: any) => evt instanceof Object,
  getAuthorize: (evt: any) => evt instanceof Object,
  followLifestyle: (evt: any) => evt instanceof Object,
}

export type ButtonEmits = typeof buttonEmits
