import axios from '../axios'
// 系统配置
/*查询*/
export const getconfig = (data) => {
  return axios({
    url: '/dzsf/config/getconfig',
    method: 'post',
    data
  })
}
/*保存*/
export const saveconfig = (data) => {
  return axios({
    url: '/dzsf/config/save',
    method: 'post',
    data
  })
}

//查询省
export const getprovince = (data) => {
  return axios( {
    url: 'dzsf/prefecture/getprovince',
    method: 'post',
    data
  })
}
//查询市
export const getcity = (data) => {
  return axios( {
    url: 'dzsf/prefecture/getcity',
    method: 'post',
    data
  })
}
//查询县区
export const getcountry = (data) => {
  return axios( {
    url: 'dzsf/prefecture/getcountry',
    method: 'post',
    data
  })
}
//选择订阅监管单位
export const select = (data) => {
  return axios( {
    url: '/dzsf/regulator/select',
    method: 'post',
    data
  })
}
//新增订阅监管单位
export const addreg = (data) => {
  return axios( {
    url: '/dzsf/config/addreg',
    method: 'post',
    data
  })
}
//删除订阅监管单位
export const delreg = (data) => {
  return axios( {
    url: 'dzsf/config/delreg',
    method: 'post',
    data
  })
}
//版本
export const selectVersion = (data) => {
  return axios( {
    url: 'dzsf/user/selectVersion',
    method: 'post',
    data
  })
}
