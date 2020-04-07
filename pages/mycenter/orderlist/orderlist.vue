<template>
	<view>
		<view class="header">
			<view class="iconfont goto" @click="goback">&#xe642;</view>
			<view class="head-titl">订单</view> 
		</view>
		<view class="ordhead">
			<view class="navul">
				<view class="nav" :class="curent== nIndex ?'active':''" v-for="(item,nIndex) in ordnavData"  :data-curent='nIndex' @click="tabnav">
					{{item}}
				</view>
			</view>
		</view>
		<view class="ordview">
			<block v-if="prolodding==1">
			<view class="ordvul">
				<view class="dli" v-for="(item,oIndex) in orderList" :key="oIndex" >
					<view class="dli_one">
						<view class="dli_onehm">订单号:{{item.order_sn}}</view>
						<view class="dli_onehm">{{item.order_status_desc}}</view>
					</view>
					<view class="dli_two">
						<view class="ord_tu">
							<image :src="item.goods_thumbnail_url" mode="aspectFit"></image>
						</view>
						<view class="ord-righ">
							<view class="ord_name">{{item.goods_name}}</view>
							<view class="ord_time">下单时间：{{item.update_time}}</view> 
						</view> 
					</view>
					<view class="ord_infor">
						<view class="it">
							<view class="it_bbq">￥{{item.order_amount}}</view>
							<view class="it_text">订单付款</view>
						</view>
						<view class="it">
							<view class="it_bbq">{{item.goods_num}}</view>
							<view class="it_text">数量</view>
						</view>
						<view class="it">
							<view class="it_bbq">￥{{item.user_fan}}</view>
							<view class="it_text">订单奖励</view>
						</view>
					</view>
				</view>
				<view class="medix" v-if="!medix">我是有底线的</view>
			</view>
			</block>
			<block v-else-if="prolodding==2">
			<view class="loaddiv" >
				<image :src="serverImg+'/image/loading.gif'" ></image>
			</view>
			</block>
			<block  v-else>
				<view class='noData'>
				  <image :src="serverImg+'/image/noData.png'"></image>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import requestHttps from '../../../common/request.js'
	export default {
		data() {
			return {
				serverImg:getApp().globalData.serverImg,
				ordnavData:['全部','待返现','已返现'],
				curent:0,
				type:1,
				page:1,
				typeid:0,
				orderList:[],
				flag:true,
				medix:true,
				prolodding:2,
				liloading:true
			}
		},
		methods: {
			tabnav:function(e){
				var that=this
				var cur=e.currentTarget.dataset.curent
				that.curent=cur
				that.typeid=cur
				that.page=1
				that.orderList=[]
				that.flag=true
				that.getordlist()
			},
			// 返回上个页面
			goback:function(){
				uni.navigateBack({
					delta:1
				})
			},
			getordlist:function(){
				var that=this
				if(that.flag){
					requestHttps({
						url:'/fxOrderList',
						method:'POST',
						data:{
							page:that.page,
							order_type:that.type,
							typeid:that.typeid
						},
						success:res=>{
							console.log(res)
							var data=res.data
							var list=data
							 var lood=2 
							if(that.page==1){
								that.orderList=list
								
							}else{
								that.orderList=that.orderList.concat(list)
							}
							if (list != '') {
							      lood = 1
							  } else {
							      lood = 3
							  }
							  if(list==''&& that.page>1){
								  lood = 1
							  }
							that.prolodding=lood
							if(list.length>=1 ){
								that.flag=true
								that.medix=true
								 
								that.liloading=false
							}else{
								that.liloading=false
								that.flag=false
								that.medix=false 
								
							}
							 
						}
					})
				}
				
			},
		},
		onLoad:function(options){
			var that=this
			var type=options.type
			var title=options.title 
			console.log(options)
			that.type=type 
			uni.setNavigationBarTitle({
				title:title
			})
			that.getordlist()
			 
		},
		onReachBottom:function(){
			var that=this
			if(that.flag){
				var page=that.page
				page++
				that.page=page
				that.getordlist()
			}
		}
	}
</script>

<style>
	page{background: #f5f5f5;}
	.header{position: fixed;left: 0;top: 0;width: 94%;padding:0 3%;background: #fff;height: 96upx;line-height: 96upx;display: flex;}
	.header .goto{font-size:36upx;color:#333}
	.header .head-titl{width: 100%;text-align: center;font-size:30upx;color:#000;line-height: 96upx;}
	.ordhead{width: 100%;position: fixed;height: 90upx;left: 0;top: 100upx;background: #fff;z-index: 999;}
	.ordhead .navul{width: 100%;margin:0 auto;display: flex;}
	.ordhead .navul .nav{width: 34%;line-height:88upx;border-bottom:2upx solid #fff;color:#333;font-size:26upx;text-align: center;}
	.ordhead .navul .nav.active{color:#f33;border-bottom:2upx solid #f33;}
	.ordview{margin-top:200upx;width: 100%;}
	.ordview .ordvul .dli{width: 94%;padding:0 3%;background: #fff;margin-bottom:15upx;padding-bottom: 20upx;}
	.ordview .ordvul .dli .dli_one{display: flex;justify-content: space-between;border-bottom: 1px dashed #e8e8e8;padding:16upx 0;}
	.ordview .ordvul .dli .dli_one .dli_onehm{font-size: 24upx;color: #999;letter-spacing: 2upx;}
	.ordview .ordvul .dli .dli_two{width: 94%;padding:15upx 3%;display: flex;}
	.ordview .ordvul .dli .dli_two .ord_tu{width: 160upx;height: 160upx;border: solid 1px #fff;border-radius: 20upx;margin-top: 10upx;} 
	.ordview .ordvul .dli .dli_two .ord_tu image{width: 100%;height:100%;}
	.ordview .ordvul .dli .dli_two .ord-righ{width:520upx;margin-left:20upx;margin-top:20upx;}
	.ordview .ordvul .dli .dli_two .ord-righ .ord_name{font-size:26upx;margin-top:10upx;color: #333;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;letter-spacing: 2upx;}
	.ordview .ordvul .dli .dli_two .ord-righ .ord_time{color:#999;font-size:24upx;margin-top:15upx;}
	.ordview .ordvul .dli .ord_infor{margin-top:10upx; display: flex; text-align: center;justify-content: flex-end;text-align: right;}
	.ordview .ordvul .dli .ord_infor .it{width: 200upx;}
	.ordview .ordvul .dli .ord_infor .it .it_bbq{color: #f60;font-size: 28upx;}
	.ordview .ordvul .dli .ord_infor .it .it_text{color: #666;font-size: 26upx;}
	
	/*加载*/
	.loaddiv{width:64upx;height: 64upx;margin: 50upx auto;}
	.loaddiv image{width: 100%;height: 100%;}
	.noData{width:160upx;height: 160upx;margin: 0 auto;margin-top:400upx;}
	.noData image{width: 100%;height: 100%;}
	.liloading{width:64upx;height: 64upx;margin: 50upx auto;}
	.liloading image{width: 100%;height: 100%;}
	.medix{width:100%;height:80upx;line-height:80upx;text-align:center;font-size:24upx;color:#666;}
</style>
