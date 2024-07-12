<script lang="ts" setup>
import type { Content } from '../pc/types';
import useComponents from './composables/useComponents';
import config from '@/uni_modules/stellar-plus/package.json';

const datas = useComponents();
function toDemo(item: Content) {
	const url = `/pages/mp/demo-views/${item.key}/${item.key}`;
	console.log(url);
	uni.navigateTo({ url });
}
</script>

<template>
	<view class="mp-home">
		<view class="home-title">Stellar Plus</view>
		<view class="home-content">
			<view class="home-subtitle">
				<image src="https://image.whzb.com/chain/StellarUI/logo.png" />
				<view>
					<view class="subtitle-title">Stellar Plus {{ config.version }}</view>
					<view class="subtitle-message">uniapp快速开发的UI框架</view>
				</view>
			</view>
			<view class="subtitle-message">Stellar UI，全面的组件和便捷的工具会让您信手拈来，如鱼得水。</view>
			<view class="conponents">
				<view v-for="(item, index) in datas" :key="index" class="components-group">
					<view class="components-title">
						{{ item.group }}
					</view>
					<view class="components-content">
						<view v-for="(m, i) in item.contents" :key="i" class="components-item" @click="toDemo(m)">
							{{ m.name }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss" scoped>
.mp-home {
	width: 100vw;
	height: 100vh;
	.home-title {
		width: 100%;
		height: 120rpx;
		line-height: 90rpx;
		font-size: 42rpx;
		text-align: center;
		color: #333;
	}
	.home-content {
		width: 100%;
		height: calc(100vh - 120rpx);
		overflow-y: auto;
		padding: 42rpx;
		.home-subtitle {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				width: 120rpx;
				height: 120rpx;
				margin-right: 20rpx;
			}
			.subtitle-title {
				font-size: 36rpx;
				line-height: 42rpx;
				color: #000;
				font-weight: bold;
			}
		}
		.subtitle-message {
			margin-top: 12rpx;
			line-height: 42rpx;
			font-size: 28rpx;
			color: #999;
		}
		.conponents {
			width: 100%;
			margin-top: 42rpx;
			.components-group {
				margin-bottom: 42rpx;
				.components-title {
					font-size: 32rpx;
					font-weight: bold;
					line-height: 42rpx;
					color: #000;
					margin-bottom: 12rpx;
				}
				.components-content {
					.components-item {
						width: 100%;
						font-size: 28rpx;
						line-height: 42rpx;
						color: #333;
						padding: 12rpx 0;
						box-sizing: border-box;
					}
				}
			}
		}
	}
}
</style>
