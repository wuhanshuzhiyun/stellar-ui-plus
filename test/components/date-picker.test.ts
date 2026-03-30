import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steDatePicker from '../../src/uni_modules/stellar-ui-plus/components/ste-date-picker/ste-date-picker.vue';
import stePicker from '../../src/uni_modules/stellar-ui-plus/components/ste-picker/ste-picker.vue';
import { describe, test, expect } from 'vitest';

describe('DatePicker', () => {
    test('columns', async () => {
        const wrapper = mount(steDatePicker, {
            global: {
                components: {
                    'ste-picker': stePicker,
                },
            },
            props: {
                value: '2020-05-20 00:00:01',
                mode: 'datetime',
                minDate: '2015-01-01',
                maxDate: '2025-12-31',
            },
        });

        await nextTick();
        await new Promise(r => setTimeout(r, 100));

        const columnsData = wrapper.vm.columns;
        expect(columnsData).toHaveLength(5);

        expect(columnsData[0]).toEqual(expect.arrayContaining(['2020']));
        expect(columnsData[1]).toEqual(expect.arrayContaining(['05']));
        expect(columnsData[2]).toEqual(expect.arrayContaining(['20']));
        expect(true).toBeTruthy();
    });

    test('min & max', async () => {
        const wrapper = mount(steDatePicker, {
            global: {
                components: {
                    'ste-picker': stePicker,
                },
            },
            props: {
                value: '2015-05-20 00:00:01',
                mode: 'datetime',
                minDate: '2010-01-01',
                maxDate: '2030-12-31',
            },
        });

        await nextTick();
        await new Promise(r => setTimeout(r, 100));

        const minValue = wrapper.vm.correctValue('2000-01-01');
        const minExpected = new Date('2010-01-01').getTime();
        expect(Math.abs(minValue - minExpected)).toBeLessThan(86400000);

        const maxValue = wrapper.vm.correctValue('2040-01-01');
        const maxExpected = new Date('2030-12-31').getTime();
        expect(Math.abs(maxValue - maxExpected)).toBeLessThan(86400000);
    });

    test('update', async () => {
        const wrapper = mount(steDatePicker, {
            global: {
                components: { 'ste-picker': stePicker },
            },
            props: {
                value: '2020-05-20 00:00:01',
                minDate: '2015-01-01',
                maxDate: '2025-12-31',
            },
        });

        await nextTick();
        await new Promise(r => setTimeout(r, 100));

        const initialValue = wrapper.vm.innerValue;

        const newDateString = '2022-12-25 12:30:45';
        const newDateValue = new Date(newDateString).getTime();

        await wrapper.vm.updateColumnValue(newDateValue);

        expect(wrapper.vm.innerValue).not.toBe(initialValue);

        const yearColumn = wrapper.vm.columns[0];
        const monthColumn = wrapper.vm.columns[1];
        const dayColumn = wrapper.vm.columns[2];

        expect(yearColumn).toEqual(expect.arrayContaining(['2022']));
        expect(monthColumn).toEqual(expect.arrayContaining(['12']));
        expect(dayColumn).toEqual(expect.arrayContaining(['25']));
    });
});
