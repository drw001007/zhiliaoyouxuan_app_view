import requestHttps from '../../common/request.js'
import StatusBar from '../../components/statusbar/statusbar.vue'
export default {
	components: {
		StatusBar
	},
		data() {
			return {  
				serverImg:getApp().globalData.serverImg,
				showsearicon:true,
				indidots:true,
				duration:600,
				interval:3000,
				banlist:[],   //轮播 
				
				page:1,
				navData:[   //分类
					{id:'0','name':'首页'}
				],
				navlist:[
					{
						nli:[
							{imgus:'../../static/image/img/n01.png',textname:'品牌券',click:'home'}, 
						]
					},
					{
						nli:[
							{imgus:'../../static/image/img/n01.png',textname:'品牌券'}, 
						]
					}
				],
				current:0, 
				navScrollLeft:0,
				windowWidth: 400, 
				swiperCurrent:0,    // 轮播面点
				goodList:[ ],     // 产品列表
				isPosition:false, //是否滑动固定顶部
				 marTop:'0',
				twoTab:['精选','销量','最新','价格'],  // 精选
				scut:0,   // 精选
				prolodding:2,
				secdList:[],  //分类产品
				classList:[],   //二级分类
				scrollTop:0,
				scrollHeight:0,
				medix:true, 
				flag:true,
				pqp:true,
				liloading:true,
				tsort:'new'
				
			}
		}, 
		methods:{
		 	// 分类导航
		 	swictNav:function(e){
				var that=this
		 		var cur=e.currentTarget.dataset.curtab
		 		var id=e.currentTarget.dataset.id
		 		// navScrollLeft
		 		var singleNavWidth = this.windowWidth / 4
		 		    //tab选项居中                            
		 		this.navScrollLeft=(cur - 2) * singleNavWidth
		 		if(this.current==cur){
		 			return false
		 		}else{
		 			 this.current=cur
		 			 this.id=id
		 		} 
				if(cur==0){
					
				}else{
					this.page=1,
					that.scrollTop=0,
					that.classList=[],
					that.secdList=[],
					that.getclassList(id)
					that.getsecdList(id)
					
				}
		 	},
			// 轮播点击到详情
			bantap:function(e){
				var that=this
				var type=e.currentTarget.dataset.type
				var id=e.currentTarget.dataset.id
				if(type=='gdetail'){
					uni.navigateTo({
						url:'../productdetail/productdetail?id='+id
					})
				}
			},
			// 轮播图
			getbannlist:function(){
				var that=this
				requestHttps({
					url:'/app/banner',
					method:'POST',
					data:{ },
					success:res=>{
						console.log(res)
						if(res.data.code==1){
							that.banlist=res.data.data
						}
					}
				})
			},
			// 分类筛选
			sendnav:function(e){
				var that=this
				console.log(e)
				var cur=e.currentTarget.dataset.index
				that.scut=cur
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
				that.page=1
				that.prolodding=2
				that.secdList=[],
				that.getsecdList(that.id)
			},
			// 二级分类跳转列表
			goclass:function(e){
				var that=this
				var kw=e.currentTarget.dataset.kw
				var id=that.id
				uni.navigateTo({
					url:'../prodlist/prodlist?id='+id+'&kw='+kw
				})
			},
			getclassList:function(id){
				var that=this
				requestHttps({
					url:'/tb/bk/cates',
					method:"POST",
					data:{
						cat_id:id
					},
					success:res=>{
						console.log(res)
						var data=res.data
						if(data.code==1){
							that.classList=data.data
						}
					}
					
				})
			},
			getsecdList:function(id){
				var that=this
				if(that.flag){
					if(id){
						requestHttps({
							url:'/tb/goods/lists',
							method:"POST",
							data:{
								page:that.page,
								cid:id,
								tsort:that.tsort
							},
							success:res=>{
								console.log(res)
								var data=res.data
								
								var list=data.data
								if(data.code==1){ 
									if(that.page==1){
										that.secdList=list
									}else{
										that.secdList=that.secdList.concat(list)
									}
									if(list.length>=1){
										that.flag=true
										that.medix=true
										that.prolodding=1
										that.liloading=true
									}else{
										that.liloading=true
										that.flag=false
										that.medix=false 
										that.prolodding=3
									}
								}
							}
						})
					}
				}
			},
			// 分类下拉
			scrollBotton:function(){
				// var that=this
				// if(that.pqp){
				// 	var page=that.page
				// 	page++
				// 	that.page=page
				// 	that.liloading=false
				// 	// that.getsecdList(that.id)
				// }
			},
			// 导航栏显示点
		 	changeSwiper:function(e){
		 		console.log(e)
				var cur=e.detail.current
		 		this.swiperCurrent=cur
		 	},
			// 到详情
			gopart:function(e){
				var id=e.currentTarget.dataset.goods_id
				uni.navigateTo({
					url:'../productdetail/productdetail?id='+id
				})
			},
			// 搜索
			gotosear:function(e){
				uni.switchTab({
					url: '../search/search',
					 
				})
			},
			// 大额券
			gobigcoup:function(){
				uni.navigateTo({
					url:'../prodlist/prodlist?type=14'
				})
			},
			// 高佣金
			geheigcomm:function(){
				uni.navigateTo({
					url:'../prodlist/prodlist?type=9'
				})
			},
			// 聚划算
			gojuhuas:function(){
				uni.navigateTo({
					url:'../prodlist/prodlist?type=2'
				})
			},
			// 品牌特惠
			gobrand:function(e){
				uni.navigateTo({
					url:'../prodlist/prodlist?type=4'
				})
			},
			// 9.9包邮
			gofree:function(e){
				uni.navigateTo({
					url:'../prodlist/prodlist?type=6'
				})
			},
			// 人气榜
			gopopul:function(e){ 
				uni.navigateTo({
					url:'../prodlist/prodlist?type=hot'
				})
			},
			// 淘抢购
			gotaoq:function(){
				uni.navigateTo({
					url:'../prodlist/prodlist?type=1'
				})
			},
			//极有家
			govery:function(){
				uni.navigateTo({
					url:'../prodlist/prodlist?type=3'
				})
			},
			// 天猫超市
			gomark:function(e){
				uni.navigateTo({
					url:'../prodlist/prodlist?type=22'
				})
			},
			// 分类列表
			categorylist:function(e){
				var that=this
				requestHttps({
					url:'/tb/bk/cates',
					method: 'POST',
					data: {},
					success: res => {
						console.log(res)
						var data=res.data
						// this.lunimg=res.data
						if(data.code==1){
							that.navData=that.navData.concat(data.data)
						}else{
							console.log(data.data);
						}
					},
					fail: () => {},
					complete: () => {}
				}); 
			},
			// 爆款
			hotgoodlist:function(e){
				var that=this
				if(that.flag){
					requestHttps({
						url:'/tb/twohour/lists',
						method: 'POST',
						data: {
							page:that.page
						},
						success: res => {
							console.log(res)
							var data=res.data 
							var list=data.data
							
							if(data.code==1){
								
								if(that.page==1){
									that.goodList=list
								}else{
									that.goodList=that.goodList.concat(list)
								}
								if(list.length>=1){
									that.flag=true
								}else{
									that.flag=false
								}
								
							} 
						},
						fail: () => {},
						complete: (res) => {
							 
						}
					}); 
				}
				
			},
			// 首页下拉
			homeDownLoad:function(){
				var that=this
				// console.log(that.flag)
				// console.log('that.flag')
				 if(that.flag){
					 var page=that.page
					 page++
					 that.page=page
					 that.hotgoodlist()
				 }
			},
			 bidscroll:function(e){
				 console.log(e)
			 }
			
		 },
		onReachBottom:function(){
			var that=this
			if(that.flag){
				if(that.current==0){
					 var page=that.page
					 page++
					 that.page=page
					 that.hotgoodlist()
				 }else{ 
					 	var page=that.page
					 	page++
					 	that.page=page
					 	that.liloading=false
					 	that.getsecdList(that.id) 
				 }
			}
		},
		onLoad:function(){
			// 分类
			 
			var that=this
			that.categorylist()
			// 爆款
			that.hotgoodlist()
			that.page=1
			that.bartop=getApp().globalData.customBar
			uni.getSystemInfo({
				success:function(res){
					console.log(res)
					that.scrollHeight=res.screenHeight
				}
			})
			// 轮播图
			that.getbannlist()
		},
		onshow:function(){
			uni.getSystemInfo({
			　　success: function(res) { // res - 各种参数
			　　   console.log(res.windowWidth); // 屏幕的宽度 
					const query = uni.createSelectorQuery()
					console.log('query')
					query.select('.stheige').boundingClientRect()
			                    query.selectViewport().scrollOffset()
			                    query.exec(function(res){
			                        // debugger
			                        // res[0].top       // #the-id节点的上边界坐标
			                        // res[1].scrollTop // 显示区域的竖直滚动位置
			                        // _this.height=resu.windowHeight-res[0].top +'px'
			                        alert('打印高度',res[0].height);
			                        alert('打印demo的元素的信息',res);
			                    }) 
			// 　　    let info = uni.createSelectorQuery().select(".stheige");
			
			// 　　　  　info.boundingClientRect(function(data) { //data - 各种参数
			// 　　　  　console.log(data.width)  // 获取元素宽度
			// 　　　  　console.log('===========')  // 获取元素宽度
			// 　　    }).exec()
			       }
			});
		},
		created(){
			
		},
		onPageScroll:function(e){
			console.log(e)
			var that=this
			var scrollTop=e.scrollTop
			if(scrollTop>=150){
				that.isPosition = true
				that.marTop='520'
			}else{
				that.isPosition = false
				that.marTop='0'
			}
		}
	}