<template>
	<view>
		<view class="searchbox">
			<view  class="sehead-on iconfont" @click="goback">&#xe642;</view>
			<view  class="sehead-two">
				<icon type="search" color="#fe3435" size="20" ></icon>
				<input type="text" class="seinput" placeholder="输入微信名、手机号、口令" name='keyw' @focus="bindfocus" :value="keyword"  @input="bindinput" @blur="bindblur" @confirm="bindconfirm"/>
				<view class="setwo-colse iconfont" :hidden="sercolse" @click="colsekeywd">&#xe61a;</view>
				<view class="sebtns"  @click="clicksear">搜索</view>
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
				keyword:'',
				fanList:['ddd']
			}
		},
		methods: {
			// 返回上一页
			goback:function(){
				uni.navigateBack({
					delta: 1
				});
			},
			bindinput:function(e){
				console.log(e)
				var that=this
				var val=e.detail.value
				 
				that.keyword=val
				console.log(that.keyword)
			},
			// 搜索框失去焦点
			bindblur:function(e){
				var that=this
				console.log(e)
				that.sercolse=true
			},
			// 聚焦时
			bindfocus:function(e){
				var that=this
				var secols = true
				console.log(e)
				var val = e.detail.value
				if (val.length > 0 || that.keyword != '' || that.keyword != undefined) {
				  secols = false
				}
				that.sercolse=secols  
			},
			// 确认
			bindconfirm:function(e){
				var that =this
				if(that.keyword){
					that.clicksear()
				}
			}, 
			colsekeywd:function(){
				var that=this
				that.keyword=''
				that.sercolse=true
				console.log(that.keyword)
				console.log('that.keyword')
			},
			// 确定搜索
			clicksear:function(e){
				var that=this
				var keyword=that.keyword
				if(keyword){
					// uni.navigateTo({
					// 	url: '../searchlist/searchlist?keyword='+keyword,
					// 	success: res => {},
					// 	fail: () => {},
					// 	complete: () => {}
					// });
					that.page=1
				that.getgoodList()
				}
				
			},
		}
	}
</script>

<style>
	page{background: #f6f6f6;}
	.searchbox{width:94%;padding:0 3%;height:100upx;position: fixed;top: 0;left:0; background: #fff;display: flex;justify-content: space-between;}
	.sehead-on{ font-size:26upx;line-height: 100upx;display: block;font-size:30upx;color:#999;}
	.sehead-two{width:650upx; height:70upx;margin-top:15upx;background: #eeeeee;border-radius:10upx;}
	.sehead-two icon{padding:8px 15upx;float: left;}
	.sehead-two .seinput{width: 380upx;color:#666;font-size:26upx;height: 60upx;line-height: 60upx;margin-top:5upx;float: left;;}
	.sehead-two .setwo-colse{width: 50upx;height:60upx;float: left;line-height: 60upx;}
	.sehead-two .sebtns{width: 130upx;height:70upx;line-height:70upx;background: linear-gradient(to right,#e84665,#fe3435);color:#fff;font-size:28upx;text-align: center;float: right;letter-spacing: 5upx;
		border-bottom-right-radius: 5px;border-top-right-radius: 5px;}
	.fansview{margin-top:100upx;}
	.fansview .nos{text-align: center;margin-top:500upx;}
	.nos text{font-size:40upx;}
	.nos view{color:#999999;font-size:30upx;margin-top:20upx;}
	.fanview{width:100%;margin-top:110upx;}
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
</style>
