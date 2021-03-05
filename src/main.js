import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyLoad from 'vue-lazyload'

import FastClick from 'fastclick'

import toast from 'components/common/toast'
//安装toast
Vue.use(toast)

Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
}) 

// 解决移动端300ms延迟
 FastClick.attach(document.body )

import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.config.productionTip = false
// 生成vue实例，用prototype创建事件总线. 组件与组件之间太远，通信用总线
Vue.prototype.$bus = new Vue() 

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
