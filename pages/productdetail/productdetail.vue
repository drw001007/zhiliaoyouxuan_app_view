<template>
	<view class="centert"   :style="{height:screenHeight+'px'}" :class="onshare==true ?'overcont':''"  @click.stop="meshare">
		<block v-if="lodding==1">
		<!-- 轮播 -->
		<view class="goodlun">
			<swiper class="goodswiper" circular :autoplay="true" :interval="interval"  :duration="duration" @change="lunbanchange">
				<swiper-item v-for="(item,lunIndex) in banList">
					<image :src="item" mode="aspectFit"></image>
				</swiper-item>
			</swiper>
			<view class="ban_tip">
				<view class="">{{luncurrent}}</view>
				<view class="">/ {{banList.length}}</view>
			</view>
		</view>
		<view class="head" :style="{opacity: 1 - transparentValue,}" :class="isClass?'ishead':'nohead'">
			<view class="iconfont larrow" @click="goback">&#xe642;</view>
			<view class="prodnav"  v-if="!showtop">
				<!-- <view class="prod-dd" v-for="(item,idx) in navprod" :class="navcur==idx?'active':''">
					{{item}}
				</view> -->
				<scroll-view class="menus" scroll-x="true">
					<view v-for="(menu, indexs) in navprod" class="meusname" :key="indexs" :class="[indexs == currentIndex ? 'menuActive' : '']"  @click="taps(indexs)">
						<!-- <navigator url="../pages/scroll-view">{{menu}}</navigator> -->
						{{menu.name}}
					</view>
				</scroll-view>
			</view>
			<view class="iconfont hmorder">
				<view class="heshrig" @click.stop="ismshare">
					<text class="iconfont sharico">&#xe63b;</text>
				</view>
				
				<view class="headshow" v-if="onshare">
					<view class="headshow_me"  @click="gomycent">
						<text class="iconfont">&#xe60d;</text>
						我的
					</view>
					<view class="headshow_sh" @click="gomearch" :data-word="goodinfor.tkl_code">
						<text class="iconfont">&#xe667;</text>
						分享
					</view>
					
				</view>
			</view>
		</view>
		<!-- 产品 -->
		<view class="prodten">
			<view class="ten-a">
				<view class="ten-a-aef">
					<view class="ten-shop">￥<text>{{goodinfor.quanhou_jiage}}</text></view>
					<view class="tem-mark">￥{{goodinfor.size}}</view>
				</view>
				<view class="ten-a-arg">
					<view >销量：{{goodinfor.volume}}</view>
					<view>  | {{goodinfor.provcity}}</view>
				</view>
			</view>
			<view class="place">
				<view class="place-l">
					<view class="place-lf">
						<view class="place-lfbg">
							<image :src="serverImg+'/image/img/god.png'"></image>
						</view>
						 <view class="place-lftex">下单返</view>
					</view>
					<view class="place-lmey"><view class="">￥{{goodinfor.fanli}} </view><!-- 成为团长可返<text>￥30.33</text> --></view>
				</view>
				<view class="place-r">立即升级<text class="iconfont">&#xe658;</text></view>
			</view>
			<view class="unpodname">
				{{goodinfor.tao_title}}
			</view>
			<block v-if="goodinfor.coupon_info_money!=0">
			<view class="divcoup">
				<view class="cou_li">
					<view class="couli_bg">
						<image :src="serverImg+'/image/img/coubg.png'"></image>
					</view>
					<view class="cou_view">
						<view class="li_lef">
							<view class="li_lpic">￥<text>{{goodinfor.coupon_info_money}}</text></view>
							<view class="li_ltit">店铺券</view>
						</view> 
						<view class="li_rig" @click="clickwebview"  :data-word="goodinfor.tkl_code" >
							<view class="lirig_us">
								<view class="lirig_ustit">优惠券使用期限</view>
								<view class="lirig_usdata">{{goodinfor.coupon_start_time}}-{{goodinfor.coupon_end_time}}</view>
							</view>
							<view class="lirig_clik">点击领取</view>
						</view>
					</view>
				</view>
			</view>
			</block>
			<view class="recom"  id="recomss">
				<view class="recom_til">推荐语</view>
				<view class="recom_cent"> {{goodinfor.jianjie}}</view>
			</view>
			<view class="store">
				<view class="store_til">{{goodinfor.nick}} <image :src="serverImg+'/image/img/tb.png'"></image></view>
				<view class="store_cet">
					<view class="store_li">宝贝描述 {{goodinfor.score1}} 
					
					<block v-if="goodinfor.score1>=4.7">
						<view class="stli-up">高</view>
					</block>
					<block v-else-if="goodinfor.score1<4.7 && goodinfor.score1>=4.5">
						<view class="stli-moddle">中</view>
					</block>
					<block v-else>
						<view class="stli-down">低</view>
					</block>
					
					</view>
					<view class="store_li">卖家服务 {{goodinfor.score2}}
					<block v-if="goodinfor.score2>=4.7">
						<view class="stli-up">高</view>
					</block>
					<block v-else-if="goodinfor.score2<4.7 && goodinfor.score2>=4.5">
						<view class="stli-moddle">中</view>
					</block>
					<block v-else>
						<view class="stli-down">低</view>
					</block>
					
					</view>
					<view class="store_li">物流服务 {{goodinfor.score3}}
					<block v-if="goodinfor.score3>=4.7">
						<view class="stli-up">高</view>
					</block>
					<block v-else-if="goodinfor.score3<4.7 && goodinfor.score3>=4.5">
						<view class="stli-moddle">中</view>
					</block>
					<block v-else>
						<view class="stli-down">低</view>
					</block>
					</view>
				</view>
			</view>
		</view>
		<!-- <navigator url="../pages/scroll-view?id=2" animation-type="none"> -->
		<view class="prodnine">
			<view class="prodnine_titl">
				<view class="prodnine_titlname">商品详情</view>
			<!-- <view class="prodnine-clik"  @click="clicklook"  :hidden="isOpen">点击查看 <text class="iconfont">&#xe60c;</text></view> -->
			<view class="prodnine-clik"  @click="clicklook"   >点击查看
					<view class="arrowtwo" ><text class="arrow	" :class="lookshow==true ?'isrota':'rote'"  > </text></view>
			
			
			<!-- <view class='arrow'  :style='transform:rotate({{rotdeg}}deg);'></view> -->
			</view>
			
			</view>
			<view class="prodnine-cent"   :style="{ height: isOpen ? 'auto' : '0px' }"   >
				<!-- <view class="" :class="{ 'prod-animation': isOpen === true }" :style="{ transform: isOpen ? 'translateY(0px)' : 'translateY(-50%)','-webkit-transform' : isOpen ? 'translateY(0px)' : 'translateY(-50%)' }"> -->
				<view class=""   :style="{ transform: isOpen ? 'translateY(0px)' : 'translateY(-50%)','-webkit-transform' : isOpen ? 'translateY(0px)' : 'translateY(-50%)' }">
					<view class="" v-for="(item,dIndex) in imglist">
						<image :src="item" mode="widthFix"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- </navigator> -->
		<!--  -->
		<view class="prodeight">
			<view class="prodeight_titl">猜你喜欢</view>
			<view class="eight-box">
				<view class="egdd" v-for="(item,loIndex) in looklist" :key="loIndex" :data-goods_id="item.goods_id" @click="gopart">
					<view class="egdd_img">
						<image :src="item.pict_url"></image>
					</view>
					<view class="egdd_titl">
						<image :src="serverImg+'/image/img/tb.png'"></image>
						{{item.tao_title}}
					</view> 
					<view class="prod_yjsy">预计收益 ￥{{item.fanli}}</view>
					<view class="prod_one">
						 <view class="prod_mark">￥{{item.size}}</view>
						 <view class="prod_mouth">月销{{item.volume}}</view>
					</view>
					
					<view class="prod-up">
						 <view class="prod-up_shop">￥<text>{{item.quanhou_jiage}}</text></view>
						 <block v-if="item.coupon_info_money>0">
							 <view class="prod_up-coup">
								 <view class="prod_up_ld prod_dd"></view>
								 <view class="prod_up-ts">券 ￥{{item.coupon_info_money}}</view>
								 <view class="prod_up_rd prod_dd"></view>
							 </view>
						 </block>
					</view> 
				</view>
				<view class="clearfix"></view>
				<view class="liloading" :hidden="liloading">
					 <image :src="serverImg+'/image/loading.gif'" ></image>
				</view>
				 
			</view>
		</view>
		
		<!-- 底部 -->
		<view class="height-b"></view>
		<view class="shopfoot">
			<view class="shop-ico">
				<view class="shop-ico-li" @click="gocopy"  :data-word="goodinfor.tkl_code">
					<view class="iconfont">&#xe643;</view>
					<text>复制口令</text>
				</view>
				<view class="shop-ico-li"> 
						<view class="iconfont">&#xe613;</view>
						<text>客服</text> 
				</view>
				<!-- <view class="shop-ico-li"  @click="gocart">
					<image :src="serverImg+'/img/cartpod.png'"></image>
					<text>购物车</text>
					<view class="linum">{{cartNumber}}</view>
				</view> -->
			</view>
			<view class="shopgoshare">
				<!-- <view class="shopgoshare_on"  @tap="launchApp"   :data-word="goodinfor.tkl_code"> -->
				<view class="shopgoshare_on"   >
					<view class="son_t">下单返</view>
					<view class="son_m">￥{{goodinfor.fanli}}</view>
				</view>
				<!-- <view class="shopgoshare_te" @tap="launchApp" :data-word="goodinfor.tkl_code"  > -->
				
				<!-- <view class="shopgoshare_te" @tap="openTaobao('https://uland.taobao.com/coupon/edetail?e=wLpMEICh6IUGQASttHIRqZYGP2wTrbprEs59R7q0w6vnqxb5TZp0nX2ilBx1NiaIBwqfNEVfejpRgILREajy0J4Ad4UhvJ5dKd3V1WDVc1d78ySbeLVimOdth9k8bqqSHKTgBzHkoM7XTQC0vfau6E%2F9Zk7cDx8UGcM%2FmOVXilliQneUx%2FQkV3ui%2Fn%2FQ7Z5V6%2FLZudzQt%2FwDCq9CrVftVg%3D%3D&traceId=0bba8b4c15784665943515268e&union_lens=lensId:0b0175f0_0c6d_16f83f0ce47_8cb1&xId=O9IQPab9sBWRXbQ5dTYdXYQgXvGXy6DtjZPUwR2AKPSnryMNoRk2QpHNTUUo07SiPpoMhBriGmQjrCrIGnHfH3')" :data-word="goodinfor.tkl_code"  > -->
				<view class="shopgoshare_te" @click="clickwebview"  :data-word="goodinfor.tkl_code"  >
					<view class="ste_t">购买价</view>
					<view class="ste_m">￥{{goodinfor.quanhou_jiage}}</view>
				</view> 
			</view> 
			<!-- <view class="shopfoot-car" @click="togglePopup('bottom','share','addgo')">加入购物车</view>
			<view class="shopfoot-go" @click="togglePopup('bottom', 'share','lgtext')">立即购买</view> -->
		</view>
	</block>
	<block v-else>
		<view class="viewlogin">
			<image :src="serverImg+'/image/loading.gif'"></image>
		</view>
	</block>
	<!-- 授权 -->
	<view class="backbg" :hidden="isgrant"></view>
	<view class="grant" :hidden="isgrant">
		<view class="grant-img">
			<image :src="serverImg+'/image/shoubg.png'"></image>
		</view>
		<view class="grant_one">淘宝官方要求授权后购买或分享商品才能产生</view>
		<view  class="grant_t">佣金收益或返利</view>
		<view class="grant_btn">去淘宝授权</view>
	</view>
		<!-- 加购 -->
		<!-- <uni-popup ref="share" :type="type" :custom="true" @change="change">
		<view class="gobox"   > 
			<view class="goscl">
				<scroll-view class="boxsoll">
					<view class="go-comt">
						<view class="cont-one">
							<view class="cont-one-imgs">
								<image :src="goodinfor.data.original_img" mode="aspectFit"></image>
							</view>
							<view class="cont-one-name">
								<view class="cont-one-nq">{{goodinfor.data.goods_name}}</view>
								<view class="cont-one-nqs">￥{{showPirce}}</view>
							</view>
							<view class="cont-one-colse" @click="cancel('share')"><image src="../../static/img/close.png"></image> </view>
						</view> -->
					<!-- 规格 -->
						<!-- <view class='commt_three' v-for="(item,bindex) in goodsAttrLists "  >
							<view class='up_title'>{{item.name}}</view>
							<view  class="down" v-for="(ops,index) in item.comment"  :key="index"  :class="ops.select == true ? 'active':''" 
							:data-idx="ops.item_id"  :data-pid="item.id" :data-parent="bindex" :data-index='index' @click='chooseGuige' @longtap="longtap">
							  <view>{{ops.item}}</view>
							</view>
							<view class='clearfix'></view>
					    </view> -->
						<!-- 数量 -->
						<!-- <view class="cont-four">
							<view class="cont-four-tes">数量</view>
							<view class="cont-four-num">
								<view class="addnum" @click="bindMinus">-</view>
								<view class="meyinput" v-model="monthNum">{{monthNum}}</view>
								<view class="addnum" @click="bindPlus">+</view>
							</view>
						</view>
						<view class="cont-shopgp"  @click="gopay" :data-special="goodinfor.is_special"  :data-gote="shoptext">{{shoptext}}</view>
					</view>
				</scroll-view>
			</view>
		</view>
		</uni-popup> -->
		<!-- 返回顶部 -->
		<view class="gotop" :hidden="gohidden" @click="gotop">
			<text class="iconfont">&#xe618;</text>
		</view>
	</view>
</template>

<script>
	import uParse from '../../components/uParse/src/wxParse.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import requestHttps from'../../common/request.js'
	
	import coputext from '../../common/clipboard.js'
	export default {
		components: {
			uniPopup,
			uParse
		},
		data() {
			return {
				serverImg:getApp().globalData.serverImg,
				onshare:false,
				duration:600,
				interval:4000,
				luncurrent:1,
				goods_id:'',
				banList:[ ],
				animation:true,
				currentIndex:0,
				navprod:[
					{cateId : 0, name : "宝贝"},
					{cateId : 1, name : "详情"},
					{cateId : 2, name : "推荐"},
				],
				navcur:0,
				showtop:true,
				isOpen:false,
				cartNumber:0,
				showPirce:2,
				goodsAttrLists:[],
				imglist:[],
				monthNum:20,
				shoptext:'加入购物车',
				show:false,
				type: '',
				goodsAttrLists:[],
				goodImgs:[
				],
				goodinfor:[],
				looklist:[], 
				animationData:[],
				page:1,
				liloading:true,
				flag:true,
				lodding:2,
				transparentValue:0,
				isClass:false,
				isgrant:true,
				screenHeight:'auto',
				aheight:'',
				urls:'',
				lkey:'',
				pict_url:'',
				gohidden:true,    //返回顶部
				lookshow:true
								
			}
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#recomss').boundingClientRect(data => {
			  console.log("得到布局位置信息" + JSON.stringify(data));
			  console.log("节点离页面顶部的距离为" + data);
			}).exec();
			 
		},
		methods: { 
			// function launchApp() {
			// 	if ( plus.os.name == "Android" ) {
			// 		plus.runtime.launchApplication( {pname:"com.android.browser"
			// 			,extra:{url:"http://www.html5plus.org"}}, function ( e ) {
			// 				alert( "Open system default browser failed: " + e.message );
			// 		} );
			// 	} else if ( plus.os.name == "iOS" ) {
			// 		plus.runtime.launchApplication( {action:"http://www.html5plus.org"}, function ( e ) {
			// 			alert( "Open system default browser failed: " + e.message );
			// 		} );
			// 	}
			// }
			gomycent:function(){
				uni.switchTab({
					url:'../mycenter/mycenter/mycenter'
				})
			},
			// 显示
			ismshare:function(){
				var that=this
				console.log(that.onshare)
				if(that.onshare==false){
					that.onshare=true
					that.screenHeight=that.aheight
				}else{
					that.onshare=false
					that.screenHeight='auto'
				} 
			},
			meshare:function(){
				var that=this
				if(that.onshare==true){
					that.onshare=false
					that.screenHeight='auto'
				}
			},
			gomearch:function(e){
				var that=this
				var tk=e.currentTarget.dataset.word
				var goods_id=that.goods_id
				var pict_url=that.pict_url
				
				// var avatic=that.banList
				// var list={
				// 	markprice:that.goodinfor.quanhou_jiage,
				// 	shoppric:that.goodinfor.size,
				// 	coupon:that.goodinfor.coupon_info_money,
				// 	volume:that.goodinfor.volume
				// }
				uni.navigateTo({
					url:'../share_merchandise/share_merchandise?tk='+tk+'&goods_id='+goods_id+'&pict_url='+pict_url
				})
				
			},
			// 跳转app链接
			clickwebview:function(){
				var that=this
				var urls=that.urls
				console.log(urls)
				uni.navigateTo({
					url:'../webview/webview?urls='+urls
				})
			},
			//  openTaobao(url){  
			// 	plus.runtime.openURL(url, function(res) {  
			// 		uni.showModal({  
			// 			content:"本机未检测到淘宝客户端，是否打开浏览器访问淘宝？",  
			// 			success:function(res){  
			// 				if (res.confirm) {  
			// 					plus.runtime.openURL("https://s.taobao.com/search?q=uni-app")  
			// 				}  
			// 			}  
			// 		})  
			// 	});  
			// },  
			// 跳转app
			// launchApp(e) {  
			//             let _this = this;
			// 			 console.log(e)
			// 			 var urls=_this.urls
			// 			 var word=e.currentTarget.dataset.word 
			// 			 	console.log(word)
			// 			 	// uni.setClipboardData({
			// 			 	// 	data: urls,
			// 					// success:res=>{
			// 					// 	uni.hideLoading()
			// 					// }
			// 			 	// }); 
			//             // 判断平台  
			//             if (plus.os.name == 'Android') {  
			//                 plus.runtime.launchApplication(  
			//                     {  
			//                         pname: 'com.taobao.taobao'
			//                     },  
			//                     function(e) {  
			//                         console.log('Open system default browser failed: ' + e.message);  
			//                     }  
			//                 );  
			//             } else if (plus.os.name == 'iOS') {  
			//                 plus.runtime.launchApplication({ action: 'taobao://' }, function(e) {  
			//                     console.log('Open system default browser failed: ' + e.message);  
			//                 });  
			//             }  
			
			//         },  
			lunbanchange:function(e){
				// console.log(e)
				var cur=e.detail.current
				this.luncurrent=cur+1
			},
			clicklook:function(){
				var that=this 
				if(that.lookshow==true){
					that.isOpen=true
					that.lookshow=false
				}else{ 
					that.lookshow=true
					that.isOpen=false
				}
			},
			// 复制
			gocopy:function(e){
				console.log(e)
				var val=e.currentTarget.dataset.word
				// coputext.getText('ddddd')
				uni.setClipboardData({
					data:val ,
					success() {
						uni.showToast({
							title:'复制成功，打开淘宝即可',
							icon:'none'
						})
					}
				})  
			},
			// 返回上个页面
			goback:function(){
				uni.navigateBack({
					delta:1
				})
			},
			// 返回顶部
			gotop:function(e){
				uni.pageScrollTo({
					scrollTop:0,
					duration:300
				})
			},
			togglePopup(type, open,text) {
				console.log(text)
				if(text =='addgo'){
					this.shoptext='加入购物车'
				}else{
					this.shoptext='确认'
				}
				console.log('text')
				this.type = type 
					this.$refs[open].open() 
			},
			change(e) {
				console.log(e.show)
			},
			cancel(type) { 
				this.$refs[type].close()
			},
			// 详情
			getGoodsInfo:function(){
				var that=this
				requestHttps({
					url:'/tb/goods/detail',
					method: 'POST',
					data: {
						goods_id:that.goods_id
					},
					success: res => {
						console.log(res) 
						that.islogin(res.data,2,that.goods_id)
						var data=res.data
						if(data.code==1){
							that.lodding=1
							that.goodinfor=data.data
							that.urls=data.data.coupon_share_url
							that.lkey=data.data.tkl_code
							that.banList=data.data.small_images
							that.imglist=data.data.item_description
							that.pict_url=data.data.pict_url
						}
					},
					fail: () => {},
					complete: () => {}
				})
			},
			// 猜你喜欢
			getlikeList:function(){
				var that=this
				if(that.flag){
					requestHttps({
						url:'/tb/guesslike/lists',
						method:'POST',
						data:{
							goods_id:that.goods_id,
							page:that.page
						},
						success: res=>{
							var restt=res
							 that.islogin(restt.data,2,that.goods_id)
							console.log(res)
							var data=res.data 
							var list=data.data
							if(data.code==1){
								
								if(that.page==1){
									that.looklist = list
								}else{
									that.looklist= that.looklist.concat(list)
								}
								if(list.length>=1){
									that.flag=true 
									that.liloading=true
								}else{
									that.liloading=true
									that.flag=false 
								}
							}
							
						}
					})
				}
			},
			// 到详情
			gopart:function(e){
				 var id=e.currentTarget.dataset.goods_id
				 uni.navigateTo({
					url: '../productdetail/productdetail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				 });
			},
			taps:function(e){
				console.log(e)
				var that=this
				that.currentIndex=e
				
			},
		},
		onLoad:function(options){
			console.log(options)
			var that=this
			var goods_id=options.id
			that.goods_id = goods_id
			that.getlikeList()
			uni.getSystemInfo({
				success:res=>{
					console.log(res)
					console.log('res.data')
					that.aheight=res.screenHeight
				}
			})
		},
		onShow:function(){
			var that=this
			that.getGoodsInfo()
		},
		onPageScroll(e) {
			// console.log(e)
			var that=this
			var scrollTop=e.scrollTop
			var stop=e.scrollTop
			if(scrollTop<=300){
				that.gohidden=true
			}else{
				that.gohidden=false
			}
			if(stop>=100){
				that.isClass=true
				that.showtop=false
			}else{
				that.isClass=false
				that.showtop=true
			}
			 
		},
		onReachBottom:function(){
			var that=this
			if(that.flag){
				var page=that.page
				page++
				that.page=page
				that.liloading=false
				that.getlikeList()
			}
			
		},
		 
	}
</script>

<style>
	.overcont{overflow: hidden;}
	.nocont{overflow-y: scroll;}
	
	.goodlun{width: 100%;height: 600upx;position: relative;}
	.goodlun .goodswiper{position: absolute;left: 0;top: 0;width: 100%;height:600upx;}
	.goodlun .goodswiper swiper-item{width: 100%;height: 100%;}
	.goodlun .goodswiper swiper-item image{width:100%;height: 100%;}
	/* .ban_tip{position: absolute;right: 20upx;bottom: 20upx;display: flex;font-size:20upx;font-size:#fff;background: #;} */
	.goodlun .ban_tip{position: absolute;right: 3%;bottom: 30upx;background: rgba(0,0,0,0.3);width: 80upx;height: 40upx;border-radius: 10upx;display: flex;justify-content: center	;}
	.goodlun .ban_tip view{color:#fff;font-size: 26upx;}
	/* 头 */
	.ishead{background: #fff;}
	.head{position: fixed;top:0;left: 0;width: 100%; height:83upx;display: flex;justify-content: space-between;z-index: 99;transition: all 1s;}
	.head .larrow{font-size:40upx;color:#999;line-height:83upx;padding-left:3%;}
	.hmorder{margin-right:3%;  align-items: flex-end;}
	.heshrig{text-align: right;}
	.heshrig .sharico{display:inline-block;width:50upx;height:50upx;border-radius:50upx;background: rgba(0,0,0,0.3);color:#fff;line-height: 50upx;text-align: center;font-size:34upx;margin-top:12upx;}
	.headshow{position:absolute;right:10upx; background:#fff;margin-top:20upx;padding:15upx 20upx;border-radius:10upx;}
	.headshow_me text{font-size:40upx;color:#333333;margin-right:10upx;}
	.headshow_sh text{font-size:30upx;color:#333333;margin-right:15upx;margin-left:5upx;}
	.headshow_me,.headshow_sh {color:#333;font-size:26upx;padding:5upx 0;margin-top:10upx;}
	.prodnav{width: 80%;height:60upx;line-height: 60upx;margin: 0 auto;margin-top:6upx;position: relative; display: flex;justify-content: space-around;margin-top:10upx;}
	 
	.meusname{width:19%;margin:0 6%; font-size:28upx;color:#333;height:50upx;line-height:50upx;border-bottom: 5upx solid #fff;display: inline-block;text-align: center; }
	.prodnav .menus{font-size:32upx;color:#333;display: flex;justify-content: space-around;height:60upx; white-space: nowrap;}
	.prodnav .menus .menuActive{font-weight: bold;border-bottom: 5upx solid #f33;}
	/* 产品 */
	.prodten{width: 100%;margin: 0 auto;}
	.ten-a{width: 94%;padding:0 3%;display: flex;justify-content: space-between;margin-top:10upx;}
	.ten-a .ten-a-aef{display: flex;margin-top:10upx;}
	.ten-a .ten-a-aef .ten-shop{color:#ff3333;font-size:24upx;}
	.ten-a .ten-a-aef .ten-shop text{font-size:30upx;}
	.ten-a .tem-mark{color:#999;font-size:24upx;text-decoration: line-through;margin-top:5upx;margin-left:20upx;}
	.ten-a .ten-a-arg{color:#999;font-size:24upx;display: flex;margin-top:10upx;}
	.ten-a .ten-a-arg view{margin-left:10upx;}
	.place{width: 94%;margin: 0 auto;margin-top:20upx;background: #f0eacb;display: flex;justify-content: space-between;border-radius: 10upx;padding:10upx 0;}
	.place .place-l{display: flex;}
	.place .place-l .place-lf{color:#fff;width: 100upx; font-size:26upx; margin-left:20upx; ;position: relative;}
	.place .place-l .place-lf .place-lfbg{width: 100upx;height:40upx;position: absolute;left: 0;top: 0;}
	.place .place-l .place-lf .place-lfbg image{width: 100%;height: 100%;}
	.place .place-l .place-lf .place-lftex{position: absolute;left: 0;top: 0;width: 90upx;text-align: center;height: 40upx;line-height: 40upx;font-size:24upx;}
	.place .place-lmey{color:#333;font-size:18upx;line-height: 40upx;display: flex;}
	.place .place-lmey text{color:#f33;}
	.place .place-lmey view{font-size:24upx;}
	.place .place-r{color:#333;font-size:24upx;}
	.place .place-r text{color:#4f4e4a;font-size:24upx;font-weight: 600;}
	.unpodname{width:94%;margin:0 auto;margin-top:30upx;color:#333333;font-size:30upx;line-height:50upx;letter-spacing: 3upx;}
	.divcoup{width:94%;margin: 0 auto;margin-top:20upx;}
	.divcoup .cou_li{width: 100%;height:130upx;margin: 0 auto;margin-bottom: 20upx;position: relative;margin-bottom: 20upx;}
	.couli_bg{position: absolute;width: 100%;left: 0;top:0;height:130upx;}
	.couli_bg image{width: 100%;height:100%;}
	.cou_view{width: 100%;position: absolute;left: 0;top: 0;display: flex;}
	.cou_view .li_lef{width:170upx;height:130upx;}
	.li_lef .li_lpic{text-align: center;margin-top:20upx;color:#f33;font-size:24upx;}
	.li_lef .li_lpic text{font-size:32upx;display: inline-block;}
	.li_lef .li_ltit{width:120upx;color:#ff3333;font-size:24upx;background: #fad9dc;margin: 0 auto;border-radius:20upx;text-align: center;margin-top:10upx;}
	.li_rig{width: 450upx;margin-left:60upx;display: flex;justify-content: space-between;}
	.lirig_us{margin-top:20upx;}
	.lirig_ustit{color:#000;font-size:26upx;}
	.lirig_usdata{color:#999;font-size:22upx;margin-top:20upx;}
	.lirig_clik{width: 150upx;height:40upx;margin-left:20upx;line-height:40upx;color:#fff;font-size:24upx;background: #ff3333;border-radius:40upx;text-align: center;margin-top:45upx;}
	/*  */
	.recom{width:94%;padding:20upx 3%;border-top:10upx solid #f3f3f3;}
	.recom_til{border-left:10upx solid #ff3333;color:#000000;font-size:26upx;font-weight: 600;padding-left:20upx;}
	.recom_cent{color:#333;font-size:22upx;line-height: 40upx;margin-top:20upx;}
	.store{width: 94%;padding:20upx 3%;border-top:10upx solid #f3f3f3;}
	.store_til{border-left:10upx solid #ff3333;color:#000000;font-size:26upx;font-weight: 600;padding-left:20upx;display: flex;}
	.store_til image{width: 34upx;height: 34upx;margin-left:20upx;margin-top:5upx;}
	.store_cet{margin-top:20upx;display: flex;justify-content: space-between;}
	.store_cet .store_li{ font-size:24upx;display: flex;}
	.store_cet .store_li .stli-up{color:#ff3333;height:30upx;line-height:30upx;font-size:18upx;background: #ffd6d6;padding:0 5upx;margin-top:2upx;border-radius: 5upx;margin-left:10upx;}
	.store_cet .store_li .stli-moddle{color:#06fcc5;height:30upx;line-height:30upx;font-size:18upx;background: #90fee5 ;padding:0 5upx;margin-top:2upx;border-radius: 5upx;margin-left:10upx;}
	.store_cet .store_li .stli-down{color:#b6b6b6;height:30upx;line-height:30upx;font-size:18upx;background: #e6e6e6;padding:0 5upx;margin-top:2upx;border-radius: 5upx;margin-left:10upx;}
	
	.prodnine{margin-top:20upx;width: 100%;padding:20upx 0;border-top:10upx solid #f3f3f3;}
	.prodnine .prodnine_titl{width:94%;margin:0 auto;border-left:10upx solid #ff3333;color:#000000;padding-left:20upx;display: flex;justify-content: space-between;}
	.prodnine_titlname{font-size:26upx;font-weight: 600;}
	.prodnine-clik{text-align: center;color:#f33; font-size:24upx;}
	.prodnine-clik .arrowtwo{margin-left:20upx;width: 35upx;height:35upx;background: #ffd6d6;color:#f33; border-radius:35upx;display: inline-block;position: relative;top:8upx;transition: All 0.4s ease-in-out;}
	.arrow{
		 width:14upx;
		  height:14upx;
		  border-top:3upx solid #f33;
		  border-right:3upx solid #f33;
		 background: #ffd6d6;
		  position:absolute;
		  right:10upx; 
		  transition: All 0.4s ease-in-out;
		  top:5upx;
		  display:inline-block;
	}
	.isrota{transform:rotate(135deg)}
	.rote{transform:rotate(-45deg);right:10upx; top:10upx;}
	.prodnine-cent{overflow: hidden;margin-top:20upx;width: 100%;}
	.prodnine-cent image{width: 100%;}
	 
	/*  */
	.prodeight{width:94%;padding:20upx 3%;border-top:10upx solid #f3f3f3;} 
	.prodeight .prodeight_titl{border-left:10upx solid #ff3333;color:#000000;font-size:26upx;font-weight: 600;padding-left:20upx;}
	.eight-box{width: 100%;margin: 0 auto;display: flex;justify-content: space-between;flex-wrap: wrap;margin-top:20upx;}
	.eight-box .egdd{width: 48%;box-shadow: 2upx 2upx 20upx #efefef;padding:15upx 0;margin-bottom: 20upx;}
	.eight-box .egdd .egdd_img{width: 100%;height: 300upx;}
	.egdd_img image{width: 100%;height:100%;}
	.egdd_titl{padding:10upx;color:#333;font-size:30upx;overflow: hidden;white-space: normal;-webkit-line-clamp:2;
	word-wrap: break-word;-webkit-box-orient: vertical;height:100upx;line-height:50upx;}
	.egdd_titl image{width: 35upx;height:35upx;margin-top: 9upx;margin-right: 10upx;display: inline-block;float: left;} 
	/*.eight-box .egdd .prod_name view image{width:100%;height:100%; }*/
	.eight-box .egdd .prod_yjsy{margin-left:10upx;display:inline-block;color:#fff;font-size:24upx;padding:5upx 20upx;border-radius: 0 20upx 20upx 0; background: linear-gradient(to right,#fca65c,#e9729d);}
	.eight-box .egdd .prod_one{display:flex;justify-content:space-between;margin-top:10upx;padding:0 10upx;}
	.eight-box .egdd .prod_one .prod_mark{color:#999999;font-size:22upx;text-decoration:line-through; }
	.eight-box .egdd .prod_one .prod_mouth{color:#999;font-size:22upx;}
	.eight-box .egdd .prod-up{margin-top:10upx;display:flex;justify-content:space-between;padding:0 10upx}
	.eight-box .egdd .prod-up .prod-up_shop{color:#fe3436;font-size:24upx;}
	.eight-box .egdd .prod-up .prod-up_shop text{font-size:32upx;font-weight:600;}
	.eight-box .egdd .prod_up-coup{position:relative; background:#fe3436;color:#fff;padding:5upx 20upx;height:40upx;line-height:40upx;border-radius:5upx;}
	.eight-box .egdd .prod_up-coup .prod_up_ld{position:absolute;left:-10upx;top:15upx;}
	.eight-box .egdd .prod_up-coup .prod_up_rd{position:absolute;right:-10upx;top:15upx;}
	.eight-box .egdd .prod_up-coup .prod_dd{width:20upx;height:20upx;border-radius:20upx;background:#fff;}
	.eight-box .egdd .prod_up-coup .prod_up-ts{text-align:center;font-size:26upx;}
	/* 底部 */
	.shopfoot{width:100%;height:100upx;position:fixed;left: 0;bottom: 0;background: #fff;display: flex;box-shadow: 2upx 2upx 2upx 5upx #efefef;}
	.shopfoot .shop-ico{width:340upx;display: flex;}
	.shopfoot .shop-ico .shop-ico-li {height:90upx;position: relative;text-align: center;padding:0 25upx;margin-top:10upx;}
	.shop-ico-li view{padding-top:10upx;}
	.shopfoot .shop-ico .shop-ico-li image{width: 44upx;height: 44upx;display: block;margin: 0 auto;margin-top: 10upx;}
	.shopfoot .shop-ico .shop-ico-li text{display: block;text-align: center;color:#999;font-size:26upx; }
	.shopfoot .shop-ico .shop-ico-li button{width: 100%;height:90upx;background: none;margin: 0;padding: 0;}
	.shopfoot .shop-ico .shop-ico-li button:after{border:none;}
	.shopfoot .shop-ico .shop-ico-li button text{display: block;text-align: center;color:#999;font-size:26upx;margin: 0;padding: 0;margin-top:-16upx;}
	.shopfoot .shop-ico  .shop-ico-li .linum{position: absolute; right: 10upx;top: 0;width: 25upx;height: 25upx;background: #b99057;color: #fff;border-radius: 50%;font-size: 16upx;line-height: 25upx;text-align: center;padding: 3upx;}
	.shopfoot .shopfoot-car{width: 210upx;height: 90upx;line-height: 90upx;background: #666666;text-align: center;font-size: 30upx;color: #fff;float: left;}
	.shopfoot .shopfoot-go{width: 210upx;height: 90upx;line-height: 90upx;background: #f33;text-align: center;font-size: 30upx;color: #fff;float: left;}
	/* 弹出层 */
	/* .gobox{width:100%;height: 100%;background: rgba(0,0,0,0.5);overflow:hidden;position: fixed;left: 0;top: 0;right: 0;bottom: 0;z-index: 99;} */
	.gobox{background: #fff;position: relative;z-index: 9999;}
	.gobox .goscl{width: 100%;margin-top: 200upx;}
	.gobox .goscl .boxsoll{width: 100%;height: 100%;}
	.gobox .go-comt{width: 100%; }
	.cont-one{width: 94%;height:200upx;margin: 0 auto;display: flex;position: relative;}
	.cont-one .cont-one-imgs{width:208upx;height:208upx;position: absolute;top:0upx;left: 0;border-radius: 20upx;}
	.cont-one-imgs image{width: 100%;height: 100%;border-radius: 20upx;}
	.cont-one-name{width: 350upx;position:absolute;left:228upx;margin-top: 40upx;margin-left: 20upx;color:#333;font-size:30upx}
	.cont-one-name .cont-one-nq{ overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;}
	.cont-one-name .cont-one-nqs{margin-top: 15upx;}
	.cont-one-colse{width: 50upx;height: 50upx;position: absolute;right: 0;top: 20upx;}
	.cont-one-colse image{width: 30upx;height: 30upx;}
	.commt_three{width: 94%;margin: 0 auto;margin-top: 20upx;}
	.commt_three .up_title{color:#707171;font-size:24upx;}
	.commt_three .down{border: 2upx solid rgba(181, 181, 181, 1);border-radius: 4px;margin: 10upx;font-size: 24upx;color: #161616;float: left;}
	.commt_three .down.active{color:#f33;border:2upx solid #f33;}
	.commt_three .down.active view{ }
	.commt_three .down view{padding: 8upx 18upx;border: 2upx solid white;border-radius: 4px;text-align: center;}
	.cont-four{width:94%;margin:0 auto;margin-top:40upx;display: flex;justify-content: space-between;}
	.cont-four .cont-four-tes{font-size:24upx;color:#707171;}
	.cont-four .cont-four-num{display: flex;}
	.cont-four .cont-four-num .addnum{width: 55upx;height: 55upx;border-radius: 100%;background:#ccc;color:#fff;line-height: 55upx;font-size:28upx;text-align: center;}
	.cont-four .cont-four-num .meyinput{width:60upx;height: 55upx;line-height: 55upx;color: #666;font-size:30upx;text-align: center;} 
	.cont-shopgp{width: 100%;height: 90upx;line-height: 90upx;text-align:center;color:#fff;background: #f33;margin-top: 155upx;}
	
	.shopgoshare{width: 480upx;height: 70upx;border-radius: 70upx;display: flex;justify-content: space-around;margin-top:15upx;margin-right:20upx;}
	 
	.shopgoshare_te{width: 50%;background: #303030;color:#fff;border-radius:0 60upx 60upx 0;}
	.son_t,.ste_t{font-size: 24upx;text-align: center;margin-top:5upx;}
	.son_m,.ste_m{font-size:24upx;text-align: center;margin-top:-6upx;}
	.shopgoshare_on{width: 50%;background: #fc2f2f;color:#fff;border-radius:60upx 0 0  60upx;}
	/*  */
	.liloading{width:100%;height: 64upx;margin: 50upx auto;}
	.liloading image{width: 64upx;height: 64upx;margin:0 auto;display: block;} 
	.viewlogin{  width: 64rpx; height: 64rpx; margin: 0 auto; margin-top:200rpx;  color:#666;  text-align: center; font-size: 24rpx;	}
	.viewlogin image{ width: 100%;  height: 100%;}
	.prod-animation{transition: all .3s;}
	/* 授权 */
	.backbg{width:100%;height:100%;background: rgba(0,0,0,0.8);position: fixed;left: 0;top: 0;bottom: 0;z-index: 99;}
	.grant{width: 570upx;margin: 0 auto;position: absolute;top: 30%;left:90upx;background: #fff;border-radius: 30upx;z-index: 100;overflow: hidden;}
	.grant .grant-img{width: 100%;height: 368upx;}
	.grant .grant-img image{width: 100%;height: 100%;}
	.grant .grant_one{color:#343434;font-size:26upx;text-align: center;margin-top:20upx;}
	.grant .grant_t{color:#f75d23;font-size:26upx;text-align: center;margin-top:10upx;}
	.grant .grant_btn{width: 270upx;height: 70upx;margin:50upx auto;color:#fff;line-height:70upx;font-size:26upx;text-align: center;background: #f7751d;border-radius: 25upx;}
/* 返回顶部 */
	.gotop{position: fixed;right: 30upx;bottom: 100upx;z-index: 99;}
	.gotop text{font-size:60upx;color:#999;}
</style>
