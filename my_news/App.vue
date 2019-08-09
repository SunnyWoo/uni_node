<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	*,
	*:before,
	*:after {
		box-sizing: border-box;
	}

	html,
	body {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", Arial, sans-serif;
		font-size: $font-base;
		color: $font-color-base;
	}
	
	/* loadmore */
	.uni-loadmore {
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		padding-bottom: 30upx;
		color: $font-color-light;
		font-size: $font-base;
	}

	.cate-badge {
		width: 100%;
		background-color: $page-color-base;
		padding: 20upx 0;
	}

	.badge-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20upx;
		background-color: #FFFFFF;
		margin-bottom: 10upx;
	}

	.badge-title {
		font-size: 32upx;
	}

	.img-right {
		width: 30upx;
		height: 30upx;
	}
</style>
