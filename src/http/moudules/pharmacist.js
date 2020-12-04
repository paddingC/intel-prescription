import axios from '../axios'
// 执行药师管理
/*执行药师查询*/
export const pharmacistget = (data) => {
  return axios({
    url: '/dzsf/pharmacist/get',
    method: 'post',
    data
  })
};
/*新增*/
export const findPage = (data) => {
  return axios({
    url: '/dzsf/pharmacist/getusers',
    method: 'post',
    data
  })
};
/*新增保存*/
export const insert = (data) => {
  return axios({
    url: '/dzsf/pharmacist/insert',
    method: 'post',
    data
  })
};
/*修改*/
export const update = (data) => {
  return axios({
    url: '/dzsf/pharmacist/update',
    method: 'post',
    data
  })
};
//删除
export const del = (data) => {
  return axios({
    url: '/dzsf/pharmacist/delete',
    method: 'post',
    data
  })
};
/*状态*/
export const updatestatus = (data) => {
  return axios({
    url: '/dzsf/pharmacist/enableordisable',
    method: 'post',
    data
  })
};
//删除证书
export const delcertificate  = (data) => {
  return axios({
    url: '/dzsf/pharmacist/delcertificate ',
    method: 'post',
    data
  })
};

// 医生管理
/*查询接口*/
export const find  = (data) => {
  return axios({
    url: '/dzsf/doctor/find ',
    method: 'post',
    data
  })
};
/*新增 查询接口*/
export const findusers  = (data) => {
  return axios({
    url: '/dzsf/doctor/findusers ',
    method: 'post',
    data
  })
};
/*新增*/
export const doctorSave  = (data) => {
  return axios({
    url: '/dzsf/doctor/save ',
    method: 'post',
    data
  })
};
/*状态*/
export const enableDisable  = (data) => {
  return axios({
    url: '/dzsf/doctor/EnableDisable ',
    method: 'post',
    data
  })
};
/*批量删除*/
export const doctorDelete  = (data) => {
  return axios({
    url: '/dzsf/doctor/delete ',
    method: 'post',
    data
  })
};
/*删除电子签章*/
export const removeEsignature  = (data) => {
  return axios({
    url: '/dzsf/doctor/removeEsignature ',
    method: 'post',
    data
  })
};
