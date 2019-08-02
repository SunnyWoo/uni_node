<template>
	<view>
		<!-- 写作页面 -->
		<view class="wrapper">
			<view class="header">
				Header
			</view>
			<view class="main">
					main
			</view>
			<view class="aside aside-1">
				aside 1
			</view>
			<view class="aside aside-2">
				aside 2
			</view>
			<view class="footer">
				footer
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
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.wrapper{
		display: flex;
		flex-flow: row wrap;
		font-weight: bold;
		text-align: center;
		> *{
			padding: 10px;
			flex: 1 0 100%; //flex grow flex shrink flex basis
		}
		.header{
			background-color: aqua;
		}
		.footer{
			background-color: cornflowerblue;
		}
		.main{
			background-color:deeppink;
		}
		.aside-1{
			background-color: gold;
		}
		.aside-2{
			background-color:darkturquoise; 
		}
	}
	@media all and (min-width:800px){
		.aside{flex: 1;}
		.main{ flex: 3;}
		.aside-1{order: 1;}
		.main{order: 2;}
		.aside-2{order: 3;}
		.footer{order: 4;}
	}
	
</style>
