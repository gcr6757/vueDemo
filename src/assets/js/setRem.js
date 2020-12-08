/*
手动封装flexible
获取屏幕宽度，动态设置html字体大小
屏幕变化即触发
*/

const setRem = () => {
  //获取屏幕宽度
  const html = document.documentElement
  //getBoundingClientRect()可以获取到当前dom对象的宽高等属性
  const width = html.getBoundingClientRect().width
  //动态设置字体html
  html.style.fontSize = width / 10 + 'px'
}

//先调用
setRem()

//屏幕宽度改变要触发,横屏等情况
window.addEventListener('orientationchange', setRem)
window.addEventListener('resize', setRem)