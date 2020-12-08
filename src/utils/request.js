// 单独封装请求函数axios
import axios from 'axios'
const qs = require('qs')

import { Toast } from 'vant'
//引入路由，方便使用路由跳转
// import router from '../router'

//创建一个实例
import Vue from 'vue'
const vm = new Vue()

//创建axios实例
const request = axios.create({
  baseURL: 'https://api.it120.cc/cont', //config.js里面的反向代理设置
  timeout: 5000
})

//请求拦截器
request.interceptors.request.use(function (config) {
  //全局的loading
  vm.$showLoading()

  //axios的post请求带数据的格式是对象,需要转成字符串，这里需要用到qs插件
  if (config.method === 'post' && config.data) {
    //利用qs模块来进行转数据格式为字符串
    config.data = qs.stringify(config.data)
  }

  //请求的同时需要把token传给后台去判断是否过期，放在请求头中
  const accessToken = localStorage.getItem('access_token')
  if (accessToken) {
    config.headers.access_token = accessToken
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})


/**
 * token如果过期 前台请求需要token的接口
 * 后台会返回一个错误的code
 * data: {
 *  code: '401',
 *  msg: 'token过期'
 * }
 */
//响应拦截器
request.interceptors.response.use(function (response) {
  //全局的loading
  vm.$hideLoading()

  //响应拦截就行判断token
  if (response.data.code === 401) {
    Toast('token已过期,请重新登录')
    vm.$router.push('/login')
  }

  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default request