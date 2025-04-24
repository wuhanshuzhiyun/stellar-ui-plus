import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import Tree from '../../src/uni_modules/stellar-ui-plus/components/ste-tree/ste-tree.vue';

describe('Tree Component', async () => {
	const wrapper = mount(Tree, {
		propsData: {
			options: [],
			valueKey: "value",
			titleKey: "title",
			childrenKey: "children",
			accordion: true,
			childrenPadding: 40,
			openNodes: [],
			searchTitle: "",
		}
	})

	await nextTick();

	test("options", () => {
		expect(wrapper.props("options")).toEqual([])
	})

	test("valueKey", () => {
		expect(wrapper.props("valueKey")).toBe("value")
	})

	test("titleKey", () => {
		expect(wrapper.props("titleKey")).toBe("title")
	})

	test("childrenKey", () => {
		expect(wrapper.props("childrenKey")).toBe("children")
	})

	test("accordion", () => {
		expect(wrapper.props("accordion")).toBe(true)
	})

	test("childrenPadding", () => {
		expect(wrapper.props("childrenPadding")).toBe(40)
	})

	test("openNodes", () => {
		expect(wrapper.props("openNodes")).toEqual([])
	})

	test("searchTitle", () => {
		expect(wrapper.props("searchTitle")).toBe("")
	})

});
