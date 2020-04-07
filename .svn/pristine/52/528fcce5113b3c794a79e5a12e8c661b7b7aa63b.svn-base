

// 淘接口地址
const serverTbUrl=function(){
	return  'https://zhiliao.fasene.cn/api_zlyx/public/index.php'
}
const  serverImg = function(){
	return ''
}


const requestHttps = function(options) {
	options.url = getApp().globalData.severUrl+options.url; 
	console.log('begin get url')  
	console.log(options.url) 
	var token=''
    try {
		//seesionId 从后台获取（登录凭证）
		uni.getStorage({
			key:'token',
			success(e){
				console.log('========')
				console.log(e)
				token=e.data
			}
		})
       //const sessionId = uni.getStorageSync('shopSessionId');
		if(token){
			options.data.appToken=token 
		}
		options.data.isApp=1
	   const sessionId = '123123123';   
       if (sessionId) {
         options.header = {
           'Content-Type': 'application/x-www-form-urlencoded',
		   'Cookie': sessionId,
         };
        }else{ 
            return;
        }
     } catch (err) {
      	console.log(err)
    }
	
	//开始发起请求 
	return uni.request(options)
  }
export default requestHttps;