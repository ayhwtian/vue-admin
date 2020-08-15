import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/plugins/element.js'

// axios设置
// 使用axios封装的方法，所有请求都通过拦截器
import http from '@/utils/http.js'
// 使用原生没有封装的方法
// import http from 'axios'
// 配置请求的根路径
// http.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

Vue.prototype.$http = http

// 导入全局样式表
import '@/assets/css/base.css'

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
