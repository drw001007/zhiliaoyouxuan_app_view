<template>
	<view>
		<view class="searchbox">
			<view class="searlist" >
				<view class="iconfont goto" @click="goback">&#xe642;</view>
				<view class="searview" @click="gosear">
					<icon type="search" size="20"  color="#ff3333"></icon>
					<view class="setaxt">
						复制标题，<view>搜隐藏优惠券</view>拿返利
					</view>
					<view class="middsear">搜索</view>
				</view>
			</view>	
			 <view class="classtabs">
				<view class="twli" v-for="(item,tIndex) in twoTab" :key="tIndex" :class="scut==tIndex?'active':''"  :data-sect="tIndex"  @click="twonav">
					{{item}}
				</view>
			 </view>
		</view>
		
		<view class="twogood  mtop">
			<block v-if="prolodding==1">
			 <view class="proul">
				 <view class="proul_li"  v-for="(item,prodIndex) in secdList" :key="prodIndex" @click="gopart" :data-goods_id="item.goods_id">
					 <view class="prod_img">
						 <image :src="item.pict_url" mode="aspectFit"></image>
					 </view>
					 <view class="prod_cent">
						 <view class="prod_name"> <image :src="serverImg+'/image/img/tb.png'"></image> {{item.tao_title}}</view>
						 <view class="prod_yjsy">预计收益 ￥{{item.fanli}}</view>
						 <view class="prod_one">
							 <view class="prod_mark">￥{{item.size}}</view>
							 <view class="prod_mouth">月销{{item.volume}}</view>
						 </view>
						 <view class="prod-up">
							 <view class="prod-up_shop">￥<text>{{item.quanhou_jiage}}</text></view>
							 <view class="prod_up-coup">
								 <view class="prod_up_ld prod_dd"></view>
								 <view class="prod_up-ts">券 ￥{{item.coupon_info_money}}</view>
								 <view class="prod_up_rd prod_dd"></view>
							 </view>
						 </view>
					 </view>
				 </view>
				 <view class="liloading" :hidden="liloading">
					 <image :src="serverImg+'/image/loading.gif'" ></image>
				 </view>
			 </view>
			<view class="medix" v-if="!medix">我是有底线的</view>
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
		<!-- 返回顶部 -->
		<view class="gotop" :hidden="gohidden" @click="gotop">
			<text class="iconfont ">&#xe618;</text>
		</view>
	</view>
</template>

<script>
	import requestHttps from '../../common/request.js'
	export default {
		data() {
			return {
				serverImg:getApp().globalData.serverImg,
				twoTab:['精选','销量','最新','价格'],
				scut:0,
				prolodding:2,
				secdList:[ ],
				medix:true,
				gohidden:true,
				flag:true,
				page:1,
				liloading:true,
				tsort:'new',
				id:'',
				kw:'',
				type:0,
			}
		},
		methods: {
			// 销量
			twonav:function(e){
				console.log(e)
				var that=this
				var cur=e.currentTarget.dataset.sect
				
				if(cur==0){
					that.tsort='new'
				}else if(cur==1){
					that.tsort='sale_num_desc'
				}else if(cur==2){
					that.tsort='date_time'
				}else if(cur==3){
					that.tsort='price_asc'
				}else{
					
				}
				that.liloading=false
				that.flag=true
				that.secdList=[]
				that.scut=cur
				that.page=1
				that.goodList()
			},
			 // 返回顶部
			 gotop:function(e){
			 	uni.pageScrollTo({
			 		scrollTop:0,
			 		duration:300
			 	})
			 },
			 // 详情
			 gopart:function(e){
				 var id=e.currentTarget.dataset.goods_id
				 uni.navigateTo({
				 	url: '../productdetail/productdetail?id='+id,
				 	success: res => {},
				 	fail: () => {},
				 	complete: () => {}
				 });
			 },
			 // 搜索
			 gosear:function(){
				 uni.switchTab({
				 	url: '../search/search',  
				 });
			 },
			 // 返回上个页面
			 goback:function(){
			 	uni.navigateBack({
			 		delta:1
			 	})
			 },
			 goodList:function(){
				 var that=this
				 var url='/tb/goods/lists'
				if(that.flag){
					console.log(that.type)
					console.log('地方大幅度分')
					if(that.type ==0 ||that.type ==undefined || that.type == 'undefined'){
						var url='/tb/goods/lists'
						var data={
							type:that.type,
							page:that.page,
							sort:that.tsort,
							id:that.id,
							kw:that.kw
						}
					}else{
						if(that.type=='hot'){
							var url='/tb/bk/lists'
							var data={
								type:that.type,
								page:that.page,
								sort:that.tsort
							}
						}else{
							var url='/tb/goods/lists'
							var data={
								type:that.type,
								page:that.page,
								sort:that.tsort
							}
						}
						
					}
					
					
					requestHttps({ 
						url:url,
						method: 'POST',
						data:data , 
						success: res => {
							console.log(res)
							var data=res.data 
							var list=data.data
							var lood=2
							if(data.code==1){
								if (list != '') {
								      lood = 1
								  } else {
								      lood = 3
								  }
								  if(list==''&& that.page>1){
									  lood = 1
								  }
								 that.prolodding=lood
								if(that.page==1){
									that.secdList=list
								}else{
									that.secdList=that.secdList.concat(list)
								}
								if(list.length>=1){
									that.flag=true
									that.medix=true
									// that.prolodding=1
									that.liloading=true
								}else{
									that.liloading=true
									that.flag=false
									that.medix=false 
									// that.prolodding=3
								}
							}
						},
						fail: () => {},
						complete: () => {}
					})
				}
				 
			 }
		},
		onPageScroll(e) {
			console.log(e)
			var that=this
			var scrollTop=e.scrollTop
			if(scrollTop<=300){
				that.gohidden=true
			}else{
				that.gohidden=false
			}
		},
		onLoad:function(option){
			console.log(option)
			var that=this
			var type=option.type
			var id=option.id
			var kw=option.kw
			that.kw=kw
			that.id=id
			if(type){
				that.type=type
			}
			that.goodList()
			 
			 
			
			
			  
		},
		onReachBottom:function(){
			var that=this
			if(that.flag){
				var page=that.page 
				page++
				that.page=page
				that.liloading=false 
				that.goodList() 
			}
		}
	}
</script>

<style>
	.searchbox{width:100%;background:#fff;position: fixed;left: 0;top: 0;z-index: 999;  }
	.searchbox .searlist{width:94%;padding:0 3%;display: flex;}
	.searchbox .goto{font-size:36upx;color:#333;height:100upx;line-height: 100upx;}
	.searchbox .searview{width: 600upx;height: 60upx;margin:20upx auto; background: #eeeeee; 	border-radius: 10upx;}
	.searchbox .searview icon{ 	margin-left: 10upx;	float: left;margin-top:10upx;}
	/* .searchbox .searview input{float: left;width: 370upx;height:60upx;line-height: 60upx;	color:#333;font-size:26upx;margin-left: 15upx;}
	.searchbox .searview .middcose{width: 50upx;height: 60upx;float: left;} */
	.searchbox .setaxt{font-size:24upx;height: 60upx;line-height: 60upx;color:#999999;display: flex;margin-left:20upx;float: left;}
	.searchbox .setaxt view{color:#333;}
	.searchbox .searview .middsear{float: right;width: 110upx;color: #fff;background:linear-gradient(to right,#e74766,#fe3435) ;text-align: center;line-height: 60upx;border-top-right-radius: 10upx;border-bottom-right-radius: 10upx;letter-spacing:4upx;font-size:30upx;}
	.classtabs{width: 94%;margin: 0 auto;border-top:10upx solid #f2f2f2;padding:30upx  3%;display: flex;justify-content: space-around;} 
	.classtabs  .twli{display: inline-block;background: #f2f2f2;color:#333;font-size: 26upx;border-radius: 20upx;padding:5upx 20upx;}
	.classtabs  .twli.active{background: #fae4e4;color:#fd3538;}
	.twogood{width: 100%;}
	.mtop{margin-top:220upx;}
	.proul{margin-top:150upx;}
	.proul .proul_li{width:94%;margin:0 auto;padding:20upx 0; box-shadow: 2upx 2upx 20upx #efefef;display: flex;margin-bottom:20upx;}
	.proul .proul_li .prod_img{width: 260upx;height: 260upx;}
	.proul .proul_li .prod_img image{width: 100%;height: 100%;}
	.proul .proul_li .prod_cent{width:400upx;margin-left:20upx;}
	.proul .proul_li .prod_cent .prod_name{ color:#333;font-size:30upx;font-weight: 600;overflow: hidden;white-space: normal;-webkit-line-clamp:2;
	word-wrap: break-word;-webkit-box-orient: vertical;height:100upx;line-height:50upx;}
	.proul .proul_li .prod_cent .prod_name image{width:35upx;height:35upx;float:left;margin-top:8upx;margin-right:10upx; }
	/*.proul .proul_li .prod_cent .prod_name view image{width:100%;height:100%; }*/
	.proul .proul_li .prod_cent .prod_yjsy{display:inline-block;color:#fff;font-size:24upx;padding:5upx 20upx;border-radius: 0 20upx 20upx 0; background: linear-gradient(to right,#fca65c,#e9729d);}
	.proul .proul_li .prod_cent .prod_one{display:flex;justify-content:space-between;margin-top:20upx;}
	.proul .proul_li .prod_cent .prod_one .prod_mark{color:#999999;font-size:22upx;text-decoration:line-through; }
	.proul .proul_li .prod_cent .prod_one .prod_mouth{color:#999;font-size:22upx;}
	.proul .proul_li .prod_cent .prod-up{margin-top:20upx;display:flex;justify-content:space-between;}
	.proul .proul_li .prod_cent .prod-up .prod-up_shop{color:#fe3436;font-size:24upx;}
	.proul .proul_li .prod_cent .prod-up .prod-up_shop text{font-size:32upx;font-weight:600;}
	.proul .proul_li .prod_cent .prod_up-coup{position:relative; background:#fe3436;color:#fff;padding:5upx 20upx;height:40upx;line-height:40upx;border-radius:5upx;}
	.proul .proul_li .prod_cent .prod_up-coup .prod_up_ld{position:absolute;left:-10upx;top:15upx;}
	.proul .proul_li .prod_cent .prod_up-coup .prod_up_rd{position:absolute;right:-10upx;top:15upx;}
	.proul .proul_li .prod_cent .prod_up-coup .prod_dd{width:20upx;height:20upx;border-radius:20upx;background:#fff;}
	.proul .proul_li .prod_cent .prod_up-coup .prod_up-ts{text-align:center;font-size:26upx;}
	/*底部*/
	.medix{width:100%;height:80upx;line-height:80upx;text-align:center;font-size:24upx;color:#666;}
	/*加载*/ 
	.loaddiv{width:64upx;height: 64upx;margin: 0 auto;margin-top:260upx;}
	.loaddiv image{width: 100%;height: 100%;}
	.noData{width:160upx;height: 160upx;margin: 0 auto;margin-top:400upx;}
	.noData image{width: 100%;height: 100%;}
	.liloading{width:64upx;height: 64upx;margin: 50upx auto;}
	.liloading image{width: 100%;height: 100%;}
	/* 返回顶部 */
	.gotop{position: fixed;right: 30upx;bottom: 40upx;z-index: 99;}
	.gotop text{font-size:60upx;color:#999;}
</style>
