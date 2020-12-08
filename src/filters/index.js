//定义一个价格过滤
const currency = (v, sign = '￥') => {
  return sign + v
}

export {
  currency
}