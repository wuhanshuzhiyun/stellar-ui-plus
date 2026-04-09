import { mount } from '@vue/test-utils';
import steComment from '@/uni_modules/stellar-ui-plus/components/ste-comment/ste-comment.vue';

describe('Comment', () => {
    test('基本渲染', () => {
        const wrapper = mount(steComment);
        expect(wrapper.exists()).toBe(true);
    });

    test('显示标签', () => {
        const wrapper = mount(steComment, {
            props: {
                tags: ['好评', '服务好', '质量好']
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('显示总数', () => {
        const wrapper = mount(steComment, {
            props: {
                total: 100
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('显示评论数据', () => {
        const comments = [
            {
                evaluateText: '非常好的产品，推荐购买！',
                imgList: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
                type: 1,
                date: '2024-01-01',
                userName: '用户1',
                userAvatar: 'https://example.com/avatar1.jpg'
            },
            {
                evaluateText: '服务态度很好，物流很快',
                imgList: [],
                type: 2,
                date: '2024-01-02',
                userName: '用户2',
                userAvatar: 'https://example.com/avatar2.jpg'
            }
        ];

        const wrapper = mount(steComment, {
            props: {
                comments
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('空评论数据', () => {
        const wrapper = mount(steComment, {
            props: {
                comments: []
            }
        });
        expect(wrapper.exists()).toBe(true);
    });

    test('完整数据渲染', () => {
        const comments = [
            {
                evaluateText: '产品质量不错，值得购买',
                imgList: ['https://example.com/img1.jpg'],
                type: 1,
                date: '2024-01-01',
                userName: '测试用户',
                userAvatar: 'https://example.com/avatar.jpg'
            }
        ];

        const wrapper = mount(steComment, {
            props: {
                tags: ['好评', '质量好'],
                total: 50,
                comments
            }
        });
        expect(wrapper.exists()).toBe(true);
    });
});