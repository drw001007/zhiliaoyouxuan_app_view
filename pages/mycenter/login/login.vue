<template>
	<view>
		<view class="haed">
			<view  class="loginhead">
				<image :src="serverImg+'/image/loginbg.png'"></image>
			</view>
			<view class="logo"  @click="gotohome">
				<image :src="serverImg+'/image/logo.png'"></image>
			</view>
			
		</view>
		<view class="regview"   :hidden="reigshow"  >
			<view class="regis"  >
				<view class="regis_tit">登录</view>
				<form @submit="formlogin" report-submit="true">
					<view class="boxinput">
						<view class="reli">
							<view class="reli_icon iconfont">&#xe60f;</view>
							<view class="reli_it">
								<input  type="text" class="" placeholder="手机号/用户名"  name="user" />
							</view>
						</view>
						<view class="reli">
							<view class="reli_icon iconfont">&#xe619;</view>
							<view class="reli_it">
								<input  type="password" class="" placeholder="输入密码" name='uword' />
							</view>
						</view>
						 <button formType="submit" class='rebtn'>登录</button>
						 <view class="forget" @click="gotohome">暂不登录</view>
					</view>
				</form>
			</view> 
			<view class="tabreg"  @click="declick" >注册</view> 
		</view>
		<view class="regviewtwo" :hidden="!reigshow"    >
			<view class="regis"  >
				<view class="regis_tit">注册</view>
				<form @submit="formregin" report-submit="true">
					<view class="boxinput">
						<view class="reli">
							<view class="reli_icon iconfont">&#xe60f;</view>
							<view class="reli_it">
								<input  type="text" class="" placeholder="请输入手机号"  name='remoddle' @input="bindinput" />
							</view>
						</view>
						<view class="reli">
							<view class="reli_icon iconfont">&#xe619;</view>
							<view class="reli_it">
								<input  type="password" class="" placeholder="请输入登录密码" name='repass' />
							</view>
						</view>
						<view class="reli">
							<view class="reli_icon iconfont">&#xe619;</view>
							<view class="reli_it">
								<input  type="password" class="" placeholder="请再次输入密码" name='repasstwo' />
							</view>
						</view>
						<view class="reli">
							<view class="reli_icon iconfont">&#xe62b;</view>
							<view class="reli_it">
								<input  type="password" class="" placeholder="请输入邀请码" name='ivit' />
							</view>
						</view>
						<view class="reli">
							<view class="reli_icon iconfont">&#xe63d;</view>
							<view class="reli_cod">
								<input  type="password" class="" placeholder="验证码"  name='recod' />
							</view>
							<view class="reli_yam"> 
								<view class="getyam" @click="getsms" :hidden='getshow' >
									{{countdown}} 
								</view>
								 <view class="getgray"  :hidden='!getshow' >
								 	{{countdown}}<text v-if="timestatus">秒重获</text>
								 </view>
							</view>
						</view>
						<view class="reli_choog">
							<label class="radio"><radio value="r2" checked  color="#f33" />我已阅读并同意服务协议</label> 
						</view>
						 <button formType="submit" class='rebtn'>确认</button> 
					</view>
				</form> 
			</view>
			<view class="tabreg"  @click="declick" >登录</view>
		</view>
	</view>
</template>

<script>
	import requestHttps from '../../../common/request.js'
	export default {
		data() {
			return { 				
				serverImg:getApp().globalData.serverImg,
				reigshow:false,
				sin:1,
				tels:'',
				getshow:false,
				countdown:'获取验证码',
				timestatus:false,
				code:'',
				id:''
				
			}
		},
		methods: {
			 declick:function () {
			 	
			 	 var that=this
				 that.reigshow=!that.reigshow
			},
			bindinput:function(e){
				var that=this
				console.log(e)
				that.tels=e.detail.value
			},
			countDown(){
                var that = this;
                if(!that.countdown){                    
//                     that.disabled = false;
					that.getshow=!that.getshow
                    that.timestatus = false;
                    that.countdown = '获取验证码';
                    clearInterval(that.clear);
                }else{
                    --that.countdown;
                }
            },
			gotohome:function(){
				uni.switchTab({
					url:'../../index/index'
				})
			},
			// 短信接口
			getsms:function(){
				var that=this
				// that.getshow=!that.getshow
				var tel=that.tels
				var warn=''
				var flag=false
				if(tel==''){
					warn='请输入手机号码'
				}else if(!(/^1(3|4|5|7|8)\d{9}$/.test(tel))){
					warn = "手机号格式不正确";
				}else{
					flag=true
				}
				if(flag==false){
					uni.showToast({
						title:warn,
						icon:'none'
					})
				}else{
					console.log('bbg')
					 that.countdown = 60;
                     that.timestatus = true;
					that.getshow=!that.getshow
                     that.clear = setInterval(that.countDown,1000);
					// that.code='1234'
					// that.getshow=true
					
					requestHttps({
						url:'/app/msgcode',
						method:'POST',
						data:{
							mobile:tel
						},
						success:res=>{
							console.log(res)
							that.code=res.data.data.msg_code
						}
					})
				}
				
				
			},
			
			// 注册
			formregin:function(e){
				var that=this
				var user=e.detail.value.remoddle
				var repass=e.detail.value.repass
				var repasstwo=e.detail.value.repasstwo
				var  ivit=e.detail.value.ivit
				var recod=e.detail.value.recod
				var bcod=that.code
				console.log(that.code)
				console.log('that.code')
				console.log(e)
				var flag=false
				var warn=''
				if(user==''){
					warn='请输入手机号'
				}else if(!(/^1(3|4|5|7|8)\d{9}$/.test(user))){
					warn = "手机号格式不正确";
				}else if(repass==''){
					warn ='请输入密码'
				}else if(repasstwo==''){
					warn ='请输入密码'					
				}else if(repass !==repasstwo ){
					warn='密码不一致'
				}else if(recod==''){
					warn='请输入验证码'
				}else if(recod != bcod){
					warn='验证码错误'
					console.log(bcod)
					console.log(recod)
				}else{
					flag=true
				}
				if(flag==false){
					uni.showToast({
						title:warn,
						icon:'none'
					})
				}else{
					requestHttps({
						url:'/app/register',
						method:'POST',
						data:{
								mobile:user,
								password:repass,
								re_password:repasstwo,
								reg_share_code:ivit
						},
						success:res=>{
							console.log(res)
							console.log('注册res')
							
							if(res.data.code==1){
								var arr=res.data.data
								uni.showToast({
									title:'注册成功',
									icon:'none'
								})
								uni.setStorage({
									key:"token",
									data:arr.token
								})
								uni.setStorage({
									key:"user_id",
									data:arr.user_id
								})
								uni.setStorage({
									key:'userAuthorization',
									data:true
								})
								setTimeout(function(){
									uni.switchTab({
										url:'../mycenter/mycenter'
									})
								},1000)
							}
						}
					})
				}
				
			},
			// 登录
			formlogin:function(e){
				console.log(e)
				var that=this
				var user=e.detail.value.user
				var uword=e.detail.value.uword
				var warn=''
				var flag=false
				if(user ==''){
					warn='请填写用户名'
				} else if (!(/^1(3|4|5|7|8)\d{9}$/.test(user))) {
					  warn = "手机号格式不正确";
				}else if(uword==''){
					warn='请输入密码'
				}else{
					flag=true
				}
				if(flag==false){
					uni.showToast({
						title:warn,
						icon:'none'
					})
				}else{
					requestHttps({
						url:'/app/login',
						method:'POST',
						data:{
							username:user,
							password:uword
						},
						success: res=>{
							console.log(res)
							console.log()
							var data=res.data
							var  arr=res.data.data
							if(data.code==1){
								uni.showToast({
									title:arr.message,
									icon:'none'
								})
								console.log(arr.token)
								console.log('(arr.token')
								uni.setStorage({
									key:"token",
									data:arr.users.token
								})
								uni.setStorage({
									key:'userAuthorization',
									data:true
								})
								
								getApp().globalData.userInfo=arr.users 
								getApp().globalData.userAuthorization=true
								console.log(getApp().globalData.userInfo)
								console.log('getApp().globalData.userInfo')
								if(that.sin==1){
									setTimeout(function() {
										uni.switchTab({ 
											url:'../mycenter/mycenter'
										})
									}, 1000)
								}else{
									setTimeout(function() {
										uni.navigateTo({ 
											url:'../../productdetail/productdetail?id='+that.id
										})
									}, 1000)
								}
							}else{
								uni.showToast({
									title:res.data.message,
									icon:'none'
								})
							}
							
						},
						 
						 
					})
				}
			}
			
		},
		onLoad(optis){
			var that=this
			that.sin=optis.sin
			that.id=optis.id
		}
		 
	}
</script>

<style>
	page{height: 100%;width: 100%;overflow: hidden;}
	.haed{width: 100%;height:474upx;position: fixed;top: 0;left: 0;z-index: 99;}
	.loginhead{width: 100%;height:474upx;}
	.loginhead image{width: 100%;height:100%;}
	.logo{width: 100upx;height:100upx;position: absolute;top: 50upx;left: 50%;margin-left:-50upx;z-index: 100;}
	.logo image{width: 100%;height:100%;}
	.regview{width: 94%;margin:0 auto;top:200upx;left:3%; position: absolute;z-index: 101;}
	.regviewtwo{width: 94%;margin:0 auto;top:200upx;left:3%; position: absolute;z-index: 101; }
	.regis{width:600upx;margin: 0 auto;padding:40upx 50upx;background: #fff;box-shadow: 2upx 2upx 20upx #fbc5bd;position: relative;z-index: 999;border-radius: 40upx;}
	.regis .regis_tit{font-size:56upx;color:#444;}
	.regis .boxinput{margin-top:60upx;}
	.regis .reli{height: 100upx;display: flex;border-bottom: 1px solid #cccccc;}
	.regis .reli .reli_icon{width: 45upx;line-height: 100upx;color:#ff3333;text-align: center;}
	.regis .reli .reli_it{width: 500upx;height: 70upx;margin-top: 15upx;margin-left:20upx;}
	.regis .reli .reli_it input{width: 100%;height:70upx;line-height: 70upx;color:#333;font-size:26upx;}
	.regis .reli .reli_cod{width: 350upx;height: 70upx;margin-top: 15upx;margin-left:20upx;}
	.regis .reli .reli_cod input{width: 100%;height:70upx;line-height: 70upx;color:#333;font-size:26upx;}
	.regis .reli_yam{width: 150upx;height: 50upx;margin-top:25upx;margin-left:0upx;}
	.regis .reli_yam .getyam{width: 150upx;height: 50upx;background: #f33;color:#fff;font-size:24upx;text-align: center;line-height: 50upx;padding:0;margin:0;border:0;}
	.regis .reli_yam .getgray{width: 150upx;height: 50upx;background: #999;color:#fff;font-size:24upx;text-align: center;line-height: 50upx;padding:0;margin:0;border:0;}
	.regis  .rebtn{width: 600upx;height: 90upx;background: #ff3333;color:#fff;font-weight: 500;font-size: 40upx;border-radius: 90upx;line-height: 90upx;margin-top:100upx;}
	.regis .forget{color:#ff3333;font-size:26upx;text-align: center;padding-top:20upx;letter-spacing: 2upx;}
	.tabreg{width:648upx;margin:0 auto;padding:60upx 0 30upx 0;border-radius: 40upx;box-shadow: 2upx 2upx 20upx #e9e7e7;color:#666666;font-weight:600;font-size:40upx;text-align: center;margin-top:-40upx;}
	.regis .reli_choog{ color:#f33;font-size:26upx;text-align: center;padding-top:20upx;}
	.regis .reli_choog .uni-radio-input{background:#f33;background-color:#f33 !important;   border-color:#f33 !important;}
	uni-radio .uni-radio-input{background-color:#f33 !important;  border-color:#f33 !important;}
	 
</style>
