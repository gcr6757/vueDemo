<template>
  <div class="recommend">
    <div class="recommend-head">
      <h4>精品推荐</h4>
      <van-icon class="iconfont" class-prefix="icon" name="shenglvehao" size="20"></van-icon>
    </div>
    <div class="recommend-main">
      <div class="item" v-for="item in recommend" :key="item.id" @click="clickItem(item.id)">
        <img v-lazy="item.pic" alt />
        <p>{{item.name}}</p>
        <div class="action">
          <span class="price">{{item.minPrice | currency }}</span>
          <van-icon
            class-prefix="icon"
            color="cadetblue"
            class="iconfont"
            size="20"
            name="jiahao"
            @click.stop="clickAddCart(item)"
          ></van-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//解构出filters中的过滤函数
import { currency } from "@filters";
export default {
  props: {
    recommend: {
      type: Array,
      required: true,
    },
  },
  methods: {
    //点击加号加入购物车
    clickAddCart(item) {
     
      this.$emit("clickAddCart", item); //item是父组件传递过来的参数,当前推荐的单品
    },
    clickItem(id) {
      //子向父传递参数,将点击的商品id传递

      this.$emit("click", id);
    },
  },
  filters: {
    currency,
  },
};
</script>

<style lang="scss" scoped>
.recommend {
  .recommend-head {
    display: flex;
    height: 50px;
    line-height: 50px;
    justify-content: space-between;
    background: #f6f6f6;
    padding: 0px 15px;
    box-sizing: border-box;
    h4 {
      font-size: 16px;
    }
  }
  .recommend-main {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 8px 8px;
    box-sizing: border-box;
    .item {
      width: 48%;
      border: 1px solid #ccc;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 8px;
      background: #fff;
      p {
        font-size: 14px;
        color: #333;
        line-height: 26px;
        margin-left: 10px;
      }
      img {
        width: 100%;
        height: 188px;
      }
      .action {
        padding: 0px 10px;
        box-sizing: border-box;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price {
          color: cadetblue;
        }
      }
    }
  }
}
</style>