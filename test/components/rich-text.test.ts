import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import steRichText from '../../src/uni_modules/stellar-ui-plus/components/ste-rich-text/ste-rich-text.vue';

describe('RichText', async () => {
    const wrapper = mount(steRichText, {
        propsData: {
            text: '<p><img style="width:100%;height:auto" src="https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000366/100026961503/FocusFullshop/CkJqZnMvdDEvOTA5NzAvMzQvMzgzMjcvNDQ4ODgvNjVkNjRkYTZGOWYzOTM2ODcvMTZiMzk1N2M5YjI5ZDY5Yy5wbmcSCTMtdHlfMF81NDACOO6LekIWChLntKLlsLzmnInnur_ogLPmnLoQAUITCg_kvJjmg6DkuqvkuI3lgZwQAkIQCgznq4vljbPmiqLotK0QBkIKCgbkvJjpgIkQB1jfnMnQ9AI/cr/s/q.jpg"/></p>',
        },
    });
    const richText = wrapper.get('[data-test="rich-text"]').get('.rich-text');
    const nodes = richText.attributes().nodes;
    await nextTick();

    test('text', () => {
        expect(nodes).toMatch(';margin-top:0');
        expect(nodes).toMatch(';margin-bottom:0');
        expect(nodes).toMatch(';vertical-align:top');
    });
});
