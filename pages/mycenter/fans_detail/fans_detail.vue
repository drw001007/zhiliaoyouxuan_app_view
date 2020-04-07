<template>
	<view>
		<view class="headbox">
			<view class="header">
				<view class="iconfont goto" @click="goback">&#xe642;</view>
				<view class="head-titl">粉丝</view> 
				<view class=""></view>
			</view>
			<view class="fantit">
				<view class="fantit-one">
					<view class="fantit-left">
						共有<text>3</text>人,
						有效<text>3</text>人
					</view>
					<view class="fantit-right" @click="scrclick">
						<view class="">筛选 <text class="iconfont">&#xe695;</text></view>
					</view>
				</view>
				<view class="fantwo" :hidden="sectshow">
					<view class="scre" v-for="(sec,sIndex) in seclist" :key="sec" :class="scur== sIndex ?'act':''" :data-scur="sIndex" @click="sectnav" >
						{{sec}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="fansview">
			<block v-if="fanList.length>0">
				<view class="fanview"> 
					<view class="fli">
						<view class="li_one"  @click="showtrea">
							<view class="lione-lef">
								<view class="lione-heic">
									<image :src="serverImg+'/image/toux.png'"></image>
								</view>
								<view class="lione-name">
									<view class="lione-name-p">八点多(14141411)</view>
									<view class="lione-name-t">2019-10-10  20:10</view>
								</view>
							</view>
							<view class="lione-rig iconfont">&#xe658;</view>
						</view>
						<view class="li-two">
							<view class="litwo_dd">
								<view class="litwo_da">今日预估</view>
								<view class="litwo_me">￥0.00</view>
							</view>
							<view class="litwo_dd">
								<view class="litwo_da">本月预估</view>
								<view class="litwo_me">￥0.00</view>
							</view>
							<view class="litwo_dd">
								<view class="litwo_da">今日直邀(人)</view>
								<view class="litwo_me">0</view>
							</view>
							<view class="litwo_dd"> 
								<view class="litwo_da">本月直邀(人)</view>
								<view class="litwo_me">0</view>
							</view>
						</view>
						<view class="li-free">
							<view class="lifree-tran">
								团长进度
								<text></text>
								</view>
							<view class="lifree-rig">邀请明细<text class="iconfont">&#xe658;</text></view>
						</view>
					</view>
					
				</view>
			</block>
			<block v-else>
				<view class="nos">
					<text class="iconfont">&#xe686;</text>
					<view class="">空无一人</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				serverImg:getApp().globalData.serverImg,
			 
				fanList:['ddd'],
				seclist:['全部','有效','无效'],
				scur:10,
				sectshow:true,
			}
		},
		methods: {
			// 返回上一页
			goback:function(){
				uni.navigateBack({
					delta: 1
				});
			},
			scrclick:function(){
				var that=this
				that.sectshow=!that.sectshow
			},
			// 粉丝筛选
			sectnav:function(e){
				var that=this
				var scur=e.currentTarget.dataset.scur
				that.scur = scur
				that.sectshow=true
			},
			 
		}
	}
</script>

<style>
	page{background: #f6f6f6;}
	.headbox{position: fixed;left: 0;top: 0;height: 180upx;width: 100%;z-index: 99;}
	 .header{width: 94%;padding:0 3%;background: #fff;height: 96upx;line-height: 96upx;display: flex; }
	 .header .goto{font-size:36upx;color:#333}
	 .header .head-titl{width: 100%;text-align: center;font-size:26upx;color:#000;line-height: 96upx;}
	.fansview{margin-top:100upx;}
	.fansview .nos{text-align: center;margin-top:500upx;}
	.nos text{font-size:40upx;}
	.nos view{color:#999999;font-size:30upx;margin-top:20upx;}
	.fanview{width:100%;margin-top:180upx;}
	.fanview .fli{width:94%;padding:0 3%;background: #fff;margin-bottom:10upx;padding-top:40upx;}
	.fanview .fli .li_one{width: 100%;display: flex;justify-content: space-between;}
	.fanview .fli .li_one .lione-lef{width: 500upx;display: flex;}
	.fanview .fli .lione-lef .lione-heic{width:83upx;height:83upx;border-radius: 83upx;}
	.fanview .fli .lione-lef .lione-heic image{width:100%;height:100%;border-radius: 100%;}
	.fanview .fli .lione-lef .lione-name{margin-left:20upx;}
	.fanview .fli .li_one .lione-name .lione-name-p{color:#333;font-size:30upx;}
	.fanview .fli .li_one .lione-name .lione-name-t{color:#9a9a9a;font-size:24upx;margin-top:10upx;}
	.fanview .fli .li_one .lione-rig{height:80upx;line-height: 80upx;color:#333;font-size:36upx;font-weight: bold;}
	.fanview .fli .li-two{width: 100%;padding:40upx 0;display: flex;justify-content:flex-end;}
	.fanview .fli .litwo_dd{width: 25%;text-align: center;}
	.fanview .fli .litwo_dd .litwo_da{color:#333;font-size:24upx;text-align: center;}
	.fanview .fli .litwo_dd .litwo_me{color:#000;font-weight: bold;font-size:30upx;text-align: center;margin-top:10upx;}
	.fanview .fli .li-free{width: 100%;display: flex;justify-content: space-between;padding-bottom: 40upx;;}
	.fanview .fli .li-free .lifree-tran{color:#333333;font-size:24upx;}
	.fanview .fli .li-free .lifree-tran text{width: 150upx;height:15upx;background: #ebebeb;border-radius: 15upx;display: inline-block;margin-left:15upx;}
	.fanview .fli .li-free .lifree-rig{color:#333333;font-size:24upx;}
	
	.fantit{width:94%;padding:0 3%;background: #f4f4f4;}
	.fantit-one{display: flex;justify-content: space-between;height:80upx;position: relative;}
	.fantit .fantit-one .fantit-left{color:#333333;font-size:24upx;line-height: 80upx;}
	.fantit .fantit-one .fantit-left text{color:#f33;padding:0 5upx;}
	.fantit .fantit-one .fantit-right{line-height: 80upx;color:#333;font-size:24upx;}
	.fantit .fantit-one .fantit-right text{font-size:26upx;padding-left: 10upx;}
	.fantit .fantwo{width: 100upx;float: right;margin-right:0upx;background: #fff;text-align: center;position: absolute;right: 10upx;}
	.fantit .fantwo .scre{height:60upx;line-height: 60upx;font-size:24upx;color:#333;}
	.fantit .fantwo .scre.act{color:#f33;}
</style>
