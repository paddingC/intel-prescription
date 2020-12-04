/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.global 调用
 */
import store from '@/store'
import Cookies from "js-cookie"
// 后台管理系统服务器地址

//export const baseUrl = 'http://211.159.171.175:9380/'  //开发
//export const baseUrl = 'http://116.196.94.87:9380/'  //线上
export const baseUrl = 'https://service.he-mingtang.com/' //开发
// export const baseUrl = 'http://192.9.200.211:9380/' //测试

// 系统数据备份还原服务器地址
// export const backupBaseUrl = 'http://211.159.171.175:9393/roleweb/'
// export const backupBaseUrl = 'http://211.159.171.175:8328/' + 'backupweb'
export const backupBaseUrl = 'http://211.159.171.175:8328/' + 'backupweb'
export const clearStatus = () => {
  store.commit('menuRouteLoaded', false)
  sessionStorage.removeItem("user")
  sessionStorage.removeItem("sessionId")
  store.commit('setNavTree', [])
  store.commit('setPerms', [])
  store.commit('updateMainTabs', [])
  store.commit('updateMainTabsActiveName', '')
  store.commit('setIFrameUrl', [])
  store.commit('addIFrameUrl', [])
  Cookies.remove('token')
}

export default {
  baseUrl,
  backupBaseUrl,
  clearStatus
}
