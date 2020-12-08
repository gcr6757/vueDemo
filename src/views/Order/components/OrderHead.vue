<template>
  <div class="order-bar">
    <order-head>
      <template #left>
        <div class="order-left" @click="back">
          <van-icon class="iconfont" class-prefix="icon" name="arrow-left"></van-icon>
        </div>
      </template>
      <template #center>
        <div class="order-center">
          <p>确认订单</p>
        </div>
      </template>
      <template #right>
        <div class="order-right" @click="home">
          <van-icon class="iconfont" class-prefix="icon" name="weibiaoti12"></van-icon>
        </div>
      </template>
    </order-head>
  </div>
</template>

<script>
import OrderHead from '@components/ComHead'
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
    OrderHead
  }
}
</script>

<style lang="scss" scoped>
.order-bar {
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background: cadetblue;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  .order-center{
    p{
      font-size: 14px;
    }
  }
}
</style>