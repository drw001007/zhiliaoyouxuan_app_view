<script>
	export default {
		globalData:{
			
			//线上开发版接口
			severUrl:'https://zhiliao.fasene.cn/api_zlyx/public/index.php',
		
			//谭本地
			//severUrl:'http://www.beauty_group_shop.com',
			
			serverImg:'https://zhiliao.fasene.cn/program_pic/app_view',
			className:'返利',
			userAuthorization:false,
			wxUserInfo:'',
			statusBar:'',
			customBar:'',
			userInfo:''
		},
		
		onLaunch: function() {
			console.log('App Launch')
			  uni.getSystemInfo({  
				  
			         success:function(e){  
						 console.log(e)
						 console.log(e.statusBarHeight) 
						 console.log('e.statusBarHeight')
			             getApp().globalData.statusBar = e.statusBarHeight  
			             // #ifndef APP-PLUS  
			             if(e.platform == 'android') {  
			                getApp().globalData.customBar = e.statusBarHeight + 50  
			             }else {  
			                 getApp().globalData.customBar = e.statusBarHeight + 45  
			             }  
			             // #endif  
			 
			             // #ifdef MP-WEIXIN  
			             let custom = wx.getMenuButtonBoundingClientRect()  
			             getApp().globalData.customBar = custom.bottom + custom.top - e.statusBarHeight  
			             // #endif  
			 
			             // #ifdef MP-ALIPAY  
			             getApp().globalData.customBar = e.statusBarHeight + e.titleBarHeight  
			             // #endif  
			         }  
			     })  
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "./common/iconfont/iconfont.css";
	/*每个页面公共css */
	.height-b{width: 100%;height: 100upx;}
	.clearfix{clear: both;content: '';width: 100%;}
	
	.meaimgbox .meli uni-checkbox .uni-checkbox-input {
	        border-radius: 50% !important;
	        color: #ffffff !important;
			width:40upx;height:40upx;
	    }
	    
	.meaimgbox .meli uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
	        color: #fff;
	        border-color: rgb(255, 51, 51);
	        background:rgb(255, 51, 51);
			border-radius: 50% !important;
	    }
	.meaimgbox .meli uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:after{
	        font-size: 18px;
	    }
		
	.reli_choog .uni-radio-input{
			width:34upx;height:34upx;
		}
</style>
