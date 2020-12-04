// import axios from '../axios'
//
// /*
//  * 系统登录模块
//  */
//
// // 登录
// export const login = data => {
//     return axios({
//         url: '/webuser/role/user/login',
//         method: 'post',
//         data
//     })
// }
//
// // 登出
// export const logout = () => {
//     return axios({
//         url: 'logout',
//         method: 'get'
//     })
// }
import axios from '../axios'

/*
 * 系统登录模块
 */

// 登录
export const login = data => {
  return axios({
    url: 'role/user/login',
    method: 'post',
    data
  })
}

// 登出
export const logout = () => {
  return axios({
    url: 'logout',
    method: 'get'
  })
}
// 调查入驻企业ID的接口
export const getcompanyid = data => {
  return axios({
    url: 'user/getcompanyid',
    method: 'post',
    data
  })
}
