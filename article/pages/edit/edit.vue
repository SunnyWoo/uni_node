<template>
	<view>
		<!-- 文章编辑页面 -->
		<view class="edit">
			<form  @submit="formSubmit" @reset="formReset">
				<view class="txt-area">
					<textarea value="" placeholder="请输入内容" />
				</view>
				<view class="btn-area">
					<button type="primary" formType="submit">Submit</button>
					<button formType="reset">Reset</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.flex-center{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.edit{
		@extend .flex-center;
		
		.txt-area{
			background-color: #f9f9f9;
		}
	}
</style>
