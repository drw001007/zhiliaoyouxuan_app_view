<template>
	<view>
		<view class="fixhead">
			<view class="searchbox">
				<view  class="sehead-on iconfont" @click="goback">&#xe642;</view>
				<view  class="sehead-two">
					<icon type="search" color="#fe3435" size="20" ></icon>
					<input type="text" class="seinput" placeholder="复制标题,搜隐藏优惠券拿返利" name='keyw' @focus="bindfocus" :value="keyword"  @input="bindinput" @blur="bindblur" @confirm="bindconfirm"/>
					<view class="setwo-colse iconfont" :hidden="sercolse" @click="colsekeywd">&#xe61a;</view>
					<view class="sebtns"  @click="clicksear">搜索</view>
				</view>
			</view>
			<view class="searnav">
				<scroll-view class="scrollnav" :scroll-x="true" :scroll-left="navScrollLeft" :scroll-with-animation="true">
					<view class="tabnav" :class="current == navIndex?'active':''" v-for="(item,navIndex) in navData" :key="navIndex" :data-id="item.id" :data-curtab="navIndex" @click="swictNav">
						{{item.mobile_name}}
						<text></text>
					</view>
				</scroll-view> 
			</view>
			<!--  -->
			<view class="classtabs">
				<view class="twli" v-for="(item,tIndex) in twoTab" :key="tIndex" :class="scut==tIndex?'active':''" :data-sect="tIndex"  @click="twonav">
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
			 </view>
			 <view class="liloading" :hidden="liloading">
			 	<image :src="serverImg+'/image/loading.gif'" ></image>
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
			<view class="tabload"  :hidden="tabload">
				<image :src="serverImg+'/image/loading.gif'" ></image>
			</view>
		</view>
		
		
		<!-- 返回顶部 -->
		<view class="gotop" :hidden="gohidden" @click="gotop">
			<text class="iconfont">&#xe618;</text>
		</view>
	</view>
</template>

<script>
	import requestHttps from '../../common/request.js'
	export default {
		data() {
			return {
				serverImg:getApp().globalData.serverImg,
				navData:[
					{id:'0','mobile_name':'淘宝'},
					// {id:'0','mobile_name':'京东'},
					// {id:'1','mobile_name':'拼多多'},
					// {id:'2','mobile_name':'知了优选'},
					// {id:'3','mobile_name':'苏宁'}
				],
				current:0,
				navScrollLeft:0,
				keyword:'',
				windowWidth: 400,
				sercolse:true,
				twoTab:['精选','销量','最新','价格'],
				scut:0,
				prolodding:2,
				gohidden:true,    //返回顶部
				secdList:[],
				medix:true,
				page:1,
				flag:true,
				tabload:true,
				liloading:true,
				tsort:'new',
			}
		},
		methods: {
			// 切换
			swictNav:function(e){
				// console.log(e)
				var that=this
				var cur=e.currentTarget.dataset.curtab
				var id=e.currentTarget.dataset.id
				// navScrollLeft
				var singleNavWidth = that.windowWidth / 4
				    //tab选项居中                            
				that.navScrollLeft=(cur - 2) * singleNavWidth
				if(that.current==cur){
					return false
				}else{
					 that.current=cur
					 that.id=id
				} 
				// that.current=cur
			},
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
				that.tabload=false
				that.secdList=[]
				that.flag=true
				that.scut=cur
				that.page=1
				that.getgoodList()
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
			// 搜索文字
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
			// 返回上一页
			goback:function(){
				uni.navigateBack({
					delta: 1
				});
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
			getgoodList:function(){
				var that=this 
				if(that.flag){
					if(that.keyword!=''|| that.keyword != 'undefined' || that.keyword!=undefined){
						requestHttps({
							url:'/tb/keyword/search',
							method:"POST",
							data:{
								kw:that.keyword,
								page:that.page,
								sort:that.tsort
							},
							success: res=>{
								console.log(res)
								var data=res.data
								var list=data.data
								var lood=2
								if(data.code==1){ 
									if(that.page==1){
										that.secdList=list
									}else{
										that.secdList=that.secdList.concat(list)
									}
									if (list != '') {
									      lood = 1
									  } else {
									      lood = 3
									  }
									  if(list==''&& that.page>1){
										  lood = 1
									  }
									  that.tabload=true
									 that.prolodding=lood
									if(list.length>=1){
										that.flag=true
										that.medix=true
										
										// that.prolodding=1
										that.liloading=true
									}else{
										that.liloading=true
										that.flag=false
										that.medix=false 
									}
								}
							}
						})
					}
				}
				
			},
			// 返回顶部
			gotop:function(e){
				uni.pageScrollTo({
					scrollTop:0,
					duration:300
				})
			}
		},
		onPageScroll(e) {
			// console.log(e)
			var that=this
			var scrollTop=e.scrollTop
			if(scrollTop<=300){
				that.gohidden=true
			}else{
				that.gohidden=false
			}
		},
		onReachBottom:function(){
			var that=this
			if(that.flag){
				var page=that.page
				page++
				that.page=page
				that.liloading=false
				that.getgoodList()
			}
		},
		onLoad:function(options){
			var that=this
			console.log(options)
			var kw=options.kw
			that.keyword=kw
			that.getgoodList()
		}
	}
</script>

<style>
	.fixhead{position: fixed;top: 0;z-index: 999;left: 0;width: 100%; background: #fff;}
	.searchbox{width:94%;padding:0 3%;height:100upx; background: #fff;display: flex;justify-content: space-between;}
	.sehead-on{ font-size:26upx;line-height: 100upx;display: block;font-size:30upx;color:#999;}
	.sehead-two{width:650upx; height:70upx;margin-top:15upx;background: #eeeeee;border-radius:10upx;}
	.sehead-two icon{padding:8px 15upx;float: left;}
	.sehead-two .seinput{width: 380upx;color:#666;font-size:26upx;height: 60upx;line-height: 60upx;margin-top:5upx;float: left;;}
	.sehead-two .setwo-colse{width: 50upx;height:60upx;float: left;line-height: 60upx;}
	.sehead-two .sebtns{width: 130upx;height:70upx;line-height:70upx;background: linear-gradient(to right,#e84766,#fe3435);color:#fff;font-size:28upx;text-align: center;float: right;letter-spacing: 5upx;
		border-bottom-right-radius: 5px;border-top-right-radius: 5px;}
	.searnav{width: 100%;margin-top:20upx;height: 100upx;}
	.scrollnav{width:100%;box-sizing: border-box;height: 80upx; font-size: 26rpx;white-space: nowrap;}
	.scrollnav .tabnav{padding:0 40upx;display: inline-block;margin-top:25upx;}
	.scrollnav .tabnav text{width:40upx;height: 4upx;border-radius:5upx;display: block;margin: 0 auto;margin-top: 5upx;color:#999999;}
	.scrollnav .tabnav.active{ color:#ff3333;}
	.scrollnav .tabnav.active text{background: #ff3333;}
	/*  */
	.classtabs{width: 94%;margin: 0 auto;border-top:10upx solid #f2f2f2;padding:30upx  3%;display: flex;justify-content: space-around;}
	.classtabs  .twli{display: inline-block;background: #f2f2f2;color:#333;font-size: 26upx;border-radius: 20upx;padding:5upx 20upx;}
	.classtabs  .twli.active{background: #fae4e4;color:#fd3538;}
	.twogood{width: 100%;}
	.mtop{margin-top:340upx;}
	.proul{margin-top:290upx;}
	.proul .proul_li{width:94%;margin:0 auto;padding:20upx 0; box-shadow: 2upx 2upx 20upx #efefef;display: flex;margin-bottom: 20upx;}
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
	.loaddiv{width:64upx;height: 64upx;margin: 50upx auto;}
	.loaddiv image{width: 100%;height: 100%;}
	.tabload{width:64upx;height: 64upx;margin: 50upx auto;margin-top:200upx;}
	.tabload image{width: 100%;height: 100%;}
	.noData{width:160upx;height: 160upx;margin: 0 auto;margin-top:400upx;}
	.noData image{width: 100%;height: 100%;}
	/* 返回顶部 */
	.gotop{position: fixed;right: 30upx;bottom: 40upx;z-index: 99;}
	.gotop text{font-size:60upx;color:#999;}
	.liloading{width:64upx;height: 64upx;margin: 50upx auto;}
	.liloading image{width: 100%;height: 100%;}
</style>
