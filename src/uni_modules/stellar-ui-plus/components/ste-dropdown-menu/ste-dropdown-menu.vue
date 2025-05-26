<script lang="ts" setup>
import { watch, computed, ref, type CSSProperties, getCurrentInstance, type ComponentPublicInstance } from 'vue';
import { useProvide } from '../../utils/mixin';
import { DEFAULT_DURATION, MAX_DURATION, MIN_DURATION, DEFAULT_ROOT_QUERY } from './constans';
import propsData, { DEOP_DOWN_MENU_KEY, dropDownMenuEmits } from './props';
import type { DropdownItem } from '../ste-dropdown-menu-item/type';
import { type DropdownMenuItemProps } from '../ste-dropdown-menu-item/props';
import utils from '../../utils/utils';
import System from '../../utils/System.js';
import { useColorStore } from '../../store/color';
let { getColor } = useColorStore();

const props = defineProps(propsData);
const emits = defineEmits(dropDownMenuEmits);
const componentName = `ste-dropdown-menu`;
defineOptions({
    name: componentName,
    options: {
        virtualHost: true,
    },
});

const addPx = (val: string | number) => {
    if (utils.isNumber(String(val))) {
        return `${val}px`;
    } else {
        return 0;
    }
};

const showMenu = ref(false);
const menuRootQuery = ref<typeof DEFAULT_ROOT_QUERY>(DEFAULT_ROOT_QUERY);
const contentHeight = ref(0);
const menuTitle = ref<string | undefined>('');
const hiddenContent = ref(false);

let chooseItems: any[] = [];
const instance = getCurrentInstance() as unknown as ComponentPublicInstance;

const cmpRootClass = computed(() => {
    let classArr = [props.direction, showMenu.value ? 'open' : 'close', props.type];
    return classArr.join(' ');
});

const cmpRootStyle = computed(() => ({
    '--duration': cmpDuration.value + 's',
    '--active-color': props.activeColor ? props.activeColor : getColor().steThemeColor,
    '--inactive-color': props.inactiveColor,
    '--menu-z-index': props.zIndex,
}));
6;
const cmpMenuPlaceholderStyle = computed(() => {
    let style: CSSProperties = { height: 0 };

    if (showMenu.value) {
        if (props.direction == 'down') {
            style.height = addPx(menuRootQuery.value.top + menuRootQuery.value.height);
        } else {
            let windowHeight = System.getWindowInfo().windowHeight;
            style.height = addPx(windowHeight - menuRootQuery.value.bottom + menuRootQuery.value.height);
        }
    }

    return style;
});

const cmpMenuContentStyle = computed(() => {
    let style = {
        height: addPx(contentHeight.value),
        background: props.showMask ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)',
    } as CSSProperties;
    if (props.direction == 'down') {
        style.top = addPx(menuRootQuery.value.top + menuRootQuery.value.height);
    } else {
        style.top = 0;
    }
    return style;
});

const cmpDuration = computed(() => {
    if (!utils.isNumber(String(props.duration))) {
        return DEFAULT_DURATION;
    }
    if (Number(props.duration) > MAX_DURATION) {
        return MAX_DURATION;
    }
    if (Number(props.duration) < MIN_DURATION) {
        return MIN_DURATION;
    }
    return props.duration;
});

watch(
    () => [props.modelValue, props.value],
    ([modalVal, val]) => {
        let v = val ? val : modalVal;
        if (Array.isArray(v)) {
            chooseItems = v;
        } else {
            v ? (chooseItems = [v]) : '';
        }
    },
    { immediate: true }
);

let menuItems = ref<DropdownItem[]>([]);
function updateItems() {
    let childrens = internalChildren;
    if (childrens.length !== menuItems.value.length) {
        menuItems.value = childrens.map(e => e.props as DropdownMenuItemProps);
        loadMenuTitle();
    }
}

function loadMenuTitle() {
    if (!props.title) {
        let item = internalChildren.find(e => {
            return chooseItems.find(v => v == e.props.value);
        });
        menuTitle.value = (item?.props as DropdownMenuItemProps).title;
    } else {
        menuTitle.value = props.title;
    }
}
function touchmove(e: TouchEvent) {
    // TODO nvue 取消冒泡
    e.stopPropagation();
}
async function getContentHeight() {
    let windowHeight = System.getWindowInfo().windowHeight;

    const res = await utils.querySelector<false>('.ste-dropdown-menu-root', instance);
    menuRootQuery.value = { height: res.height || 0, top: res.top || 0, bottom: res.bottom || 0, left: res.left || 0 };
    contentHeight.value = props.direction == 'down' ? windowHeight - menuRootQuery.value.bottom : menuRootQuery.value.top;
}
async function handleMenuClick() {
    if (!showMenu.value) {
        await getContentHeight();
        open();
    } else {
        close();
    }
}
function open() {
    showMenu.value = true;
    hiddenContent.value = false;
    emits('open');
}
function close() {
    showMenu.value = false;
    setTimeout(
        () => {
            hiddenContent.value = true;
            contentHeight.value = 0;
            menuRootQuery.value = DEFAULT_ROOT_QUERY;
            emits('close');
        },
        Number(cmpDuration.value) * 1000
    );
}
function choose(item: DropdownItem) {
    let temp = chooseItems;
    let index = temp.findIndex(e => e == item.value);
    let max = props.max < 1 ? 1 : props.max;
    if (index > -1) {
        // 当选中项再次被选中时，做取消选中操作
        temp.splice(index, 1);
    } else {
        if (chooseItems.length < max) {
            temp.push(item.value);
        } else {
            temp.shift();
            temp.push(item.value);
        }
    }

    chooseItems = temp;
    loadMenuTitle();
    if (chooseItems.length == max) {
        close();
    }
    emits('update:modelValue', chooseItems);
    emits('change', chooseItems);
    emits('item-choose', item);
    triggerChildLoadStatus();
}
function handleMaskClick() {
    if (props.isMaskClick) {
        close();
    }
}
function handleMenuConentClick() {}

function triggerChildLoadStatus() {
    internalChildren.forEach(e => {
        (e.exposed as any).loadStatus();
    });
}

const { internalChildren } = useProvide(DEOP_DOWN_MENU_KEY, 'ste-checkbox')({ props, chooseItems, cmpDuration, choose, updateItems });
defineExpose({ close });
</script>

<template>
    <view class="ste-dropdown-menu-root" :class="[cmpRootClass]" :style="[cmpRootStyle]" @touchmove.stop.prevent="touchmove" @wheel.stop.prevent>
        <view class="dropdown-placeholder" :style="[cmpMenuPlaceholderStyle]" @click="close" @touchmove.stop.prevent="touchmove" @wheel.stop.prevent />
        <view class="menu-box" @click="handleMenuClick" @touchmove.stop.prevent="touchmove" @wheel.stop.prevent>
            <text class="title">{{ menuTitle || title }}</text>
            <view class="menu-title-icon">
                <ste-icon code="&#xe699;" size="16" :color="dropDownIconColor"></ste-icon>
            </view>
        </view>
        <view :class="hiddenContent ? 'dropdown-content hidden' : 'dropdown-content'" :style="[cmpMenuContentStyle]" @click="handleMaskClick" @touchmove.stop.prevent="touchmove" @wheel.stop.prevent>
            <view class="menu-item-content" @click.stop="handleMenuConentClick">
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
@import './ste-dropdown-menu.scss';
</style>
