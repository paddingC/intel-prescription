import axios from '../axios'

/*
 * 用户管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: 'clouduser/role/clouduser/save',
        method: 'post',
        data
    })
}
// 用户修改密码

export const updatepassword = (data) => {
  return axios({
    url: 'clouduser/role/clouduser/updatepassword',
    method: 'post',
    data
  })
}


// 删除
export const batchDelete = (data) => {
    return axios({
        url: 'clouduser/role/clouduser/delete',
        method: 'delete',
        data
    })
}
// 分页查询
export const findPage = (data) => {
    return axios({
        url: 'clouduser/role/clouduser/findPage',
        method: 'post',
        data
    })
}
// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
    return axios({
        url: 'webuser/role/user/findPermissions',
        method: 'get',
        params
    })
}
