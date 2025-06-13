<script setup lang="ts">
import { watch, onMounted, computed, nextTick } from 'vue';
import propsData from './props';
import UniUpdate from './rt-uni-update.vue';

const props = defineProps(propsData);

interface Data {
    id: number;
    createUser: number;
    createDept: number;
    createTime: string;
    updateUser: number;
    updateTime: string;
    status: number;
    isDeleted: number;
    tenantId: string;
    /** 应用id(关联inte_client表id字段) */
    inteClientId: number;
    /** 版本号 */
    code: string;
    /** 版本名称 */
    name: string;
    /** 版本说明 */
    desc: string;
    /** 版本更新内容 */
    content: string;
    /** 版本更新文件地址 */
    updateFile: string;
    /** 版本完整文件地址 */
    entireFile: string;
    /** 是否当前版本 */
    isCurrent: true;
    /** 是否强制更新 */
    isForce: true;
    /** 发布状态 TO_RELEASE待发布、RELEASED已发布 */
    publishStatus: 'TO_RELEASE' | 'RELEASED';
    createUserName: string;
    updateUserName: string;
    createDeptName: string;
}

uni.request({
    url: 'http://172.16.118.216:30043/blade-system/api/inte/client/ver/currentDetail',
    method: 'GET',
    header: {
        Authorization: props.Authorization,
        'Blade-Auth': props.BladeAuth,
    },
    success: (res: any) => {
        const data: {
            code: number;
            success: boolean;
            msg: string;
            data: Data;
        } = res.data;
        if (data.code == 200) {
            console.log(data.data);
        } else {
            console.log(data.msg);
        }
    },
});
</script>
<template>
    <view class="ste-app-update-root">
        <UniUpdate />
    </view>
</template>

<style lang="scss" scoped>
.ste-app-update-root {
}
</style>
