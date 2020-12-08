// 请求函数的定义

//引入axios的实例
import request from '@utils/request'

//获取banner接口
const getBanner = () => {
  return request.get('/banner/list')
}

//获取首页推荐数据接口
const getRecommend = () => {
  return request.post('/shop/goods/list', {
    categoryId: 164207
  })
}

//获取分类
const getCates = (params = {}) => {
  return request.get('/shop/goods/category/all', {
    params
  })
}

//获取详情页数据,需要传商品id
const getDetail = (id) => {
  return request.get('/shop/goods/detail?id='+ id)
}

//获取商品列表
const getItemLists = (params={}) => {
  return request.post('/shop/goods/list', params)
}

export {
  getBanner,
  getCates,
  getRecommend,
  getDetail,
  getItemLists
}