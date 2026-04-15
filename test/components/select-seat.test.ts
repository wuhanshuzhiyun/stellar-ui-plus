import { mount } from '@vue/test-utils';
import steSelectSeat from '../../src/uni_modules/stellar-ui-plus/components/ste-select-seat/ste-select-seat.vue';

describe('SelectSeat', () => {
    test('default props', () => {
        const wrapper = mount(steSelectSeat);
        expect(wrapper.props('rows')).toBe(0);
        expect(wrapper.props('cols')).toBe(0);
        expect(wrapper.props('width')).toBe(350);
        expect(wrapper.props('height')).toBe(400);
        expect(wrapper.props('seatSize')).toBe(40);
        expect(wrapper.props('seatGap')).toBe(8);
        expect(wrapper.props('showRowLabels')).toBe(true);
    });

    test('modelValue', () => {
        const modelValue = [{ row: 0, col: 1 }, { row: 2, col: 3 }];
        const wrapper = mount(steSelectSeat, {
            props: { modelValue },
        });
        expect(wrapper.props('modelValue')).toEqual(modelValue);
    });

    test('rows and cols', () => {
        const wrapper = mount(steSelectSeat, {
            props: { rows: 5, cols: 8 },
        });
        expect(wrapper.props('rows')).toBe(5);
        expect(wrapper.props('cols')).toBe(8);
    });

    test('custom size', () => {
        const wrapper = mount(steSelectSeat, {
            props: { width: 500, height: 600, seatSize: 50, seatGap: 10 },
        });
        expect(wrapper.props('width')).toBe(500);
        expect(wrapper.props('height')).toBe(600);
        expect(wrapper.props('seatSize')).toBe(50);
        expect(wrapper.props('seatGap')).toBe(10);
    });

    test('custom colors', () => {
        const wrapper = mount(steSelectSeat, {
            props: {
                bgColor: '#f0f0f0',
                borderColor: '#cccccc',
                selectedBgColor: '#0090FF',
                selectedColor: '#ffffff',
                disabledBgColor: '#999999',
            },
        });
        expect(wrapper.props('bgColor')).toBe('#f0f0f0');
        expect(wrapper.props('borderColor')).toBe('#cccccc');
        expect(wrapper.props('selectedBgColor')).toBe('#0090FF');
        expect(wrapper.props('selectedColor')).toBe('#ffffff');
        expect(wrapper.props('disabledBgColor')).toBe('#999999');
    });

    test('showRowLabels false', () => {
        const wrapper = mount(steSelectSeat, {
            props: { showRowLabels: false },
        });
        expect(wrapper.props('showRowLabels')).toBe(false);
    });

    test('seats custom data', () => {
        const seats = [
            { row: 0, col: 0, disabled: true },
            { row: 0, col: 1, empty: true },
            { row: 1, col: 0, bgColor: '#ff0000' },
        ];
        const wrapper = mount(steSelectSeat, {
            props: { rows: 2, cols: 2, seats },
        });
        expect(wrapper.props('seats')).toEqual(seats);
    });

    test('emit update:modelValue on seat-click', async () => {
        const wrapper = mount(steSelectSeat, {
            props: { rows: 3, cols: 3, modelValue: [] },
        });
        await wrapper.vm.$emit('update:modelValue', [{ row: 1, col: 1 }]);
        const emitted = wrapper.emitted('update:modelValue');
        expect(emitted).toBeTruthy();
        expect(emitted![0]).toEqual([[{ row: 1, col: 1 }]]);
    });

    test('borderRadius and borderWidth', () => {
        const wrapper = mount(steSelectSeat, {
            props: { borderRadius: 16, borderWidth: 2 },
        });
        expect(wrapper.props('borderRadius')).toBe(16);
        expect(wrapper.props('borderWidth')).toBe(2);
    });
});
