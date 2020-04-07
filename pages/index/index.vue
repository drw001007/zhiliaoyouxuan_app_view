<template>
	<view class="content">  
		<!-- 轮播图 -->
		<status-bar   ></status-bar> 
		<!-- app头部兼容 -->
		<!-- <nav-bar  type="transparentFixed" transparentFixedLeft="false" transparentFixedFontColor="" :bgColor="['#fff','#fff']" title="">
			 
			<view slot="transparentFixedRight" class="search_transparent_box"></view>
		</nav-bar> -->
		<view class="lunban">
			<view class="lunview">
			<swiper :indicator-dots="indidots" indicator-color="rgba(255,255,255,0.6)" indicator-active-color="#fff"   :duration="duration" :interval="interval">
				<swiper-item v-for="(item,banIndex) in banlist"  :key="banIndex" :data-id="item.content" :data-type="item.type" @click="bantap">
					<image :src="item.ad_url"></image>
				</swiper-item>
			</swiper>
			</view>
		</view>
		<view class="searchbox"   :class="isPosition ? 'position' : 'nopostion'">
		<!-- <view class="searchbox"   > -->
			<view class="searview" @click="gotosear">
				<icon type="search" size="20"  color="#ff3333"></icon>
				<view class="setaxt">
					复制标题，<view>搜隐藏优惠券</view>拿返利
				</view>
				<view class="middsear">搜索</view>
			</view>			 
		</view>
		<view class="searnav"  :class="isPosition ? 'positiontwo' : 'nopostiontwo'">
			<scroll-view class="scrollnav" :scroll-x="true" :scroll-left="navScrollLeft" :scroll-with-animation="true">
				<view class="tabnav" :class="current == navIndex?'active':''" v-for="(item,navIndex) in navData" :key="navIndex" :data-id="item.id" :data-curtab="navIndex" @click="swictNav">
					{{item.name}}
					<text></text>
				</view>
			</scroll-view> 
		</view>
		<!-- 第一屏 -->
		<view v-if="current==0">
		<!-- 导航 -->
		<view :class="isPosition ? 'positionfree' : 'nopostionfree'"  >
		<!-- <scroll-view :scroll-y="true" @scrolltolower="homeDownLoad" @scrolltoupper="bidscroll" @scroll="bidscroll" :scroll-top="scrollTop" :style="'height:'+scrollHeight+'px;'" > -->
			<view class="homnav" >
				<!-- <swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000" @change="changeSwiper" :current="swiperCurrent"  > -->
					<swiper  class="swiper" indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="rgba(255, 255, 255, 1)"
				 :autoplay="false" :interval="3000" :duration="1000" :data-current="swiperCurrent"  @change="changeSwiper" > 
					<swiper-item     >
				 
						<view class="swiper-item"> 
							 <view class="nli" @click="gobrand">
									<image :src="serverImg+'/image/img/n01.png'"></image>
									<view class="">品牌券</view>
							 </view>
							 <view class="nli" @click="gobigcoup">
								<image :src="serverImg+'/image/img/n02.png'"></image>
								<view class="">大额券</view>
							 </view>
							 <view class="nli" @click="geheigcomm">
								<image :src="serverImg+'/image/img/n03.png'"></image>
								<view class="">高佣金</view>
							 </view>
							 <view class="nli"  @click="gofree">
								<image :src="serverImg+'/image/img/n04.png'"></image>
								<view class="">京东9.9</view>
							 </view>
							 <view class="nli" @click="gojuhuas">
								<image :src="serverImg+'/image/img/n05.png'"></image>
								<view class="">聚划算</view>
							 </view>
						 </view> 
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<view class="nli">
								<image :src="serverImg+'/image/img/n06.png'"></image>
								<view class="">零元购</view>
							</view>
							<view class="nli">
								<image :src="serverImg+'/image/img/n07.png'"></image>
								<view class="">拼多多</view>
							</view>
							<view class="nli">
								<image :src="serverImg+'/image/img/n08.png'"></image>
								<view class="">京东</view>
							</view>
							<view class="nli">
								<image :src="serverImg+'/image/img/n09.png'"></image>
								<view class="">知了优选</view>
							</view>
							<view class="nli">
								<image :src="serverImg+'/image/img/n10.png'"></image>
								<view class="">苏宁专题</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
				<!-- 轮播指示点样式修改 -->
				<view class="dots">
					<block v-for="(item,index) in navlist.length"  >
						<view class="dot" :class="index == swiperCurrent ? ' active' : ''"   ></view>
					</block>
				</view> 
			</view>
			<!--  -->
			 <view class="advbox">
				 <view class="adv-one">
					 <view class=""  @click="gobrand" >
						 <image :src="serverImg+'/image/fl01.png'"></image>
					 </view>
					 <view class=""  @click="gofree">
						 <image :src="serverImg+'/image/fl02.png'"></image>
					 </view>
				 </view>
				 <view class="adv-two" @click="gopopul">
					 <image :src="serverImg+'/image/fl03.png'"></image>
				 </view>  
			 </view>
			 <!--  -->
			  <view class="adv-free">
				  <view class="advf_li" @click="gotaoq">
					  <view class="adv_h2">淘抢购</view>
					  <view class="adv_h3">限时低价抢购</view> 
					  <view class="adv_img">
						  <image :src="serverImg+'/image/fl04.jpg'"></image>
					  </view>
				  </view>
				  <view class="advf_li" @click="govery"> 
					  <view class="adv_h2">极有家</view>
					  <view class="adv_h3">引领时尚</view>
					  <view class="adv_img">
						  <image :src="serverImg+'/image/fl05.jpg'"></image>
					  </view>
				  </view>
				  <view class="advf_li" @click="gomark">
				  	  <view class="adv_h2">天猫超市</view>
				  	  <view class="adv_h3">乐享好物</view>
				  	  <view class="adv_img">
						  <image :src="serverImg+'/image/fl06.jpg'"></image>
					  </view>
				  </view>
			  </view>
			  <!-- 超级爆款 -->
			  <view class="goodbox">
				  <view class="good_titl">
					  <view class="titl-left">
						  超级爆款
						<!-- <view class="titl-o">
							<text>111</text>人正在购买
						</view> -->
					  </view>
					  <view class="titl-right">
						  更多爆款 
						  <view class="iconfont texfont"> &#xe61f;</view>
					  </view>
				  </view>
				  <!--  -->
				  <view class="goodul">
						<view class="li" v-for="(item,pIndex) in goodList"  :data-goods_id="item.goods_id" @click="gopart"> 
							<view class="li_img">
								<image :src="item.pict_url"  mode="aspectFit"></image>
							</view>
							<view class="li_cent">
								<view class="li_cent_name">{{item.tao_title}}</view>
								<view class="li_cent_mark">在售价 {{item.size}}</view>
								<view class="li_cent_shop">券后价 ￥{{item.quanhou_jiage}}</view>
								<view class="li_cent_sale">会员赚 ￥{{item.fanli}}</view>
								<view class="li_cent_opp">
									<view class="opbg" :style="'width:'+item.coupon_remain_rate+'%'"></view>
									<view class="li_cent_jdt" >
										{{item.coupon_remain_rate}}%
										<view class="li_cent-rbb">
											<block v-if="item.coupon_total_count.length>=5">
											{{item.coupon_total_count/10000}}万
											</block>
											<block v-else>
												{{item.coupon_total_count}}
											</block>
										</view>
										<!-- <view class="li_cent-rbb">{{item.coupon_total_count}}</view> -->
									</view>
								</view>
							</view>
							<view class="li_last">
								<view class="la_top"></view>
								<view class="last_cent">
									<view class="li_coupon">￥<text>{{item.coupon_info_money}}</text></view>
									<view class="li-cotext">优惠券</view>
									<view class="li_click">马上抢</view>
								</view>
								<view class="la_bot"></view>
							</view>
						</view>
				  </view>
			  </view>
			<view class="height-b"></view>
			<!-- </scroll-view> -->
		</view>
		</view>
	
		<!-- 1over -->
		<!-- 二屏 -->
		<view v-if="current>=1">
		<view :class="isPosition ? 'positionfree' : 'nopostionfree'" >
			<view class="second">
				<view class="sli" v-for="(item,cIndex) in classList" :key="cIndex" :data-id="item.id" :data-kw="item.name"  @click="goclass">
					<image :src="item.cat_img"></image>
					<view class="">{{item.name}}</view>
				</view>
				 
			</view>
			<view class="classtabs">
				<view class="twli" v-for="(item,tIndex) in twoTab" :key="tIndex" :class="scut==tIndex?'active':''" :data-index='tIndex' @click="sendnav">
					{{item}}
				</view>
			</view>
			<view class="twoview" v-for="(item,parentidx) in navData" v-if="current==parentidx" :key="parentidx">
					<!-- <scroll-view :scroll-y="true" :scroll-top="scrollTop"  @scrolltolower="scrollBotton" :style="'height:'+scrollHeight+'px'"> -->
						<view class="twogood  mtop">
							<block v-if="prolodding==1">
							 <view class="proul">
								 <view class="proul_li"  v-for="(item,prodIndex) in secdList" :key="prodIndex" :data-goods_id="item.goods_id" @click="gopart" >
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
											 <block v-if="item.coupon_info_money>=0.00">
											 <view class="prod_up-coup">
													 <view class="prod_up_ld prod_dd"></view>
													 <view class="prod_up-ts">券 ￥{{item.coupon_info_money}}</view>
													 <view class="prod_up_rd prod_dd"></view>
											 </view>
											 </block>
											 
										 </view>
									 </view>
								 </view>
							 </view>
							 
							<view class="medix" v-if="!medix">我是有底线的</view>
							<view class="liloading" :hidden="liloading"><image :src="serverImg+'/image/loading.gif'" ></image></view>
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
					<!-- </scroll-view> -->
			</view> 
			<view class="height-b"></view>
		</view>
		<!-- 2over -->
	</view>
	</view>
</template>

<script  src="./index.njs">
	
</script>

<style>
	@import './index.ncss'
	 
 
</style>
