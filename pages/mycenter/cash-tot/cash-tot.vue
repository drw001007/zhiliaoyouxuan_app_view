<template>
	<view>
		<view class="cashhead">
			<view class="cash_goback iconfont">&#xe642;</view>
			<view class="cashcent">
				<view class="cashcent_l">
					<view class="cashcent_ltit">可提现金额（元）</view>
					<view class="cashcent_lmey">0.00</view>
				</view>
				<view class="cash_btn">立即提现</view>
			</view>
		</view>
		<view class="cashtip">首单收入且≤6元确认收货24小时后可提现；后续订单收入本月确认收货下个月25号可提现</view>
		<view class="cashview">
			<view class="cashtab">
				<view class="ctli" :class="current==csIndex?'active':''" v-for="(item,csIndex) in navcash">
					{{item}}
				</view>
			</view>
			<view class="">
				<block v-if="current==0">
					<block v-if="cashlist.length>=1">
					<view  class="" >
						
					</view>
					</block>
					<block v-else>
						<view class="nomey">
							<image :src="serverImg+'/image/img/nomey.png'"></image>
							<text>没有收入</text>
						</view>
					</block>
					
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				serverImg:getApp().globalData.serverImg,
				navcash:['收入','提现记录'],
				current:0,
				cashlist:[]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{background: #f5f5f5;}
	.cashhead{width:100%;height: 305upx;background: linear-gradient(to right,#fa4f6f,#fe756e);}
	.cash_goback{height:96upx;line-height: 96upx;width: 94%;margin: 0 auto;color:#fff;font-size:26upx;}
	.cashcent{width: 94%;margin: 0 auto;display: flex;justify-content: space-between;}
	.cashcent_l{margin-top:20upx;}
	.cashcent_l .cashcent_ltit{color:#fff;font-size:26upx;padding-left:20upx;}
	.cashcent_l .cashcent_lmey{font-size:60upx;color:#fff;font-weight: 600;}
	.cash_btn{width: 180upx;background: #fff;color:#ff3333;font-size:26upx;height: 50upx;line-height: 50upx;border-radius: 50upx;text-align: center;letter-spacing: 2upx;}
	.cashtip{width:94%;padding:20upx 3%;background: #f03f55;color:#f3f3f3;font-size:24upx;letter-spacing: 2upx;}
	.cashview{width:100%;}
	.cashview .cashtab{width: 94%;padding:0 3%;background: #fff;height: 95upx;display: flex;justify-content: space-around;}
	.cashview .cashtab .ctli{ line-height: 90upx;border-bottom: 2upx solid #fff;color:#333;font-size:26upx;}
	.cashview .cashtab .ctli.active{border-bottom: 2upx solid #ff3333;}
	
	.nomey{width:100%;margin-top:135upx;}
	.nomey image{width: 96upx;height:96upx;margin: 0 auto;display: block;}
	.nomey text{color:#cccccc;font-size:36upx;display: block;text-align: center;margin-top:20upx;}
</style>
