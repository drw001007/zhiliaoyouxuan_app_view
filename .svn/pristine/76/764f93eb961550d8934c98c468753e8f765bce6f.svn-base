import Vue from 'vue'
import App from './App'
import logrequst from '@/common/logrequst'

// 全局导入过滤器
// Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))
Vue.prototype.islogin=function(res,sin,goodsid){
	console.log(res) 
	var url=''
	if(goodsid){
		 url='../mycenter/login/login?sin='+sin+'&id='+goodsid
	}else{
		 url='../../mycenter/login/login?sin='+sin
	}
	if(res.code==2056){
		uni.navigateTo({
			url:url
		})
	}
}
Vue.use(logrequst)
Vue.config.productionTip = false

App.mpType = 'app'

import './common/iconfont/iconfont.css';
import zhouWeiNavBar from "@/components/zhouWei-navBar";
Vue.component("nav-bar", zhouWeiNavBar);

const app = new Vue({
    ...App
})
app.$mount()
