import type { PropType } from 'vue';
import type { SearchSuggestion } from '../../types';

export default {
    // 组件类型,"default"：正常搜索，"nav":导航栏
    type: {
        type: String,
        default: () => 'default',
    },
    // 当前值（支持v-model双向绑定）
    modelValue: {
        type: String,
        default: () => '',
    },
    // 占位提示符
    placeholder: {
        type: String,
        default: () => '',
    },
    // 热词列表
    hotWords: {
        type: Array as PropType<string[]>,
        default: () => [],
    },
    // 热词列表自动切换时间间隔`
    interval: {
        type: Number,
        default: () => 3000,
    },
    // 热词列表是否自动切换
    autoplay: {
        type: Boolean,
        default: () => true,
    },
    // 是否禁用状态
    disabled: {
        type: Boolean,
        default: () => false,
    },
    // 是否隐藏分割线
    hiddenLine: {
        type: Boolean,
        default: () => false,
    },
    // 是否隐藏搜索按钮
    hiddenBtn: {
        type: Boolean,
        default: () => false,
    },
    // 搜索按钮文字
    btnText: {
        type: String,
        default: () => '搜索',
    },
    // 是否隐藏输入框
    hiddenInput: {
        type: Boolean,
        default: () => false,
    },
    // 是否可清空
    clearable: {
        type: Boolean,
        default: () => true,
    },
    // 是否允许输入空格
    allowSpace: {
        type: Boolean,
        default: () => true,
    },
    // 边框颜色
    borderColor: {
        type: String,
        default: () => '#dddddd',
    },
    // 背景
    background: {
        type: String,
        default: () => '#ffffff',
    },
    // 前置图标颜色
    prefixIconColor: {
        type: String,
        default: () => '#bbbbbb',
    },
    // 占位符字体颜色
    placeholderColor: {
        type: String,
        default: () => '#bbbbbb',
    },
    // 输入框文字颜色
    inputTextColor: {
        type: String,
        default: () => '#000000',
    },
    // 清除图标颜色
    clearIconColor: {
        type: String,
        default: () => '#bbbbbb',
    },
    // 搜索按钮背景
    btnBackground: {
        type: String,
    },
    // 搜索按钮文字颜色
    btnTextColor: {
        type: String,
        default: () => '#0090FF',
    },
    // 高度
    height: {
        type: Number,
        default: () => 64,
    },
    // 圆角弧度
    radius: {
        type: Number,
        default: () => 32,
    },
    // 聚焦
    focus: {
        type: Boolean,
        default: () => false,
    },
    // 搜索建议
    suggestionList: {
        type: Array as PropType<SearchSuggestion[]>,
        default: () => [],
    },
};
