import axios from 'axios'
import config from './config'
import Cookies from "js-cookie"
import router from '@/router'
import QS from 'qs'
// 使用vuex做全局loading时使用
// import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {Message} from 'element-ui'

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials
    })
    // request 拦截器
    instance.interceptors.request.use(
      config => {
        NProgress.configure({showSpinner: false, trickleRate: 0.02, trickleSpeed: 800, ease: 'ease', speed: 500})
        NProgress.start()
        let token = Cookies.get('token')
        let loginid = Cookies.get('loginid')
        // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
        // console.log(store.state.loading)
        // console.log('准备发送请求...')
        // 2. 带上token
        if (token) {
          config.headers.token = token
          config.headers.loginid = loginid
        } else {
          // 重定向到登录页面
          router.push('/login')
        }
        // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
        if (config.method === 'post') {

          // config.data = JSON.stringify(config.data);
          // if (config.data.__proto__ === FormData.prototype
          //   || config.url.endsWith('path')
          //   || config.url.endsWith('mark')
          //   || config.url.endsWith('patchs')
          // ) {

          // } else {
          // config.data = qs.stringify(config.data)
          // }
        }
        return config
      },

      error => {
        // 请求错误时
        console.log('request:', error)
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('timeout请求超时')
          return service.request(originalRequest)// 再重复请求一次
        }
        // 2. 需要重定向到错误页面
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          error = errorInfo.data  // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = JSON.parse(response.request.responseText)
        } else {
          data = response.data
        }
        // 根据返回的code值来做不同的处理
        // switch (data.status) {
        //   case 403:
        //     console.log(data.message)
        //     break
        //   case 0:
        //     store.commit('changeState')
        //   // console.log('登录成功')
        //   default:
        // }
        // console.log(data.status)
        if (data.status == 403) {
          sessionStorage.removeItem('user')
          Message({
            showClose: true,
            message: '请重新登录',
            type: 'error'
          })
          setTimeout(() => {
            router.push({
              path: '/login'
            })
          }, 3500)
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.desc)
        // err.data = data
        // err.response = response
        // throw err
        NProgress.done()
        return data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 401:
              err.message = '未授权，请登录'
              break
            case 403:
              err.message = '拒绝访问'
              break
            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break
            case 408:
              err.message = '请求超时'
              break
            case 500:
              err.message = '服务器内部错误'
              break
            case 501:
              err.message = '服务未实现'
              break
            case 502:
              err.message = '网关错误'
              break
            case 503:
              err.message = '服务不可用'
              break
            case 504:
              err.message = '网关超时'
              break
            case 505:
              err.message = 'HTTP版本不受支持'
              break
            default:
          }
        }
        NProgress.done()
        /*    if (err.response.status == 403) {
              sessionStorage.removeItem('user')
              Message({
                showClose: true,
                message: '请重新登录',
                type: 'error'
              })
              setTimeout(() => {
                router.push({
                  path: '/login'
                })
              }, 3500)
            }*/
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
