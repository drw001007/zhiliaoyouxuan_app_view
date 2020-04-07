<template>
	<view>
		 <block  v-if="lodding==1">
		<view class="header">
			<view class="iconfont goto"  @click="goback">&#xe642;</view>
			<view class="head-titl">分享商品</view>
			<!-- <view class="iconfont serar" @click="gosech">&#xe636;</view> -->
		</view>
		<view class="mearch">
			<view class="mearch-one">
				<!-- <view class="mearch_titl">
					<view class="mearch_titl-le">
						<view class="tit_nam">商品图</view>
						<view class="tit_num"><text>1</text>/{{imgurl.length}}</view>
					</view>
					<view class="mearch_chooge">全选</view>
				</view>
				<view class="meaimgbox">
					<view class="meaimgul">
						<scroll-view  class="scrollview" :scroll-x="true" :scroll-left="scrollLeft"> 
							<view class="meli" v-for="(item,mIndex) in imgurl"  :key="mIndex">
								<checkbox-group class="block" @change="changeCheckbox">
									<checkbox :value="String(mIndex)" class="checkb"   ></checkbox> 
								<image class="tuimg" :src="item"  mode="aspectFill"></image>
								</checkbox-group>
							</view>
							  <view class="meli" v-for="(item,mIndex) in imgurl">
									<view class="tuimg">
										<image class="tuimg_k" :src="item"></image> 
									</view>
									<view class="choogs" >
										<image class="yesimg" :hidden="yesshow" :src="serverImg+'/static/image/img/nogou.png'"></image> 
										<image class="yesimg" :hidden="!yesshow"  :src="serverImg+'/static/image/img/yes.png'"></image> 
									</view>
							</view> 
						</scroll-view>
						
					</view>
				</view> -->
				<view class="mearch_titl">
					<view class="mearch_titl-le">
						<view class="tit_nam">分享图</view>
						<!-- <view class="tit_num"><text>1</text>/{{imgurl.length}}</view> -->
					</view>
					<!-- <view class="mearch_chooge">全选</view> -->
				</view>
				<view class="meaimgbox">
					<view class="meaimgul"> 
						<view class="meaimguli" @click="getPhotoClickIdx"     >
							<image :src="shareImg" mode="aspectFill" ></image>
						</view>
					</view>
				</view>
			</view>
			 <!-- <view class="post">
			              <tki-qrcode
			                  ref="qrcode"
			                  :val="prodlist"
			                  :size="200"
			                  background="#fff"
			                  foreground="#000"
			                  pdground="#000"
			                  :onval="false"
			                  :loadMake="false"
			                  @result="qrR"
			                  :show="false"
			              ></tki-qrcode>
			              <view class="wrapper"><canvas style="height: 100%;width: 100%;backgroundColor: #FFFFFF" canvas-id="firstCanvas"></canvas></view>
			     </view> -->
			<view class="commt">
				<view class="commt_t">
					<view class="commt_tyu">推荐语</view>
					<view class="commt_copy"  @click="copycomt"><text class="iconfont">&#xe643;</text>复制推荐语</view>
				</view>
				<view class="commtwo">
					<!-- {{list.wen_an}} -->
					 <rich-text :nodes="list"></rich-text>
				</view>
			</view>
		</view>
		<view class="footed" :hidden='footshow'>
			<view class="footed_titl">分享图文至</view>
			<view class="fotcent">
				<view class="cl" @click="wxshare">
					<!-- <view class="wxicon iconfont">&#xe654;</view> -->
					<view class="climg">
						<image :src="serverImg+'/image/img/mg01.png'"></image>
					</view>
					<view class="text">微信好友</view>
				</view>
				<view class="cl"  @click="copycomt">
					<!-- <view class="copy iconfont">&#xe639;</view> -->
					<view class="climg">
						<image :src="serverImg+'c/image/img/mg02.png'"></image>
					</view>
					<view class="text">复制口令</view>
				</view>
				<view class="cl"  @tap="saveQrcode">
					<!-- <view class="ipicon iconfont">&#xe615;</view> -->
					<view class="climg">
						<image :src="serverImg+'/image/img/mg03.png'"></image>					
					</view>
					<view class="text">保存到手机</view>
				</view>
			</view>
		</view>
		</block>
		<block v-else>
			<view class="viewlogin">
				<image :src="serverImg+'/image/loading.gif'"></image>
			</view>
		</block>
	</view>
</template>

<script>
	import requestHttps from '../../common/request.js';
	// import tkiQrcode from '../../components/tki-qrcode/tki-qrcode.vue'
	export default {
		// name:'canvas-drawer',
		// components: {
		// 	tkiQrcode
		// },
		data() {
			return {
				serverImg:getApp().globalData.serverImg,
				yesshow:false,
				onecheck:'0',
				tk:'',
				list:[],
				goods_id:'',
				prodlist:[],
				imgurl:[],
				scrollLeft:0,
				footshow:false,
				pict_url:'',
				shareImg:'',
				lodding:2
			}
		},
		methods: {
			getmerchan:function(e){
				var that=this
				requestHttps({
					url:'/tb/share/qr',
					method:'POST',
					data:{
						tk_code:that.tk,
						pict_url:that.pict_url
					},
					success:res=>{
						console.log(res)
						that.list=res.data.data.wen_an
						that.shareImg=res.data.data.pic_url 
						that.lodding=1
					}
				})
			},
			getPhotoClickIdx(e) {
				let that = this;
				var list=that.shareImg
				 var imglist = []
				    imglist[0] = that.shareImg
				// let idx = e.currentTarget.dataset.index;
				  
				    uni.previewImage({
				        current:imglist[0],    //  传 Number H5端出现不兼容 
				        urls: imglist
				    }); 
			},
						
			 
			// 
			copycomt:function(){
				var that=this
				var value=that.list
				uni.setClipboardData({
					data: value
				});
			},
			 
			 wxshare:function(){
				 var that=this
				 var texttitl=that.list
					uni.share({
					    provider: "weixin",
					    scene: "WXSceneSession",
					    type: 1,
					    summary: texttitl,
					    success: function (res) {
					        console.log("success:" + JSON.stringify(res));
					    },
					    fail: function (err) {
					        console.log("fail:" + JSON.stringify(err));
					    }
					});
					 
				 
				},
			// 详情
			getdetail:function(e){
				var that=this
				requestHttps({
					url:'/tb/goods/detail',
					method:'POST',
					data:{
						goods_id:that.goods_id
					},
					success:res=>{
						console.log(res.data)
						var data=res.data.data
						that.imgurl=data.small_images
						that.prodlist={
							markprice:data.quanhou_jiage,
							shoppric:data.size,
							coupon:data.coupon_info_money,
							volume:data.volume,
							picname:data.tao_title,
							src:data.pict_url
						}
						console.log(that.prodlist)
						// that.tupshare()
					}
				})
			},
			// 海报
			// tupshare:function(){
			// 	 var that=this
			// 	 console.log(that.prodlist)
			// 	uni.getImageInfo({
			// 		src: that.prodlist.src,
			// 		success(res) {
			// 			console.log(res.path);
			// 			console.log(res);
			// 		}
			// 	})   
			//  },
			 
			tupshare() {
				console.log('111')
			             let that = this;
			             // this.qr_path = path;
			             let system_info = uni.getSystemInfoSync();
			             let ctx = uni.createCanvasContext('firstCanvas');
			             uni.getImageInfo({
			                 src: that.prodlist.src,
			                 success(res) {
			                     console.log(res.path);
								 var path=res.path
			                     ctx.drawImage(res.path, 0, 0, 375, uni.upx2px(1020));
			                     let linearGrad = ctx.createLinearGradient(0, 0, 800, 0);
			                     linearGrad.addColorStop('0.25', '#8b00d2');
			                     linearGrad.addColorStop('0.5', '#003fb3');
			                     linearGrad.addColorStop('0.75', '#ff3ef0');
			                     ctx.fillStyle = '#FFFFFF';
			                     ctx.fillRect(uni.upx2px(500), uni.upx2px(790), uni.upx2px(200), uni.upx2px(210));
			                     ctx.drawImage(path, uni.upx2px(520), uni.upx2px(800), uni.upx2px(160), uni.upx2px(160));
			                     ctx.font = '13px Arial';
			                     ctx.fillStyle = '#000';
			                     ctx.fillText('长按保存二维码', uni.upx2px(508), uni.upx2px(990));
			                     ctx.draw(false, () => {
			                         uni.canvasToTempFilePath({
			                             x: 0,
			                             y: 0,
			                             width: 375,
			                             height: uni.upx2px(1020),
			                             destWidth: 375,
			                             destHeight: uni.upx2px(1020),
			                             canvasId: 'firstCanvas',
			                             success: function(res) {
			                                 uni.saveImageToPhotosAlbum({
			                                     filePath: res.tempFilePath,
			                                     success: function() {
			                                         console.log('save success');
			                                     }
			                                 });
			                             },
			                             fail(e) {
			                                 console.log(e);
			                                 uni.showToast({
			                                     title: '生成海报失败',
			                                     icon: 'none'
			                                 });
			                             }
			                         });
			                     });
			                 },
			                 fail(error) {
			                     console.log(error);
			                 }
			             });
			             
			 
			             
			         },
			         saveToAlbum() {
			             this.$refs.qrcode._makeCode();
			         },
			 
			 
			 // 选中
			changeCheckbox:function(e){
				console.log(e)
			},
			
			// 返回上个页面
			goback:function(){
				uni.navigateBack({
					delta:1
				})
			},
			// 保存到图库
			saveQrcode() {
				var that=this
				// this.$refs.qrcode._saveCode()
				uni.saveImageToPhotosAlbum({
					filePath: that.shareImg,
					success: function () {
						uni.showToast({
							title: '图片保存成功',
							icon: 'success',
							duration: 2000
						});
					}
				});
			},
		},
		onLoad:function(option){
			var that=this
			console.log(option)
			that.goods_id=option.goods_id
			that.tk=option.tk
			that.pict_url=option.pict_url
			that.getmerchan()
			that.getdetail()
			// 
			
			
			
		}
	}
</script>

<style>
	page{background: #f5f5f5;}
.header{position: fixed;left: 0;top: 0;width: 94%;padding:0 3%;background: #fff;height: 96upx;line-height: 96upx;display: flex;}
	.header .goto{font-size:36upx;color:#333}
	.header .head-titl{width: 100%;text-align: center;font-size:34upx;color:#000;line-height: 96upx;}
	/* .header	.serar{font-size: 36upx;color:#333;} */
	.mearch{width: 100%;margin:0 auto;margin-top:120upx;}
	.mearch-one{width: 94%;padding:20upx 3%;background: #fff;}
	.mearch_titl{width: 100%;display: flex;justify-content: space-between;}
	.mearch_titl-le{display: flex;}
	.mearch_titl-le .tit_nam{font-size:30upx;color:#000;}
	.mearch_titl-le .tit_num{font-size:24upx;color:#000;margin-left:20upx;margin-top:5upx;}
	.mearch_titl-le .tit_num text{color:#f33;}
	.mearch_chooge{font-size:26upx;color:#f33;} 
	
	.meaimgbox{width: 100%;margin-top:20upx;}
	.meaimgul{width: 100%;display: flex;}
	.meaimgbox .meli{position: relative;width: 140upx;height: 140upx;display: inline-block;margin-right:20upx;}
	.scrollview{width:100%;box-sizing: border-box; white-space: nowrap;display: flex;}
	.checkb{position: absolute;right:0;top:0;z-index: 99;}
	.meaimgbox .meli .tuimg{position:absolute;left:0;top:0; width: 140upx;height: 140upx; }
	
	.meaimguli{width: 140upx;height:140upx;}
	.meaimguli image{width: 140upx;height: 140upx;}
	/* .meaimgbox .meli .tuimg .tuimg_k{width: 100%;height: 100%;}
	.choogs{position: absolute;right:0;top:0;z-index: 99;}
	.choogs .yesimg{width: 40upx;height:40upx;}
	.choogs .yesimg image{width: 40upx;height:40upx;opacity: 1;} */
	
	
	.commt{width: 94%;padding:0 3%;background: #fff;margin-top:20upx;padding-bottom: 50upx;}
	.commt_t{width: 100%;height: 80upx;line-height: 80upx;display: flex;justify-content: space-between;}
	.commt_tyu{font-size:30upx;color:#000;}
	.commt_copy{color:#f33;font-size:26upx;}
	.commt_copy text{color:#f33;font-size:32upx;margin-right:10upx;}
	.commtwo {font-size:26upx;padding:20upx ;background: #f5f5f5;}
	.footed{width:100%;position: fixed;left:0;bottom:0;background: #fff;}
	.footed .footed_titl{height: 80upx;line-height: 80upx;font-size:26upx;color:#333;text-align: center;}
	.footed .fotcent{width:100%;display: flex;justify-content: space-around;margin-top:10upx;}
	.footed .fotcent .cl{width:33%;text-align: center;}
	.footed .fotcent .cl .climg{width:70upx;height: 70upx;text-align: center;margin: 0 auto;}
	.footed .fotcent .cl .climg image{width: 100%;height: 100%;}
	.footed .fotcent .cl .wxicon{color: #04d102;font-size:50upx;}
	.footed .fotcent .cl .copy{color: #28abe3;font-size:50upx;}
	.footed .fotcent .cl .ipicon{color:#fdebed;font-size:50upx;}
	.footed .fotcent .cl .text{font-size:26upx;color:#666;padding:15upx 0;}
	.viewlogin{  width: 64rpx; height: 64rpx; margin: 0 auto; margin-top:200rpx;  color:#666;  text-align: center; font-size: 24rpx;	}
	.viewlogin image{ width: 100%;  height: 100%;}
</style>
