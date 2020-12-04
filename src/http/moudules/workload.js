import axios from '../axios'
// 审方工作量统计
/*日统计*/
export const getdayworkload = (data) => {
  return axios({
    url: '/dzsf/prescription/getdayworkload',
    method: 'post',
    data
  })
}
/*月统计*/
export const getmonthworkload = (data) => {
  return axios({
    url: '/dzsf/prescription/getmonthworkload',
    method: 'post',
    data
  })
}
// 开方工作量统计
/*日统计*/
export const getDayWorkLoad = (data) => {
  return axios({
    url: '/dzsf/prescribing/getDayWorkLoad',
    method: 'post',
    data
  })
}
/*月统计*/
export const getMonthWorkLoad = (data) => {
  return axios({
    url: '/dzsf/prescribing/getMonthWorkLoad',
    method: 'post',
    data
  })
}
