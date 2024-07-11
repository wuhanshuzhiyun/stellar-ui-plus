<script setup lang="ts">
<<<<<<< HEAD
import { defineProps } from "vue";
import bg from "@/static/iPhone13.png";
=======
import { defineProps } from 'vue';
>>>>>>> 48a099a2696a09908e7c1480ba461a87d72f2624

const props = defineProps({
	url: {
		type: String,
		default: '#/pages/mp/index',
	},
});
const style = {
  backgroundImage: `url(${bg})`,
};
</script>

<template>
	<div class="h5-component" :style="style">
		<div class="h5-content">
			<iframe :src="props.url" frameborder="0" width="100%" height="100%" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.h5-component {
	position: fixed;
	height: 720px;
	top: 50%;
	transform: translateY(-50%);
	right: 20px;
	z-index: 100;
	background-size: 100% 100%;
	padding: 45px 15px 30px 15px;
	border-radius: 60px;
	background-color: #fff;
	.h5-content {
		width: 375px;
		height: 100%;
	}
}
</style>
