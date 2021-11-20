import axios from 'axios'
import type { AxiosRequestConfig, Method } from 'axios'
import qs from 'qs'
import { message } from 'antd'

axios.defaults.timeout = 2000 // 请求超时时间
axios.defaults.baseURL = '' // 其他地方请求地址可以省略域名
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded' // 全局设置post请求的数据编码格式
// axios.defaults.headers.common['Authorization'] = 'token' // 认证token

// request 拦截器
axios.interceptors.request.use(
  config => {
    config.data = qs.stringify(config.data)
    // const token = getCookie('名称') 注意使用的时候需要引入cookie方法，推荐js-cookie
    const token = localStorage.getItem('token')
    if (token) {
      ;(config.headers as any).Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
axios.interceptors.response.use(
  response => {
    // 在这里你可以判断后台返回数据携带的请求码
    return response.data
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误(400)'
          break
        case 401:
          error.message = '未授权，请重新登录(401)'
          break
        case 403:
          error.message = '拒绝访问(403)'
          break
        case 404:
          error.message = '请求出错(404)'
          break
        case 408:
          error.message = '请求超时(408)'
          break
        case 500:
          error.message = '服务器错误(500)'
          break
        case 501:
          error.message = '服务未实现(501)'
          break
        case 502:
          error.message = '网络错误(502)'
          break
        case 503:
          error.message = '服务不可用(503)'
          break
        case 504:
          error.message = '网络超时(504)'
          break
        case 505:
          error.message = 'HTTP版本不受支持(505)'
          break
        default:
          error.message = `连接出错(${error.response.status})!`
      }
    } else {
      error.message = '连接服务器失败'
    }
    message.error(error.message)
    return Promise.reject(error)
  }
)

export type Config = AxiosRequestConfig & Record<string, any>

function _request(config: Config = {}): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .request(config)
      .then(response => {
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

async function request(
  method: Method,
  url: string,
  data: any,
  config: Config = {}
): Promise<any> {
  config.method = method
  config.url = url
  config.data = data
  try {
    return await _request(config)
  } catch (e) {
    console.log(e)
    return
  }
}

async function get(
  url: string,
  params: any,
  config: Config = {}
): Promise<any> {
  config.params = params
  return await request('get', url, null, config)
}

async function post(url: string, data: any, config: Config = {}): Promise<any> {
  return await request('post', url, data, config)
}

async function put(url: string, data: any, config: Config = {}): Promise<any> {
  return await request('put', url, data, config)
}

async function patch(
  url: string,
  data: any,
  config: Config = {}
): Promise<any> {
  return await request('patch', url, data, config)
}

async function _delete(
  url: string,
  data: any,
  config: Config = {}
): Promise<any> {
  return await request('delete', url, data, config)
}

export default {
  request,
  get,
  post,
  put,
  patch,
  delete: _delete
}
