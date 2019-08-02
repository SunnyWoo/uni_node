<template>
	<view class="content">
		
		
		
		<view class="plus">
			<view @tap="imgSel" class="image-sel"><image src="/static/plus.png" mode=""></image></view>
			<form @submit="formSubmit" @reset="formReset">
				<view class="form">
					<textarea class="txt-area" value="" placeholder="请输入内容" />

					<view class="btn-area">
						<button type="primary" formType="submit">Submit</button>
						<button type="default" formType="reset">Reset</button>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
let _self;
export default {
	data() {
		return {};
	},
	onLoad() {
		_self = this;
	},
	methods: {
		imgSel() {
			uni.chooseImage({
				count: 1,
				success: () => {}
			});
		}
	}
};
</script>

<style lang="scss">
.content {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.plus {
	display: flex;
	justify-content: space-between;
}
.form {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-left: 10upx;
}
.image-sel {
	flex: 1;
	width: 200upx;
	height: 300upx;
	background-color: #eee;
	display: flex;
	justify-content: center;
	align-items: center;

	image {
		width: 150upx;
		height: 150upx;
	}
}
.txt-area {
	background: #ebebeb;
	width: 300upx;
	height: 300upx;
	margin-right: 10upx;
}
.btn-area {
	button {
		margin-top: 10px;
	}
}
</style>
