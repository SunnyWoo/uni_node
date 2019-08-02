<template>
	<view class="content">
		<!-- 我的页面 -->
		<view class="user-info">
			<image class="user-image" :src="avatar_url || '/static/missing-face.png'" mode=""></image>
			<text class="user-name"> {{nick_name || '游客' }} </text>
		</view>

		<view class="tj-sction">
			<view class="tj-item">
				<text class="num">{{ arts.length || 0 }}</text>
				<text>文章</text>
			</view>
			<view class="tj-item">
				<text class="num">{{ user.u_integer || 0 }}</text>
				<text>积分</text>
			</view>
		</view>

		<view class="cate-badge">
			<navigator url="/pages/cate/cate">
				<view class="badge-item">
					<view class="badge-title"> <text>分类管理</text> </view>
					<image src="/static/right.png" class="img-right"></image>
				</view>
			</navigator>
			<navigator url="/pages/article_list/article_list">
				<view class="badge-item">
					<view class="badge-title">文章管理</view>
					<image src="/static/right.png" class="img-right"></image>
				</view>
			</navigator>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				nick_name: '',
				avatar_url: '',
				arts: [],
				user: {}
			};
		},
		onLoad() {
			//检测用户是否已经登录
			let loginRes = this.checkLogin('../my/my', 2);
			if (!loginRes) {
				return false;
			}
			this.nick_name = loginRes[2];
			this.avatar_url = loginRes[3];

		},
		methods: {}
	};
</script>

<style lang="scss">
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}

	.content {
		background-color: $page-color-base;
	}

	.user-info {
		width: 100%;
		height: 220upx;
		background-color: #f56c6c;
		display: flex;
		justify-content: flex-start;
		align-items: center;

		.user-image {
			width: 120upx;
			height: 120upx;
			border: 6upx solid #FFFFFF;
			border-radius: 50%;
			margin-left: 30upx;
		}

		.user-name {
			margin-left: 20upx;
			font-size: 32upx;
			color: #FFFFFF;
		}
	}

	.tj-sction {
		@extend %section;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
</style>
