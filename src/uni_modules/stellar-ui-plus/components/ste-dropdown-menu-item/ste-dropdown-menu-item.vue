<script lang="ts" setup>
import { ref, computed, type ComputedRef, onMounted } from 'vue';
import propsData, { dropdownMenuItemEmits } from './props';
import { type DropDownMenuProps, DEOP_DOWN_MENU_KEY } from '../ste-dropdown-menu/props';
import type { DropdownItem } from './type';
import { useInject } from '../../utils/mixin';

const props = defineProps(propsData);
const emits = defineEmits(dropdownMenuItemEmits);
const Parent = useInject<{ props: Required<DropDownMenuProps>; chooseItems: any[]; cmpDuration: ComputedRef; choose: (item: DropdownItem) => void; updateItems: () => void }>(DEOP_DOWN_MENU_KEY);
const parent = Parent.parent;
const parentProps = Parent.parent?.props as DropDownMenuProps;

const status = ref(false); // 是否选中状态 true: 选中，false: 未选中

const cmpRootClass = computed(() => {
    let classArr = [parentProps.direction];
    if (status.value) {
        classArr.push('active');
    }
    if (props.readonly) {
        classArr.push('readonly');
    }
    if (props.disabled) {
        classArr.push('disabled');
    }
    classArr.push(parentProps.type);
    return classArr.join(' ');
});

onMounted(() => {
    parent?.updateItems();
    loadStatus();
    // this.parent.$on('item-choose', value => {
    //     this.loadStatus();
    // });
});

function loadStatus() {
    if (parent?.chooseItems) {
        status.value = !!parent.chooseItems.find(e => e == props.value);
    }
}

let clickTask: Promise<any> | null = null;
async function handleClick() {
    if (!props.disabled && !props.readonly) {
        if (clickTask) {
            return;
        }
        let next = true;
        clickTask = new Promise((resolve, reject) => {
            emits(
                'click',
                () => (next = false),
                () => resolve(null),
                () => reject()
            );
        });
        if (!next) {
            await clickTask;
        }
        parent?.choose({ title: props.title, value: props.value });
        setTimeout(() => {
            clickTask = null;
            loadStatus();
        }, parent?.cmpDuration.value * 1000);
    }
}

defineExpose({ loadStatus });
</script>

<template>
    <view class="ste-dropdown-menu-item-root" :class="[cmpRootClass]" @click="handleClick">
        <text class="text">{{ title }}</text>
        <view class="menu-item-icon" v-if="parentProps.type == 'block'">
            <ste-icon code="&#xe67a;" size="32"></ste-icon>
        </view>
    </view>
</template>
<style lang="scss" scoped>
@import './ste-dropdown-menu-item.scss';
</style>
