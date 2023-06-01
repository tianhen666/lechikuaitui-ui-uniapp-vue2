import Vue from 'vue'
import App from './App'

// 引入全局uView
import uView from '@/uni_modules/uview-ui'

// 全局nimis
import myMixin from '@/mixins/global.js';

// vuex
import store from './store'

// 关闭调试
Vue.config.productionTip = false
// 微信开放性标签,跳转微信小程序
Vue.config.ignoredElements.push('wx-open-launch-weapp')


// 处理 onLaunched异步问题
Vue.prototype.$onLaunched = new Promise((resolve, reject) => {
  Vue.prototype.$resolve = resolve
})

// #ifdef H5
const vconsole = require('vconsole') // 本地调试使用
if (window.location.href.indexOf("ytest") != -1) new vconsole() // 使用vconsole
// #endif


App.mpType = 'app'
Vue.use(uView)
Vue.use(myMixin);

const app = new Vue({
  store,
  ...App
})

// 引入请求封装, 需要等待app创建完成 
require('./utils/request/index')(app)

app.$mount()