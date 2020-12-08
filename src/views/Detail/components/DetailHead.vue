<template>
  <div class="detail-bar">
    <detail-head>
      <template #left>
        <div class="detail-left" @click="back">
          <van-icon class="iconfont" class-prefix="icon" name="arrow-left"></van-icon>
        </div>
      </template>
      <template #center>
        <div class="detail-center">
          <p>商品详情</p>
        </div>
      </template>
      <template #right>
        <div class="detail-right" @click="home">
          <van-icon class="iconfont" class-prefix="icon" name="weibiaoti12"></van-icon>
        </div>
      </template>
    </detail-head>
  </div>
</template>

<script>
//引入公共的头部
import DetailHead from "@components/ComHead";
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
    DetailHead,
  }
};
</script>

<style lang="scss" scoped>
.detail-bar {
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background: cadetblue;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  .detail-center{
    p{
      font-size: 14px;
    }
  }
}
</style>