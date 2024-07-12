<script lang="ts" setup>
import config from '@/uni_modules/stellar-plus/package.json';
</script>

<template>
	<view class="page">
		<page-nav :auto-back="true" back-color="#000" title-alignment="2" title="价格" />
		<view class="content">
			<view class="demo-item">
				<view class="title">金额单位</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" />
					</view>
					<view>
						<ste-price value="9527" value-unit="yuan" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">隐藏金额符号</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" :show-unit="false" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义金额符号</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" unit-symbol="$" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">自定义精度</view>
				<view class="item-block">
					<view>
						<ste-price value="9520" :digits="1" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">金额文字尺寸</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" font-size="50" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">金额文字颜色</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" color="green" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">划线价 & 划线价颜色</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" is-suggest-price />
					</view>
					<view>
						<ste-price value="9527" is-suggest-price line-price-color="#666666" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">金额样式 元和角分大小相等</view>
				<view class="item-block" style="display: block">
					<view>
						<ste-price value="9527" :style-type="1" font-size="20" margin-right="30" />
						<ste-price value="9527" :style-type="1" font-size="40" margin-right="30" />
						<ste-price value="9527" :style-type="1" font-size="60" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">金额样式 角分小于元</view>
				<view class="item-block" style="display: block">
					<view>
						<ste-price value="9527" :style-type="2" font-size="28" margin-right="30" />
						<ste-price value="9527" :style-type="2" font-size="40" margin-right="30" />
						<ste-price value="9527" :style-type="2" font-size="60" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">金额样式 价格符号和角分相等</view>
				<view class="item-block" style="display: block">
					<view>
						<ste-price value="9527" :style-type="3" />
					</view>
				</view>
			</view>
			<view class="demo-item">
				<view class="title">粗体</view>
				<view class="item-block">
					<view>
						<ste-price value="9527" bold font-size="50" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
.page {
	.content {
		.demo-item {
			.item-block {
				> view {
					margin: 0 8px 8px 0;
				}
			}
		}
	}
}
</style>
