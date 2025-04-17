import { mount } from '@vue/test-utils';
import steReadMore from '../../src/uni_modules/stellar-ui-plus/components/ste-read-more/ste-read-more.vue';
import { nextTick } from 'vue';

describe('ReadMore', async () => {
    const moreStr =
        '浔阳江头夜送客，枫叶荻花秋瑟瑟。主人下马客在船，举酒欲饮无管弦。醉不成欢惨将别，别时茫茫江浸月。 忽闻水上琵琶声，主人忘归客不发。寻声暗问弹者谁，琵琶声停欲语迟。移船相近邀相见，添酒回灯重开宴。千呼万唤始出来，犹抱琵琶半遮面。凝绝不通声暂歇。悄无言，唯见江心秋月白。 沉吟放拨插弦中，整顿衣裳起敛容。自言本是京城女，家在虾蟆陵下住。十三学得琵琶成，名属教坊第一部。曲罢曾教善才服，妆成每被秋娘妒。五陵年少争缠头，一曲红绡不知数。钿头银篦击节碎，血色罗裙翻酒污。今年欢笑复明年，秋月春风等闲度。弟走从军阿姨死，暮去朝来颜色故';

    const wrapper = mount(steReadMore, {
        props: {
            showHeight: 300,
            toggle: true,
        },
        slots: {
            default: moreStr,
        },
    });
    let rootEl: any = wrapper.get('[data-test="read-more"]');
    const contentEl: any = rootEl.get('.content');
    await nextTick();

    test('content', () => {
        expect(contentEl.text()).toBe(moreStr);
    });
});
