# Slider 滑块

滑块

{{compatibility}}

### 代码演示

#### 基础使用

```html
<ste-slider value="30"></ste-slider>
```

#### 滑块条高度 & 滑块大小

```html
<ste-slider barHeight="26" value="30"></ste-slider>
<ste-slider buttonSize="50" value="30"></ste-slider>
```

#### 进度条颜色

```html
<ste-slider value="30" activeColor="#ff0000" inactiveColor="#a9ee13"></ste-slider>
```

#### 范围选择

```html
<ste-slider :value="[10, 20]" range></ste-slider>
```

#### 竖向

```html
<ste-slider vertical value="30"></ste-slider>
```

#### 禁用

```html
<ste-slider disabled value="30"></ste-slider>
```

#### 只读

```html
<ste-slider readonly value="30"></ste-slider>
```

#### 间断点

当`showStops`为`true`时，会根据最大值(`max`)、最小值(`min`)、步长(`step`)来显示间断点

```html
<ste-slider showStops :step="10" value="30"></ste-slider>
```

#### 标记

当同时配置了`showStops`属性和`marks`属性时，会显示自定义节点

```html
<ste-slider showStops :marks="marks" value="30"></ste-slider>
<script>
    export default {
        data() {
            return {
                marks: {
                    10: '0°C',
                    20: '8°C',
                    37: '37°C',
                    80: {
                        style: {
                            color: '#1989FA',
                        },
                        label: '合格',
                    },
                },
            };
        },
    };
</script>
```

#### 自定义滑块

```html
<ste-slider :step="10" showStops value="30" activeColor="#ff0000">
    <view class="c-slider-1" slot="button">
        <view class="content">
            <text>滑块</text>
        </view>
    </view>
</ste-slider>
<ste-slider :step="10" showStops :value="[10, 40]" range>
    <view class="c-slider-2" slot="leftButton">
        <view class="content">
            <ste-icon code="&#xe673;" color="#fff"></ste-icon>
        </view>
    </view>
    <view class="c-slider-2" slot="rightButton">
        <view class="content">
            <ste-icon code="&#xe674;" color="#fff"></ste-icon>
        </view>
    </view>
</ste-slider>
<style lang="scss">
    .c-slider-1 {
        .content {
            padding: 0 16rpx;
            background-color: #ff0000;
            border-radius: 20rpx;

            color: #ffffff;
            font-size: 24rpx;

            text {
                white-space: nowrap;
            }
        }
    }
    .c-slider-2 {
        .content {
            background-color: #0090ff;
            border-radius: 50%;
            height: 40rpx;
            width: 40rpx;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
```

### API

<!-- props -->

#### 组件插槽(Slots)

| 插槽名   | 说明                             | 插槽参数 | 支持版本 |
| -------- | -------------------------------- | -------- | -------- |
| `button` | 自定义滑块按钮                   | -        | -        |
| `button` | 自定义左侧滑块按钮（范围选择下)  | -        | -        |
| `button` | 自定义右侧滑块按钮（范围选择下） | -        | -        |

{{fuyuwei}}
