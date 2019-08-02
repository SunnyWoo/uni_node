<template>
	<view class="content">

		<!-- 文章管理页面 -->
		<!-- 
		 列表
		 上拉加载更多
		 -->
		<form @submit="formSubmit">
			<view class="article-search">
				<input type="text" placeholder="文章标题模糊查询" />
				<button class="art-btn" formType="submit">搜索</button>
				<navigator url="/pages/write/write">
					<button class="art-add">添加</button>
				</navigator>
			</view>
		</form>
		<!-- 文章列表 -->
		<view class="article-list">
			<view class="article-item">
				<image class="art-img" src="/static/user-bg.jpg" mode=""></image>
				<view class="art-title">
					<text>哈哈哈哈哈</text>
				</view>
				<text class="art-time">2919</text>
			</view>

			<view class="article-item">
				<image class="art-img" src="/static/user-bg.jpg" mode=""></image>
				<view class="art-title">
					<text>哈哈哈哈哈</text>
				</view>
				<text class="art-time">2919</text>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			uni.request({
				url: this.apiBasic + '/articles',
				method: 'GET',
				data: {
					skip:0
				},
				header:{
					'Authorization':'Bearer '+uni.getStorageSync("SToken")
				},
				success: res => {
					console.log(res);
				},
				fail: () => {},
				complete: () => {}
			});
		},
		methods: {
			formSubmit() {

			}
		}
	}
</script>

<style lang="scss">
	body {
		background-color: $page-color-base;
	}

	.content {
		font-size: $font-base;
	}

	.article-search {
		background-color: #FFFFFF;
		width: 94%;
		padding: 10upx 3%;
		margin-bottom: 10upx;
		height: 75upx;
		display: flex;
		justify-content: center;
		align-items: center;

		input {
			flex: 1;
			height: 70upx;
			border: 1px solid $border-color-dark;
			padding-left: 10upx;
			border-radius: 10upx;
			margin-right: 10upx;
		}

		button{
			height: 70upx;
			line-height: 70upx;
			color: #FFFFFF;
		}
		.art-btn{
			background-color: #409eff;
			margin-right: 5upx;
		}
		.art-add{
			background-color: #f56c6c;
		}
	}

	.article-list {
		
		.article-item {
			background-color: #FFFFFF;
			width: 94%;
			padding: 10upx 3%;
			border-bottom:1px solid $border-color-base;

			.art-img {
				width: 100%;
				height: 250upx;
			}

			.art-title {
				font-size: $font-lg;
			}

			.art-time {
				font-size: $font-sm;
				color: $font-color-light;
			}
		}
	}
</style>
