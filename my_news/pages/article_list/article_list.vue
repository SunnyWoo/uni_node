<template>
	<view class="content">

		<!-- 文章管理页面 -->
		<!-- 
		 列表
		 上拉加载更多
		 -->
		<form @submit="formSubmit">
			<view class="article-search">
				<input type="text" v-model="title" placeholder="文章标题模糊查询" />
				<button class="art-btn" formType="submit">搜索</button>
				<navigator url="/pages/write/write">
					<button class="art-add">添加</button>
				</navigator>
			</view>
		</form>
		<!-- 文章列表 -->
		<view class="article-list">
			<block v-for="(item,index) in list" v-bind:key="index">
				<view @tap="goEdit(item._id)" class="article-item">
					<image class="art-img" v-if="item.description.length>0" :src="item.description[0].content" mode=""></image>
					<view class="art-title">
						<text> {{ item.title }} </text>
					</view>
					<text class="art-time"> {{ item.createdAt }} </text>
				</view>
			</block>

			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				loadMoreText: "加载中...",
				showLoadMore: false,
				list: [],
				skip: -1,
				max: false //是否已经达到最大值 没有更多了
			}
		},
		onLoad() {
			this.getArticleList()
		},
		onUnload() {
			this.max = false,
			this.list = [],
			this.loadMoreText = "加载更多",
			this.showLoadMore = false;
		},
		onReachBottom() {
			if (this.max) {
				return;
			}

			this.showLoadMore = true;
			setTimeout(() => {
				this.getArticleList()
			}, 300);
		},

		methods: {
			getArticleList() {
				this.skip++;

				let params = {
					skip: this.skip
				}
				if (this.title != "") {
					params.title = this.title
				}

				uni.request({
					url: this.apiBasic + '/articles',
					method: 'GET',
					data: params,
					header: {
						'Authorization': 'Bearer ' + uni.getStorageSync("SToken")
					},
					success: res => {

						let data = res.data;
						if (data.length == 0) {
							this.showLoadMore = true;
							this.loadMoreText = "没有更多数据了!"
							this.max = true;
							return;
						}

						data.createdAt = new Date(data.createdAt).toLocaleString();

						for (let item of data) {
							let content = JSON.parse(item.description)
							content = content.filter(item => item.type == "image");
							item.description = content;
						}

						this.list = this.list.concat(data);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			goEdit(_id) {
				uni.redirectTo({
					url: '/pages/write/write?id=' + _id
				});
			},
			formSubmit() {
				this.showLoadMore = false;
				this.list = [];
				this.skip = -1;
				this.getArticleList()
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

		button {
			height: 70upx;
			line-height: 70upx;
			color: #FFFFFF;
		}

		.art-btn {
			background-color: #409eff;
			margin-right: 5upx;
		}

		.art-add {
			background-color: #f56c6c;
		}
	}

	.article-list {

		.article-item {
			background-color: #FFFFFF;
			width: 94%;
			padding: 10upx 3%;
			border-bottom: 1px solid $border-color-base;

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
