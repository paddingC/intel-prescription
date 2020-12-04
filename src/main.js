import Vue from 'vue'
import App from './App'
import router from './router'
import api from './http'
import i18n from './i18n'
import store from './store'
import global from '@/utils/global'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import '@/assets/iconfont/iconfont.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import echarts from 'echarts'


import {
  Table,
  TableColumn,
  Editable,
  EditableColumn
} from 'vue-element-extends'
import 'vue-element-extends/lib/index.css'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Editable)
Vue.use(EditableColumn)
Vue.prototype.$echarts = echarts
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
Vue.use(ElementUI)
Vue.use(api)

Vue.prototype.global = global
// 获取参数
var params = (function () {
  var search = location.search
  var params = {}
  if (search !== '') {
    search.slice(1).split('&').forEach(
      function (val) {
        var arr = val.split('=')
        params[arr[0]] = arr[1]
      }
    )
  }
  return params // 返回params
})()
console.dir(params)
sessionStorage.setItem('jumpInfo', params.loginid)

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
});
