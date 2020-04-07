<template>
	<view >
		<view class="searchbox">
			<!-- <view  class="sehead-on iconfont" @click="goback">&#xe642;</view> -->
			<view  class="sehead-two">
				<icon type="search" color="#fe3435" size="20" ></icon>
				<input type="text" class="seinput" placeholder="复制标题,搜隐藏优惠券拿返利" name='keyw' @focus="bindfocus" :value="keyword"  @input="bindinput" @blur="bindblur" @confirm="bindconfirm"/>
				<view class="setwo-colse iconfont" :hidden="sercolse" @click="colsekeywd">&#xe61a;</view>
				<view class="sebtns"  @click="clicksear">搜索</view>
			</view>
		</view>
		<view class="suggview" v-if="selist.length>=1">
			<view class="suli" v-for="(item,sIndex) in selist" :key="sIndex" :data-name="item.name" @click="goseli">
				{{item.name}}
			</view>
		</view>
		<view v-else>
			<view class="searnav">
				<scroll-view class="scrollnav" :scroll-x="true" :scroll-left="navScrollLeft" :scroll-with-animation="true">
					<view class="tabnav" :class="current == navIndex?'active':''" v-for="(item,navIndex) in navData" :key="navIndex" :data-id="item.id" :data-curtab="navIndex" @click="swictNav">
						{{item.mobile_name}}
						<text></text>
					</view>
				</scroll-view> 
			</view>
			<view class="tips">
				<image :src="serverImg+'/image/hotsear.png'"></image>
			</view>
			<view class="hot-key">
				<view class="hot-titl">热门搜索</view>
				<view class="hotlist">
					<view class="hli" v-for="(item,hoIndex) in hotlist" :key="hoIndex" :data-keyword="item.keywords" @click="gohotkey" >
						{{item.keywords}}
					</view>
				</view>
			</view>
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
				hotlist:[],
				address:'',
				address_id:'',
				selist:[],
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
			// 搜索文字
			bindinput:function(e){
				console.log(e)
				var that=this
				var val=e.detail.value
				 
				that.keyword=val
				if(val){
					that.getsuggestlist(val)
				}else{
					that.selist=[]
				}
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
			// 热门关键字到详情
			gohotkey:function(e){
				var ks=e.currentTarget.dataset.keyword
				uni.navigateTo({
					url: '../searchlist/searchlist?kw='+ks,
					success: res => {
						
					},
					fail: () => {},
					complete: () => {}
				});
			},
			goseli:function(e){
				var kw=e.currentTarget.dataset.name
				uni.navigateTo({
					url: '../searchlist/searchlist?kw='+kw,
					success: res => {
						
					},
					fail: () => {},
					complete: () => {}
				});
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
					uni.navigateTo({
						url: '../searchlist/searchlist?kw='+keyword,
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
				}
				
			},
			getsuggestlist:function(kw){
				var that=this
				if(kw){
					requestHttps({
						url:'/tb/suggestkw/lists',
						method:'POST',
						data:{
							kw:kw
						},
						success: res=>{
							var list=res.data.data
							that.selist=list
							console.log(list)
						}
					})
				}
				
			},
			// 搜索关键字推荐
			getcommlist:function(){
				var that =this
				uni.request({
					url: '',
					method: 'GET',
					data: {},
					success: res => {},
					
				});
				requestHttps({
					url:'/tb/keyword/lists',
					method:'POST',
					data:{},
					success: res=>{
						var list=res.data.data
						that.hotlist=list
					},
					fail: (res) => {
						console.log('失败')
						console.log(res)
					},
					 
					 
				})
			}
		},
		onLoad:function(){
			var that=this
			that.getcommlist()
		},
		onShow:function(){
			 
		}
	}
</script>

<style> 
	.searchbox{width:94%;padding:0 3%;height:100upx; position: fixed;top: 0;z-index: 999;left: 0;background: #fff; }
	.sehead-on{ font-size:26upx;line-height: 100upx;display: block;font-size:30upx;color:#999;}
	.sehead-two{width:650upx; height:70upx;margin:0 auto;margin-top:15upx;background: #eeeeee;border-radius:10upx;}
	.sehead-two icon{padding:8px 15upx;float: left;}
	.sehead-two .seinput{width: 380upx;color:#666;font-size:26upx;height: 60upx;line-height: 60upx;margin-top:5upx;float: left;;}
	.sehead-two .setwo-colse{width: 50upx;height:60upx;float: left;line-height: 60upx;}
	.sehead-two .sebtns{width: 130upx;height:70upx;line-height:70upx;background: linear-gradient(to right,#e84766,#fe3435);color:#fff;font-size:28upx;text-align: center;float: right;letter-spacing: 5upx;
		border-bottom-right-radius: 5px;border-top-right-radius: 5px;}
	.searnav{width: 100%;margin-top:100upx;height: 100upx;}
	.scrollnav{width:100%;box-sizing: border-box;height: 80upx; font-size: 26rpx;white-space: nowrap;}
	.scrollnav .tabnav{padding:0 40upx;display: inline-block;margin-top:25upx;}
	.scrollnav .tabnav text{width:40upx;height: 4upx;border-radius:5upx;display: block;margin: 0 auto;margin-top: 5upx;color:#999999;}
	.scrollnav .tabnav.active{ color:#ff3333;}
	.scrollnav .tabnav.active text{background: #ff3333;}
	.tips{width: 94%;margin:0 auto;margin-top:20upx;}
	.tips image{width: 100%;height: 98upx;}
	.hot-key{width: 94%;margin: 0 auto;margin-top:20upx;}
	.hot-key .hot-titl{font-size:26upx;color:#333333;}
	.hotlist{margin-top:20upx;display: flex;flex-wrap: wrap;}
	.hotlist .hli{background: rgba(240,240,240,0.5);color:#666666;font-size: 24upx;padding:5px 10px;border-radius: 30upx;margin-right: 30upx;margin-bottom: 20upx;}
	.suggview{width: 100%;position: absolute;top: 100upx;}
	.suggview .suli{width: 94%;padding:0 3%;height:80upx;line-height: 80upx;color:#333;font-size:26upx;  border-bottom: 1px solid #f5f5f5;}
</style>
