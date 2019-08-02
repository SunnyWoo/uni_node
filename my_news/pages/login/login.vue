<template>
	<view><button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">微信授权一键登录</button></view>
</template>

<script>
var pageOptions;
export default {
	data() {
		return {
			appid: 'wxf8678b45414a8099',
			secret: 'be89268e5c03b06c0c8c65d89af0b781',
			openId: ''
		};
	},
	onLoad(options) {
		pageOptions = options;

		// #ifdef MP-WEIXIN
		uni.login({
			success: res => {
				// get code
				uni.request({
					url: this.apiBasic + '/wechat/getOpenId',
					method: 'GET',
					data: {
						appid: this.appid,
						secret: this.secret,
						code: res.code
					},
					success: res => {
						// 存储openid
						this.openId = res.data.openid;
					},
					fail: () => {},
					complete: () => {}
				});
			}
		});
		// #endif
		
	},
	methods: {
		getUserInfo(res) {
			let userInfo = res.detail.userInfo; //用户信息

			uni.showLoading({
				title: '登录中',
				mask: false
			});
			uni.request({
				url: this.apiBasic + '/users/login',
				method: 'POST',
				data: {
					open_id: this.openId,
					nick_name: userInfo.nickName,
					avatar_url: userInfo.avatarUrl,
					gender: userInfo.gender
				},
				success: res => {
					uni.showToast({
						title: '登陆成功'
					});
					//将用户的信息保存起来
					res = res.data;
					uni.setStorageSync('SOpenId', this.openId);
					uni.setStorageSync('SToken', res.token);
					uni.setStorageSync('SUid', res.user._id);
					uni.setStorageSync('SName', res.user.nick_name);
					uni.setStorageSync('SAvatar', res.user.avatar_url);
					if (pageOptions.backtype == 2) {
						uni.switchTab({
							url: pageOptions.backpage
						});
					} else {
						uni.redirectTo({
							url: pageOptions.backpage
						});
					}
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
};
</script>

<style></style>
