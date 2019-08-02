<template>
	<view class="content">
		<!-- 分类编辑页面 -->
		<view class="cu-edit">
			<input type="text" class="cu-ipt" v-model="newVal" placeholder="分类名称" />
			<button @click="save" :disabled="oldVal==newVal || newVal==''" type="primary">保存</button>
		</view>
	</view>
</template>

<script>
	var pageOptions;
	export default {
		data() {
			return {
				oldVal: '',
				newVal: ''
			}
		},
		onLoad(options) {
			console.log(options);
			pageOptions = options;

			if (options.name) {
				this.oldVal = options.name;
				this.newVal = options.name;
			}

		},
		methods: {

			save() {
				//保存文章分类信息
				let params = {};
				params.name = this.newVal;
				if (pageOptions._id) {
					params._id = pageOptions._id;
				}

				uni.request({
					url: this.apiBasic + '/cate',
					method: 'POST',
					data: params,
					header:{
						'Authorization':'Bearer '+uni.getStorageSync("SToken")
					},
					success: res => {
						console.log(res);
						uni.showToast({
							title: '保存成功'
						});
						setTimeout(function() {
							//保存成功后 跳转回 分类列表页面
							uni.redirectTo({
								url: '/pages/cate/cate'
							});
						}, 100);
					},
					fail: () => {},
					complete: () => {}
				});


			}

		}
	}
</script>

<style>
	.cu-edit {
		background-color: #F4F5F6;
		padding: 20px;
	}

	.cu-ipt {
		background-color: #FFFFFF;
		padding: 10px 25px;
		margin-bottom: 10px;
	}

	button {
		color: #007aff;
		background-color: #007aff;
	}
</style>
