import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'


Vue.prototype.viewDomain = "http://192.168.16.31:8080";
Vue.prototype.apiBasic = "http://192.168.16.31:3000";

Vue.prototype.checkLogin = (backpage, backtype) => {
	let SUid = uni.getStorageSync("SUid");
	let SOpenId = uni.getStorageSync("SOpenId");
	let SName = uni.getStorageSync("SName");
	let SAvatar = uni.getStorageSync("SAvatar");
	if (SUid == '' || SOpenId == '') {
		uni.redirectTo({
			url: '../login/login?backpage=' + backpage + '&backtype=' + backtype
		});
		return false;
	}

	return [SUid, SOpenId, SName, SAvatar];
}


const app = new Vue({
	...App
})
app.$mount()
