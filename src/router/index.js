import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import NotFound from '@/views/Error/404'
import Home from '@/views/Home'
import Intro from '@/views/Intro/Intro'
import api from '@/http/api'
import store from '@/store'
import {Loading} from 'element-ui'
import {getIFramePath, getIFrameUrl} from '@/utils/iframe'


import pharmacist from '@/views/Config/pharmacist' //执业药师管理
import recipe from '@/views/Config/recipe' //电子处方查询
import set from '@/views/Config/set' //系统配置
import SFGZLTJ from '@/views/Config/workload' //审方工作量统计
import doctorMange from '@/views/Config/doctorMange' //医生管理
import prescribing from '@/views/Config/prescribing' //开方查询
import openWork from '@/views/Config/openWork' // 开方工作量统计
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      // name:      '首页',
      component: Home,
      children: [
        {
          path: '',
          name: '系统介绍',
          component: Intro,
          meta: {
            icon: 'fa fa-home fa-lg'
          }
        }
      ]
    },
    {
      path: '/login',
      name: '登录',
      component: Login
    },{
      path: '/config',
      component: Home,
      children: [
        {
          path: 'pharmacist',
          name: '执业药师管理',
          component: pharmacist
        }
      ]
    },{
      path: '/config',
      component: Home,
      children: [
        {
          path: 'recipe',
          name: '电子处方查询',
          component: recipe
        }
      ]
    },{
      path: '/config',
      component: Home,
      children: [
        {
          path: 'set',
          name: '系统配置',
          component: set
        }
      ]
    },{
      path: '/config',
      component: Home,
      children: [
        {
          path: 'workload',
          name: '审方工作量统计',
          component: SFGZLTJ
        }
      ]
    },{
      path: '/config',
      component: Home,
      children: [
        {
          path: 'doctorMange',
          name: '医生管理',
          component: doctorMange
        }
      ]
    },{
      path: '/config',
      component: Home,
      children: [
        {
          path: 'prescribing',
          name: '开方查询',
          component: prescribing
        }
      ]
    },{
      path: '/config',
      component: Home,
      children: [
        {
          path: 'openWork',
          name: '开方工作量统计',
          component: openWork
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let userName = sessionStorage.getItem('user')
  console.log(userName)
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (userName) {
      next({path: '/'})
    } else {
      next()
    }
  } else {
    if (!userName) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({path: '/login'})
    } else {
      // 加载动态菜单和路由
      addDynamicMenuAndRoutes(userName, to, from)
      next()
    }
  }
})

/**
 * 加载动态菜单和路由
 */
function addDynamicMenuAndRoutes(userName, to, from) {
  // 处理IFrame嵌套页面

  handleIFrameUrl(to.path)
  if (store.state.app.menuRouteLoaded) {
    // console.log('动态菜单和路由是否已经加载完全. menuRouteLoaded = true')
    return
  }
  api.menu.findNavTree({'loginid': userName})
     .then(res => {
       // 添加动态路由
       if (res.status == 200) {
         let dynamicRoutes = addDynamicRoutes(res.data)
         router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
         router.addRoutes(router.options.routes.concat([{
           path: '*',
           name: '404',
           redirect: '/404'
         }]))
         // 保存加载状态
         store.commit('menuRouteLoaded', true)
         // 保存菜单树
         store.commit('setNavTree', res.data)
       } else {
         Vue.prototype.$message({
           message: res.msg,
           type: 'warning'
         })
       }
     }).then(res => {
    api.user.findPermissions({'loginid': userName}).then(res => {
      // 保存用户权限标识集合
      store.commit('setPerms', res.data)
    })

  })
     .catch(function (res) {
       Vue.prototype.$message({
         message: "网络异常请稍后再试",
         type: 'warning'
       })
     })
}

/**
 * 处理IFrame嵌套页面
 */
function handleIFrameUrl(path) {
  // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
  let url = path
  let length = store.state.iframe.iframeUrls.length
  for (let i = 0; i < length; i++) {
    let iframe = store.state.iframe.iframeUrls[i]
    let URL = path + '/'
    if (path != null && path.includes(iframe.path) || URL.includes(iframe.path)) {
      url = iframe.url
      store.commit('setIFrameUrl', url)
      break
    }
  }
}

let afterEach = function (findPermissions) {

}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function addDynamicRoutes(menuList = [], routes = []) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].homeurl && /\S/.test(menuList[i].homeurl)) {
      menuList[i].homeurl = menuList[i].homeurl.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].homeurl,
        component: null,
        name: menuList[i].opname,
        meta: {
          icon: menuList[i].iconcls
        }
      }
      let path = getIFramePath(menuList[i].homeurl)
      if (path) {
        // 如果是嵌套页面, 通过iframe展示
        route['path'] = path
        route['component'] = resolve => require([`@/views/IFrame/IFrame`], resolve)
        // 存储嵌套页面路由路径和访问URL
        let url = getIFrameUrl(menuList[i].homeurl)
        let iFrameUrl = {'path': path, 'url': url}
        store.commit('addIFrameUrl', iFrameUrl)
      } else {
        try {
          // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
          // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
          let array = menuList[i].homeurl.split('/')
          let url = ''
          for (let i = 0; i < array.length; i++) {
            url += array[i].substring(0, 1).toUpperCase() + array[i].substring(1) + '/'
          }
          url = url.substring(0, url.length - 1)
          route['component'] = resolve => require([`@/views/${url}`], resolve)
        } catch (e) {
          console.log(e)
        }
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log('动态路由加载完成.')
  }
  return routes
}
console.log(router)
export default router
