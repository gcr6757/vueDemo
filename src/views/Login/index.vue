<template>
  <div>
    <!-- 头部 -->
    <login-head @back='back' @home="home"></login-head>
    <div class="wrap">
      <div class="title">
        <img src="https://img02.hua.com/m/login/wx_login_logo.png" alt="">
      </div>
      <!-- 登录表单 -->
      <div class="formInfo">
        <input type="text" v-model="user.name" class="username" name="username" placeholder="请输入用户名">
        <input type="password" v-model="user.pwd" class="pwd" name="pwd" placeholder="请输入密码">
        <van-button type="default" @click="login" size="large" color="cadetblue">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import LoginHead from './components/LoginHead'
export default {
  data () {
    return {
      user: {
        name: '',
        pwd: ''
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    home() {
      this.$router.push('/home')
    },
    //登录事件
    login() {
      //这里应该是处理发送axios,暂且用延时器代替
      setTimeout(() => {
        //存储一个token,方便来判断是否已登录,用户名密码同时也需要存储
        const token = 'xianhuawang9527'  //相当于秘钥
        //存储后台返回的秘钥
        localStorage.setItem('access_token', token)
        //登录成功之后来判断有没有传递过来重定向之前的路由信息
        if( this.$route.params.from ) {
          //如果有就去该页面，这里是前端来进行编程式导航
          this.$router.push(this.$route.params.from)
        } else {
          this.$router.push('/home')
        }
      },1000)
    }
  },
  components: {
    LoginHead
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  background: #fff;
  box-sizing: border-box;
  .formInfo{
    height: 200px;
    margin-top: 20px;
    padding: 30px 30px 0px 30px;
    box-sizing: border-box;
    input{
      border: none;
      border-bottom: 2px solid cadetblue;
      width: 100%;
      height: 40px;
      line-height: 40px;
      margin-bottom: 30px;
      &.pwd{
        margin-bottom: 50px;
      }
    }
  }
  .title{
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    box-shadow: 0px 2px 5px #f1f1f1;
    img{
      width: 180px;
      height: 30px;
    }
  }
}
</style>