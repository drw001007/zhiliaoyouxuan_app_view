(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/zhouWei-navBar/index"],{"1cec":function(t,n,e){"use strict";var o=e("ba8d"),r=e.n(o);r.a},2081:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=["pages/navList"],o="/pages/navList",r=["#FFF","#FFFFFF","white","rgb(255,255,255)","rgba(255,255,255,1)"],a={props:{backState:{default:function(){return 1e3}},home:{type:Boolean,default:function(){return!1}},bgColor:{type:[String,Array],default:function(){return"#FFF"}},bgColorAngle:{type:[String,Number],default:function(){return 90}},fontColor:{type:String,default:function(){return"#000"}},titleCenter:{type:Boolean,default:function(){return!0}},title:{type:String,default:function(){return""}},type:{type:String,default:function(){return"fixed"}},transparentFixedFontColor:{type:String,default:function(){return"#000"}}},data:function(){return{firstPage:!1,transparentValue:1,navTitle:"",navFontColor:"#000",navBgColor:"linear-gradient(90deg, #FFF 0%, #FFF 100%)",navTransparentFixedFontColor:"#000",themeBgColor:!1,statusBarHeight:0}},computed:{back:function(){return 1e3==this.backState||3e3==this.backState},navFixed:function(){return"transparentFixed"==this.type||"fixed"==this.type},navLine:function(){return"transparent"!==this.type&&r.includes(this.navBgColor)},isWhite:function(){return r.includes(this.navFontColor)},isTwoBtn:function(){return(1e3==this.backState||3e3==this.backState)&&this.home&&!this.firstPage}},watch:{title:function(t){this.navTitle=t},fontColor:function(t){this.navFontColor=t,this.settingColor()},bgColor:function(t){this.getNavBgColor(t)},transparentFixedFontColor:function(t){this.navTransparentFixedFontColor=t}},created:function(){this.navTitle=this.title,this.navFontColor=this.fontColor,this.getNavBgColor(this.bgColor),this.navTransparentFixedFontColor=this.transparentFixedFontColor,this.statusBarHeight=t.getSystemInfoSync()["statusBarHeight"];var n=this;"transparentFixed"==this.type&&(this.transparentValue=0),this.settingColor();var o=getCurrentPages(),r=o.length;1!=r||e.includes(o[0].route)||(this.firstPage=!0),"transparentFixed"==this.type&&(o[r-1].onPageScroll=function(t){n.$emit("scroll",t),t.scrollTop>150?n.transparentValue=1:n.transparentValue=t.scrollTop/150})},methods:{onBackPage:function(){3e3==this.backState?this.$emit("backClick"):t.navigateBack()},onBackHome:function(){t.switchTab({url:o})},getNavBgColor:function(t){if("themeBgColor"==t)this.themeBgColor=!0,this.navBgColor="";else if("string"==typeof t)this.navBgColor="linear-gradient(90deg, "+t+" 0%, "+t+" 100%)";else if(t instanceof Array&&t.length>=2){var n="linear-gradient("+this.bgColorAngle+"deg";t.forEach(function(t){"string"==typeof t?n+=","+t:"object"==typeof t&&(n+=","+t.color+" "+t.scale)}),n+=")",this.navBgColor=n}},settingColor:function(){r.includes(this.navFontColor)?t.setNavigationBarColor({frontColor:"#ffffff",backgroundColor:this.navBgColor}):t.setNavigationBarColor({frontColor:"#000000",backgroundColor:this.navBgColor})}}};n.default=a}).call(this,e("6e42")["default"])},ba8d:function(t,n,e){},c3ae:function(t,n,e){"use strict";e.r(n);var o=e("2081"),r=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n["default"]=r.a},cfda:function(t,n,e){"use strict";e.r(n);var o=e("f39c"),r=e("c3ae");for(var a in r)"default"!==a&&function(t){e.d(n,t,function(){return r[t]})}(a);e("1cec");var i=e("2877"),s=Object(i["a"])(r["default"],o["a"],o["b"],!1,null,"d0283f86",null);n["default"]=s.exports},f39c:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return r})}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/zhouWei-navBar/index-create-component',
    {
        'components/zhouWei-navBar/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("cfda"))
        })
    },
    [['components/zhouWei-navBar/index-create-component']]
]);                