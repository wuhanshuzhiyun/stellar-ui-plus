<script setup lang="ts">
const node1 =
    '<p><img style="width:100%;height:auto" src="https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000366/100026961503/FocusFullshop/CkJqZnMvdDEvOTA5NzAvMzQvMzgzMjcvNDQ4ODgvNjVkNjRkYTZGOWYzOTM2ODcvMTZiMzk1N2M5YjI5ZDY5Yy5wbmcSCTMtdHlfMF81NDACOO6LekIWChLntKLlsLzmnInnur_ogLPmnLoQAUITCg_kvJjmg6DkuqvkuI3lgZwQAkIQCgznq4vljbPmiqLotK0QBkIKCgbkvJjpgIkQB1jfnMnQ9AI/cr/s/q.jpg"/></p>';

const node2 =
    '<p><img style="width:100%;height:auto" src="https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000366/100026961503/FocusFullshop/CkJqZnMvdDEvOTA5NzAvMzQvMzgzMjcvNDQ4ODgvNjVkNjRkYTZGOWYzOTM2ODcvMTZiMzk1N2M5YjI5ZDY5Yy5wbmcSCTMtdHlfMF81NDACOO6LekIWChLntKLlsLzmnInnur_ogLPmnLoQAUITCg_kvJjmg6DkuqvkuI3lgZwQAkIQCgznq4vljbPmiqLotK0QBkIKCgbkvJjpgIkQB1jfnMnQ9AI/cr/s/q.jpg"/></p><p><img style="width:100%;height:auto" src="https://imgcps.jd.com/img-cubic/creative_server_cia_jdcloud/v2/2000367/2273632/FocusFullshop/CkJqZnMvdDEvOTc3MTkvMjMvMzc2MjYvMzU0NjgvNjVkM2FlYTZGNjYwZTZhZTEvZGYwZTgzYjU2YWE3M2VjMy5wbmcSCTUtdHlfMF81NjACOO-LekIRCg3mrKfkuZBC54mZ6IaPEAFCEwoP5L2g5YC85b6X5oul5pyJEAJCEAoM56uL5Y2z5oqi6LStEAZCCgoG5Yqb6I2QEAdY4OKKAQ/cr/s/q.jpg"/></p>';

const node3 =
    '<p><strong style="color: rgb(102, 102, 102); line-height: initial;"><img src="https://zboa.whzb.com/newapp_cc_img_dev/blade/upload/20231225/b7c597e00b183072f46bdf94b67f1a7d.png" height="12px" width="auto" style="vertical-align: middle;margin-top:-2px;"> </strong><strong style="font-size: 14px; color: rgb(102, 102, 102); line-height: initial;">有效期</strong></p><p><strong style="color: rgb(102, 102, 102); line-height: initial;"> </strong><strong style="font-size: 12px; color: rgb(102, 102, 102); line-height: initial;">   </strong><span style="font-size: 12px; color: rgb(102, 102, 102); line-height: initial;">购卡后有效期3年</span></p><p><br></p><p><strong style="color: rgb(102, 102, 102); line-height: initial;"><img src="https://zboa.whzb.com/newapp_cc_img_dev/blade/upload/20231225/eb91bb2c45eeedb35451ae834c72e402.png" height="12px" width="auto" style="vertical-align: middle;margin-top:-2px;"> </strong><strong style="font-size: 14px; color: rgb(102, 102, 102); line-height: initial;">可用时间</strong></p><p><strong style="color: rgb(102, 102, 102); line-height: initial;">   </strong><strong style="font-size: 12px; color: rgb(102, 102, 102); line-height: initial;"> </strong><span style="font-size: 12px; color: rgb(102, 102, 102); line-height: initial;">商家营业时间内可用</span></p><p><br></p><p><strong style="color: rgb(102, 102, 102); line-height: initial;"><img src="https://zboa.whzb.com/newapp_cc_img_dev/blade/upload/20231225/d0bec3023758550cd9c045113fc8b3a9.png" height="12px" width="auto" style="vertical-align: middle;margin-top:-2px;"> </strong><strong style="font-size: 14px; color: rgb(102, 102, 102); line-height: initial;">使用范围</strong></p><p><strong style="color: rgb(102, 102, 102); line-height: initial;">    </strong><span style="font-size: 12px; color: rgb(102, 102, 102); line-height: initial;">指定商品不可用(茅台)</span></p><p><br></p><p><strong style="color: rgb(102, 102, 102); line-height: initial;"><img src="https://zboa.whzb.com/newapp_cc_img_dev/blade/upload/20231225/e5778e05946cf5f4a78ff6a105610ca3.png" height="12px" width="auto" style="vertical-align: middle;margin-top:-2px;"> </strong><strong style="font-size: 14px; color: rgb(102, 102, 102); line-height: initial;">退款规则</strong></p><p><strong style="color: rgb(102, 102, 102); line-height: initial;">    </strong><span style="font-size: 12px; color: rgb(102, 102, 102); line-height: initial;">电子卡一经售出不退卡</span></p><p><br></p><p><strong style="color: rgb(102, 102, 102); line-height: initial;"><img src="https://zboa.whzb.com/newapp_cc_img_dev/blade/upload/20231225/ac7817e4207a790477a48795ac6b90aa.png" height="12px" width="auto" style="vertical-align: middle;margin-top:-2px;"> </strong><strong style="font-size: 14px; color: rgb(102, 102, 102); line-height: initial;">其他规则</strong></p><p><span style="font-size: 12px; color: rgb(102, 102, 102); line-height: initial;">    ·请确认“卡面面值”、“优惠明细”及“支付”金额无误后购买 </span></p><p><span style="font-size: 12px; color: rgb(102, 102, 102); line-height: initial;">    ·支付成功后可在“卡包”中查看 </span></p><p><span style="font-size: 12px; color: rgb(102, 102, 102); line-height: initial;">    ·电子发票上线中</span></p>';
</script>
<template>
    <page-layout title="富文本">
        <view class="description">
            <view class="cmp-name">RichText 富文本</view>
            <view class="cmp-desc">富文本，增加文本换行功能，解决两张图片中间有空隙的问题。</view>
        </view>
        <view class="demo-item">
            <view class="title">一张图片</view>
            <view class="item-block">
                <ste-rich-text :text="node1"></ste-rich-text>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">两张图片</view>
            <view class="item-block">
                <ste-rich-text :text="node2"></ste-rich-text>
            </view>
        </view>
        <view class="demo-item">
            <view class="title">图片混合</view>
            <view class="item-block">
                <ste-rich-text :text="node3"></ste-rich-text>
            </view>
        </view>
    </page-layout>
</template>
<style scoped lang="scss">
.demo-item {
    .item-block {
        display: block;
        margin-bottom: 12rpx;
        & > .ste-search {
            margin: 0 8px 8px 0;
        }
    }
}
</style>
