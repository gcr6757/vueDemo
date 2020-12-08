<template>
  <div class="homeHead">
    <div class="homeHead-left" @click="enterCates">
      <van-icon class="iconfont" class-prefix="icon" name="weibiaoti12"></van-icon>
    </div>
    <div class="homeHead-right" @click="enterSearch">
      <van-icon class="iconfont" class-prefix="icon" name="sousuo"></van-icon>
      <p>搜索商品店铺</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    enterCates () {
      this.$router.push('/cates')
    },
    //进搜索界面
    enterSearch() {
      this.$router.push('/search')
    }
  }
}
</script>

<style lang="scss" scoped>
  .homeHead{
    width: 100%;
    height: 46px;
    background: cadetblue;
    color: #ffff;
    font-size: 14px;
    position: fixed;
    z-index: 2;
    left: 0;
    top: 0;
    display: flex;
    padding-right: 20px;
    box-sizing: border-box;
    .homeHead-left{
      width: 50px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .homeHead-right{
      height: 30px;
      border-radius: 15px;
      align-self: center;
      align-items: center;
      flex: 1;
      background: rgba(255,255,255,.2);
      display: flex;
      .icon-sousuo{
        margin: 0px 15px 0px 10px;
      }
    }
  }
</style>