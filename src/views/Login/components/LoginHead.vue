<template>
  <div class="login-bar">
    <login-head>
      <template #left>
        <div class="login-left" @click="back">
          <van-icon class="iconfont" class-prefix="icon" name="arrow-left"></van-icon>
        </div>
      </template>
      <template #center>
        <div class="login-center">
          <p>登录</p>
        </div>
      </template>
      <template #right>
        <div class="login-right" @click="home">
          <van-icon class="iconfont" class-prefix="icon" name="weibiaoti12"></van-icon>
        </div>
      </template>
    </login-head>
  </div>
</template>

<script>
import LoginHead from '@components/ComHead'
export default {
   methods: {
    back() {
      this.$emit('back')
    },
    home() {
      this.$emit('home')
    }
  },
  components: {
    LoginHead
  }
}
</script>

<style lang="scss" scoped>
.login-bar {
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background: cadetblue;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  .login-center{
    p{
      font-size: 16px;
    }
  }
}
</style>