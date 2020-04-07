<template>
	<view>
		<view class="header">
			<view class="iconfont goto" @click="goback">&#xe642;</view>
			<view class="head-titl">设置</view> 
		</view>
		<view class="setview">
			<view class="seli">
				<view class="sli_h">头像</view>
				<view class="sli_hic">
					<image :src="userInfo.head_pic"></image>
				</view>
			</view>
			<view class="seli">
				<view class="sli_le">手机号</view>
				<view class="sli-med"> 
				{{userInfo.mobile}}
				</view>
			</view>
			<view class="sinup"  @click="sign">退出当前账户</view>
		</view>
	</view>
</template>

<script>
	import requestHttps from '../../../common/request.js'
	export default {
		data() {
			return {
				userInfo:[]
			}
		},
		methods: {
			sign:function(){
				var that=this
				requestHttps({
					url:'/app/logout',
					method:'POST',
					data:{},
					success:res=>{
						// that.islogin(res.data)
						console.log(res.data)
						uni.showToast({
							title:res.data.data.message,
							icon:'none'
						})
						uni.setStorage({
							key:"token",
							data:''
						})
						setTimeout(function(){
							uni.switchTab({
								url:'../../index/index'
							})
						},2000)
					}
				})
			},
			// 返回上个页面
			goback:function(){
				uni.navigateBack({
					delta:1
				})
			},
		},
		onLoad() {
			var that=this
			var user
			uni.getStorage({
				key:'userInfo',
				success(e){ 
					console.log(e)
					user=e.data
				}
			})
			that.userInfo=user
		}
	}
</script>

<style>
	page{background: #f5f5f5;}
	.header{position: fixed;left: 0;top: 0;width: 94%;padding:0 3%;background: #fff;height: 96upx;line-height: 96upx;display: flex;}
	.header .goto{font-size:36upx;color:#333}
	.header .head-titl{width: 100%;text-align: center;font-size:30upx;color:#000;line-height: 96upx;}
	.setview{width: 100%;margin: 0 auto;margin-top:110upx;}
	.setview .seli{width:94%;padding:0 3%;background: #fff;display: flex;justify-content: space-between;border-bottom: 1px solid #f5f5f5;}
	.setview .seli .sli_h{font-size:26upx;color:#333;height:140upx;line-height: 140upx;;}
	.setview .seli .sli_hic{width:100upx;height:100upx;margin:20upx 0;border-radius: 100%;}
	.setview .seli .sli_hic image{width: 100%;height: 100%;border-radius: 100%;}
	.setview .seli .sli_le{height:80upx;line-height: 80upx;font-size:26upx;color:#333;}
	.setview .seli .sli-med{color: #666;font-size:24upx;height:80upx;line-height: 80upx;}
	.sinup{width: 100%;height: 80upx;line-height: 80upx;font-size:26upx;color:#f33;text-align: center;margin-top:20upx;background: #fff;}
</style>
