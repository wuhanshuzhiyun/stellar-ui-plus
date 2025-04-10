# Loading 加载动画

加载动画，用于表示加载中的过渡状态

---$

## 代码演示

### 加载类型

通过 `type`设置加载动画类型，默认为类型`1`

- `1`：逐渐减淡的颜色为主色的透明度变化 透明度以10%的差距逐渐递减
- `2`：动态转圈展示

```html
<ste-loading></ste-loading>
<ste-loading :type="2"></ste-loading>
```

### 自定义图标颜色

通过 `color` 属性来设置图标的颜色

```html
<ste-loading color="#0090FF"></ste-loading>
<ste-loading :type="2" color="#0090FF"></ste-loading>
```

### 自定义图标大小

通过 `size` 属性来设置图标的尺寸大小，单位为 rpx，默认`60`

```html
<ste-loading :size="100"></ste-loading>
<ste-loading :type="2" :size="100"></ste-loading>
```

### 加载文案

默认插槽`default`为加载文案

```html
<ste-loading>加载中...</ste-loading>
<ste-loading :type="2">加载中...</ste-loading>
```

### 垂直排列

通过 `vertical` 是否垂直排列图标和文字内容，默认`false`

```html
<ste-loading vertical>加载中...</ste-loading>
<ste-loading :type="2" vertical>加载中...</ste-loading>
```

### 自定义文本样式

- 通过 `textSize`设置文本大小，单位rpx，默认为`28`
- 通过 `textColor`设置文本颜色，默认和图标颜色同步

```html
<ste-loading :textSize="50" textColor="#0090FF">加载中...</ste-loading>
<ste-loading :type="2" :textSize="50" textColor="#0090FF">加载中...</ste-loading>
```

---$

### API

<!-- props -->

---$
{{qinpengfei}}
