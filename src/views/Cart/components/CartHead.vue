<template>
  <div class="cart-bar">
    <cart-head>
      <template #left>
        <div class="cartbar-left" @click="back">
          <van-icon class="iconfont" class-prefix="icon" name="arrow-left"></van-icon>
        </div>
      </template>
      <template #center>
        <div class="cartbar-center">
          <p>购物车</p>
        </div>
      </template>
      <template #right>
        <div class="cartbar-right" @click="home">
          <van-icon class-prefix="icon" class="iconfont" name="weibiaoti12"></van-icon>
        </div>
      </template>
    </cart-head>
  </div>
</template>

<script>
import CartHead from "@components/ComHead";
export default {
  methods: {
    back () {
      this.$emit('back')
    },
    home() {
      this.$emit('home')
    }
  },
  components: {
    CartHead,
  },
};
</script>

<style lang="scss" scoped>
.cart-bar {
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background: cadetblue;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
}
</style>