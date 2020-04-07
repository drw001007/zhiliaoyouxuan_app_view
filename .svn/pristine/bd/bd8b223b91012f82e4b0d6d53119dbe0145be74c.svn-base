<template>
	<view>
		<!-- <status-bar></status-bar> -->
		<!-- <nav-bar  type="transparentFixed" transparentFixedFontColor="#FFF" :bgColor="['#4d9bfc','#00cdff']" title="透明固定导航">
			<view slot="right" class="search_box"></view>
			<view slot="transparentFixedRight" class="search_transparent_box"></view>
		</nav-bar> -->
		<!-- <nav-bar :bgColor="bgColorList" bgColorAngle="45" fontColor="#333" title=""></nav-bar> -->
		<view class="mycenhead"> 
			<view class="mycent">
				<block v-if="userAuthorization">
				<view class="mycent_set iconfont"  @click="gomyset">&#xe624;</view>
				<view class="my_info"> 
						<view class="info_l">
							<view class="info_headhic">
								<image :src="userInfo.head_pic"></image>
							</view>
							<view class="info_view" :data-user_id="userInfo.user_id">
								<view class="info_name"> 
								{{userInfo.mobile}}
								<view class="info_label">普通用户</view>
								
								</view> 
								<block v-if="userInfo.share_code">
								<view class="infoqing">
									<view class="infoqing-q">邀请口令：{{userInfo.share_code}}</view>
									<view class="infoqing-w"  @click="paste(spread_url)">复制</view>
								</view>	
								</block>
								
							</view>
							
						</view>
					</view>
					</block>
					<block v-else>
						<view class="my_info">
							<view class="info_l">
								<view class="info_headhic">
									<image :src="serverImg+'/image/toux.png'"></image>
								</view>
								<view class="inlogo" @click="gologin">立即登录></view>
							</view>
						</view>
					</block>
					<!-- <view class="info_tx">
						<view class="tx_mey">0</view>
						<view class="tx_ent">可提现（元）</view>
					</view> -->
				
			</view>
		</view>
		<view class="viewcash">
			<view class="viewcash_one">
				<view class="est_left">
					<view class="est_ltisx">
						可提现 <text>￥{{userInfo.user_money||0}}</text>
					</view>
					<view class="est-tip">每月25号结算上个月自然月确认收获的订单收入</view>
				</view>
				<view class="est_rig">立即提现</view>
			</view>
			<view class="estimate">
				<view class="est_li">
					<view class="est-q">￥{{profit.total_yj_profit||0}} </view>
					<view class="est-tit">今日预估（元）</view>
				</view>
				<view class="est_li  ">
					<view class="est-q">￥{{profit.month_yj_profit||0}}</view>
					<view class="est-tit">本月预估（元）</view>
				</view>
				<view class="est_li  ">
					<view class="est-q">￥{{profit.last_month_yj_profit||0}}</view>
					<view class="est-tit">上月预估（元）</view>
				</view>
			</view>
		</view>
		
		<view class="matu myord">
			<view class="matu_tit">
				<view class="matu_titmain">我的订单</view>
				<view class="matu_titsecd">[注意：部分订单可同步可能有延迟]</view>
			</view>
			<view class="ordview">
				<view class="ordli">
					<view class="ordli-ico">
						<image :src="serverImg+'/image/img/my04.png'"/></image></view>
					<view class="ordli-wz">登记订单</view>
					<!-- <view class="ordli-tip">1</view> -->
				</view>
				<view class="ordli" @click="goorddetail"  :data-type="1" :data-tit="1">
					<view class="ordli-ico">
						<image :src="serverImg+'/image/img/my02.png'"/></image></view>
					<view class="ordli-wz">淘喵订单</view>
					<block v-if="profit.tb_pay_orders_nums>0">
					<view class="ordli-tip">{{profit.tb_pay_orders_nums}}</view>
					</block>
				</view>
				<view class="ordli"  @click="goorddetail"  :data-type="2"  :data-tit="2">
					<view class="ordli-ico">
						<image :src="serverImg+'/image/img/my03.png'"/></image></view>
					<view class="ordli-wz">拼多多订单</view>
					<block v-if="profit.tb_pay_orders_nums>0">
						<view class="ordli-tip">{{profit.pdd_pay_orders_nums}}</view>
					</block>
				</view>
				<view class="ordli" @click="goorddetail"  :data-type="3"  :data-tit="3">
					<view class="ordli-ico">
						<image :src="serverImg+'/image/img/my05.png'"/></image></view>
					<view class="ordli-wz">京东订单</view>
					<block v-if="profit.tb_pay_orders_nums>0">
						<view class="ordli-tip">{{profit.jd_pay_orders_nums}}</view>
					</block>
				</view>
			</view>
		</view>
		<!--  -->
		
		<view class="invit">
			<!-- <view class="invit-one">
				<view class="invit-myq">我的邀请码 : 1111</view>
				<view class="invit-copy">点击复制</view>
			</view> -->
			<view class="invit-two" @click="goexpect">
				<image :src="serverImg+'/image/img/my01.png'"></image>
			</view>
		</view>
		<!--  -->
		<view class="myzhil">
			<view class="zhil_tit" @click="gocica"  :data-type='0'>
				<view class="zhil_titmain">知了优选订单</view>
				<view class="zhil_titsecd">查看更多</view>
			</view>
			<view class="zhilview">
				<view class="toli">
					<view class="toli-ico" @click="gocica"  :data-type='1'>
						<image :src="serverImg+'/image/img/ord01.png'"/></image>
					</view>
					<view class="toli-wz">待付款</view>
				</view>
				<view class="toli">
					<view class="toli-ico"  @click="gocica"  :data-type='2'>
						<image :src="serverImg+'/image/img/ord02.png'"/></image>
					</view>
					<view class="toli-wz">待发货</view>
				</view>
				<view class="toli">
					<view class="toli-ico"  @click="gocica"  :data-type='3'>
						<image :src="serverImg+'/image/img/ord03.png'"/></image>
					</view>
					<view class="toli-wz">待收货</view>
				</view>
				<view class="toli">
					<view class="toli-ico"  @click="gocica"  :data-type='4'>
						<image :src="serverImg+'/image/img/ord04.png'"/></image>
					</view>
					<view class="toli-wz">已完成</view>
				</view>
			</view>
		</view>
		<!--  -->
		<!-- <view class="matu mywall">
			<view class="matu_tit">
				<view class="matu_titmain">我的钱包</view>
				<view class="matu_titsecd">[每月25号结算上个月(1号-31号)的收入]</view>
			</view>
			<view class="wallview">
				<view class="wabt"  >
					<view class="wabt-big">{{profit.tb_pay_orders_nums}}</view>
					<view class="wabt-saml">淘喵待返</view>
				</view>
				<view class="wabt">
					<view class="wabt-big">{{profit.jd_pay_orders_nums}} </view>
					<view class="wabt-saml">京东待返</view>
				</view>
				<view class="wabt">
					<view class="wabt-big">{{profit.pdd_pay_orders_nums}}</view>
					<view class="wabt-saml">淘宝待返</view>
				</view>
			</view>
		</view> -->
		<view class="matu mytools">
			<view class="matu_tit">
				<view class="matu_titmain">常用工具</view>
				<!-- <view class="matu_titsecd">[每月25号结算上个月(1号-31号)的收入]</view> -->
			</view>
			<view class="toolsview">
				<view class="toli">
					<view class="toli-ico"  @click="gotosearch">
						<image :src="serverImg+'/image/img/my06.png'"/></image>
					</view>
					<view class="toli-wz">超级搜索</view>
				</view>
				<view class="toli" @click="gotofans">
					<view class="toli-ico">
						<image :src="serverImg+'/image/img/my07.png'"/></image></view>
					<view class="toli-wz">我的粉丝</view>
				</view>
				<view class="toli"  @click="goexpect">
					<view class="toli-ico" >
						<image :src="serverImg+'/image/img/my08.png'"/></image></view>
					<view class="toli-wz">分享二维码</view>
				</view>
				<view class="toli"  @click="goexpect">
					<view class="toli-ico">
						<image :src="serverImg+'/image/img/my09.png'"/></image></view>
					<view class="toli-wz">使用帮助</view>
				</view>
				<view class="toli"  @click="goexpect">
					<view class="toli-ico">
						<image :src="serverImg+'/image/img/my10.png'"/></image></view>
					<view class="toli-wz">拼多多</view>
				</view>
				<view class="toli"  @click="goexpect">
					<view class="toli-ico">
						<image :src="serverImg+'/image/img/my11.png'"/></image></view>
					<view class="toli-wz">京东</view>
				</view>
				<view class="toli"  @click="goexpect">
					<view class="toli-ico">
						<image :src="serverImg+'/image/img/my12.png'"/></image></view>
					<view class="toli-wz">知了优选</view>
				</view>
				
			</view>
		</view>
		<view class="height-b"></view>
	</view>
</template>

<script>
	import statusBar from '../../../components/statusbar/statusbar'
	import requestHttps from '../../../common/request.js'
	// import navBar from '../../../components/zhouWei-navBar/index.vue'
	export default {
		data() {
			return {
				serverImg:getApp().globalData.serverImg,
				bgColorList:'#fff',
				userInfo:[],
				userAuthorization:false,
				spread_url:'11222210001254',
				profit:'',
			}
		},
		methods: {
			// 订单跳转
			goorddetail:function(e){
				var that =this
				var type=e.currentTarget.dataset.type
				console.log(e)
				var title=e.currentTarget.dataset.tit
				var arr=''
				if(title==1){
					arr='淘喵自购订单'
				}else if(title==2){
					arr='拼多多自购订单'
				}else{
					arr='京东自购订单'
				}
				// var title=1
				uni.navigateTo({
					url: '../orderlist/orderlist?type='+type +'&title='+arr,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			goexpect:function(){
				uni.showToast({
					title:'敬请期待',
					icon:'none'
				})
			},
			// 设置
			gomyset:function(){
				uni.navigateTo({
					url:'../myset/myset'
				})
			},
			// 收益统计
			getproift:function(){
				var that=this
				requestHttps({
					url:'/app/profit/stat',
					method:'POST',
					data:{},
					success:res=>{
						console.log(res)
						that.profit=res.data.data
					}
				})
			},
			gocica:function(e){
				var that =this
				var type=e.currentTarget.dataset.type
				console.log(e) 
				uni.navigateTo({
					url: '../cicaorder/cicaorder?type='+type ,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			// 复制
			paste:function(value) {
				console.log(value)
				uni.setClipboardData({
					data: value
				});
			},
			login:function(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			// 
			gotosearch:function(e){
				uni.switchTab({
					url:'../../search/search'
				})
			},
			gotofans:function(e){
				uni.navigateTo({
					url:'../fans/fans'
				})
			},
			onNavigationBarButtonTap:function(e){
				console.log(e) 
				if(e.text=="设置"){
					console.log('dddddddd')
				}
			},
			gologin:function(){
				uni.navigateTo({
					url:'../login/login?sin=1'
				})
			},
			
			getuseinfo:function(){
				var that=this
				requestHttps({
					url:'/app/user/info',
					method:'POST',
					data:{},
					success:res=>{
						that.islogin(res.data,1,0)
						console.log(res)
						that.userInfo=res.data.data 
						uni.setStorage({
							key:'userInfo',
							data:res.data.data
						})
					}
				})
			}
		},
		onShow() {
			var that=this
			// var user
			var userAuthorization
			// uni.getStorage({
			// 	key:'userInfo',
			// 	success(e){ 
			// 		console.log(e)
			// 		user=e.data
			// 	}
			// }) 
			uni.getStorage({
				key:'userAuthorization',
				success(e){ 
					console.log(e)
					console.log('1111111111111111111111111e')
					userAuthorization=e.data
				}
			})
			// var user=getApp().globalData.userInfo
			// console.log(getApp().globalData.userInfo)
			that.userAuthorization=userAuthorization
			// that.userInfo=user 
			that.getuseinfo()
			that.getproift()
		},
		onLoad(){
			var that=this
			that.getproift()
		},
		 
	}
</script>

<style>
	/* #ifdef APP-PLUS */
	.mycenhead{width: 100%; position: relative;padding-top: calc(88upx + var (--status-bar-height));}
	/* #endif */
	/* #ifdef H5 */
	.mycenhead{width: 100%; position: relative;}
	/* #endif */
/* .mycenhead .mebg{position: absolute;left: 0;top: 0;width: 100%;height:340upx;}
.mycenhead .mebg image{width: 100%;height: 100%;} */
.mycent{ width: 100%;}
.mycent_set{width: 94%;margin: 0 auto;height:90upx;line-height: 90upx;color:#000;text-align: right;font-size:36upx;}
.my_info{width: 94%;margin:0 auto;display: flex;margin-top:55upx;justify-content: space-between;}
.my_info .info_l{display: flex;}
.my_info .info_l .info_headhic{width: 100upx;height: 100upx;border-radius: 100%;}
.my_info .info_l .info_headhic image{width: 100%;height: 100%;border-radius: 100%;}
.my_info .info_view{margin-left:20upx;}
.my_info .info_view .info_name{color:#333;font-size:30upx;display: flex;}
.my_info .info_label{color:#fff;margin-left:20upx;height:40upx;line-height:40upx;display: inline-block;background: #f3c856;font-size:24upx;padding:0 20upx;border-radius: 30upx;}
.my_info .infoqing{margin-top:20upx;display: flex;}
.my_info .infoqing-q{color:#666666;font-size:26upx;}
.my_info .infoqing-w{margin-left:30upx;color:#666666;font-size:26upx;}
.my_info .inlogo{width: 200upx;height:60upx;line-height: 60upx;text-align: center;border-radius: 60upx;font-size:30upx;color:#333;margin-top:20upx;border:1px solid #999;margin-left:20upx;font-weight: bold;}
.info_tx{text-align: center;background: #ffc21f;border-radius:60upx 0 0 60upx;box-shadow:0 2upx  10upx #ffd259;}
.info_tx .tx_mey{color:#fff;font-size:28upx;font-weight:600;margin-top:10upx;}
.info_tx .tx_ent{font-size:24upx;color:#fff;padding-left: 15upx;margin-top: 10upx;}
.estimate{width: 94%;padding:30upx 3%;margin-top:10upx;display: flex;justify-content: space-around;}
.viewcash{width: 94%;margin:0 auto;background: #fd214a;border-radius: 20upx;margin-top:50upx;}
.viewcash_one{padding:20upx 30upx;display: flex;justify-content:space-between;}
.viewcash_one .est_left{color:#fff;width:400upx;}
.viewcash_one .est_left .est_ltisx{color:#fff;font-size:24upx;}
.viewcash_one .est_left .est_ltisx  text{font-size:30upx;margin-left:10upx;}
.viewcash_one .est_left .est-tip{font-size:22upx;margin-top:20upx;}
.viewcash_one .est_rig{height: 50upx;line-height: 50upx;border-radius: 25upx;background: #fff;color:#fd214a;font-size:26upx;padding:0 20upx; text-align: center;margin-top:20upx;}
.estimate .est_li{text-align: center;width: 33%;}
.estimate .ese-bole{border-left:1upx solid #efefef;}
.estimate .est_li .est-q{color:#fff;font-size:36upx;text-align: center;}
.estimate .est_li .est-tit{font-size:24upx;color:#fff;margin-top:16upx}
.invit{width: 94%;padding:30upx 3%; background: #f2f2f2;}
.invit .invit-one{ display: flex;justify-content:space-between;  width: 570upx;margin:30upx auto;height: 70upx;line-height:70upx;border:1px solid #cfcfcf;border-radius: 20upx;box-shadow: 2upx 2upx 10upx #efefef;}
.invit-two{width: 100%; height:110upx;}
.invit-two image{width: 100%;height: 100%;}
.invit-myq{color:#91773a;font-size:26upx;margin-left:20upx;} 
.invit-copy{width: 150upx;height:60upx;text-align:center;border-left:1px solid #cfcfcf;border-radius: 10upx 0 0 10upx;margin-top:5upx;line-height: 60upx;color:#666;font-size:26upx;}
.matu{width: 100%;margin: 0 auto;}
.matu .matu_tit{width: 94%;padding: 0 3%;height: 80upx;line-height: 80upx;display: flex;border-bottom:1px solid #f5f5f5;}
.matu .matu_tit .matu_titmain{color:#000000;font-size:26upx;}
.matu .matu_tit .matu_titsecd{color:#666666;font-size:24upx;margin-left:30upx;}
.myord{margin-top:20upx;}
.myord .ordview {width: 94%;margin: 0 auto;margin-top:20upx;display: flex;justify-content: space-around;}
.myord .ordview .ordli{width: 24%;text-align: center;position: relative;padding:20upx 0;}
.myord .ordview .ordli .ordli-ico{width: 51upx;height: 54upx;margin: 0 auto;position: relative;}
.myord .ordview .ordli .ordli-ico image{width: 100%;height: 100%;}
.myord .ordview .ordli .ordli-wz{color:#333333;font-size:24upx;margin-top:20upx;}
.myord .ordview .ordli .ordli-tip{position: absolute;top: 5upx;right:40upx;width: 28upx;height: 28upx;border-radius: 25upx;background:#f33;border:1px solid #f33;color:#fff;text-align: center;line-height:28upx;font-size:16upx;}
.mywall{border-top:10upx solid #f2f2f2;}
.mywall .wallview{width:94%;margin: 0 auto;display: flex;justify-content: space-around;padding:30upx 0;}
.mywall .wallview .wabt{text-align: center;color:#333;}
.mywall .wallview .wabt .wabt-big{font-size:30upx;}
.mywall .wallview .wabt .wabt-saml{font-size:24upx;margin-top:20upx;}
.mytools{border-top:10upx solid #f2f2f2;}
.mytools .toolsview{width:94%;margin:0 auto;padding:20upx 0;display: flex; flex-wrap: wrap;}
.mytools .toolsview .toli{width: 25%;text-align: center;margin-top: 20upx;margin-bottom: 30upx;}
.mytools .toolsview .toli  .toli-ico{width: 58upx;height:58upx;margin:0 auto;}
.mytools .toolsview .toli .toli-ico image{width: 100%;height:100%;}
.mytools .toolsview .toli  .toli-wz{text-align: center;color:#333;font-size:26upx;margin-top:15upx;}
.myzhil{width: 100%; }
.myzhil .zhil_tit{width: 94%;padding: 0 3%;height: 80upx;line-height: 80upx;display: flex;justify-content: space-between;  border-bottom:1px solid #f5f5f5;}
.myzhil .zhil_tit .zhil_titmain{color:#000000;font-size:26upx;}
.myzhil .zhil_tit .zhil_titsecd{color:#666666;font-size:24upx;margin-left:30upx;}
.myzhil .zhilview{width: 94%;padding:20upx 3%;display: flex;justify-content: flex-end;}
.myzhil .zhilview  .toli{width: 25%;text-align: center;margin-top: 10upx;}
.myzhil .zhilview  .toli  .toli-ico{width: 54upx;height:54upx;margin:0 auto;}
.myzhil .zhilview  .toli .toli-ico image{width: 100%;height:100%;}
.myzhil .zhilview  .toli  .toli-wz{text-align: center;color:#333;font-size:26upx;margin-top:15upx;}
</style>
