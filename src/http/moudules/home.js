import axios from '../axios'
import Cookies from "js-cookie"
/**
 * 查询数据字典数据
 * @returns {*|Promise<any>}
 */
let loginid = Cookies.get('loginid')
// 全部信息展示
export const showMsg = (params) => {
  return axios( {
    url: 'wxweb/whyweb/homepage/show',
    method: 'get',
    params
  })
}

//信息列表
export const infoList = (params) => {
  return axios( {
    url: 'wxweb/whyweb/homepage/info/field/show',
    method: 'get',
    params
  })
}


//菜单列表
export const menuList = (params) => {
  return axios( {
    url: 'wxweb/whyweb/homepage/func/show',
    method: 'get',
    params
  })
}

//菜单列表保存
export const menuSave = (params) => {
  return axios( {
    url: 'wxweb/whyweb/homepage/menu/save',
    method: 'get',
    params
  })
}

//保存
export const Save = (data) => {
  return axios( {
    url: 'wxweb/whyweb/homepage/save',
    method: 'post',
    data
  })
}

export const menuShow = (params) => {
  return axios( {
    url: 'wxweb/whyweb/homepage/menu/show',
    method: 'get',
    params
  })
}

export const submit = (params) => {
  return axios( {
    url: 'wxweb/whyweb/homepage/copy',
    method: 'get',
    params
  })
}


