<template>
	<view class="content">
		<!-- 文章分类管理 -->
		<view class="cu-bar">
			<text>分类管理</text>
			<navigator class="nav-tag" url="/pages/cate_edit/cate_edit">添加分类</navigator>
		</view>
		<view class="cu-list">
			<block :key="index" v-for="(item,index) in list">
				<uni-swipe-action @click="editName(item)" :options="options">
					<view class='cont'>{{item.name}}</view>
				</uni-swipe-action>
			</block>
		</view>


	</view>
</template>

<script>
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue";
	export default {
		data() {
			return {
				list:[],
				options: [{
					text: '编辑',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		onLoad(options) {
			//绑定分类列表
			let loginRes = this.checkLogin('../cate/cate', 2);
			if (!loginRes) {
				return false;
			}
			
			uni.request({
				url: this.apiBasic + '/cate',
				method: 'GET',
				success: res => {
					console.log(res);
					this.list = res.data;
				},
				fail: () => {},
				complete: () => {}
			});
			
		},
		components: {
			uniSwipeAction
		},
		methods: {
			editName(item) {
				uni.redirectTo({
					url: '/pages/cate_edit/cate_edit?_id=' + item._id+'&name='+item.name
				});
			}
		}
	};
</script>

<style>
	body {
		font-size: 28upx;
		color: #333333;
	}

	.nav-tag {
		height: 40upx;
		padding: 0 16upx;
		color: #fff;
		background-color: #007aff;
		border: 1px solid #007aff;

	}

	.cu-bar {
		border-bottom: 1px solid #eee;
		padding: 20upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.cu-list {
		background-color: #F4F5F6;
		padding: 20upx;
	}

	.uni-swipe-action {
		margin-bottom: 10upx;
	}

	.cont {
		padding: 25upx 20upx;
	}
</style>
