import axios from '../axios'

/*
 * 机构管理模块
 */

// 保存
export const save = (data) => {
    return axios({
        url: '/webcompany/role/cloudcompany/save',
        method: 'post',
        data
    })
}
// 删除
export const batchDelete = (data) => {
    return axios({
        url: '/webcompany/role/cloudcompany/delete',
        method: 'DELETE',
        data
    })
}
// 查询机构树 查询所有公司
export const findDeptTree = () => {
    return axios({
        url: '/webcompany/role/cloudcompany/findTree',
        method: 'get'
    })
}
