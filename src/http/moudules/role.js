import axios from '../axios'

/*
 * 角色管理模块
 */

// 保存
export const save = (data) => {
  return axios({
    url:    '/webrole/role/webrole/save',
    method: 'post',
    data
  })
}
// 删除
export const batchDelete = (data) => {
  return axios({
    url:    '/webrole/role/webrole/delete',
    method: 'delete',
    data
  })
}
// 分页查询用户
export const findPage = (data) => {
  return axios({
    url:    '/webrole/role/webrole/findPage',
    method: 'post',
    data
  })
}
// 查询所有角色信息
export const findAll = () => {
  return axios({
    url:    '/webrole/role/webrole/findAll',
    method: 'get'
  })
}
// 查询角色菜单集合
export const findRoleMenus = (params) => {
  return axios({
    url:    '/webrole/role/webrole/selectroleop',
    method: 'get',
    params
  })
}
// 保存角色菜单集合
export const saveRoleMenus = (data) => {
  return axios({
    url:    '/webrole/role/webrole/saveroleop',
    method: 'post',
    data
  })
}
