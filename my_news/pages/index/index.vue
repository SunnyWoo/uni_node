<template>
	<view class="content">
		<scroll-view scroll-x="true" class="tab-bar">
			<view class="tab-item" v-for="(item,index) in cateList" :key="index" @tap="tapBar(item._id,index)" :class="tabIndex==index?'active':''">
				{{item.name}} </view>
		</scroll-view>
		<view class="media-list">

			<view class="media-item" :key="index" v-for="(item,index) in list">
				<view class="media-view" :class="{'media-image-left':item.article_type==1,'media-image-right':item.article_type==2}">
					
					<text class="media-title" :class="{'media-title2': item.article_type==1 || item.article_type==2 }"> {{item.title}}
					</text>

					<view class="image-section" :class="{'image-section-left':item.article_type==1,'image-section-right':item.article_type==2}">
						<image v-if="item.image_url" :src="item.image_url" :class="{'image-list1': item.article_type==3,'image-list3': item.article_type==1 || item.article_type==2 }"
						 mode=""></image>
						<image class="image-list3" v-if="item.image_list" v-for="(source,i) in item.image_list" :key="i" :src="source.content"
						 mode=""></image>
					</view>


				</view>
				<view class="media-info">
					<text class="info-text"> {{item.createdAt}} </text>
				</view>

			</view>
			
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>


		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				cateList: [{
					_id: '',
					name: '全部'
				}],
				list: [],

				loadMoreText: "加载中...",
				showLoadMore: false,
				skip: -1,
				max: false //是否已经达到最大值 没有更多了
			}
		},
		onLoad() {
			uni.request({
				url: this.apiBasic + '/cate',
				method: 'GET',
				success: res => {
					console.log(res);
					this.cateList = [...this.cateList, ...res.data];
				},
				fail: () => {},
				complete: () => {}
			});

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
			tapBar(_id, index) {
				//通过分类编号 获取文章列表
				if (this.tabIndex == index) {
					return;
				}

				this.tabIndex = index;
				this.skip = -1;
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
				this.getArticleList(_id)

			},
			getArticleList(cateId) {
				this.skip++;
				
				
				let params = {
					skip: this.skip
				}
				if(cateId){
					params.cate_id = cateId;
				}

				uni.request({
					url: this.apiBasic + '/articles',
					method: 'GET',
					data: params,
					header: {
						'Authorization': 'Bearer ' + uni.getStorageSync("SToken")
					},
					success: res => {
						
						if(this.skip == 0){
							this.list = [];
						}

						let data = res.data;
						if (data.length == 0) {
							this.showLoadMore = true;
							this.loadMoreText = "没有更多数据了!"
							this.max = true;
							return;
						}

						data.createdAt = new Date(data.createdAt).toLocaleString();

						data.forEach((item, index) => {
							let description = JSON.parse(item.description)
							description = description.filter(item => item.type == "image");
							if (description.length >= 3) {
								item.article_type = 4;
								item.image_list = description.slice(0, 3);
							} else {
								
								item.article_type = Math.ceil(Math.random() * 3);
								console.log(item.article_type);
								item.image_url = description[0].content;
							}

							data[index] = item;
						})

						this.list = this.list.concat(data);
					},
					fail: () => {},
					complete: () => {}
				});
			}

		}
	}
</script>

<style lang="scss">
	.content {}

	.tab-bar {
		width: 100%;
		white-space: nowrap;
		height: 80upx;
		line-height: 80upx;
		border-bottom: 1px solid $border-color-base;

		.active {
			color: #007AFF;
		}
	}

	.tab-item {
		font-size: 30upx;
		display: inline-block;
		padding: 0 20upx;
		color: $font-color-base;
	}
	
	.media-view{
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.media-item {
		width: 690upx;
		flex: 1;
		flex-direction: column;
		border-bottom-width: 1upx;
		border-bottom-style: solid;
		border-bottom-color: #c8c7cc;
		padding: 20upx 30upx;
	}

	.media-image-right {
		flex-direction: row;
	}

	.media-image-left {
		flex-direction: row-reverse;
	}

	.media-title {
		flex: 1;
		lines: 3;
		text-overflow: ellipsis;
		font-size: 32upx;
		color: #555555;
	}

	.media-title2 {
		flex: 1;
		margin-top: 6upx;
		line-height: 40upx;
	}

	.image-section {
		margin-top: 20upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.image-section-right {
		margin-top: 0upx;
		margin-left: 10upx;
		width: 225upx;
		height: 146upx;
	}

	.image-section-left {
		margin-top: 0upx;
		margin-right: 10upx;
		width: 225upx;
		height: 146upx;
	}

	.image-list1 {
		width: 690upx;
		height: 481upx;
	}

	.image-list3 {
		width: 225upx;
		height: 146upx;
	}

	.media-info {
		flex-direction: row;
	}

	.info-text {
		margin-right: 20upx;
		color: #999999;
		font-size: 24upx;
	}
</style>
