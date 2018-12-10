import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
/** eslint disabled */
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: 'http://localhost:4000', // api 的 base_url
  timeout: 5000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['w-token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // console.log(config, 'config') // config 请求数据
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    console.log(response, 'request') // // response 响应数据
    const res = response.data
    // console.log(res) 在这里已经对返回的参数 做了判断，如果是失败的信息，就弹框提示失败的信息
    // if (res.code !== 20000) {
    if (!res.success) {
      // 这里可以统一提示错误信息
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      // 也可以针对具体的返回参数 提示不同的信息
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      // console.log(response.data)
      return response.data
    }
  },
  error => {
    console.log('err info' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
