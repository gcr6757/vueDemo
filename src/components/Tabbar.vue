<template>
  <div>
    <van-tabbar :route="true" inactive-color="#666" active-color="cadetblue">
      <van-tabbar-item to="/home">
        <span>首页</span>
        <template #icon="props">
          <van-icon class="iconfont" class-prefix="icon" name="shouye" size="28"></van-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/cates">
        <span>分类</span>
        <template #icon="props">
          <van-icon class="iconfont" class-prefix="icon" name="fenlei1" size="28"></van-icon>
        </template>
      </van-tabbar-item>
      <!-- 购物车右上角显示商品件数 -->
      <van-tabbar-item to="/cart" :badge="items.length? items.length: ''">
        <span>购物车</span>
        <template #icon="props">
          <van-icon class="iconfont" class-prefix="icon" name="gouwuche" size="28"></van-icon>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/mine">
        <span>我的</span>
        <template #icon="props">
          <van-icon class="iconfont" class-prefix="icon" name="wodedangxuan" size="28"></van-icon>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      items: (state) => state.cart.carts.items
    })
  }
}
</script>

<style lang="scss" scoped>

</style>