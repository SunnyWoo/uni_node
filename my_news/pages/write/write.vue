<template>
	<view class="content">
		<view class="selected">
			<scroll-view scroll-x="true" class="scroll-X" :scroll-into-view="view">
				<view class="scroll-view-item" v-for="(item, index) in iptList" :key="index">
					<image v-if="item.type == 'image'" :src="item.content" :id="'item_' + index" mode="aspectFit"></image>
					<text :id="'item_' + index" v-else>{{ item.content }}</text>
				</view>
			</scroll-view>
		</view>



		<view class="plus">
			<view @tap="imgSel" class="image-sel">
				<image src="/static/plus.png" mode=""></image>
			</view>
			<form @submit="formSubmit" @reset="formReset">
				<view class="form">
					<textarea class="txt-area" v-model="txtCon" value="" placeholder="请输入内容" />

					<view class="btn-area">
						<button type="primary" :disabled="txtCon == ''" formType="submit">加一行</button>
						<button type="default" formType="reset">清空</button>
					</view>
				</view>
			</form>
		</view>
		
		<input type="text" v-model="title" class="ipt-title" placeholder="请输入标题" />
		
		<picker mode="selector" :value="selCateIndex" :range="cateList" :range-key="'name'"  @change="bindPickerChange">
			<view class="cate-badge">
				<view class="badge-item">
					<view class="badge-title">{{cateList[selCateIndex].name}}</view>
					<image src="/static/right.png" class="img-right"></image>
				</view>
			</view>
		</picker>
		<!-- title=='' || selCateIndex=='0' || -->
		<!-- :disabled="iptList.length==0" -->
		<button type="primary"  @click="save">保存</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			view: 'item_0',
			txtCon: '',
			iptList: [],
			
			title:'',
			selCateIndex:0,
			cateList:[{
				name:'请选择分类'
			}] //分类列表
		};
	},
	onLoad() {
		//检测用户是否已经登录
		let loginRes = this.checkLogin('../write/write', 2);
		if (!loginRes) {
			return false;
		}
		
		//获取文章分类的列表
		uni.request({
			url: this.apiBasic + '/cate',
			method: 'GET',
			header:{
				'Authorization':'Bearer '+uni.getStorageSync("SToken")
			},
			success: res => {
				this.cateList  = [...this.cateList,...res.data];
			},
			fail: () => {},
			complete: () => {}
		});
		
	},
	methods: {
		bindPickerChange(e){
			this.selCateIndex = e.target.value;
		},
		formSubmit(e) {
			let item = {
				type: 'text',
				content: this.txtCon
			};
			this.iptList.push(item);
			this.txtCon = '';
			this.view = 'item_' + (this.iptList.length - 1);
		},
		formReset() {
			this.txtCon = '';
		},
		save(){
			//首先进行文件上传 然后保存数据
			this.iptList.forEach((item,index)=>{
				if(item.type=="image"){
					uni.uploadFile({
						
					})
					uni.uploadFile({
						url: this.apiBasic + '/article/upload',
						method: 'POST',
						data: {
							image:item.content
						},
						success: res => {
							console.log(res);
							
							
						},
						fail: () => {},
						complete: () => {}
					})
				}
			})
			
			
			
			return;
			
			
			
			uni.request({
				url: this.apiBasic + '/article/save',
				method: 'POST',
				data: {
					title:this.title,
					description:JSON.stringify(this.iptList),
					cate_id:this.cateList[this.selCateIndex]._id,
					user_id:uni.getStorageSync("SUid")
				},
				header:{
					'Authorization':'Bearer '+uni.getStorageSync("SToken")
				},
				success: res => {
					if(res.data.success){
						//保存成功
						uni.showToast({
							title: '保存成功'
						});
						//跳转到首页
						uni.switchTab({
							url: '/pages/index/index'
						})
					}else{
						uni.showToast({
							title: res.data.error
						});
					}
					console.log(res);
				},
				fail: (error) => {
					console.log(error);
				},
				complete: () => {}
			});
		},
		imgSel() {
			uni.chooseImage({
				count: 1,
				success: res => {
					let item = {
						type: 'image',
						content: res.tempFilePaths[0]
					};
					this.iptList.push(item);
					this.view = 'item_' + (this.iptList.length - 1);
				}
			});
		}
	}
};
</script>

<style lang="scss">
.content {
	width: 98%;
	margin: 0 auto;
}
.scroll-X {
	width: 100%;
	max-height: 500upx;
	white-space: nowrap;
}
.scroll-view-item {
	width: 100%;
	height: 500upx;
	display: inline-block;
	overflow-y: auto;
	word-break: break-all;
}
.ipt-title{
	margin: 20upx auto;
	height: 80upx;
	border-bottom: 1px solid #ebebeb;
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
