import axios from '../axios'

// 查询备份记录
export const findRecordList = () => {
  return axios({
    url:    '/backupweb/backup/findRecords',
    method: 'get',
  })
}
// 数据备份
export const backup = () => {
  return axios({
    url:    '/backupweb/backup/backup',
    method: 'get',
  })
}
// 数据还原
export const restore = (data) => {
  return axios({
    url:    '/backupweb/backup/restore',
    method: 'get',
    data
  })
}
// 删除备份
export const deletes = (data) => {
  return axios({
    url:    '/backupweb/backup/delete',
    method: 'get',
    data
  })
}

