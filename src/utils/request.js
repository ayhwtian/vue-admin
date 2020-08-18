import axios from 'axios'
import { Message } from 'element-ui';
import qs from 'qs'


const intance = axios.create({
  baseURL: 'http://127.0.0.1:8888/api/private/v1/',
  // 超时时间 单位是ms
  timeout: 5000,
  headers: {
    get: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
    post: {
      // "Content-Type": "application/json;charset=utf-8",
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8;multipart/form-data'
      // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
  },
  // 跨域请求时是否需要使用凭证
  // withCredentials: true,
})

// 请求拦截器
intance.interceptors.request.use(
  config => {
    // if (config.method === 'post' || config.method === 'put') {
    //   //如果是post/put请求则进行序列化处理
    //   config.data = qs.stringify(config.data);
    // }
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = this.$store.state.Authorization
    // token && (config.headers.Authorization = token)
    // return config
    // if (localStorage.getItem('Authorization')) {
    //   config.headers.Authorization = localStorage.getItem('Authorization');
    // }
    if (sessionStorage.getItem('token')) {
      config.headers.Authorization = sessionStorage.getItem('token');
    }
    return config;
  },
  error => {
    return Promise.error(error)
  })

// 响应拦截器
intance.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
    // return response.status
  },
  // 服务器状态码不是200的情况
  error => {
    if (error && error.response) {
      // 1.公共错误处理
      // 2.根据响应码具体处理
      switch (error.response.status) {
        case 400:
          error.message = '错误请求'
          break;
        case 401:
          error.message = '未授权，请重新登录'
          break;
        case 403:
          error.message = '拒绝访问'
          break;
        case 404:
          error.message = '请求错误,未找到该资源'
          window.location.href = "/NotFound"
          break;
        case 405:
          error.message = '请求方法未允许'
          break;
        case 408:
          error.message = '请求超时'
          break;
        case 500:
          error.message = '服务器端出错'
          break;
        case 501:
          error.message = '网络未实现'
          break;
        case 502:
          error.message = '网络错误'
          break;
        case 503:
          error.message = '服务不可用'
          break;
        case 504:
          error.message = '网络超时'
          break;
        case 505:
          error.message = 'http版本不支持该请求'
          break;
        default:
          error.message = `连接错误${error.response.status}`
      }
    } else {
      // 超时处理
      if (JSON.stringify(error).includes('timeout')) {
        Message.error('服务器响应超时，请刷新当前页')
      }
      error.message('连接服务器失败')
    }
    Message.error(error.message)
    /***** 处理结束 *****/
    //如果不需要错误处理，以上的处理过程都可省略
    return Promise.reject(error.response)
    // return console.log(error,'这里报错');
  }
)

export default intance
