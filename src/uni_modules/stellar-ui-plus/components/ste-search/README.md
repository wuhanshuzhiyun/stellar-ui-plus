# Search 搜索

搜索组件，集成了常见搜索框所需功能。

{{compatibility}}

### 代码演示

**JavaScript**

```javascript
<script setup lang="ts">
import { ref } from 'vue';
const value = ref('RTX4060Ti');
const hotWords = ref(['RTX4060', 'RTX4070', 'RTX4080']);
const focus = ref(false);

const onInput = (v: string) => {
    toast.showToast({
        title: 'onInput' + v,
        icon: 'none',
    });
};
const onSearch = (v: string) => {
    toast.showToast({
        title: 'onSearch' + v,
        icon: 'none',
    });
};

const onClick = (v: string) => {
    toast.showToast({
        title: 'onClick' + v,
        icon: 'none',
    });
};
</script>
```

#### 基础用法

-   通过`input`事件可以捕获用户输入行为，参数为输入的value内容
-   通过`search`事件可以捕获用户点击`搜索按钮`或`软键盘上的回车`行为，参数为输入的value内容
-   使用`v-model`属性进行输入框内容的双向绑定
-   使用`placeholder`属性设置输入框的占位符
-   使用`disabled`属性禁用组件，组件禁用后全部功能失效

```html
<ste-search @input="onInput" @search="onSearch" />
<ste-search v-model="value" @search="onSearch" />
<ste-search placeholder="搜索商品" @search="onSearch" />
<ste-search disabled />
```

#### 搜索建议

-   给`suggestionsList`属性赋值时，会在输入框下方显示，数据结构见下方示例
-   点击某条建议后会触发搜索的`selectSuggestion`事件，参数为搜索建议对象

```html
<ste-search :suggestion-list="suggestionList" @input="input1" @selectSuggestion="selectSuggestion" />
<script lang="ts" setup>
    import { ref } from 'vue';
    import type { SearchSuggestion } from '@/uni_modules/stellar-ui-plus/types/index';
    const data = [
        { label: '三全鲜食（北新泾店）', value: '1全' },
        { label: 'Hot honey 首尔炸鸡（仙霞路）', value: '2全' },
        { label: '三贡茶', value: '3全' },
        { label: '三浮生若茶（凌空soho店', value: '4全' },
        { label: '三枪会山', value: '5全' },
        { label: '三爱茜茜里(西郊百联)', value: '6全' },
        { label: '三港式小铺', value: '7全' },
        { label: '三蜀香源麻辣香锅', value: '8全' },
        { label: '饭典*新简餐', value: '9全' },
        { label: '浏阳蒸菜', value: '10全' },
    ];
    const suggestionList = ref<SearchSuggestion[]>([]);
    function input1(v: string) {
        if (v) {
            setTimeout(() => {
                suggestionList.value = data.filter(e => e.label.indexOf(v) > -1);
            }, 450);
        } else {
            suggestionList.value = [];
        }
    }
    function selectSuggestion(v: SearchSuggestion) {
        toast.showToast({
            icon: 'none',
            title: `选了：${v.label}`,
        });
    }
</script>
```

#### 热词列表

-   可以通过`hotWords`属性传入热词列表
-   可以通过`interval`属性设置热词切换间隔，单位为毫秒

```html
<ste-search placeholder="搜索商品" @input="onInput" @search="onSearch" />
<ste-search :hotWords="hotWords" :interval="1000" @input="onInput" @search="onSearch" />
```

#### 自定义按钮文本内容

-   可以通过`btnText`属性自定义按钮文本内容

```html
<ste-search btnText="查询" @search="onSearch" />
```

#### 隐藏分割线以及按钮

-   可以通过`hiddenLine`属性隐藏分割线
-   可以通过`hiddenBtn`属性隐藏按钮，隐藏按钮时也会隐藏分割线

```html
<ste-search hiddenLine @search="onSearch" />
<ste-search hiddenBtn @search="onSearch" />
```

#### 隐藏输入框以及按钮

-   可以通过设置`hiddenInput`属性隐藏输入框 和 `hiddenBtn`属性隐藏按钮只保留放大镜的功能

```html
<view style="width: 60rpx">
    <ste-search hiddenInput hiddenBtn @click="onClick" />
</view>
```

#### 不显示清除图标

-   可以通过`clearable`属性来切换清除图标是否显示

```html
<ste-search :clearable="false" @search="onSearch" />
```

#### 颜色和背景

-   可以通过`borderColor`属性设置边框颜色
-   可以通过`background`属性设置背景颜色或者背景图片
-   可以通过`prefixIconColor`属性设置左侧图标颜色
-   可以通过`placeholderColor`属性设置占位符颜色
-   可以通过`inputTextColor`属性设置输入框文字颜色
-   可以通过`clearIconColor`属性设置清除按钮图标颜色
-   可以通过`btnBackground`属性设置搜索按钮背景颜色或者背景图片
-   可以通过`btnTextColor`属性设置搜索按钮文字颜色

```html
<ste-search
    placeholder="全部颜色"
    borderColor="#F00"
    background="#000"
    prefixIconColor="#a55"
    placeholderColor="#a55"
    inputTextColor="#fff"
    clearIconColor="#a55"
    btnBackground="#fff"
    btnTextColor="#000"
    @search="onSearch"
/>

<ste-search
    placeholder="背景渐变和按钮背景渐变"
    hiddenLine
    borderColor="#F00"
    background="linear-gradient(to right, #aaaaaa, #aaa000)"
    prefixIconColor="#fff"
    placeholderColor="#fff"
    inputTextColor="#fff"
    clearIconColor="#a55"
    btnBackground="linear-gradient(to right, #0AAAAA, #000FFF)"
    btnTextColor="#fff"
    @search="onSearch"
/>

<ste-search
    placeholder="背景图片和按钮背景图片"
    hiddenLine
    borderColor="#F00"
    background="https://image.whzb.com/chain/StellarUI/背景1.png"
    prefixIconColor="#fff"
    placeholderColor="#fff"
    inputTextColor="#fff"
    clearIconColor="#a55"
    btnBackground="https://image.whzb.com/chain/StellarUI/背景2.png"
    btnTextColor="#fff"
    @search="onSearch"
/>
```

#### 自定义高度以及圆角弧度

-   可以通过`height`属性设置搜索框高度，默认值`64`
-   可以通过`radius`属性设置圆角弧度，默认值`32`

```
<ste-search :height="120" :radius="60" @search="onSearch" />
```

#### 导航模式

-   可以通过`type`属性设置`nav`开启导航模式；开启后，点击搜索框任意区域都会触发`click`事件，其他功能失效。

```
<ste-search type="nav" @click="onClick" :hotWords="hotWords" />
```

#### 聚焦

-   可以通过`fous`属性控制搜索框聚焦，双向绑定

```
<ste-search @click="onClick" :focus.sync="focus" />
<!--聚焦按钮-->
<view style="margin: 10px auto 0 auto">
	<ste-button @click="focus = true" width="100%">聚焦</ste-button>
</view>
```

### API

<!-- props -->

{{xuyajun}}
