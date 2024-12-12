import type { ComponentDesc } from './componentDesc'

export const componentMap: Record<string, ComponentDesc> = {
  'animate': {
    site: 'ste-animate',
    attr: [
      'show=\'\'',
    ],
    props: [
      {
        name: 'show',
        description: '控制动画，当值从`false`变为`true`时会触发一次动画',
        type: 'boolean',
        default: false,
      },
      {
        name: 'type',
        description: '动画类型，见下方`type`值说明',
        type: 'string',
        default: '',
      },
      {
        name: 'loop',
        description: '是否循环执行。',
        type: 'boolean',
        default: false,
      },
      {
        name: 'duration',
        description: '动画时长，单位 ms',
        type: 'number',
        default: 200,
      },
      {
        name: 'action',
        description: '不能与 show 同时使用）触发方式，`initial`初始化执行; `click`点击执行',
        type: 'string',
        default: '',
      },
    ],
    events: [],
  },
  'badge': {
    site: 'ste-badge',
    attr: [
      'content=\'\'',
    ],
    props: [
      {
        name: 'content',
        description: '徽标内容',
        type: 'string | number',
      },
      {
        name: 'background',
        description: '背景',
        type: 'string',
        default: '#ee0a24',
      },
      {
        name: 'showDot',
        description: '是否展示为小红点',
        type: 'boolean',
        default: false,
      },
      {
        name: 'offsetX',
        description: '根据徽标位置,设置x轴偏移量',
        type: 'string | number',
        default: 'auto',
      },
      {
        name: 'offsetY',
        description: '根据徽标位置,设置y轴偏移量',
        type: 'string | number',
        default: 'auto',
      },
      {
        name: 'showZero',
        description: '当 content 为数字 0，是否展示徽标',
        type: 'boolean',
        default: false,
      },
      {
        name: 'position',
        description: '徽标位置',
        type: 'string',
        values: [
          {
            name: 'topRight',
            description: '上右',
          },
          {
            name: 'topLeft',
            description: '上左',
          },
          {
            name: 'bottomLeft',
            description: '下左',
          },
          {
            name: 'bottomRight',
            description: '下右',
          },
        ],
        default: 'topRight',
      },
      {
        name: 'max',
        description: '徽标最大显示值',
        type: 'number',
        default: 99,
      },
      {
        name: 'showBorder',
        description: '是否显示边框',
        type: 'boolean',
        default: false,
      },
      {
        name: 'borderColor',
        description: '边框颜色',
        type: 'string',
      },
      {
        name: 'zIndex',
        description: '层级',
        type: 'number',
        default: 2,
      },
      {
        name: 'isInline',
        description: 'display属性是否为inline-block',
        type: 'boolean',
        default: false,
      },
    ],
    events: [],
  },
  'button': {
    site: 'ste-button',
    attr: [
      'mode=\'\'',
    ],
    props: [
      {
        name: 'mode',
        description: '尺寸',
        type: 'number',
        values: [
          {
            name: 100,
            description: '小',
          },
          {
            name: 200,
            description: '中',
          },
          {
            name: 300,
            description: '大',
          },
          {
            name: 400,
            description: '超大',
          },
        ],
        default: 200,
      },
      {
        name: 'color',
        description: '文本颜色',
        type: 'string',
        default: '#ffffff',
      },
      {
        name: 'background',
        description: '背景',
        type: 'string',
        default: '#0091ff',
      },
      {
        name: 'borderColor',
        description: '边框颜色',
        type: 'string',
      },
      {
        name: 'width',
        description: '宽度',
        type: 'string | number',
        values: [
          {
            name: 'auto',
            description: '自适应宽度',
          },
          {
            name: '100%',
            description: '填满',
          },
          {
            name: '{Number}',
            description: '自适应宽度，单位rpx',
          },
        ],
        default: 'auto',
      },
      {
        name: 'round',
        description: '是否圆角按钮',
        type: 'boolean',
        default: false,
      },
      {
        name: 'disabled',
        description: '是否禁用状态',
        type: 'boolean',
        default: false,
      },
      {
        name: 'loading',
        description: '是否加载中状态',
        type: 'boolean',
        default: false,
      },
      {
        name: 'stopPropagation',
        description: '是否阻止冒泡行为',
        type: 'boolean',
        default: false,
      },
      {
        name: 'openType',
        description: '微信开放能力和支付宝开放能力',
        type: 'string',
      },
      {
        name: 'scope',
        description: '支付宝开放能力，当 openType 为 getAuthorize 时有效',
        type: 'string',
      },
      {
        name: 'rootStyle',
        description: '按钮样式属性',
        type: 'object',
      },
    ],
    events: [
      {
        name: 'click',
        description: '非禁止并且非加载中，才能点击',
        type: '() => void',
      },
      {
        name: 'getuserinfo',
        description: '微信小程序：用户点击该按钮时，会返回获取到的用户信息，从返回参数的 detail 中获取到的值同 wx.getUserInfo。支付宝小程序：当 open-type 为 getAuthorize 且 scope 为 userInfo 时有效。当授权成功时触发。',
        type: '() => void',
      },
      {
        name: 'contact',
        description: '微信小程序：客服消息回调，open-type="contact"时有效。',
        type: '() => void',
      },
      {
        name: 'getphonenumber',
        description: '微信小程序：手机号快速验证回调，open-type=getPhoneNumber时有效。Tips：在触发 bindgetphonenumber 回调后应立即隐藏手机号按钮组件，或置为 disabled 状态，避免用户重复授权手机号产生额外费用。支付宝小程序：当 open-type 为 getAuthorize 且 scope 为 phoneNumber 时有效。当授权成功时触发。',
        type: '() => void',
      },
      {
        name: 'getrealtimephonenumber',
        description: '微信小程序：手机号实时验证回调，open-type=getRealtimePhoneNumber 时有效。Tips：在触发 bindgetrealtimephonenumber 回调后应立即隐藏手机号按钮组件，或置为 disabled 状态，避免用户重复授权手机号产生额外费用。',
        type: '() => void',
      },
      {
        name: 'agreeprivacyauthorization',
        description: '微信小程序：用户同意隐私协议事件回调，open-type=agreePrivacyAuthorization时有效 （Tips: 如果使用 onNeedPrivacyAuthorization 接口，需要在 bindagreeprivacyauthorization 触发后再调用 resolve({ event: "agree", buttonId })）',
        type: '() => void',
      },
      {
        name: 'error',
        description: '微信小程序：当使用开放能力时，发生错误的回调，open-type=launchApp时有效 支付宝小程序：当 open-type 为 getAuthorize 时有效。当授权失败时触发。event.detail = {type, errorMessage}，此时 type 的值为 getAuthorize。',
        type: '() => void',
      },
      {
        name: 'launchapp',
        description: '微信小程序：打开 APP 成功的回调，open-type=launchApp时有效',
        type: '() => void',
      },
      {
        name: 'opensetting',
        description: '微信小程序：在打开授权设置页后回调，open-type=openSetting时有效',
        type: '() => void',
      },
      {
        name: 'chooseavatar',
        description: '微信小程序：获取用户头像回调，open-type=chooseAvatar时有效。返回 e.detail.avatarUrl 为头像临时文件链接。',
        type: '() => void',
      },
      {
        name: 'getAuthorize',
        description: '支付宝小程序：当 open-type 为 getAuthorize 时有效。当授权成功时触发。',
        type: '() => void',
      },
      {
        name: 'followLifestyle',
        description: '支付宝小程序：当 open-type 为 lifestyle 时有效。当点击按钮时触发。event.detail = { followStatus }，folllowStatus 合法值有 1、2、3，其中 1 表示已关注。2 表示用户不允许关注。3 表示发生未知错误；。',
        type: '() => void',
      },
    ],
  },
  'calendar': {
    site: 'ste-calendar',
    attr: [
      'title=\'\'',
    ],
    props: [
      {
        name: 'title',
        description: '尺寸',
        type: 'string',
        default: '日期选择',
      },
      {
        name: 'showTitle',
        description: '是否显示标题',
        type: 'boolean',
        default: true,
      },
      {
        name: 'list',
        description: '选中的日期列表',
        type: 'number | string',
        default: [],
      },
      {
        name: 'mode',
        description: '选项的值',
        type: 'string',
        default: 'single',
        values: [
          {
            name: 'single',
            description: '选择单个日期（默认）',
          },
          {
            name: 'multiple',
            description: '可以选择多个日期',
          },
          {
            name: 'range',
            description: '可以选择日期范围',
          },
        ],
      },
      {
        name: 'startText',
        description: '开始日期文本',
        type: 'string',
        default: '开始',
      },
      {
        name: 'endText',
        description: '结束日期文本',
        type: 'string',
        default: '结束',
      },
      {
        name: 'color',
        description: '主题颜色（选中日期背景、周末文日期颜色和确定按钮）',
        type: 'string',
        default: '#FF1A00',
      },
      {
        name: 'minDate',
        description: '最小可选日期',
        type: 'number | string | Date',
        default: 0,
      },
      {
        name: 'maxDate',
        description: '最大可选日期',
        type: 'number | string | Date',
        default: 0,
      },
      {
        name: 'defaultMonth',
        description: '默认展示的月份',
        type: 'number | string | Date',
        default: 0,
      },
      {
        name: 'maxCount',
        description: 'mode=multiple时，最多可选多少个日期',
        type: 'number',
        default: 0,
      },
      {
        name: 'formatter',
        description: '日期格式化(默认\'YYYY-MM-DD\')',
        type: 'string',
        default: 'YYYY-MM-DD',
      },
      {
        name: 'showMark',
        description: '是否显示月份背景色',
        type: 'boolean',
        default: true,
      },
      {
        name: 'readonly',
        description: '是否为只读状态，只读状态下禁止选择日期',
        type: 'boolean',
        default: false,
      },
      {
        name: 'maxRange',
        description: '日期区间最多可选天数，默认无限制，mode = range时有效',
        type: 'number',
      },
      {
        name: 'rangePrompt',
        description: '范围选择超过最多可选天数时的提示文案，mode = range时有效',
        type: 'string',
      },
      {
        name: 'showRangePrompt',
        description: '范围选择超过最多可选天数时，是否展示提示文案，mode = range时有效',
        type: 'boolean',
        default: true,
      },
      {
        name: 'allowSameDay',
        description: '是否允许日期范围的起止时间为同一天，mode = range时有效',
        type: 'boolean',
        default: false,
      },
      {
        name: 'showConfirm',
        description: '是否显示确定按钮',
        type: 'boolean',
        default: true,
      },
      {
        name: 'width',
        description: '可视区域宽度',
        type: 'number | string',
        default: '100%',
      },
      {
        name: 'height',
        description: '可视区域高度',
        type: 'number | string',
        default: '100%',
      },
    ],
    events: [
      {
        name: 'select',
        description: '选择日期时触发',
        type: '(days:(number|string)[],day:number|string) => void',
        params: [
          {
            name: 'days',
            description: '选中的日期列表',
          },
          {
            name: 'day',
            description: '当前选中的日期',
          },
        ],
      },
      {
        name: 'confirm',
        description: '点击确定按钮时触发',
        type: '(days:(number|string)[]) => void',
        params: [
          {
            name: 'days',
            description: '当前选中的日期列表',
          },
        ],
      },
    ],
  },
  'checkbox': {
    site: 'ste-checkbox',
    attr: [
      'v-model=\'\'',
    ],
    props: [
      {
        name: 'v-model',
        description: '当前值',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'name',
        description: '选项的值',
        type: 'number | string',
      },
      {
        name: 'disabled',
        description: '禁用',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'readonly',
        description: '只读（不置灰）',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'shape',
        description: '形状',
        type: 'string',
        default: 'circle',
        values: [
          {
            name: 'circle',
            description: '圆形',
          },
          {
            name: 'square',
            description: '方形',
          },
        ],
      },
      {
        name: 'iconSize',
        description: '图标大小，单位rpx',
        type: 'number | string',
        default: '36',
      },
      {
        name: 'checkedColor',
        description: '选中状态的图标颜色',
        type: 'string',
        default: '#0090FF0',
      },
      {
        name: 'textPosition',
        description: '文本的位置',
        type: 'string',
        default: 'right',
        values: [
          {
            name: 'right',
            description: '右',
          },
          {
            name: 'left',
            description: '左',
          },
        ],
      },
      {
        name: 'textSize',
        description: '文本字体大小，单位rpx',
        type: 'number | string',
        default: '28',
      },
      {
        name: 'textInactiveColor',
        description: '未选中的文本颜色',
        type: 'string',
        default: '#000000',
      },
      {
        name: 'textActiveColor',
        description: '选中的文本颜色',
        type: 'string',
        default: '#000000',
      },
      {
        name: 'textDisabled',
        description: '禁用文本点击',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'marginLeft',
        description: '左边距，单位rpx',
        type: 'number | string',
        default: '0',
      },
      {
        name: 'marginRight',
        description: '右边距，单位rpx',
        type: 'number | string',
        default: '0',
      },
      {
        name: 'columnGap',
        description: '复选框和文本间距，单位rpx',
        type: 'number | string',
        default: '16',
      },
    ],
    events: [
      {
        name: 'click',
        description: '点击复选框时触发的事件',
        type: '(value:string | number,suspend: ()=>void,next: ()=>void,stop: ()=>void) => void',
        params: [
          {
            name: 'value',
            description: '当前复选框的绑定值',
          },
          {
            name: 'suspend',
            description: '等待',
          },
          {
            name: 'next',
            description: '继续',
          },
          {
            name: 'stop',
            description: '停止',
          },
        ],
      },
      {
        name: 'change',
        description: '当绑定值变化时触发的事件',
        type: '(value: string | number) => void',
        params: [
          {
            name: 'value',
            description: '当前复选框的绑定值',
          },
        ],
      },
    ],
  },
  'ste-checkbox-group': {
    site: 'ste-checkbox-group',
    attr: [
      '',
    ],
  },
  'code-input': {
    site: 'ste-code-input',
    attr: [
      'value=\'\'',
    ],
    props: [
      {
        name: 'value',
        description: '初始内容，支持双向绑定',
        type: 'string | number',
      },
      {
        name: 'mode',
        description: '输入框类型',
        type: 'string',
        values: [
          {
            name: 'box',
            description: '盒子模式',
          },
          {
            name: 'line',
            description: '底部横线模式',
          },
        ],
        default: 'box',
      },
      {
        name: 'maxlength',
        description: '最大长度',
        type: 'number',
        default: 6,
      },
      {
        name: 'space',
        description: '字符间的距离',
        type: 'string | number',
        default: 16,
      },
      {
        name: 'fontColor',
        description: '字体颜色',
        type: 'String',
        default: '#000000',
      },
      {
        name: 'borderColor',
        description: '边框颜色',
        type: 'String',
        default: '#DDDDDD',
      },
      {
        name: 'fontSize',
        description: '字体大小',
        type: 'string | number',
        default: 28,
      },
      {
        name: 'size',
        description: '输入框的大小，宽等于高',
        type: 'string | number',
        default: 64,
      },
      {
        name: 'formatter',
        description: '替换输入值',
        type: 'string | number',
      },
      {
        name: 'focus',
        description: '是否自动获取焦点',
        type: 'boolean ',
        default: false,
      },
      {
        name: 'disabledDot',
        description: '是否禁止输入点符号 默认 true',
        type: 'boolean',
        default: true,
      },
      {
        name: 'readOnly',
        description: '是否只读',
        type: 'boolean',
        default: false,
      },
    ],
    events: [
      {
        name: 'change',
        description: '改变时触发',
        type: '(value: string | number) => void',
      },
      {
        name: 'finish',
        description: '输入完成触发',
        type: '(value: string | number) => void',
      },
    ],
  },
  'date-picker': {
    site: 'ste-date-picker',
    attr: [
      'value=\'\'',
    ],
    props: [
      {
        name: 'value',
        description: '绑定值',
        type: 'string | number',
      },
      {
        name: 'showToolbar',
        description: '是否显示顶部的操作栏',
        type: 'boolean',
        default: true,
      },
      {
        name: 'title',
        description: '顶部标题',
        type: 'string',
      },
      {
        name: 'mode',
        description: '展示格式',
        type: 'string',
        values: [
          {
            name: 'all',
            description: '年月日时分秒',
          },
          {
            name: 'datetime',
            description: '年月日时分',
          },
          {
            name: 'date',
            description: '年月日',
          },
          {
            name: 'year-month',
            description: '年月',
          },
          {
            name: 'month-day',
            description: '月日',
          },
          {
            name: 'time',
            description: '时分秒',
          },
          {
            name: 'hour-minute',
            description: '时分',
          },
          {
            name: 'minute-second',
            description: '分秒',
          },
        ],
        default: 'all',
      },
      {
        name: 'maxDate',
        description: '可选的最大时间',
        type: 'number',
        default: '后10年',
      },
      {
        name: 'minDate',
        description: '可选的最小时间',
        type: 'number',
        default: '前10年',
      },
      {
        name: 'filter',
        description: '选项过滤函数',
        type: 'function',
      },
      {
        name: 'formatter',
        description: '选项格式化函数',
        type: 'function',
      },
      {
        name: 'itemHeight',
        description: '各列中，单个选项的高度',
        type: 'string | number',
        default: 36,
      },
      {
        name: 'cancelText',
        description: '取消按钮的文字',
        type: 'string',
        default: '取消',
      },
      {
        name: 'confirmText',
        description: '确认按钮的文字',
        type: 'string',
        default: '确认',
      },
      {
        name: 'cancelColor',
        description: '取消按钮的颜色',
        type: 'string',
        default: '#909193',
      },
      {
        name: 'confirmColor',
        description: '确认按钮的颜色',
        type: 'string',
        default: '#3c9cff',
      },
      {
        name: 'visibleItemCount',
        description: '每列中可见选项的数量',
        type: 'string | number',
        default: 5,
      },
    ],
    events: [
      {
        name: 'confirm',
        description: '点击确定按钮，返回当前选择的值',
        type: '() => void',
      },
      {
        name: 'change',
        description: '当选择值变化时触发',
        type: '() => void',
      },
      {
        name: 'cancel',
        description: '点击取消按钮',
        type: '() => void',
      },
    ],
  },
  'drag': {
    site: 'ste-drag',
    attr: [
      'attract=\'\'',
    ],
    props: [
      {
        name: 'attract',
        description: '是否开启自动吸边（根据 screenWidth 进行吸边）',
        type: 'boolean',
        default: false,
      },
      {
        name: 'direction',
        description: '拖拽元素的拖拽方向限制',
        type: 'string',
        values: [
          {
            name: 'all',
            description: '不限制方向',
          },
          {
            name: 'x',
            description: '横向拖拽',
          },
          {
            name: 'y',
            description: '竖向拖拽',
          },
        ],
        default: 'all',
      },
      {
        name: 'boundary',
        description: '拖拽元素的拖拽边界',
        type: 'object',
        default: '屏幕为边界',
      },
    ],
    events: [
      {
        name: 'start',
        description: '拖拽开始',
        type: '(t) => void',
      },
      {
        name: 'end',
        description: '拖拽结束',
        type: '() => void',
      },
    ],
  },
  'dropdown-menu': {
    site: 'ste-dropdown-menu',
    attr: [
      'title=\'\'',
    ],
    props: [
      {
        name: 'title',
        description: '菜单标题，未设置时会显示选中项的值',
        type: 'string',
      },
      {
        name: 'value',
        description: '下拉菜单选中的值',
        type: 'string | array',
      },
      {
        name: 'inactiveColor',
        description: '未选中颜色',
        type: 'string',
        default: '#000000',
      },
      {
        name: 'activeColor',
        description: '选中色',
        type: 'string',
        default: '#0090FF',
      },
      {
        name: 'direction',
        description: '展开方向',
        type: 'string',
        default: 'down',
        values: [
          {
            name: 'up',
            description: '向上展开',
          },
          {
            name: 'down',
            description: '向下展开',
          },
        ],
      },
      {
        name: 'duration',
        description: '展开动画执行时间',
        type: 'number',
        default: '0.2',
      },
      {
        name: 'showMask',
        description: '是否展示遮罩',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'isMaskClick',
        description: '是否点击遮罩关闭',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'zIndex',
        description: '弹窗层级z-index',
        type: 'number',
      },
      {
        name: 'type',
        description: '下拉选项的形状',
        type: 'string',
        default: 'block',
        values: [
          {
            name: 'round',
            description: '圆形',
          },
          {
            name: 'block',
            description: '块状',
          },
        ],
      },
      {
        name: 'max',
        description: '可选数量',
        type: 'number',
        default: '1',
      },
    ],
    events: [
      {
        name: 'change',
        description: '选项改变时触发',
        type: '(value: any[]) => void',
        params: [
          {
            name: 'value',
            description: '选中的值',
          },
        ],
      },
      {
        name: 'open',
        description: '菜单打开',
        type: '() => void',
      },
      {
        name: 'close',
        description: '菜单收起',
        type: '() => void',
      },
    ],
  },
  'ste-dropdown-menu-item': {
    site: 'ste-dropdown-menu-item',
    attr: [
      '',
    ],
  },
  'icon': {
    site: 'ste-icon',
    attr: [
      'code=\'\'',
    ],
    props: [
      {
        name: 'code',
        description: '图标名称',
        type: 'string',
      },
      {
        name: 'color',
        description: '图标颜色',
        type: 'string',
      },
      {
        name: 'size',
        description: '图标大小，单位rpx',
        type: 'string | number',
        default: 28,
      },
      {
        name: 'bold',
        description: '图标是否粗体',
        type: 'boolean',
        default: false,
      },
      {
        name: 'marginLeft',
        description: '左外边距，单位rpx',
        type: 'string | number',
        default: 0,
      },
      {
        name: 'marginRight',
        description: '右外边距，单位rpx',
        type: 'string | number',
        default: 0,
      },
      {
        name: 'marginTop',
        description: '上外边距，单位rpx',
        type: 'string | number',
        default: 0,
      },
      {
        name: 'marginBottom',
        description: '下外边距，单位rpx',
        type: 'string | number',
        default: 0,
      },
      {
        name: 'fontFamily',
        description: '字体名',
        type: 'string',
        default: '',
      },
      {
        name: 'inlineBlock',
        description: '容器对齐方式',
        type: 'boolean',
        default: true,
      },
    ],
    events: [
      {
        name: 'click',
        description: '图标点击回调事件',
        type: '() => void',
      },
    ],
  },
  'image': {
    site: 'ste-image',
    attr: [
      'src=\'\'',
    ],
    props: [
      {
        name: 'src',
        description: '图片地址',
        type: 'string',
        version: '1.0.0',
      },
      {
        name: 'width',
        description: '宽度',
        type: 'string | number',
        default: '100%',
      },
      {
        name: 'height',
        description: '高度',
        type: 'string | number',
        default: '100%',
      },
      {
        name: 'radius',
        description: '圆角',
        type: 'string | number',
        default: '0',
      },
      {
        name: 'mode',
        description: '图片裁剪、缩放的模式',
        type: 'string',
        default: 'scaleToFill',
        values: [
          {
            name: 'scaleToFill',
            description: '不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素。',
          },
          {
            name: 'aspectFit',
            description: '保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。',
          },
          {
            name: 'aspectFill',
            description: '保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取',
          },
          {
            name: 'widthFix',
            description: '宽度不变，高度自动变化，保持原图宽高比不变',
          },
          {
            name: 'heightFix',
            description: '高度不变，宽度自动变化，保持原图宽高比不变',
          },
          {
            name: 'top',
            description: '不缩放图片，只显示图片的顶部区域',
          },
          {
            name: 'bottom',
            description: '不缩放图片，只显示图片的底部区域',
          },
          {
            name: 'center',
            description: '不缩放图片，只显示图片的中间区域',
          },
          {
            name: 'left',
            description: '不缩放图片，只显示图片的左边区域',
          },
          {
            name: 'right',
            description: '不缩放图片，只显示图片的右边区域',
          },
          {
            name: 'top left',
            description: '不缩放图片，只显示图片的左上边区域',
          },
          {
            name: 'top right',
            description: '不缩放图片，只显示图片的右上边区域',
          },
          {
            name: 'bottom left',
            description: '不缩放图片，只显示图片的左下边区域',
          },
          {
            name: 'bottom right',
            description: '不缩放图片，只显示图片的右下边区域',
          },
        ],
      },
      {
        name: 'display',
        description: '盒子模型',
        type: 'string',
        default: 'inline-flex',
        values: [
          {
            name: 'block',
            description: '块级元素',
          },
          {
            name: 'inline-block',
            description: '行内块级元素',
          },
          {
            name: 'inline',
            description: '行内元素',
          },
          {
            name: 'flex',
            description: '弹性布局',
          },
          {
            name: 'inline-flex',
            description: '行内弹性布局',
          },
          {
            name: 'none',
            description: 'none',
          },
          {
            name: 'inherit',
            description: '继承父元素',
          },
        ],
      },
      {
        name: 'hiddenLoading',
        description: '是否隐藏图片未加载的占位内容',
        type: 'boolean',
        default: false,
      },
      {
        name: 'hiddenError',
        description: '是否隐藏图片加载失败的占位内容',
        type: 'boolean',
        default: false,
      },
      {
        name: 'showMenuByLongpress',
        description: '长按图片显示发送给朋友、收藏、保存图片、搜一搜、打开名片/前往群聊/打开小程序（若图片中包含对应二维码或小程序码）的菜单',
        type: 'boolean',
        default: false,
      },
      {
        name: 'lazyLoad',
        description: '图片懒加载，在即将进入一定范围（上下三屏）时才开始加载',
        type: 'boolean',
        default: false,
      },
    ],
    events: [
      {
        name: 'click',
        description: '图片点击触发',
        type: '(event: UniEvent) => void',
        params: [
          {
            name: 'event',
            description: '当前图片Event',
          },
        ],
      },
      {
        name: 'load',
        description: '图片加载成功触发',
        type: '(event: UniEvent) => void',
        params: [
          {
            name: 'event',
            description: '当前图片Event',
          },
        ],
      },
      {
        name: 'error',
        description: '图片加载失败触发',
        type: '(event: UniEvent) => void',
        params: [
          {
            name: 'event',
            description: '当前图片Event',
          },
        ],
      },
    ],
  },
  'ste-index-item': {
    site: 'ste-index-item',
    attr: [
      '',
    ],
  },
  'index-list': {
    site: 'ste-index-list',
    attr: [
      'active=\'\'',
    ],
    props: [
      {
        name: 'active',
        description: '当前激活的节点',
        type: 'number',
        default: 0,
      },
      {
        name: 'height',
        description: '滚动区域高度',
        type: 'number | string',
        default: '100%',
      },
      {
        name: 'sticky',
        description: '默认标题是否粘性布局',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'inactiveColor',
        description: '右边锚点状态非激活时的颜色',
        type: 'string',
        default: '#666',
      },
      {
        name: 'activeColor',
        description: '右边锚点状态激活时的颜色',
        type: 'string',
        default: '#FF1A00',
      },
    ],
    events: [
      {
        name: 'change',
        description: '激活节点改变时触发',
        type: '(index:number)=>void',
      },
      {
        name: 'clickItem',
        description: '点击右边锚点时触发',
        type: '(title:string,text:string)=>void',
      },
    ],
  },
  'input': {
    site: 'ste-input',
    attr: [
      'value=\'\'',
    ],
    props: [
      {
        name: 'value',
        description: '初始内容，支持双向绑定',
        type: 'number | string',
      },
      {
        name: 'type',
        description: '输入框类型',
        type: 'string',
        values: [
          {
            name: 'text',
            description: '纯文本输入',
          },
          {
            name: 'textarea',
            description: '文本域',
          },
          {
            name: 'tel',
            description: '电话输入',
          },
          {
            name: 'number',
            description: '数字输入',
          },
          {
            name: 'idcard',
            description: '身份证输入键盘',
          },
          {
            name: 'digit',
            description: '小数点的数字键盘',
          },
          {
            name: 'password',
            description: '密码类型',
          },
          {
            name: 'nickname',
            description: '昵称输入(微信小程序)',
          },
          {
            name: 'numberpad',
            description: '仅支付宝小程序',
          },
          {
            name: 'digitpad',
            description: '仅支付宝小程序',
          },
          {
            name: 'idcardpad',
            description: '仅支付宝小程序',
          },
        ],
      },
      {
        name: 'placeholder',
        description: '占位符',
        type: 'string',
      },
      {
        name: 'placeholderStyle',
        description: '指定placeholder的样式',
        type: 'string | object',
      },
      {
        name: 'placeholderClass',
        description: '指定placeholder的类',
        type: 'string',
      },
      {
        name: 'disabled',
        description: '是否禁用',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'clearable',
        description: '是否有清空按钮',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'maxlength',
        description: '最大长度',
        type: 'number',
      },
      {
        name: 'showWordLimit',
        description: '是否显示字数统计',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'confirmType',
        description: '设置右下角按钮的文字',
        type: 'string',
        values: [
          {
            name: 'send',
            description: '右下角按钮为\'发送\'',
          },
          {
            name: 'search',
            description: '右下角按钮为\'搜索\'',
          },
          {
            name: 'next',
            description: '右下角按钮为\'下一个\'',
          },
          {
            name: 'go',
            description: '右下角按钮为\'前往\'',
          },
          {
            name: 'done',
            description: '右下角按钮为\'完成\'',
          },
        ],
      },
      {
        name: 'focus',
        description: '是否聚焦，支持双向绑定',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'inputAlign',
        description: '对齐方式',
        type: 'string',
        values: [
          {
            name: 'left',
            description: '向左对齐',
          },
          {
            name: 'center',
            description: '居中对齐',
          },
          {
            name: 'right',
            description: '向右对齐',
          },
        ],
      },
      {
        name: 'fontSize',
        description: '输入框字体大小，单位rpx',
        type: 'number | string',
      },
      {
        name: 'fontColor',
        description: '输入框字体颜色',
        type: 'string',
      },
      {
        name: 'readonly',
        description: '是否只读，与禁用不同，只读不会置灰',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'shape',
        description: '输入框形状',
        type: 'string',
        values: [
          {
            name: 'square',
            description: '方形',
          },
          {
            name: 'circle',
            description: '圆形',
          },
          {
            name: 'line',
            description: '线形',
          },
        ],
      },
      {
        name: 'border',
        description: '是否有边框',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'borderColor',
        description: '边框颜色',
        type: 'string',
      },
      {
        name: 'background',
        description: '输入框背景色',
        type: 'string',
      },
      {
        name: 'rootClass',
        description: '自定义输入框类名',
        type: 'string',
      },
      {
        name: 'cursorSpacing',
        description: '指定光标与键盘的距离',
        type: 'number',
      },
      {
        name: 'allowSpace',
        description: '是否允许输入空格',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'cursor',
        description: '指定focus时光标的位置',
        type: 'number',
        default: '0',
      },
      {
        name: 'password',
        description: '是否是密码类型,H5和App写此属性时，type失效',
        type: 'boolean',
        default: 'false',
      },
    ],
    events: [
      {
        name: 'blur',
        description: '输入框失去焦点事件',
        type: '(value: string | number) => void',
        params: [
          {
            name: 'value',
            description: '输入框的值',
          },
        ],
      },
      {
        name: 'focus',
        description: '聚焦事件',
        type: '(value: string | number) => void',
        params: [
          {
            name: 'value',
            description: '输入框的值',
          },
        ],
      },
      {
        name: 'confirm',
        description: '输入框输入键盘右下角点击事件',
        type: '(value: string | number) => void',
        params: [
          {
            name: 'value',
            description: '输入框的值',
          },
        ],
      },
      {
        name: 'clear',
        description: '清除输入框事件',
        type: '() => void',
      },
      {
        name: 'input',
        description: '输入事件',
        type: '(value: string | number) => void',
        params: [
          {
            name: 'value',
            description: '输入框的值',
          },
        ],
      },
    ],
  },
  'loading': {
    site: 'ste-loading',
    attr: [
      'color=\'\'',
    ],
    props: [
      {
        name: 'color',
        description: '图标颜色',
        type: 'String',
        default: '#999999',
      },
      {
        name: 'textColor',
        description: '提示文本颜色，默认和图标颜色同步',
        type: 'String',
        default: '',
      },
      {
        name: 'textSize',
        description: '文本大小，单位rpx',
        type: 'Number',
        default: 28,
      },
      {
        name: 'type',
        description: '类型',
        type: 'Number',
        default: 1,
        values: [
          {
            name: 1,
            description: '逐渐减淡的颜色为主色的透明度变化 透明度以10%的差距逐渐递减',
          },
          {
            name: 2,
            description: '动态转圈展示',
          },
        ],
      },
      {
        name: 'size',
        description: '图标大小，单位rpx',
        type: 'Number',
        default: 60,
      },
      {
        name: 'vertical',
        description: '是否垂直排列图标和文字内容',
        type: 'Boolean',
        default: false,
      },
    ],
    events: [],
  },
  'media-preview': {
    site: 'ste-media-preview',
    attr: [
      'show=\'\'',
    ],
    props: [
      {
        name: 'show',
        description: '是否显示',
        type: 'boolean',
        default: false,
      },
      {
        name: 'urls',
        description: '图片路径列表',
        type: 'Array<string>',
        default: [],
      },
      {
        name: 'autoplay',
        description: '自动轮播时长，为0不自动轮播，单位ms',
        type: 'number',
        default: 0,
      },
      {
        name: 'loop',
        description: '是否前后衔接播放',
        type: 'boolean',
        default: false,
      },
      {
        name: 'index',
        description: '默认展示的资源下标',
        type: 'number',
        default: 0,
      },
      {
        name: 'showIndex',
        description: '是否显示左下角索引',
        type: 'boolean',
        default: false,
      },
      {
        name: 'scale',
        description: '是否支持双指缩放',
        type: 'boolean',
        default: false,
      },
      {
        name: 'showmenu',
        description: '是否开启图片长按菜单',
        type: 'boolean',
        default: true,
      },
    ],
    events: [
      {
        name: 'beforeClose',
        description: '关闭前触发',
        type: '() => void',
      },
      {
        name: 'close',
        description: '关闭后触发',
        type: '() => void',
      },
      {
        name: 'change',
        description: '切换时触发',
        type: '(index: number) => void',
        params: [
          {
            name: 'index',
            description: '切换后的下标',
          },
        ],
      },
      {
        name: 'longpress',
        description: '长按时触发',
        type: '(index: number) => void',
        params: [
          {
            name: 'index',
            description: '当前下标',
          },
        ],
      },
    ],
  },
  'message-box': {
    site: 'ste-message-box',
    attr: [
      'selector=\'\'',
    ],
    props: [
      {
        name: 'selector',
        description: '用于自定义插槽时的选择器',
        type: 'String',
        default: '',
      },
    ],
    events: [],
  },
  'notice-bar': {
    site: 'ste-notice-bar',
    attr: [
      'list=\'\'',
    ],
    props: [
      {
        name: 'list',
        description: '滚动数据列表',
        type: 'Array',
        default: [],
      },
      {
        name: 'direction',
        description: '滚动的方向',
        type: 'String',
        default: 'across',
        values: [
          {
            name: 'across',
            description: '水平',
          },
          {
            name: 'vertical',
            description: '垂直',
          },
        ],
      },
      {
        name: 'closeMode',
        description: '是否启用关闭模式',
        type: 'Boolean',
        default: false,
      },
      {
        name: 'color',
        description: '文字颜色',
        type: 'String',
        default: '#000000',
      },
      {
        name: 'background',
        description: '背景',
        type: 'String',
        default: '#ffffff',
      },
      {
        name: 'width',
        description: '宽度',
        type: 'Number|String',
        default: '100%',
        values: [
          {
            name: '100%',
            description: '填满',
          },
          {
            name: '{{Number}} ',
            description: '自定义宽度，单位rpx',
          },
        ],
      },
      {
        name: 'acrossSpeed',
        description: '滚动速率 (px/s)',
        type: 'Number',
        default: 50,
      },
      {
        name: 'verticalSpeed',
        description: '滚动的速度（ms)',
        type: 'Number',
        default: 500,
      },
      {
        name: 'delay',
        description: '延时（ms',
        type: 'Number',
        default: 1000,
      },
      {
        name: 'standTime',
        description: '每次滚动前停留多少毫秒(竖向滚动时有效)（ms）',
        type: 'Number',
        default: 1000,
      },
      {
        name: 'scrollable',
        description: '是否可以滚动',
        type: 'Boolean',
        default: true,
      },
    ],
    events: [
      {
        name: 'click',
        description: '外层点击事件回调',
        type: '() => void',
      },
      {
        name: 'close',
        description: '关闭通知栏时触发',
        type: '() => void',
      },
      {
        name: 'end',
        description: '滚动结束时触发',
        type: '() => void',
      },
    ],
  },
  'number-keyboard': {
    site: 'ste-number-keyboard',
    attr: [
      'mode=\'\'',
    ],
    props: [
      {
        name: 'mode',
        description: '键盘模式',
        type: 'string',
        default: 'popup',
        values: [
          {
            name: 'popup',
            description: '弹出式',
          },
          {
            name: 'page',
            description: '页面式',
          },
        ],
      },
      {
        name: 'modelValue',
        description: '输入值，支持v-model双向绑定',
        type: 'string',
      },
      {
        name: 'maxlength',
        description: 'value最大长度',
        type: 'number',
      },
      {
        name: 'show',
        description: '是否显示键盘，支持v-model:show绑定，mode=\'popup\'时生效',
        type: 'boolean',
        default: false,
      },
      {
        name: 'rightKeys',
        description: '是否显示右侧功能键',
        type: 'boolean',
        default: true,
      },
      {
        name: 'randomKeys',
        description: '按键是否随机排列',
        type: 'boolean',
        default: false,
      },
      {
        name: 'confirmText',
        description: '右侧确定按钮文本',
        type: 'string',
        default: '确定',
      },
      {
        name: 'confirmDisabled',
        description: '右侧确认是否禁用',
        type: 'boolean',
        default: false,
      },
      {
        name: 'customKeys',
        description: '自定义按键，建议数量不大于2',
        type: 'string[]',
        default: [],
      },
      {
        name: 'showClear',
        description: '是否显示清空按钮',
        type: 'boolean',
        default: true,
      },
      {
        name: 'textColor',
        description: '按键文字颜色',
        type: 'string',
        default: '#000000',
      },
      {
        name: 'textSize',
        description: '按键文字大小',
        type: 'number | string',
        default: 48,
      },
      {
        name: 'confirmBg',
        description: '确定按钮背景颜色',
        type: 'string',
        default: '#0090FF',
      },
      {
        name: 'confirmColor',
        description: '确定按钮文字颜色',
        type: 'string',
        default: '#ffffff',
      },
    ],
    events: [
      {
        name: 'change',
        description: '输入值value改变时触发',
        type: '(value: string) => void',
        params: [
          {
            name: 'value',
            description: '输入值',
          },
        ],
      },
      {
        name: 'clear',
        description: '清空按钮点击事件',
        type: '() => void',
      },
      {
        name: 'backspace',
        description: '删除按钮点击事件',
        type: '() => void',
      },
      {
        name: 'confirm',
        description: '确认按钮点击事件',
        type: '(value:string) => void',
        params: [
          {
            name: 'value',
            description: '输入值',
          },
        ],
      },
      {
        name: 'click',
        description: '点击功能键(确认/删除/清除)之外的键盘触发',
        type: '(key:string) => void',
        params: [
          {
            name: 'key',
            description: '当前点击的按钮',
          },
        ],
      },
      {
        name: 'beforeinput',
        description: '输入之前触发，功能键之外的键盘点击时为输入',
        type: '(key: string, suspend: () => void, next: () => void, stop: () => void) => void',
        params: [
          {
            name: 'key',
            description: '当前点击的按钮',
          },
          {
            name: 'suspend',
            description: '开启等待的回调函数',
          },
          {
            name: 'next',
            description: '执行后续操作的回调函数',
          },
          {
            name: 'stop',
            description: '阻止后续执行的回调函数',
          },
        ],
      },
      {
        name: 'open',
        description: '打开弹窗键盘触发',
        type: '() => void',
      },
      {
        name: 'close',
        description: '关闭弹窗键盘触发',
        type: '() => void',
      },
    ],
  },
  'ste-picker': {
    site: 'ste-picker',
    attr: [
      '',
    ],
  },
  'popup': {
    site: 'ste-popup',
    attr: [
      'show=\'\'',
    ],
    props: [
      {
        name: 'show',
        description: '是否显示弹出层，使用v-model修饰符来双向绑定',
        type: 'boolean',
        default: false,
      },
      {
        name: 'backgroundColor',
        description: '内容容器的背景色',
        type: 'string',
        default: '#ffffff',
      },
      {
        name: 'isMaskClick',
        description: '是否可以点击遮罩层关闭',
        type: 'boolean',
        default: true,
      },
      {
        name: 'width',
        description: '内容区宽度',
        type: 'string | number',
        default: 'auto',
      },
      {
        name: 'height',
        description: '内容区高度',
        type: 'string | number',
        default: 'auto',
      },
      {
        name: 'position',
        description: '弹出位置',
        type: 'string',
        values: [
          {
            name: 'center',
            description: '中',
          },
          {
            name: 'top',
            description: '上',
          },
          {
            name: 'bottom',
            description: '下',
          },
          {
            name: 'left',
            description: '左',
          },
          {
            name: 'right',
            description: '右',
          },
        ],
        default: 'center',
      },
      {
        name: 'round',
        description: '是否圆角',
        type: 'boolean',
        default: false,
      },
      {
        name: 'showClose',
        description: '是否右上角显示关闭图标',
        type: 'boolean',
        default: true,
      },
      {
        name: 'offsetX',
        description: '根据弹出位置，设置X轴偏移量，单位px 默认 0',
        type: 'string | number ',
      },
      {
        name: 'offsetY',
        description: '根据弹出位置，设置Y轴偏移量，单位px 默认 0',
        type: 'string | number',
      },
      {
        name: 'duration',
        description: '动画持续时间，单位ms',
        type: 'number',
        default: 200,
      },
      {
        name: 'zIndex',
        description: '弹窗层级z-index',
        type: 'number',
        default: 998,
      },
      {
        name: 'keepContent',
        description: '隐藏后是否不销毁弹窗内容元素',
        type: 'boolean',
        default: true,
      },
    ],
    events: [
      {
        name: 'close',
        description: '弹窗关闭动画执行完毕事件',
        type: '() => void',
      },
      {
        name: 'open',
        description: '弹窗打开动画执行完毕事件',
        type: '() => void',
      },
      {
        name: 'maskClick',
        description: '点击遮罩时触发',
        type: '() => void',
      },
    ],
  },
  'price': {
    site: 'ste-price',
    attr: [
      'value=\'\'',
    ],
    props: [
      {
        name: 'value',
        description: '金额 默认值 0',
        type: 'string | number',
        default: 0,
      },
      {
        name: 'valueUnit',
        description: '金额单位',
        type: 'string',
        values: [
          {
            name: 'fen',
            description: '分',
          },
          {
            name: 'yuan',
            description: '元',
          },
        ],
        default: 'fen',
      },
      {
        name: 'showUnit',
        description: '是否显示符号',
        type: 'boolean',
        default: true,
      },
      {
        name: 'unitSymbol',
        description: '符号标记',
        type: 'string',
        default: '¥',
      },
      {
        name: 'digits',
        description: '精度',
        type: 'number',
        values: [
          {
            name: -1,
            description: '不处理',
          },
          {
            name: 0,
            description: '取整（四舍五入）',
          },
          {
            name: 1,
            description: '保留1位小数（四舍五入）',
          },
          {
            name: 2,
            description: '保留2位小数（四舍五入）',
          },
        ],
        default: -1,
      },
      {
        name: 'fontSize',
        description: '金额文字尺寸',
        type: 'string | number',
        default: 30,
      },
      {
        name: 'color',
        description: '文字颜色',
        type: 'string',
        default: '#ff1e19',
      },
      {
        name: 'linePriceColor',
        description: '划线价文字颜色',
        type: 'string',
        default: '#999999',
      },
      {
        name: 'lineHeight',
        description: '行高，Number，单位rpx，String，同原生 默认值 1',
        type: 'string | number',
        default: 1,
      },
      {
        name: 'isSuggestPrice',
        description: '是否划线价',
        type: 'boolean',
      },
      {
        name: 'marginLeft',
        description: '左边距',
        type: 'string | number',
        default: 0,
      },
      {
        name: 'marginRight',
        description: '右边距',
        type: 'string | number',
        default: 0,
      },
      {
        name: 'marginTop',
        description: '上边距',
        type: 'string | number',
        default: 0,
      },
      {
        name: 'marginBottom',
        description: '下边距',
        type: 'string | number',
        default: 0,
      },
      {
        name: 'styleType',
        description: '金额样式',
        type: 'number',
        values: [
          {
            name: 1,
            description: '元和角分大小相等（特殊价格）',
          },
          {
            name: 2,
            description: '角分小于元（常规价格',
          },
          {
            name: 3,
            description: '价格符号和角，分相等',
          },
        ],
        default: 2,
      },
      {
        name: 'bold',
        description: '是否加粗',
        type: 'boolean',
      },
      {
        name: 'formatter',
        description: '格式化函数',
        type: 'function',
      },
    ],
    events: [
      {
        name: 'click',
        description: '点击事件',
        type: '() => void',
      },
    ],
  },
  'progress': {
    site: 'ste-progress',
    attr: [
      'activeBg=\'\'',
    ],
    props: [
      {
        name: 'activeBg',
        description: '激活状态下的背景色',
        type: 'string',
        default: '#0090ff',
      },
      {
        name: 'inactiveBg',
        description: '非激活状态下的背景色',
        type: 'string',
        default: '#eeeeee',
      },
      {
        name: 'percentage',
        description: '百分比值',
        type: 'number',
        default: '0',
      },
      {
        name: 'strokeWidth',
        description: '描边宽度',
        type: 'string | number',
        default: '24',
      },
      {
        name: 'disabled',
        description: '是否禁用',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'width',
        description: '宽度',
        type: 'string | number',
        default: '\'100%\'',
      },
      {
        name: 'duration',
        description: '动画持续时间（秒）',
        type: 'number',
        default: '0.3',
      },
      {
        name: 'pivotText',
        description: '中心文字内容',
        type: 'string',
        default: '\'\'',
      },
      {
        name: 'textColor',
        description: '文字颜色',
        type: 'string',
        default: '#ffffff',
      },
      {
        name: 'textAlign',
        description: '文字对齐方式',
        type: 'string',
        default: '\'right\'',
      },
      {
        name: 'textSize',
        description: '文字大小',
        type: 'string | number',
        default: '16',
      },
      {
        name: 'displayTextThreshold',
        description: '显示文本的阈值',
        type: 'number',
        default: '0',
      },
    ],
    events: [],
  },
  'radio': {
    site: 'ste-radio',
    attr: [
      'v-model=\'\'',
    ],
    props: [
      {
        name: 'v-model',
        description: '当前值',
        type: 'string',
      },
      {
        name: 'name',
        description: '选项的值',
        type: 'number | string',
      },
      {
        name: 'disabled',
        description: '禁用',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'readonly',
        description: '只读（不置灰）',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'shape',
        description: '形状',
        type: 'string',
        default: 'circle',
        values: [
          {
            name: 'circle',
            description: '圆形',
          },
          {
            name: 'square',
            description: '方形',
          },
        ],
      },
      {
        name: 'iconSize',
        description: '图标大小，单位rpx',
        type: 'number | string',
        default: '36',
      },
      {
        name: 'checkedColor',
        description: '选中状态的图标颜色',
        type: 'string',
        default: '#0090FF0',
      },
      {
        name: 'textPosition',
        description: '文本的位置',
        type: 'string',
        default: 'right',
        values: [
          {
            name: 'right',
            description: '右',
          },
          {
            name: 'left',
            description: '左',
          },
        ],
      },
      {
        name: 'textSize',
        description: '文本字体大小，单位rpx',
        type: 'number | string',
        default: '28',
      },
      {
        name: 'textInactiveColor',
        description: '未选中的文本颜色',
        type: 'string',
        default: '#000000',
      },
      {
        name: 'textActiveColor',
        description: '选中的文本颜色',
        type: 'string',
        default: '#000000',
      },
      {
        name: 'textDisabled',
        description: '禁用文本点击',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'marginLeft',
        description: '左边距，单位rpx',
        type: 'number | string',
        default: '0',
      },
      {
        name: 'marginRight',
        description: '右边距，单位rpx',
        type: 'number | string',
        default: '0',
      },
      {
        name: 'columnGap',
        description: '单选框和文本间距，单位rpx',
        type: 'number | string',
        default: '16',
      },
    ],
    events: [
      {
        name: 'click',
        description: '点击复选框时触发的事件',
        type: '(value:string | number,suspend: ()=>void,next: ()=>void,stop: ()=>void) => void',
        params: [
          {
            name: 'value',
            description: '当前复选框的绑定值',
          },
          {
            name: 'suspend',
            description: '等待',
          },
          {
            name: 'next',
            description: '继续',
          },
          {
            name: 'stop',
            description: '停止',
          },
        ],
      },
      {
        name: 'change',
        description: '当绑定值变化时触发的事件',
        type: '(value: string | number) => void',
        params: [
          {
            name: 'value',
            description: '当前复选框的绑定值',
          },
        ],
      },
    ],
  },
  'ste-radio-group': {
    site: 'ste-radio-group',
    attr: [
      '',
    ],
  },
  'rate': {
    site: 'ste-rate',
    attr: [
      'modelValue=\'\'',
    ],
    props: [
      {
        name: 'modelValue',
        description: '当前评分数（支持v-model双向绑定）',
        type: 'Number',
        default: 0,
      },
      {
        name: 'count',
        description: '图标总数',
        type: 'Number',
        default: 5,
      },
      {
        name: 'score',
        description: '每颗星星代表的分数',
        type: 'Number',
        default: 1,
      },
      {
        name: 'disabled',
        description: '禁用',
        type: 'Boolean',
        default: false,
      },
      {
        name: 'readonly',
        description: '只读（不置灰）',
        type: 'Boolean',
        default: false,
      },
      {
        name: 'size',
        description: '评分图标的大小，单位rpx',
        type: 'Number|String',
        default: 44,
      },
      {
        name: 'inactiveColor',
        description: '未选中的颜色',
        type: 'String',
        default: '#dddddd',
      },
      {
        name: 'activeColor',
        description: '选中的颜色',
        type: 'String',
        default: '#fa5014',
      },
      {
        name: 'inactiveCode',
        description: '未选中的图标code',
        type: 'String',
        default: '&#xe681',
      },
      {
        name: 'activeCode',
        description: '选中的图标code',
        type: 'String',
        default: '&#xe684',
      },
      {
        name: 'gutter',
        description: '每个图标之间的距离，单位rpx',
        type: 'Number|String',
        default: 10,
      },
      {
        name: 'iconData',
        description: '每个分值对应的图标code',
        type: 'Array',
        default: '() => []',
      },
    ],
    events: [
      {
        name: 'change',
        description: '当前分值变化时触发的事件',
        type: '() => void',
      },
    ],
  },
  'read-more': {
    site: 'ste-read-more',
    attr: [
      'showHeight=\'\'',
    ],
    props: [
      {
        name: 'showHeight',
        description: '需要折叠的高度',
        type: 'string | number',
        default: 400,
      },
      {
        name: 'toggle',
        description: '展开后是否显示收起按钮',
        type: 'boolean',
        default: false,
      },
      {
        name: 'closeText',
        description: '\'展开阅读\'的文本',
        type: 'string',
        default: '展开阅读全文',
      },
      {
        name: 'openText',
        description: '\'收起\'的文本',
        type: 'string',
        default: '收起',
      },
      {
        name: 'fontSize',
        description: '字体大小',
        type: 'string | number',
        default: '28',
      },
      {
        name: 'color',
        description: '文本颜色',
        type: 'string',
        default: '#666666',
      },
    ],
    events: [
      {
        name: 'open',
        description: '展开时触发',
        type: '() => void',
      },
      {
        name: 'click',
        description: '收起时触发',
        type: '() => void',
      },
    ],
  },
  'rich-text': {
    site: 'ste-rich-text',
    attr: [
      'text=\'\'',
    ],
    props: [
      {
        name: 'text',
        description: '富文本值',
        type: 'string',
        default: '',
      },
      {
        name: 'space',
        description: '显示连续空格',
        type: 'string',
        default: 'nbsp',
        values: [
          {
            name: 'ensp',
            description: '中文字符空格一半大小',
          },
          {
            name: 'emsp',
            description: '中文字符空格大小',
          },
          {
            name: 'nbsp',
            description: '根据字体设置的空格大小',
          },
        ],
      },
      {
        name: 'userSelect',
        description: '文本是否可选',
        type: 'boolean',
        default: false,
      },
    ],
    events: [],
  },
  'scroll-to': {
    site: 'ste-scroll-to',
    attr: [
      'active=\'\'',
    ],
    props: [
      {
        name: 'active',
        description: '当前激活的节点',
        type: 'number',
        default: 0,
      },
      {
        name: 'height',
        description: '滚动区域高度',
        type: 'number | string',
        default: '100%',
      },
    ],
    events: [
      {
        name: 'change',
        description: '激活节点改变时触发',
        type: '(index:number)=>void',
      },
    ],
  },
  'ste-scroll-to-item': {
    site: 'ste-scroll-to-item',
    attr: [
      '',
    ],
  },
  'search': {
    site: 'ste-search',
    attr: [
      'type=\'\'',
    ],
    props: [
      {
        name: 'type',
        description: '组件类型',
        type: 'string',
        values: [
          {
            name: 'default',
            description: '正常搜索',
          },
          {
            name: 'nav',
            description: '导航栏',
          },
        ],
        default: 'default',
      },
      {
        name: 'modelValue',
        description: '当前值（支持v-model双向绑定）',
        type: 'string',
        default: '',
      },
      {
        name: 'placeholder',
        description: '占位提示符',
        type: 'string',
        default: '',
      },
      {
        name: 'hotWords',
        description: '热词列表',
        type: 'string[]',
        default: '[]',
      },
      {
        name: 'interval',
        description: '热词列表自动切换时间间隔',
        type: 'number',
        default: 3000,
      },
      {
        name: 'autoplay',
        description: '热词列表是否自动切换',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'disabled',
        description: '是否禁用状态',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'hiddenLine',
        description: '是否隐藏分割线',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'hiddenBtn',
        description: '是否隐藏搜索按钮',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'btnText',
        description: '搜索按钮文字',
        type: 'string',
        default: '搜索',
      },
      {
        name: 'hiddenInput',
        description: '是否隐藏输入框',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'clearable',
        description: '是否可清空',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'borderColor',
        description: '边框颜色',
        type: 'string',
        default: '#dddddd',
      },
      {
        name: 'background',
        description: '背景',
        type: 'string',
        default: '#ffffff',
      },
      {
        name: 'prefixIconColor',
        description: '前置图标颜色',
        type: 'string',
        default: '#bbbbbb',
      },
      {
        name: 'placeholderColor',
        description: '占位符字体颜色',
        type: 'string',
        default: '#bbbbbb',
      },
      {
        name: 'inputTextColor',
        description: '输入框文字颜色',
        type: 'string',
        default: '#000000',
      },
      {
        name: 'clearIconColor',
        description: '清除图标颜色',
        type: 'string',
        default: '#bbbbbb',
      },
      {
        name: 'btnTextColor',
        description: '搜索按钮文字颜色',
        type: 'string',
        default: '#0090FF',
      },
      {
        name: 'btnBackground',
        description: '搜索按钮背景',
        type: 'string',
      },
      {
        name: 'height',
        description: '高度，单位rpx',
        type: 'number',
        default: 64,
      },
      {
        name: 'radius',
        description: '圆角弧度，单位rpx',
        type: 'number',
        default: 32,
      },
      {
        name: 'focus',
        description: '是否聚焦(双向绑定)',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'suggestionsList',
        description: '搜索建议对应的数据',
        type: 'array',
        default: '[]',
      },
    ],
    events: [
      {
        name: 'input',
        description: '输入事件',
        type: '(value: string) => void',
        params: [
          {
            name: 'value',
            description: '输入框的值',
          },
        ],
      },
      {
        name: 'focus',
        description: '聚焦焦点事件',
        type: '(value: string) => void',
        params: [
          {
            name: 'value',
            description: '输入框的值',
          },
        ],
      },
      {
        name: 'blur',
        description: '失去焦点事件',
        type: '(value: string) => void',
        params: [
          {
            name: 'value',
            description: '输入框的值',
          },
        ],
      },
      {
        name: 'search',
        description: '确定搜索时触发',
        type: '(value: string) => void',
        params: [
          {
            name: 'value',
            description: '输入框的值',
          },
        ],
      },
      {
        name: 'clear',
        description: '点击清除按钮后触发',
        type: '() => void',
      },
      {
        name: 'click',
        description: '点击事件',
        type: '(value: string) => void',
        params: [
          {
            name: 'value',
            description: '输入框的值',
          },
        ],
      },
      {
        name: 'selectSuggestion',
        description: '点击搜索建议触发',
        type: '(item: object) => void',
        params: [
          {
            name: 'item',
            description: '热词列表对象',
          },
        ],
      },
    ],
  },
  'select': {
    site: 'ste-select',
    attr: [
      'modelValue=\'\'',
    ],
    props: [
      {
        name: 'modelValue',
        description: '绑定的值，支持v-model双向绑定',
        type: 'number | string | Array<number | string>',
      },
      {
        name: 'list',
        description: '选项数据',
        type: 'SelectOption[] | SelectOption[][]',
        default: [],
      },
      {
        name: 'mode',
        description: '选择模式',
        type: 'string',
        default: 'default',
        values: [
          {
            name: 'default',
            description: '默认模式',
          },
          {
            name: 'filterable',
            description: '可搜索选择器',
          },
          {
            name: 'tree',
            description: '树形选择器',
          },
          {
            name: 'date',
            description: '日期时间选择器模式：日期选择器（该模式下list属性无效）',
          },
          {
            name: 'datetime',
            description: '日期时间选择器模式：日期时间选择器（该模式下list属性无效）',
          },
          {
            name: 'time',
            description: '日期时间选择器模式：时间选择器（该模式下list属性无效）',
          },
          {
            name: 'month',
            description: '日期时间选择器模式：年月选择器（该模式下list属性无效）',
          },
          {
            name: 'minute',
            description: '日期时间选择器模式：时分选择器（该模式下list属性无效）',
          },
        ],
      },
      {
        name: 'minDate',
        description: '最小日期,mode为日期时间选择器时生效',
        type: 'number | string | Date',
      },
      {
        name: 'maxDate',
        description: '最大日期,mode为日期时间选择器时生效',
        type: 'number | string | Date',
      },
      {
        name: 'dateUnit',
        description: '选项是否显示时间单位,mode为日期时间选择器时生效',
        type: 'boolean',
      },
      {
        name: 'width',
        description: '宽度，单位rpx',
        type: 'number | string',
        default: '100%',
      },
      {
        name: 'height',
        description: '高度，单位rpx',
        type: 'number | string',
        default: 64,
      },
      {
        name: 'fontSize',
        description: '字体大小，单位rpx',
        type: 'number | string',
        default: 28,
      },
      {
        name: 'background',
        description: '背景',
        type: 'string',
        default: '#fff',
      },
      {
        name: 'maskClose',
        description: '点击遮罩层是否关闭',
        type: 'boolean',
        default: true,
      },
      {
        name: 'optionsWidth',
        description: '选项框宽度，默认跟随width',
        type: 'number | string',
        default: 'auto',
      },
      {
        name: 'placeholder',
        description: '占位符',
        type: 'string',
        default: '请选择',
      },
      {
        name: 'labelKey',
        description: '选项标签Key',
        type: 'string',
        default: 'label',
      },
      {
        name: 'valueKey',
        description: '选项值Key',
        type: 'string',
        default: 'value',
      },
      {
        name: 'childrenKey',
        description: '数据列表中显示的键名（mode为tree时生效）',
        type: 'string',
        default: 'children',
      },
      {
        name: 'multiple',
        description: '是否多选（list为一维数组时生效）',
        type: 'boolean',
        default: false,
      },
      {
        name: 'allowCreate',
        description: '是否允许创建（mode为filterable时生效）',
        type: 'boolean',
        default: false,
      },
      {
        name: 'borderColor',
        description: '边框颜色，若不要边框可设置为透明色',
        type: 'string',
        default: '#ebebeb',
      },
      {
        name: 'borderRadius',
        description: '圆角大小，单位RPX',
        type: 'number | string',
        default: 8,
      },
      {
        name: 'optionsPosition',
        description: '选项框位置',
        type: 'string',
        default: 'auto',
        values: [
          {
            name: 'auto',
            description: '自动展示位置，默认',
          },
          {
            name: 'auto-start',
            description: '上下自适应，左侧对其',
          },
          {
            name: 'auto-end',
            description: '上下自适应，右侧对其',
          },
          {
            name: 'bottom',
            description: '在下方展示，左右自适应',
          },
          {
            name: 'bottom-auto',
            description: '同bottom',
          },
          {
            name: 'bottom-start',
            description: '在下方展示，左侧对其',
          },
          {
            name: 'bottom-end',
            description: '在下方展示，右侧对其',
          },
          {
            name: 'top',
            description: '在上方展示，左右自适应',
          },
          {
            name: 'top-auto',
            description: '同top',
          },
          {
            name: 'top-start',
            description: '在上方展示，左侧对其',
          },
          {
            name: 'top-end',
            description: '在上方展示，右侧对其',
          },
        ],
      },
      {
        name: 'disabled',
        description: '禁用（所有功能失效）',
        type: 'boolean',
        default: false,
      },
    ],
    events: [
      {
        name: 'change',
        description: '选择时触发',
        type: '(value: string | number,option: SelectOption | SelectOption[])=>void',
        params: [
          {
            name: 'value',
            description: '选中的值或选中值列表',
          },
          {
            name: 'option',
            description: '选中的选项或选中项列表',
          },
        ],
      },
      {
        name: 'cancel',
        description: '取消选择时触发',
        type: '()=>void',
      },
      {
        name: 'confirm',
        description: '确定选择时触发',
        type: '(value: string | number | (string | number)[])=>void',
        params: [
          {
            name: 'value',
            description: '选中的值或选中值列表',
          },
        ],
      },
    ],
  },
  'signature': {
    site: 'ste-signature',
    attr: [
      'customClass=\'\'',
    ],
    props: [
      {
        name: 'customClass',
        description: '自定义class',
        type: 'string',
      },
      {
        name: 'lineWidth',
        description: '线宽',
        type: 'string | number',
        default: 3,
      },
      {
        name: 'strokeColor',
        description: '线条颜色',
        type: 'string | number',
        default: '#000000',
      },
      {
        name: 'background',
        description: '图片背景',
        type: 'string',
        default: 'none',
      },
      {
        name: 'type',
        description: '图片类型',
        type: 'string',
        default: 'png',
        values: [
          {
            name: 'png',
            description: 'png',
          },
          {
            name: 'jpg',
            description: 'jpg',
          },
        ],
      },
      {
        name: 'width',
        description: '宽度',
        type: 'string | number',
        default: '100%',
      },
      {
        name: 'height',
        description: '高度',
        type: 'string | number',
        default: '100%',
      },
    ],
    events: [
      {
        name: 'start',
        description: '笔画开始时触发',
        type: '() => void',
      },
      {
        name: 'signing',
        description: '画图中触发',
        type: '() => void',
      },
      {
        name: 'end',
        description: '笔画结束时触发',
        type: '() => void',
      },
    ],
  },
  'slider': {
    site: 'ste-slider',
    attr: [
      'value=\'\'',
    ],
    props: [
      {
        name: 'value',
        description: '当前进度百分比，在双滑块模式下为数组格式（数组的值都是从小到大）',
        type: 'number | string | array',
      },
      {
        name: 'min',
        description: '最小值',
        type: 'number | string',
        default: '0',
      },
      {
        name: 'max',
        description: '最大值',
        type: 'number | string',
        default: '100',
      },
      {
        name: 'step',
        description: '步长',
        type: 'number | string',
        default: '1',
      },
      {
        name: 'barHeight',
        description: '进度条高度，默认单位为 rpx',
        type: 'number | string',
        default: '4',
      },
      {
        name: 'buttonSize',
        description: '滑块按钮大小，默认单位为 rpx',
        type: 'number | string',
        default: '20',
      },
      {
        name: 'activeColor',
        description: '进度条激活态颜色',
        type: 'string',
        default: '#3c9cff',
      },
      {
        name: 'inactiveColor',
        description: '进度条非激活态颜色',
        type: 'string',
        default: '#ebedf0',
      },
      {
        name: 'range',
        description: '是否为范围选择',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'vertical',
        description: '是否竖向模式',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'disabled',
        description: '是否禁用滑块',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'readonly',
        description: '是否为只读状态，只读状态下无法修改滑块的值',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'marks',
        description: '标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式',
        type: 'object',
      },
    ],
    events: [
      {
        name: 'change',
        description: '进度变化且结束拖动后触发',
        type: '(percentage)=>void',
        params: [
          {
            name: 'percentage',
            description: '进度百分比',
          },
        ],
      },
      {
        name: 'dragStart',
        description: '开始拖动时触发',
        type: '(e)=>void',
        params: [
          {
            name: 'e',
            description: '拖动事件',
          },
        ],
      },
      {
        name: 'dragEnd',
        description: '结束拖动时触发',
        type: '(e)=>void',
        params: [
          {
            name: 'e',
            description: '拖动事件',
          },
        ],
      },
      {
        name: 'input',
        description: '进度变化时实时触发',
        type: '(percentage)=>void',
        params: [
          {
            name: 'percentage',
            description: '进度百分比',
          },
        ],
      },
    ],
  },
  'ste-step': {
    site: 'ste-step',
    attr: [
      '',
    ],
  },
  'stepper': {
    site: 'ste-stepper',
    attr: [
      'v-model=\'\'',
    ],
    props: [
      {
        name: 'v-model',
        description: '当前输入的值',
        type: 'number',
        default: '1',
      },
      {
        name: 'min',
        description: '最小值',
        type: 'number',
        default: '0',
      },
      {
        name: 'max',
        description: '最大值',
        type: 'number',
        default: 'Infinity',
      },
      {
        name: 'step',
        description: '步长，每次加或减的值',
        type: 'number',
        default: '1',
      },
      {
        name: 'inputWidth',
        description: '输入框宽度，默认单位为rpx',
        type: 'number | string',
        default: '64',
      },
      {
        name: 'btnSize',
        description: '按钮大小以及输入框高度，默认单位为`rpx`,`theme`为`line`时 高为宽的80%',
        type: 'number | string',
        default: '48',
      },
      {
        name: 'precision',
        description: '数值精度',
        type: 'number',
        default: '0',
      },
      {
        name: 'theme',
        description: '样式风格',
        type: 'string',
        default: 'card',
        values: [
          {
            name: 'card',
            description: '面型',
          },
          {
            name: 'line',
            description: '线型',
          },
          {
            name: 'add',
            description: '纯加购按钮',
          },
        ],
      },
      {
        name: 'mainColor',
        description: '主色，对`theme`为`line`时无效',
        type: 'string',
        default: '#0090FF',
      },
      {
        name: 'disabled',
        description: '是否禁用步进器',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'disablePlus',
        description: '是否禁用增加按钮',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'disableMinus',
        description: '是否禁用减少按钮',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'disableInput',
        description: '是否禁用输入框',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'background',
        description: '徽标：背景',
        type: 'string',
        default: '#ee0a24',
      },
      {
        name: 'showDot',
        description: '徽标：是否展示为小红点',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'offsetX',
        description: '徽标：根据徽标位置,设置x轴偏移量',
        type: 'number | string',
        default: 'auto',
      },
      {
        name: 'offsetY',
        description: '徽标：根据徽标位置,设置y轴偏移量',
        type: 'number | string',
        default: 'auto',
      },
      {
        name: 'showZero',
        description: '徽标：当 content 为数字 0，是否展示徽标',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'position',
        description: '徽标：徽标位置',
        type: 'string',
        default: 'topRight',
        values: [
          {
            name: 'topRight',
            description: '上右',
          },
          {
            name: 'topLeft',
            description: '上左',
          },
          {
            name: 'bottomLeft',
            description: '下左',
          },
          {
            name: 'bottomRight',
            description: '下右',
          },
        ],
      },
      {
        name: 'badgeMax',
        description: '徽标：徽标最大显示值',
        type: 'number',
        default: '99',
      },
    ],
    events: [
      {
        name: 'change',
        description: '当绑定值变化时触发的事件 `value`: 改变后的绑定值',
        type: '(value: number) => void',
      },
      {
        name: 'plus',
        description: '点击增加按钮时触发（可拦截change事件）',
        type: '(value: number,suspend: ()=>void,next: ()=>void,stop: ()=>void) => void',
        params: [
          {
            name: 'value',
            description: '改变后的绑定值',
          },
          {
            name: 'suspend',
            description: '等待',
          },
          {
            name: 'next',
            description: '继续',
          },
          {
            name: 'stop',
            description: '停止',
          },
        ],
      },
      {
        name: 'minus',
        description: '点击减少按钮时触发（可拦截change事件）',
        type: '(value:string | number,suspend: ()=>void,next: ()=>void,stop: ()=>void) => void',
        params: [
          {
            name: 'value',
            description: '改变后的绑定值',
          },
          {
            name: 'suspend',
            description: '等待',
          },
          {
            name: 'next',
            description: '继续',
          },
          {
            name: 'stop',
            description: '停止',
          },
        ],
      },
      {
        name: 'focus',
        description: '输入框聚焦时触发',
        type: '() => void',
      },
      {
        name: 'blur',
        description: '输入框失焦时触发',
        type: '() => void',
      },
    ],
  },
  'steps': {
    site: 'ste-steps',
    attr: [
      'active=\'\'',
    ],
    props: [
      {
        name: 'active',
        description: '步骤进度',
        type: 'number',
        default: '0',
      },
      {
        name: 'direction',
        description: '步骤条方向',
        type: 'boolean',
        default: 'row',
        values: [
          {
            name: 'row',
            description: '横向',
          },
          {
            name: 'column',
            description: '竖向',
          },
        ],
      },
      {
        name: 'dot',
        description: '点状步骤条',
        type: 'boolean',
        default: 'false',
      },
    ],
    events: [
      {
        name: 'clickStep',
        description: '点击步骤的标题或图标时触发',
        type: '(index: number) => void',
        params: [
          {
            name: 'index',
            description: '点击的步骤序号',
          },
        ],
      },
    ],
  },
  'sticky': {
    site: 'ste-sticky',
    attr: [
      'offsetTop=\'\'',
    ],
    props: [
      {
        name: 'offsetTop',
        description: '吸顶时与顶部的距离，单位rpx',
        type: 'string | number',
        default: 0,
      },
      {
        name: 'customNavHeight',
        description: '航栏的高度（没有导航栏时，请设置为0）',
        type: 'string | number',
        default: null,
      },
      {
        name: 'disabled',
        description: '是禁用启吸顶功能',
        type: 'boolean',
        default: false,
      },
      {
        name: 'background',
        description: '组件背景',
        type: 'string',
        default: '#fff',
      },
      {
        name: 'zIndex',
        description: '吸顶时的z-index值',
        type: 'string | number',
        default: 98,
      },
    ],
    events: [
      {
        name: 'fixed',
        description: '组件吸顶时触发',
        type: '() => void',
      },
      {
        name: 'unfixed',
        description: '组件取消吸顶时触发',
        type: '() => void',
      },
    ],
  },
  'swipe-action': {
    site: 'ste-swipe-action',
    attr: [
      'mode=\'\'',
    ],
    props: [
      {
        name: 'mode',
        description: '模式',
        type: 'string',
        default: 'right',
        values: [
          {
            name: 'right',
            description: '右滑(默认)',
          },
          {
            name: 'left',
            description: '左滑',
          },
          {
            name: 'all',
            description: '左右滑',
          },
        ],
      },
      {
        name: 'disabled',
        description: '禁用',
        type: 'boolean',
        default: false,
      },
      {
        name: 'swipeThreshold',
        description: '灵敏度（0-1之间的小数，数值越小灵敏度越高）',
        type: 'number',
        default: 0.35,
      },
      {
        name: 'duration',
        description: '动画时长，单位ms',
        type: 'number | string',
        default: 300,
      },
      {
        name: 'leftIcon',
        description: '是否显示左侧图标',
        type: 'boolean',
        default: false,
      },
      {
        name: 'rightIcon',
        description: '是否显示右侧图标',
        type: 'boolean',
        default: false,
      },
    ],
    events: [
      {
        name: 'open',
        description: '打开滑块时触发，参数为方向',
        type: '(d:string)=>void',
        params: [
          {
            name: 'direction',
            description: '方向（值为left或right）',
          },
        ],
      },
      {
        name: 'close',
        description: '关闭滑块时触发',
        type: '()=>void',
      },
    ],
  },
  'swipe-action-group': {
    site: 'ste-swipe-action-group',
    attr: [
      'mode=\'\'',
    ],
    props: [
      {
        name: 'mode',
        description: '模式',
        type: 'string',
        default: 'right',
        values: [
          {
            name: 'right',
            description: '右滑(默认)',
          },
          {
            name: 'left',
            description: '左滑',
          },
          {
            name: 'all',
            description: '左右滑',
          },
        ],
      },
      {
        name: 'disabled',
        description: '禁用',
        type: 'boolean',
        default: false,
      },
      {
        name: 'autoClose',
        description: '打开时是否自动关闭组内其他单元格',
        type: 'boolean',
        default: true,
      },
      {
        name: 'swipeThreshold',
        description: '灵敏度（0-1之间的小数，数值越小灵敏度越高）',
        type: 'number',
        default: 0.35,
      },
      {
        name: 'duration',
        description: '动画时长，单位ms',
        type: 'number | string',
        default: 300,
      },
      {
        name: 'leftIcon',
        description: '是否显示左侧图标',
        type: 'boolean',
        default: false,
      },
      {
        name: 'rightIcon',
        description: '是否显示右侧图标',
        type: 'boolean',
        default: false,
      },
    ],
    events: [
      {
        name: 'open',
        description: '打开滑块时触发，参数为方向',
        type: '(d:string,index:number)=>void',
        params: [
          {
            name: 'direction',
            description: '方向（值为left或right）',
          },
          {
            name: 'index',
            description: '当前单元格索引',
          },
        ],
      },
      {
        name: 'close',
        description: '关闭滑块时触发',
        type: '(index:number)=>void',
        params: [
          {
            name: 'index',
            description: '当前单元格索引',
          },
        ],
      },
    ],
  },
  'swiper': {
    site: 'ste-swiper',
    attr: [
      'current=\'\'',
    ],
    props: [
      {
        name: 'current',
        description: '当前显示滑块的 index',
        type: 'number',
        default: 0,
      },
      {
        name: 'direction',
        description: '滑动方向',
        type: 'string',
        default: 'horizontal',
        values: [
          {
            name: 'horizontal',
            description: '水平滑动(默认)',
          },
          {
            name: 'vertical',
            description: '垂直滑动',
          },
        ],
      },
      {
        name: 'disabled',
        description: '是否禁用',
        type: 'boolean',
        default: false,
      },
      {
        name: 'width',
        description: '宽度,单位RPX',
        type: 'number | string',
        default: '100%',
      },
      {
        name: 'height',
        description: '高度,单位RPX',
        type: 'number | string',
        default: '100%',
      },
      {
        name: 'duration',
        description: '切换动画时常，单位ms',
        type: 'number',
        default: 300,
      },
      {
        name: 'swipeThreshold',
        description: '滑动灵敏度（0-1之间的小数，数值越小越灵敏）',
        type: 'number',
        default: 0.35,
      },
      {
        name: 'indicatorDots',
        description: '是否显示面板指示点',
        type: 'boolean',
        default: false,
      },
      {
        name: 'indicatorColor',
        description: '指示点颜色',
        type: 'string',
        default: '#fff',
      },
      {
        name: 'indicatorActiveColor',
        description: '当前选中的指示点颜色',
        type: 'string',
        default: '#fff',
      },
      {
        name: 'autoplay',
        description: '自动切换',
        type: 'boolean',
        default: false,
      },
      {
        name: 'interval',
        description: '自动切换时间间隔，单位ms',
        type: 'number',
        default: 3000,
      },
      {
        name: 'circular',
        description: '首尾衔接滑动',
        type: 'boolean',
        default: false,
      },
      {
        name: 'previousMargin',
        description: '前边距，可用于露出前一项的一小部分，单位rpx',
        type: 'number | string',
        default: 0,
      },
      {
        name: 'nextMargin',
        description: '后边距，可用于露出后一项的一小部分，单位rpx',
        type: 'number | string',
        default: 0,
      },
    ],
    events: [
      {
        name: 'change',
        description: '监听item切换',
        type: '(index:number,source:\'autoplay\'| \'touch\')=>void',
        params: [
          {
            name: 'index',
            description: '当前显示滑块的 index',
          },
          {
            name: 'source',
            description: '触发切换的来源',
          },
        ],
      },
    ],
  },
  'ste-swiper-item': {
    site: 'ste-swiper-item',
    attr: [
      '',
    ],
  },
  'switch': {
    site: 'ste-switch',
    attr: [
      'modelValue=\'\'',
    ],
    props: [
      {
        name: 'modelValue',
        description: '开关状态（支持v-model双向绑定）',
        type: 'Boolean',
        default: false,
      },
      {
        name: 'disabled',
        description: '禁用',
        type: 'Boolean',
        default: false,
      },
      {
        name: 'readonly',
        description: '只读（不置灰）',
        type: 'Boolean',
        default: false,
      },
      {
        name: 'size',
        description: '开关大小，单位rpx',
        type: 'Number|String',
        default: 52,
      },
      {
        name: 'activeColor',
        description: '激活时颜色',
        type: 'String',
        default: '#0090FF',
      },
      {
        name: 'inactiveColor',
        description: '未激活颜色',
        type: 'String',
        default: '#bbbbbb',
      },
      {
        name: 'loading',
        description: '加载中',
        type: 'Boolean',
        default: false,
      },
    ],
    events: [
      {
        name: 'click',
        description: '点击开关时触发的事件（可拦截change事件）`value`：改变后的绑定值,`allowStop`：允许阻止后续的事件触发,：`resolve`：后续的事件执行',
        type: '() => void',
      },
      {
        name: 'change',
        description: '当绑定值变化时触发的事件',
        type: '() => void',
      },
    ],
  },
  'tab': {
    site: 'ste-tab',
    attr: [
      'title=\'\'',
    ],
    props: [
      {
        name: 'title',
        description: '当前标签标题',
        type: 'string',
      },
      {
        name: 'subTitle',
        description: '当前标签子标题',
        type: 'string',
      },
      {
        name: 'image',
        description: '当前标签图片',
        type: 'string',
      },
      {
        name: 'name',
        description: '当前标签name',
        type: 'string',
      },
      {
        name: 'index',
        description: '当前标签index',
        type: 'number',
      },
      {
        name: 'disabled',
        description: '是否禁用当前标签',
        type: 'boolean',
        default: false,
      },
      {
        name: 'showDot',
        description: '是否显示徽标',
        type: 'boolean',
        default: false,
      },
      {
        name: 'badge',
        description: '显示的徽标数量',
        type: 'number | string',
        default: 0,
      },
      {
        name: 'showZeroBadge',
        description: '徽标数量为0时是否展示',
        type: 'boolean',
        default: false,
      },
    ],
    events: [],
  },
  'table': {
    site: 'ste-table',
    attr: [
      'data=\'\'',
    ],
    props: [
      {
        name: 'data',
        description: '表格数据',
        type: 'array',
        default: '[]',
      },
      {
        name: 'fixed',
        description: '表头是否定位为fixed',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'offsetTop',
        description: '定位fixed时top的距离',
        type: 'number | string',
        default: '0',
      },
      {
        name: 'border',
        description: '是否带有纵向边框',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'stripe',
        description: '是否斑马纹',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'emptyText',
        description: '空数据时显示的文本内容，也可以通过 slot="empty" 设置',
        type: 'string',
        default: '\'暂无数据\'',
      },
      {
        name: 'showSummary',
        description: '是否在表尾显示合计行',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'sumText',
        description: '合计行第一列的文本',
        type: 'string',
        default: '\'合计\'',
      },
      {
        name: 'summaryMethod',
        description: '自定义的合计计算方法',
        type: 'function',
        default: 'null',
      },
      {
        name: 'selectable',
        description: '仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选',
        type: 'function',
        default: 'null',
      },
      {
        name: 'readable',
        description: '仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选',
        type: 'function',
        default: 'null',
      },
      {
        name: 'formatter',
        description: '格式化单元格方法，需要配合TableColumn中的customKey属性',
        type: 'function',
      },
      {
        name: 'header',
        description: '格式化表头内容的方法，同formatter属性，需要定义customKey属性',
        type: 'function',
      },
      {
        name: 'headerRowClassName',
        description: '表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className',
        type: 'function | string',
      },
      {
        name: 'headerRowStyle',
        description: '表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style',
        type: 'function | string',
      },
      {
        name: 'headerCellClassName',
        description: '表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className',
        type: 'function | string',
      },
      {
        name: 'headerCellStyle',
        description: '表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style',
        type: 'function | string',
      },
      {
        name: 'rowClassName',
        description: '行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className',
        type: 'function | string',
      },
      {
        name: 'rowStyle',
        description: '行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style',
        type: 'function | string',
      },
      {
        name: 'cellClassName',
        description: '单元格的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className',
        type: 'function | string',
      },
      {
        name: 'cellStyle',
        description: '单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style',
        type: 'function | string',
      },
      {
        name: 'highlightCurrentRow',
        description: '是否要高亮当前行',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'highlightSelectionRow',
        description: '是否要高亮复选框选中行（仅针对开启 checkbox 有效）',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'showHeader',
        description: '是否显示表头',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'height',
        description: '表格高度',
        type: 'number | string',
      },
      {
        name: 'maxHeight',
        description: '表格最大高度',
        type: 'number | string',
      },
      {
        name: 'selectionIconColor',
        description: '配置选择项图标色',
        type: 'object',
      },
    ],
    events: [
      {
        name: 'select',
        description: '当用户手动勾选数据行的 Checkbox 时触发的事件',
        type: '() => void',
      },
      {
        name: 'selectAll',
        description: '当用户手动勾选全选 Checkbox 时触发的事件',
        type: '() => void',
      },
      {
        name: 'cellClick',
        description: '当某个单元格被点击时会触发该事件',
        type: '() => void',
      },
      {
        name: 'rowClick',
        description: '当某一行被点击时会触发该事件',
        type: '() => void',
      },
      {
        name: 'headerClick',
        description: '当某一列的表头被点击时会触发该事件',
        type: '() => void',
      },
      {
        name: 'scrollToLower',
        description: '表格体滚动到底事件',
        type: '() => void',
        version: 'v1.18.9',
      },
    ],
  },
  'ste-table-column': {
    site: 'ste-table-column',
    attr: [
      '',
    ],
  },
  'tabs': {
    site: 'ste-tabs',
    attr: [
      'active=\'\'',
    ],
    props: [
      {
        name: 'active',
        description: '当前激活的选项支持v-model:active双向绑定（类型为number时绑定index，类型为string时绑定name）',
        type: 'number | string',
        default: 0,
      },
      {
        name: 'type',
        description: '样式风格类型',
        type: 'string',
        default: 'line',
        values: [
          {
            name: 'line',
            description: '线型',
          },
          {
            name: 'card',
            description: '卡片型',
          },
        ],
      },
      {
        name: 'showImage',
        description: '是否显示图片',
        type: 'boolean',
        default: false,
      },
      {
        name: 'showTitle',
        description: '是否显示主标题',
        type: 'boolean',
        default: true,
      },
      {
        name: 'showSubtitle',
        description: '是否显示副标题',
        type: 'boolean',
        default: false,
      },
      {
        name: 'color',
        description: '主题色（滑块颜色，边框颜色，选中的背景色，激活下拉列表中选项颜色）',
        type: 'string',
        default: '#0090FF',
      },
      {
        name: 'background',
        description: '背景',
        type: 'string',
      },
      {
        name: 'radius',
        description: '圆角,单位RPX',
        type: 'number | string',
        default: 0,
      },
      {
        name: 'duration',
        description: '动画时间，单位秒，设置为 0 可以禁用动画',
        type: 'number | string',
        default: 0.3,
      },
      {
        name: 'showLine',
        description: '底部条是否显示（显示副标题的情况下会自动隐藏）',
        type: 'boolean',
        default: true,
      },
      {
        name: 'lineWidth',
        description: '底部条宽度，默认单位rpx',
        type: 'number | string',
        default: 52,
      },
      {
        name: 'lineHeight',
        description: '底部条高度，默认单位rpx',
        type: 'number | string',
        default: 6,
      },
      {
        name: 'border',
        description: '是否显示标签栏外边框，仅在 type=line 时有效',
        type: 'boolean',
        default: false,
      },
      {
        name: 'ellipsis',
        description: '是否省略过长的标题文字',
        type: 'boolean',
        default: false,
      },
      {
        name: 'tabWidth',
        description: 'tab内容的宽度',
        type: 'number | string',
        default: 'auto',
      },
      {
        name: 'tabPadding',
        description: '选项内边距，默认24，单位rpx',
        type: 'number | string',
        default: 24,
      },
      {
        name: 'tabSpace',
        description: 'tab间距rpx',
        type: 'number | string',
        default: 0,
      },
      {
        name: 'divideNum',
        description: 'tab等分数量，设置为 0 ，则不等分',
        type: 'number | string',
        default: 4,
      },
      {
        name: 'sticky',
        description: '是否使用粘性布局',
        type: 'boolean',
        default: false,
      },
      {
        name: 'offsetTop',
        description: '粘性布局下吸顶时与顶部的距离，单位rpx',
        type: 'number | string',
        default: 0,
      },
      {
        name: 'swipeable',
        description: '是否开启手势左右滑动切换',
        type: 'boolean',
        default: false,
      },
      {
        name: 'titleColor',
        description: '主标题字体颜色和下拉列表中选项颜色',
        type: 'string',
        default: '#000000',
      },
      {
        name: 'activeTitleColor',
        description: '激活主标题字体颜色',
        type: 'string',
        default: '#000000',
      },
      {
        name: 'titleHeight',
        description: '主标题高度',
        type: 'number | string',
        default: 48,
      },
      {
        name: 'subColor',
        description: '子标题字体颜色和下拉列表中选项颜色',
        type: 'string',
        default: '#000000',
      },
      {
        name: 'activeSubColor',
        description: '激活子标题字体颜色和下拉列表中选项颜色',
        type: 'string',
        default: '#ffffff',
      },
      {
        name: 'subTitleHeight',
        description: '子标题高度',
        type: 'number | string',
        default: 42,
      },
      {
        name: 'subTitleRadius',
        description: '子标题圆角',
        type: 'number | string',
        default: 21,
      },
      {
        name: 'imageWidth',
        description: '图片宽度，默认80，单位rpx',
        type: 'number | string',
        default: 80,
      },
      {
        name: 'imageHeight',
        description: '图片高度，默认80，单位rpx',
        type: 'number | string',
        default: 80,
      },
      {
        name: 'imageRadius',
        description: '图片圆角，默认50%，单位rpx',
        type: 'number | string',
        default: '50%',
      },
      {
        name: 'imageBorderWidth',
        description: '选中图片边框宽度，默认4，单位rpx',
        type: 'number | string',
        default: 4,
      },
      {
        name: 'showGapLine',
        description: '是否显示分隔符',
        type: 'boolean',
        default: false,
      },
      {
        name: 'lock',
        description: '是否锁定tab(无法切换)',
        type: 'boolean',
        default: false,
      },
      {
        name: 'disabled',
        description: '是否禁用tab(所有功能失效)',
        type: 'boolean',
        default: false,
      },
      {
        name: 'pullDown',
        description: '是否有下拉选择按钮',
        type: 'boolean',
        default: false,
      },
      {
        name: 'placeholder',
        description: '下拉占位符',
        type: 'string',
        default: '请选择',
      },
      {
        name: 'maskTop',
        description: '下拉蒙层顶部距离',
        type: 'number | string',
        default: 0,
      },
      {
        name: 'maskRight',
        description: '下拉蒙层右侧距离',
        type: 'number | string',
        default: 0,
      },
      {
        name: 'maskBottom',
        description: '下拉蒙层底部距离',
        type: 'number | string',
        default: 0,
      },
      {
        name: 'maskLeft',
        description: '下拉蒙层左侧距离',
        type: 'number | string',
        default: 0,
      },
      {
        name: 'maskZindex',
        description: '下拉蒙层层级',
        type: 'number | string',
        default: 1001,
      },
    ],
    events: [
      {
        name: 'click-tab',
        description: '点击tab触发',
        type: '(tab:TabProps)=>void',
      },
      {
        name: 'change',
        description: '切换tab触发',
        type: '(tab:TabProps)=>void',
      },
    ],
  },
  'text': {
    site: 'ste-text',
    attr: [
      'selectable=\'\'',
    ],
    props: [
      {
        name: 'selectable',
        description: '文本是否可选 默认 false',
        type: 'boolean',
        default: false,
      },
      {
        name: 'space',
        description: '以何种方式显示连续空格',
        type: 'string',
      },
      {
        name: 'decode',
        description: '是否解码 默认 false',
        type: 'boolean',
        default: false,
      },
      {
        name: 'lines',
        description: '文本显示的行数，如果设置，超出此行数，将会显示省略号',
        type: 'number',
      },
    ],
    events: [],
  },
  'toast': {
    site: 'ste-toast',
    attr: [
      'title=\'\'',
    ],
    props: [
      {
        name: 'title',
        description: '提示的内容',
        type: 'String',
        default: '',
      },
      {
        name: 'icon',
        description: '图标',
        type: 'String',
        default: 'success',
        values: [
          {
            name: 'success',
            description: '显示成功图标',
          },
          {
            name: 'error',
            description: '显示失败图标',
          },
          {
            name: 'loading',
            description: '显示加载图标',
          },
          {
            name: 'none',
            description: '无图标',
          },
        ],
      },
      {
        name: 'image',
        description: '自定义图标的路径，image的优先级高于icon',
        type: 'String',
        default: '',
      },
      {
        name: 'duration',
        description: '提示的延迟时间，单位ms 默认值：1500，值为 0 时，toast 不会自动消失（loading 类型默认为 0）',
        type: 'Number',
        default: 1500,
      },
      {
        name: 'mask',
        description: '是否显示透明蒙层，防止触摸穿透',
        type: 'Boolean',
        default: false,
      },
      {
        name: 'order',
        description: '是否是队列提示',
        type: 'Boolean',
        default: false,
      },
      {
        name: 'success',
        description: '提示打开成功的回调函数',
        type: '() => void',
      },
      {
        name: 'fail',
        description: '提示打开失败的回调函数',
        type: '() => void',
      },
      {
        name: 'complete',
        description: '提示结束的回调函数（提示打开、失败都会执行）',
        type: '() => void',
      },
      {
        name: 'close',
        description: '提示关闭的的回调函数',
        type: '() => void',
      },
    ],
    events: [],
  },
  'touch-swipe': {
    site: 'ste-touch-swipe',
    attr: [
      'index=\'\'',
    ],
    props: [
      {
        name: 'index',
        description: '当前展示的面板索引',
        type: 'number',
        default: 0,
      },
      {
        name: 'direction',
        description: '滑动方向 (水平方向时宽度必须固定，垂直方向时高度必须固定)',
        type: 'string',
        default: 'horizontal',
        values: [
          {
            name: 'horizontal',
            description: '水平方向',
          },
          {
            name: 'vertical',
            description: '垂直方向',
          },
        ],
      },
      {
        name: 'width',
        description: '宽度',
        type: 'number | string',
        default: '100%',
      },
      {
        name: 'height',
        description: '高度',
        type: 'number | string',
        default: '100%',
      },
      {
        name: 'duration',
        description: '动画时长，单位s',
        type: 'number | string',
        default: 0.3,
      },
      {
        name: 'swipeThreshold',
        description: '灵敏度（0-1之间的数值，数值越小越灵敏）',
        type: 'number',
        default: 0.35,
      },
      {
        name: 'disabled',
        description: '是否禁用',
        type: 'boolean',
        default: false,
      },
      {
        name: 'childrenLength',
        description: '面板数量（使用touch-swipe-item作为子元素时不需要传递，不使用touch-swipe-item作为子元素盒子时必传）',
        type: 'number',
        default: 0,
      },
      {
        name: 'disabledIndexs',
        description: '禁用的面板索引（使用touch-swipe-item作为子元素时直接在touch-swipe-item上定义某个标签禁用即可，不使用touch-swipe-item作为子元素盒子时可传）',
        type: 'Array<number>',
        default: [],
      },
    ],
    events: [
      {
        name: 'change',
        description: '切换触发',
        type: '(index:number)=>void',
        params: [
          {
            name: 'index',
            description: '当前展示的面板索引',
          },
        ],
      },
    ],
  },
  'ste-touch-swipe-item': {
    site: 'ste-touch-swipe-item',
    attr: [
      '',
    ],
  },
  'tour': {
    site: 'ste-tour',
    attr: [
      'show=\'\'',
    ],
    props: [
      {
        name: 'show',
        description: '是否显示，支持v-model:show双向绑定',
        type: 'boolean',
        default: false,
      },
      {
        name: 'current',
        description: '当前步骤，多个步骤时有效,支持v-model:current双向绑定',
        type: 'number',
        default: 0,
      },
      {
        name: 'steps',
        description: '步骤数组，Step对象描述见基础用法说明',
        type: 'Array<TourStepType>',
        default: [],
      },
      {
        name: 'offset',
        description: '位置偏移量，格式为：[x, y]',
        type: '[number, number]',
        default: [
          0,
          0,
        ],
      },
      {
        name: 'showTitleBar',
        description: '是否显示标题栏',
        type: 'boolean',
        default: false,
      },
      {
        name: 'showFooter',
        description: '是否显示底部按钮栏（仅多步骤时生效）',
        type: 'boolean',
        default: true,
      },
      {
        name: 'mask',
        description: '是否显示遮罩层',
        type: 'boolean',
        default: true,
      },
      {
        name: 'maskColse',
        description: '是否点击遮罩层关闭',
        type: 'boolean',
        default: true,
      },
      {
        name: 'showPrevStep',
        description: '是否显示上一步按钮',
        type: 'boolean',
        default: true,
      },
      {
        name: 'background',
        description: '遮罩层背景色',
        type: 'string',
        default: 'rgba(0,0,0,.5)',
      },
      {
        name: 'radius',
        description: '提示框圆角，单位rpx',
        type: 'number | string',
        default: 18,
      },
      {
        name: 'messageBg',
        description: '提示框背景色',
        type: 'string',
        default: '#fff',
      },
      {
        name: 'messageColor',
        description: '提示框文字颜色',
        type: 'string',
        default: '#000',
      },
      {
        name: 'nextStepTxt',
        description: '下一步按钮文字',
        type: 'string',
        default: '下一步',
      },
      {
        name: 'prevStepTxt',
        description: '上一步按钮文字',
        type: 'string',
        default: '上一步',
      },
      {
        name: 'completeTxt',
        description: '完成按钮文字',
        type: 'string',
        default: '完成',
      },
    ],
    events: [
      {
        name: 'change',
        description: '步骤切换时触发',
        type: '(current:number)=>void',
        params: [
          {
            name: 'current',
            description: '当前步骤',
          },
        ],
      },
      {
        name: 'close',
        description: '关闭时触发',
        type: '()=>void',
      },
    ],
  },
  'tree': {
    site: 'ste-tree',
    attr: [
      'options=\'\'',
    ],
    props: [
      {
        name: 'options',
        description: '树形结构数组（Node结构见基础用法详情 ），若组件渲染完成后修此属性，请手动调用init方法',
        type: 'Array<TreeNode>',
        default: [],
      },
      {
        name: 'valueKey',
        description: '节点的值字段名',
        type: 'string',
        default: 'value',
      },
      {
        name: 'titleKey',
        description: '节点的标题字段名',
        type: 'string',
        default: 'title',
      },
      {
        name: 'childrenKey',
        description: '节点的子节点字段名',
        type: 'string',
        default: 'children',
      },
      {
        name: 'accordion',
        description: '是否手风琴模式',
        type: 'boolean',
        default: true,
      },
      {
        name: 'childrenPadding',
        description: '子节点缩进,单位rpx',
        type: 'number | string',
        default: 40,
      },
      {
        name: 'openNodes',
        description: '默认展开的节点数组',
        type: 'Array<number | string>',
        default: [],
      },
    ],
    events: [
      {
        name: 'click',
        description: '点击节点时触发',
        type: '(node:TreeNode)=>void',
        params: [
          {
            name: 'node',
            description: '当前点击的节点',
          },
        ],
      },
      {
        name: 'open',
        description: '打开节点时出发',
        type: '(node:TreeNode)=>void',
        params: [
          {
            name: 'node',
            description: '当前打开的节点',
          },
        ],
      },
      {
        name: 'close',
        description: '关闭节点时出发',
        type: '(node:TreeNode)=>void',
        params: [
          {
            name: 'node',
            description: '当前关闭的节点',
          },
        ],
      },
      {
        name: 'beforeOpen',
        description: '打开节点前触发',
        type: '(node:TreeNode,suspend:()=>void,next:(tree:TreeNode[])=>void,stop:()=>void)=>void',
        params: [
          {
            name: 'node',
            description: '当前即将打开的节点',
          },
          {
            name: 'suspend',
            description: '调用该函数等待后续操作',
          },
          {
            name: 'next',
            description: '调用该函数继续执行后续代码，可接收一个对象数组，该数组会替换当前节点的children',
          },
          {
            name: 'stop',
            description: '调用该函数阻止后续代码执行',
          },
        ],
      },
    ],
  },
  'upload': {
    site: 'ste-upload',
    attr: [
      'modelValue=\'\'',
    ],
    props: [
      {
        name: 'modelValue',
        description: '文件列表',
        type: 'Array<UploadFileType>',
        default: [],
      },
      {
        name: 'accept',
        description: '选取的文件类型',
        type: 'string',
        default: 'image',
        values: [
          {
            name: 'all',
            description: '所有文件',
          },
          {
            name: 'media',
            description: '媒体文件',
          },
          {
            name: 'image',
            description: '图片',
          },
          {
            name: 'video',
            description: '视频',
          },
          {
            name: 'file',
            description: '文件',
          },
        ],
      },
      {
        name: 'capture',
        description: '图片或者视频选取模式，当accept为image | media 类型时设置capture可选值为camera可以直接调起摄像头',
        type: 'Array<"album" | "camera">',
        default: [
          'album',
          'camera',
        ],
      },
      {
        name: 'camera',
        description: '相机类型 当 accept 为 image | video | media 时生效，可选值为 back-后置 front-前置',
        type: 'string',
        default: 'back',
        values: [
          {
            name: 'back',
            description: '后置',
          },
          {
            name: 'front',
            description: '前置',
          },
        ],
      },
      {
        name: 'compressed',
        description: '当 accept 为 image | video | media 时生效，是否压缩视频、图片',
        type: 'boolean',
        default: true,
      },
      {
        name: 'maxDuration',
        description: '当 accept 为 video | media 时生效，拍摄视频最长拍摄时间，单位秒',
        type: 'number',
        default: 60,
      },
      {
        name: 'previewWidth',
        description: '预览图和上传区域的宽度，默认单位为rpx',
        type: 'number | string',
        default: 200,
      },
      {
        name: 'previewHeight',
        description: '览图和上传区域的高度，默认单位为rpx',
        type: 'number | string',
        default: 200,
      },
      {
        name: 'previewImage',
        description: '是否在上传完成后展示预览图',
        type: 'boolean',
        default: true,
      },
      {
        name: 'previewFullImage',
        description: '是否在点击预览图后展示全屏图片预览',
        type: 'boolean',
        default: true,
      },
      {
        name: 'multiple',
        description: '是否开启图片多选，部分安卓机型不支持',
        type: 'boolean',
        default: false,
      },
      {
        name: 'disabled',
        description: '是否禁用文件上传',
        type: 'boolean',
        default: false,
      },
      {
        name: 'showUpload',
        description: '是否展示文件上传按钮',
        type: 'boolean',
        default: true,
      },
      {
        name: 'deletable',
        description: '是否展示删除按钮',
        type: 'boolean',
        default: true,
      },
      {
        name: 'maxSize',
        description: '文件大小限制，单位为kb，0为不限制',
        type: 'number',
        default: 0,
      },
      {
        name: 'maxCount',
        description: '文件上传数量限制,0为不限制',
        type: 'number',
        default: 0,
      },
      {
        name: 'uploadIcon',
        description: '上传区域图标，可选值见 Icon 组件',
        type: 'string',
        default: '&#xe69b;',
      },
      {
        name: 'uploadText',
        description: '上传区域文字提示',
        type: 'string',
        default: '点击上传',
      },
      {
        name: 'radius',
        description: '圆角弧度',
        type: 'string | number',
        default: 9,
      },
      {
        name: 'flexWrap',
        description: '子元素是否换行',
        type: 'string',
        default: 'wrap',
        values: [
          {
            name: 'wrap',
            description: '换行',
          },
          {
            name: 'nowrap',
            description: '不换行',
          },
        ],
      },
    ],
    events: [
      {
        name: 'beforeRead',
        description: '文件读取前触发',
        type: '(fileList:Array<UploadFileType>,suspend:()=>void,next()=>void,stop:()=>void)=>void',
        params: [
          {
            name: 'fileList',
            description: '即将选择的文件列表',
          },
          {
            name: 'suspend',
            description: '等待',
          },
          {
            name: 'next',
            description: '继续',
          },
          {
            name: 'stop',
            description: '停止',
          },
        ],
      },
      {
        name: 'read',
        description: '文件读完成触发',
        type: '(fileList:Array<UploadFileType>)=>void',
        params: [
          {
            name: 'fileList',
            description: '选择的文件列表',
          },
        ],
      },
      {
        name: 'oversize',
        description: '文件大小超出限制触发',
        type: '(file,fileList:Array<UploadFileType>)=>void',
        params: [
          {
            name: 'file',
            description: '超出限制的第一个文件',
          },
          {
            name: 'fileList',
            description: '选择的文件列表',
          },
        ],
      },
      {
        name: 'beforeDelete',
        description: '文件删除前触发',
        type: '(index:number,suspend:()=>void,next()=>void,stop:()=>void)=>void',
        params: [
          {
            name: 'index',
            description: '正在删除的文件下标',
          },
          {
            name: 'suspend',
            description: '等待',
          },
          {
            name: 'next',
            description: '继续',
          },
          {
            name: 'stop',
            description: '停止',
          },
        ],
      },
      {
        name: 'delete',
        description: '文件删除后触发',
        type: '(index:number,fileList:Array<UploadFileType>)=>void',
        params: [
          {
            name: 'index',
            description: '删除的文件下标',
          },
          {
            name: 'fileList',
            description: '删除后的文件列表',
          },
        ],
      },
      {
        name: 'open-preview',
        description: '打开预览时触发',
        type: '()=>void',
      },
      {
        name: 'close-preview',
        description: '关闭预览时触发',
        type: '()=>void',
      },
    ],
  },
  'video': {
    site: 'ste-video',
    attr: [
      'title=\'\'',
    ],
    props: [
      {
        name: 'title',
        description: '视频的标题，全屏时在顶部展示',
        type: 'string',
        default: '',
      },
      {
        name: 'autoHeight',
        description: '是否视频高度跟随父容器',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'resolution',
        description: '清晰度',
        type: 'array',
        default: '[]',
      },
      {
        name: 'src',
        description: '要播放视频的资源地址',
        type: 'string',
        default: '',
      },
      {
        name: 'autoplay',
        description: '是否自动播放',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'loop',
        description: '是否循环播放',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'muted',
        description: '是否静音播放',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'initialTime',
        description: '指定视频初始播放位置，单位为秒（s）。',
        type: 'number',
        default: 0,
      },
      {
        name: 'duration',
        description: '指定视频时长，单位为秒（s）。',
        type: 'number',
        default: 0,
      },
      {
        name: 'pageGesture',
        description: '在非全屏模式下，是否开启亮度与音量调节手势',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'direction',
        description: '设置全屏时视频的方向，不指定则根据宽高比自动判断。有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）',
        type: 'number',
        default: 0,
      },
      {
        name: 'showFullscreenBtn',
        description: '是否显示全屏按钮',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'showPlayBtn',
        description: '是否显示视频底部控制栏的播放按钮',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'enableProgressGesture',
        description: '是否开启控制进度的手势',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'objectFit',
        description: '当视频大小与 video 容器大小不一致时，视频的表现形式。contain：包含，fill：填充，cover：覆盖',
        type: 'string',
        default: 'contain',
        values: [
          {
            name: 'contain',
            description: '包含',
          },
          {
            name: 'fill',
            description: '填充',
          },
          {
            name: 'cover',
            description: '覆盖',
          },
        ],
      },
      {
        name: 'poster',
        description: '视频封面的图片网络资源地址，如果 controls 属性值为 false 则设置 poster 无效',
        type: 'string',
        default: '',
      },
      {
        name: 'mobileNetHintType',
        description: '移动网络提醒样式：0是不提醒，1是提醒，默认值为1',
        type: 'number',
        default: 1,
        values: [
          {
            name: '0',
            description: '不提醒',
          },
          {
            name: '1',
            description: '提醒',
          },
        ],
      },
      {
        name: 'enablePlayGesture',
        description: '是否开启手势播放',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'autoPauseIfNavigate',
        description: '当跳转到其它小程序页面时，是否自动暂停本页面的视频',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'autoPauseIfOpenNative',
        description: '当跳转到其它微信原生页面时，是否自动暂停本页面的视频',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'vslideGesture',
        description: '在非全屏模式下，是否开启亮度与音量调节手势（同 page-gesture）',
        type: 'boolean',
        default: 'false',
      },
      {
        name: 'vslideGestureInFullscreen',
        description: '在全屏模式下，是否开启亮度与音量调节手势',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'adUnitId',
        description: '视频前贴广告单元ID，更多详情可参考开放能力视频前贴广告',
        type: 'string',
        default: '',
      },
      {
        name: 'posterForCrawler',
        description: '用于给搜索等场景作为视频封面展示，建议使用无播放 icon 的视频封面图，只支持网络地址',
        type: 'string',
        default: '',
      },
      {
        name: 'codec',
        description: '解码器选择，hardware：硬解码（硬解码可以增加解码算力，提高视频清晰度。少部分老旧硬件可能存在兼容性问题）；software：ffmpeg 软解码',
        type: 'string',
        default: 'hardware',
        values: [
          {
            name: 'hardware',
            description: '硬解码（硬解码可以增加解码算力，提高视频清晰度。少部分老旧硬件可能存在兼容性问题）',
          },
          {
            name: 'software',
            description: 'ffmpeg 软解码',
          },
        ],
      },
      {
        name: 'httpCache',
        description: '是否对 http、https 视频源开启本地缓存。缓存策略:开启了此开关的视频源，在视频播放时会在本地保存缓存文件，如果本地缓存池已超过100M，在进行缓存前会清空之前的缓存（不适用于m3u8等流媒体协议）',
        type: 'boolean',
        default: 'true',
      },
      {
        name: 'playStrategy',
        description: '播放策略，0：普通模式，适合绝大部分视频播放场景；1：平滑播放模式（降级），增加缓冲区大小，采用open sl解码音频，避免音视频脱轨的问题，可能会降低首屏展现速度、视频帧率，出现开屏音频延迟等。 适用于高码率视频的极端场景；2： M3U8优化模式，增加缓冲区大小，提升视频加载速度和流畅度，可能会降低首屏展现速度。 适用于M3U8在线播放的场景',
        type: 'number',
        default: 0,
        values: [
          {
            name: '0',
            description: '普通模式，适合绝大部分视频播放场景',
          },
          {
            name: '1',
            description: '平滑播放模式（降级），增加缓冲区大小，采用open sl解码音频，避免音视频脱轨的问题，可能会降低首屏展现速度、视频帧率，出现开屏音频延迟等。 适用于高码率视频的极端场景；2： M3U8优化模式，增加缓冲区大小，提升视频加载速度和流畅度，可能会降低首屏展现速度。 适用于M3U8在线播放的场景',
          },
        ],
      },
      {
        name: 'header',
        description: 'HTTP 请求 Header',
        type: 'object',
        default: '{}',
      },
      {
        name: 'isLive',
        description: '是否为直播源',
        type: 'boolean',
        default: 'false',
      },
    ],
    events: [],
  },
}
