import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steTable from '../../src/uni_modules/stellar-ui-plus/components/ste-table/ste-table.vue';
import steTableColumn from '../../src/uni_modules/stellar-ui-plus/components/ste-table-column/ste-table-column.vue';
import { flushPromises } from '@vue/test-utils';

describe('Table', async () => {
    let wrapper = mount(steTable, {
        global: {
            components: {
                'ste-table-column': steTableColumn,
            },
        },
        props: {
            data: [
                { name: '张三', birth: '2023.12.31', sex: '男', state: 1 },
                { name: '李四', birth: '2024.01.01', sex: '女', state: 2 },
                { name: '王五', birth: '2024.11.01', sex: '女', state: 1 },
                { name: '赵六', birth: '2024.11.01', sex: '女', state: 2 },
                { name: '王七', birth: '2024.01.01', sex: '男', state: 1 },
            ],
        },
        slots: {
            default: `
            <template v-slot="{ row }">
                <ste-table-column label="姓名" prop="name"></ste-table-column>
                <ste-table-column label="生日" prop="birth"></ste-table-column>
                <ste-table-column label="性别" prop="sex"></ste-table-column>
            </template>
        `,
        },
    });
    await nextTick();
    await flushPromises(); // 等待所有异步操作完成

    test('row', async () => {
        const rows = wrapper.findAll('.ste-table-row');
        expect(rows.length).toBe(5);
    });
});
