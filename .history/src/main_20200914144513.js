import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// 导入富文本编辑器的样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 通过axios 请求拦截器添加token,保证拥有获取数据的权限
axios.interceptors.request.use (config => {
  //为请求头对象，添加Token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table',TreeTable)

// 将
Vue.use(VueQuillEditor)

Vue.filter('dataFormat',function (originValue) {
   var dt = new Date(originValue);

   var y = dt.getFullYear();
   var m = (dt.getMonth()+1+'').padStart(2,'0');
   var d = (dt.getDate()+'').padStart(2,'0');

   var hh = (dt.getHours()+'').padStart(2,'0');
   var mm = (dt.getMinutes()+'').padStart(2,'0');
   var ss = (dt.getSeconds()+'').padStart(2,'0');

   return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
