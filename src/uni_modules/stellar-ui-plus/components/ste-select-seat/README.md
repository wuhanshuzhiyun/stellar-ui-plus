# SelectSeat 座位选择

用于电影院、演出、车厢选座等场景的座位选择组件，基于 Canvas 渲染，支持单指拖拽、双指缩放，适合中大规模座位图展示。

---$

## 代码演示

## 基础用法

最简单的用法只需要传入行列数和画布尺寸。

```html
<template>
    <ste-select-seat v-model="selected" :rows="5" :cols="8" :width="340" :height="240" />
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import type { SteSelectSeatValue } from 'stellar-ui-plus/components/ste-select-seat/types';

    const selected = ref<SteSelectSeatValue[]>([]);
</script>
```

## 自定义座位

通过 `seats` 可以覆盖指定坐标的座位属性，常见场景包括：

- `empty: true` 表示该位置留空，不渲染座位
- `disabled: true` 表示该位置不可选
- 也可以单独配置某个区域的颜色

```html
<template>
    <ste-select-seat v-model="selected" :rows="5" :cols="8" :width="340" :height="240" :seats="customSeats" selectedBgColor="#007aff" />
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import type { SteSelectSeatItem, SteSelectSeatValue } from 'stellar-ui-plus/components/ste-select-seat/types';

    const selected = ref<SteSelectSeatValue[]>([]);

    const customSeats: SteSelectSeatItem[] = [
        { row: 0, col: 2, empty: true },
        { row: 0, col: 3, empty: true },
        { row: 1, col: 0, disabled: true },
        { row: 1, col: 1, disabled: true },
        { row: 2, col: 4, bgColor: '#fff3e0', borderColor: '#ff9800', selectedBgColor: '#ff9800' },
        { row: 2, col: 5, bgColor: '#fff3e0', borderColor: '#ff9800', selectedBgColor: '#ff9800' },
        { row: 4, col: 0, empty: true },
        { row: 4, col: 7, empty: true },
    ];
</script>
```

## 预选座位

预选本质上就是给 `v-model` 初始值。这里的坐标只表示“已选状态”，不负责定义座位是否禁用、是否留空。

```html
<template>
    <ste-select-seat v-model="selected" :rows="5" :cols="8" :width="340" :height="240" />
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import type { SteSelectSeatValue } from 'stellar-ui-plus/components/ste-select-seat/types';

    const selected = ref<SteSelectSeatValue[]>([
        { row: 1, col: 3 },
        { row: 1, col: 4 },
        { row: 2, col: 3 },
        { row: 2, col: 4 },
    ]);
</script>
```

## 重置位置

组件实例暴露了 `reset()`，用于把当前缩放和拖拽视口恢复到初始状态，不会清空已选座位。

```html
<template>
    <ste-select-seat ref="seatRef" v-model="selected" :rows="5" :cols="8" :width="340" :height="240" />
    <button @click="reset">重置位置</button>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import type { SteSelectSeatValue } from 'stellar-ui-plus/components/ste-select-seat/types';

    const seatRef = ref<any>(null);
    const selected = ref<SteSelectSeatValue[]>([]);

    const reset = () => {
        seatRef.value?.reset();
    };
</script>
```

## 电影院座位图

复杂场景通常会同时用到以下能力：

- 通过 `seats` 区分已售、优选区、情侣座
- 通过 `empty` 留出过道、边角空位
- 通过 `move` 事件同步顶部银幕等浮层位置

```html
<script lang="ts" setup>
    import { computed, ref } from 'vue';
    import type { SteSelectSeatItem, SteSelectSeatMoveEvent, SteSelectSeatValue } from 'stellar-ui-plus/components/ste-select-seat/types';

    type SeatCoord = { row: number; col: number };

    const rows = 12;
    const cols = 20;
    const selected = ref<SteSelectSeatValue[]>([
        { row: 6, col: 7 },
        { row: 6, col: 8 },
    ]);
    const viewport = ref<SteSelectSeatMoveEvent>({
        translateX: 0,
        translateY: 0,
        scale: 1,
        screenTranslateX: 0,
    });

    const soldSeatCoords: SeatCoord[] = [
        { row: 2, col: 3 },
        { row: 2, col: 4 },
        { row: 4, col: 6 },
        { row: 7, col: 14 },
    ];

    const vipSeatCoords: SeatCoord[] = [
        { row: 6, col: 6 },
        { row: 6, col: 7 },
        { row: 6, col: 8 },
        { row: 6, col: 11 },
        { row: 6, col: 12 },
        { row: 6, col: 13 },
    ];

    const coupleSeatCoords: SeatCoord[] = [
        { row: 10, col: 5 },
        { row: 10, col: 6 },
        { row: 10, col: 13 },
        { row: 10, col: 14 },
    ];

    const toSeatKey = ({ row, col }: SeatCoord) => `${row}-${col}`;
    const soldSeatSet = new Set(soldSeatCoords.map(toSeatKey));
    const vipSeatSet = new Set(vipSeatCoords.map(toSeatKey));
    const coupleSeatSet = new Set(coupleSeatCoords.map(toSeatKey));

    const isAisleCol = (col: number) => col === 9 || col === 10;
    const isFrontSideGap = (row: number, col: number) => (row === 0 || row === 1) && (col <= 1 || col >= 18);
    const isBackCornerGap = (row: number, col: number) => row === 11 && (col === 0 || col === 19);
    const isEmptySeat = (row: number, col: number) => isAisleCol(col) || isFrontSideGap(row, col) || isBackCornerGap(row, col);

    const seats = computed<SteSelectSeatItem[]>(() => {
        const list: SteSelectSeatItem[] = [];

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (isEmptySeat(row, col)) {
                    list.push({ row, col, empty: true });
                    continue;
                }

                const key = `${row}-${col}`;

                if (soldSeatSet.has(key)) {
                    list.push({ row, col, disabled: true, bgColor: '#cfd4dc', borderColor: '#cfd4dc' });
                    continue;
                }

                if (vipSeatSet.has(key)) {
                    list.push({ row, col, bgColor: '#fff4d6', borderColor: '#ffb400', selectedBgColor: '#ffb400' });
                    continue;
                }

                if (coupleSeatSet.has(key)) {
                    list.push({ row, col, bgColor: '#ffe4ea', borderColor: '#ff7a9d', selectedBgColor: '#ff5c8a' });
                    continue;
                }
            }
        }

        return list;
    });

    const onMove = (event: SteSelectSeatMoveEvent) => {
        viewport.value = event;
    };
</script>

<template>
    <view class="seat-stage">
        <view class="screen" :style="{ transform: `translateX(${viewport.screenTranslateX}px)` }">银幕中央</view>

        <ste-select-seat
            v-model="selected"
            :rows="rows"
            :cols="cols"
            :width="340"
            :height="200"
            :seat-size="30"
            :seat-gap="6"
            :border-radius="8"
            :seats="seats"
            selected-bg-color="#2d6cdf"
            @move="onMove"
        />
    </view>
</template>
```

---$

<!-- props -->

## 数据说明

## 坐标约定

- 所有 `row`、`col` 均从 `0` 开始计数
- `row: 0, col: 0` 表示第一行第一列
- 页面展示给用户时，通常会自行转成 `row + 1`、`col + 1`

## `modelValue` 与 `seats` 的区别

- `modelValue` 只表示当前选中了哪些座位
- `seats` 只表示这些座位是什么属性
- 两者职责分离，避免把“选中状态”和“座位配置”混在一起

例如：

- 某个座位是已售：应在 `seats` 中配置 `disabled: true`
- 某个座位默认选中：应在 `modelValue` 中写入对应坐标
- 某个位置是过道：应在 `seats` 中配置 `empty: true`

## 注意事项

- `rows` 和 `cols` 必须为大于 `0` 的整数，否则不会正常渲染座位，并输出告警。
- `seats` 中缺少合法 `row/col`、或坐标超出 `rows/cols` 范围的项会被忽略，并输出告警。
- `seats` 中如果存在重复坐标，后一个配置会覆盖前一个，并输出告警。
- `setSeat()` 同样会校验坐标合法性，越界或非法时不会生效。
- `empty: true` 的位置不会渲染，也不会触发点击。
- `disabled: true` 的位置会渲染，但不可选、不会切换选中状态。
- `width`、`height` 决定可视区域大小；如果座位图较大，建议配合拖拽缩放使用。
- `showRowLabels` 适合影院、车厢等纵向较长的座位图场景，小型座位图可关闭以减少干扰。

## 使用建议

- 普通场景只传 `rows`、`cols`、`v-model` 即可。
- 有过道、不可售、分区价格时，再补充 `seats`。
- 如果需要“银幕跟随”“顶部浮层跟随”等效果，监听 `move` 事件即可。
- 如果业务里存在实时锁座、出票状态刷新，建议用 `setSeat()` 做局部更新，而不是每次重建整张座位图。

---$

{{fuyuwei}}
