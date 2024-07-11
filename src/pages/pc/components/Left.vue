<script setup lang="ts">
import { inject } from 'vue';
import type { MarkdownData } from '../types.d.ts';

const datas = inject<MarkdownData>('datas');
</script>

<template>
	<div class="left-component">
		<div v-for="(group, index) in datas?.contents.value" :key="index" class="left-group">
			<div class="left-group-title">
				{{ group.group }}
			</div>
			<div class="left-group-contents">
				<div
					v-for="(item, i) in group.contents"
					:key="i"
					class="left-group-item"
					:class="{ active: datas?.active.value === item.key }"
					@click="datas?.setActive(item.key)"
				>
					{{ item.name }}
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.left-component {
	width: 100%;
	height: 100%;
	overflow-y: auto;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	background-color: #fff;
	position: relative;
	z-index: 1;
	.left-group-title {
		padding: 10px 20px;
		font-size: 16px;
		font-weight: bold;
		color: #333;
		border-bottom: 1px solid #eee;
	}
	.left-group-contents {
		.left-group-item {
			padding: 10px 20px;
			font-size: 14px;
			color: #666;
			cursor: pointer;
			&:hover {
				background-color: #f5f5f5;
			}
			&.active {
				background-color: #f5f5f5;
			}
		}
	}
}
</style>
