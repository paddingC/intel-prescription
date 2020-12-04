import axios from "../axios"
// 系统监控-警告设置信息接口  显示使用
export const monitorInfo = (data) => {
  return axios({
    url: 'roleqyweb/monitor/role/monitor/info',
    method: 'get',
    data
  })
}
// 系统监控-警告设置更新接口 这个是点击修改使用
export const modifySetting = (data) => {
  return axios({
    url: 'roleqyweb/monitor/role/monitor/modifysetting',
    method: 'post',
    data
  })
}
// 系统监控-服务器信息接口
export const systeminfo = () => {
  return axios({
    url: 'roleqyweb/monitor/role/monitor/systeminfo',
    method: 'get'
  })
}

// 系统监控-服务器超出设置范围报警发送邮件接口
export const usage = () => {
  return axios({
    url: 'roleqyweb/monitor/role/monitor/usage',
    method: 'get'
  })
}
