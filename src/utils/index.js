//判断是否登录
const checkLogin = () => !!localStorage.getItem('access_token')

export {
  checkLogin
}