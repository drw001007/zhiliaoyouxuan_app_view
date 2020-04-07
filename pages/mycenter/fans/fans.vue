<template>
	<view>
		<view class="header">
			<view class="iconfont goto" @click="goback">&#xe642;</view>
			<view class="head-titl">直邀</view>
			<view class="iconfont serar" @click="gosech">&#xe636;</view>
		</view>
		<block v-if="prolodding==1">
		
		<view class="fantab">
			<view class="fantab-ul">
				<view class="tnav" v-for="(item,Tindex) in tabnav" :key="Tindex" :class="curent==Tindex?'active':' '" :data-index="Tindex" @click="switnav">
					{{item}}
				</view>
				<view class="navmore" @click="mownav"  :class="curent==10?'ismore':' '" >
					更多排序<view class="arrow"></view>
				</view>
			</view>
			<view class="sotview" :hidden="moreshow">
				<view class="sotnav" v-for="(its,mIndex) in sortTab" :key="mIndex" :class="sort==mIndex?'select':' '" :data-cur="mIndex" @click="sottab" >
					{{its}}
				</view>
			</view> 
		</view>
		<view class="fantips">
			<text class="iconfont">&#xe724;</text>预估佣金为会员或粉丝所有来源收入
		</view>
		<view class="fantit">
			<view class="fantit-one">
				<view class="fantit-left">
					共有<text>{{count}}</text>人,
					有效<text>{{count}}</text>人
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
		<view class="fanview">
			
			<view class="fli" v-for="(item,faIndex) in fanslist" :key="faIndex" >
				<!-- <view class="li_one"  @click="showtrea" :data-index='faIndex' > -->
				<view class="li_one"  >
					<view class="lione-lef">
						<view class="lione-heic">
							<image :src="item.head_pic"></image>
						</view>
						<view class="lione-name">
							<view class="lione-name-p">{{item.nickname}}</view>
							<view class="lione-name-t">{{item.reg_time}}</view>
						</view>
					</view>
					<view class="lione-rig iconfont">&#xe658;</view>
				</view>
				<view class="li-two">
					<view class="litwo_dd">
						<view class="litwo_da">今日预估</view>
						<view class="litwo_me">￥{{item.today_profit}}</view>
					</view>
					<view class="litwo_dd">
						<view class="litwo_da">本月预估</view>
						<view class="litwo_me">￥{{item.month_profit}}</view>
					</view>
					<view class="litwo_dd">
						<view class="litwo_da">今日直邀(人)</view>
						<view class="litwo_me">{{item.today_user_num}}</view>
					</view>
					<view class="litwo_dd"> 
						<view class="litwo_da">本月直邀(人)</view>
						<view class="litwo_me">{{item.month_user_num}}</view>
					</view>
				</view>
				<!-- <view class="li-free">
					<view class="lifree-tran">
						团长进度
						<text></text>
					</view>
					<view class="lifree-rig"  @click="goinduct">邀请明细<text class="iconfont">&#xe658;</text></view>
				</view> -->
			</view>
			<view class="liloading" :hidden="liloading">
				 <image :src="serverImg+'/image/loading.gif'" ></image>
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
		<view class="backbg" :hidden="treanshow"></view>
		<view class="box2"  :hidden="treanshow">
			<view class="box2-ts">
				<view class="boxcont">
					<view class="boxcont_name">{{looklist.nickname}}</view>
					<view class="boxcont_tel">{{looklist.share_code}} <view @click="paste(spread_url)">复制</view></view>
				</view>
				<view class="box-ye">
					<view class="">
						<view class="ye_ts">上月预估</view>
						<view class="ye-me">￥0.00</view>
					</view>
					<view class="">
						<view class="ye_ts">上月确认收货</view>
						<view class="ye-me">￥0.00</view>
					</view>
				</view>
				<view class="box-fres">
					<view class="box-fres_l">
						<view class="free_left">团长进度</view>
						<view class="free_rig">0/0</view>
					</view>
					<view class="box-fres_l">
						<view class="free_left">直邀人数(人)</view>
						<view class="free_rig">0</view>
					</view>
					<view class="box-fres_l">
						<view class="free_left">最近下单时间</view>
						<view class="free_rig">无</view>
					</view>
					<view class="box-fres_l">
						<view class="free_left">最近直邀时间</view>
						<view class="free_rig">无</view>
					</view>
				</view>
			</view>
			<view class="close iconfont"  @click="colsebox">&#xe606;</view>
		</view>
	</view>
</template>
 
<script>
	import requestHttps from '../../../common/request.js'
	export default {
		data() {
			return {
				serverImg:getApp().globalData.serverImg,
				tabnav:['本月预估','注册时间','今日预估'],
				curent:0,
				sortTab:['今日直邀','本月直邀','团长进度'],
				sort:10,
				moreshow:true,
				seclist:['全部','有效','无效'],
				scur:10,
				sectshow:true,
				treanshow:true,
				spread_url:'8596587421',
				page:1,
				fanslist:[],
				looklist:[],
				count:'',
				prolodding:2,
				flag:true, 
				liloading:true,
				medix:true,
				
				
			}
		},
		methods: {
			gosech:function(){
				uni.navigateTo({
					url:"../fanssearch/fanssearch"
				})
			},
			getfanlist:function(){
				var that=this
				requestHttps({
					url:'/app/user/fans',
					method:'POST',
					data:{
						page:that.page 
					},
					success:res=>{
						console.log(res.data) 
						
						var data=res.data
						var list=res.data.data.lists
						that.count=res.data.data.count 
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
								that.fanslist=list
							}else{
								that.fanslist=that.fanslist.concat(list)
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
					}
				})
			},
			// 复制
			paste:function(value){
				console.log(value)
				uni.setClipboardData({
					data: value
				});
			},
			// 关闭个人信息
			colsebox:function(){
				var that=this
				that.treanshow=true
			},
			// 查看个人信息
			showtrea:function(e){
				var that=this
				var index=e.currentTarget.dataset.index
				var looklist=that.fanslist[index]
				that.looklist=looklist
				that.treanshow=false
			},
			// 本月预估切换
			switnav:function(e){
				console.log(e)
				var that=this
				var cur=e.currentTarget.dataset.index
				that.curent=cur
				that.moreshow=true
				
			},
			// 更多筛选
			mownav:function(e){
				var that=this
				that.curent=10
				that.moreshow=!that.moreshow
			},
			// 筛选按钮下面的排序
			sottab:function(e){
				var that=this
				var cur=e.currentTarget.dataset.cur
				that.sort=cur
				that.curent=10
				that.moreshow=true
			},
			// 粉丝筛选
			sectnav:function(e){
				var that=this
				var scur=e.currentTarget.dataset.scur
				that.scur = scur
				that.sectshow=true
			},
			scrclick:function(){
				var that=this
				that.sectshow=!that.sectshow
			},
			// 邀请明细
			goinduct:function(){
				var that=this
				uni.navigateTo({
					url:'../fans_detail/fans_detail'
				})
			},
			// 返回上个页面
			goback:function(){
				uni.navigateBack({
					delta:1
				})
			},
			
		},
		onLoad:function(){
			var that=this
			that.getfanlist()
		},
		onReachBottom:function(){
			var that=this
			if(that.flag){
				var page=that.page
				page++
				that.page=page
				that.liloading=false
				that.getfanlist()
			}
		}
	}
</script>
 
<style>
	.header{position: fixed;left: 0;top: 0;width: 94%;z-index:9;padding:0 3%;background: #fff;height: 96upx;line-height: 96upx;display: flex;justify-content: space-between;}
	.header .goto{font-size:36upx;color:#333}
	.header .head-titl{width: 500upx;text-align: center;font-size:26upx;color:#000;line-height: 96upx;}
	.header	.serar{font-size: 36upx;color:#333;}
	.fantab{width:100%;height: 96upx;line-height: 96upx;margin-top:96upx;border-top:1px solid #efefef;position: relative;}
	.fantab-ul{width: 100%;}
	
	.fantab .fantab-ul .tnav{display: inline-block;width: 25%;text-align: center;font-size:26upx;}
	.fantab .fantab-ul .tnav.active{color:#ff3333;}
	.fantab .fantab-ul .navmore{display: inline-block;width: 25%;text-align: center;font-size:26upx;position: relative;}
	.fantab .fantab-ul .navmore .arrow{ position: absolute;right:10upx; top:45upx; /* left:80rpx; */ width:0;  height:0; margin-left: 10rpx; border-width: 12rpx; 
	border-style: solid; border-color:#8f8f8f transparent transparent transparent;}
	.ismore{color:#f33;}
	.sotview{width: 20%; background: #fff;text-align: center;float: right;margin-right:10upx;margin-top:-10upx;position: absolute;right: 0;z-index: 9;}
	.sotnav{font-size:24upx;color:#333;height:60upx;line-height: 60upx;}
	.sotnav.select{color:#f33}
	.fantips{width: 94%;padding:0 3%;background:#ffeaea;color:#e7161a;height: 80upx;line-height: 80upx;font-size:24upx;}
	.fantips text{font-size:26upx;margin-right:20upx;}
	.fantit{width:94%;padding:0 3%;background: #f4f4f4;}
	.fantit-one{display: flex;justify-content: space-between;height:80upx;position: relative;}
	.fantit .fantit-one .fantit-left{color:#333333;font-size:24upx;line-height: 80upx;}
	.fantit .fantit-one .fantit-left text{color:#f33;padding:0 5upx;}
	.fantit .fantit-one .fantit-right{line-height: 80upx;color:#333;font-size:24upx;}
	.fantit .fantit-one .fantit-right text{font-size:26upx;padding-left: 10upx;}
	.fantit .fantwo{width: 100upx;float: right;margin-right:0upx;background: #fff;text-align: center;position: absolute;right: 10upx;}
	.fantit .fantwo .scre{height:60upx;line-height: 60upx;font-size:24upx;color:#333;}
	.fantit .fantwo .scre.act{color:#f33;}
	.fanview{width:100%;}
	.fanview .fli{width:94%;padding:0 3%;background: #fff;border-bottom:10upx solid #f0f0f0;padding-top:40upx;}
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
	.backbg{width: 100%;height:100%;position: fixed;left: 0;top: 0;background: rgba(0,0,0,0.8);z-index: 99;}
	.box2{position: absolute;top:20%;width: 94%;left:3%;z-index: 100;}
	.box2-ts{background: #fff;border-radius: 40upx;width:100%;}
	.box2 .boxcont{background: #fc2e5e;padding:20upx 0;border-radius: 40upx 40upx 0 0 ;color:#fff;font-size:24upx;text-align: center;}
	.boxcont_name{font-size:24upx; }
	.boxcont_tel{font-size:24upx;margin-top:20upx; text-align: center;}
	.boxcont_tel view{display: inline-block;margin-left:20upx;text-decoration: underline;}
	.box-ye{width:600upx;background: #f3f3f3;padding:20upx 0;margin: 40upx auto;display: flex;justify-content: space-around;text-align: center;}
	.box-ye .ye_ts{color:#333;font-size:24upx;}
	.box-ye .ye-me{color:#fd214b;font-size:26upx;font-weight: 600;margin-top:10upx;}
	.box-fres{width: 600upx;padding:20upx 0;margin: 0 auto;}
	.box-fres_l{display: flex;justify-content: space-between;margin-bottom: 20upx;}
	.box-fres_l .free_left{color:#333333;font-size:26upx;}
	.box-fres_l .free_rig{color:#333333;font-size:26upx;}
	.close{color:#Fff;font-size:46upx;text-align: center;margin-top:40upx;}
	
	/*加载*/
	.loaddiv{width:64upx;height: 64upx;margin: 0 auto;margin-top:260upx;}
	.loaddiv image{width: 100%;height: 100%;}
	.noData{width:160upx;height: 160upx;margin: 0 auto;margin-top:400upx;}
	.noData image{width: 100%;height: 100%;}
	
	.liloading{width:64upx;height: 64upx;margin: 50upx auto;}
	.liloading image{width: 100%;height: 100%;}
</style>
