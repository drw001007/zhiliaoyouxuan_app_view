<template>
	<view>
		<!-- <button  class="text" @click="checkWeChat"  >正在跳转</button> -->
			 
	</view>
</template>

<script>
	export default {
		data() {
			return {
			sweixin: null,
				
			}
		},
		methods: {
			getPlus() {
						//获取当前显示的webview
				var pages = getCurrentPages()
				var page = pages[pages.length - 1]
				var currentWebview = page.$getAppWebview()
				//调用H5+APP的扩展API
				var shares=null;
				let that = this
				var pusher = plus.share.getServices(function(s){
					shares={};
					for(var i in s){
						var t=s[i];
						shares[t.id]=t;
					}
					that.sweixin=shares['weixin'];
					console.log(that.sweixin)
					console.log('that.sweixin')
					
				}, function(e){
					console.log("获取分享服务列表失败："+e.message);
				});
				//放入当前的webview
				currentWebview.append(pusher);
			},
			checkWeChat() {
				//调用微信小程序 
				this.sweixin.launchMiniProgram({
					id:'gh_28292c377f27', //要跳转小程序的原始ID
					path:'pages/pcollCenter/pcollCenter',
				})
			} 
			
		},
		onLoad() {
			var that=this
			that.getPlus()
			setTimeout(function() {
					that.checkWeChat()
			}, 1000);
		
		},
	}
</script>

<style>
	.text{margin-top:150upx;color:#333;font-size:26upx;}
</style>
