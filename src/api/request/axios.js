import axios from 'axios';
import { Toast } from "antd-mobile";
import getErrorCode from "./errorCode";
import envConfig from "./env";

// const urlPrefix = envConfig[env];
// console.log("env", env);

const urlPrefix = "http://rap2api.taobao.org/app/mock/224831";

//过滤请求
axios.interceptors.request.use(config => {
  config.timeout = 10 * 1000
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === 0) {   //服务端定义的响应code码为0时请求成功
      return Promise.resolve(response.data) //使用Promise.resolve 正常响应
    } else if (response.data.code === 1401) { //服务端定义的响应code码为1401时为未登录
      Toast.fail('未登录');
      // 路由跳转至登录页面
      return Promise.reject(response.data)    //使用Promise.reject 抛出错误和异常
    } else {
      return Promise.reject(response.data)
    }
  },
  error => {
    if (error && error.response) {
      let res = {}
      res.code = error.response.status
      res.msg = getErrorCode(error.response.status, error.response)
      return Promise.reject(res)
    }
    return Promise.reject(error)
  }
)

export default {
  post: (url, data) => axios.post(urlPrefix + url, data),
  get: (url, data) => axios.get(urlPrefix + url, {params: data}),
  delete: (url, data) => axios.delete(urlPrefix + url, { params: data})
}