<template>
  <!-- {{ $route.params.categoryId }} 动态路由接收参数 -->
  <!-- 搜索结果列表页 -->
  <div>
    <div class="item-bar">
      <itemLists-head>
        <template #left>
          <div class="item-left" @click="back">
            <van-icon class="iconfont" class-prefix="icon" name="arrow-left"></van-icon>
          </div>
        </template>
        <template #center>
          <div class="item-center">
            <p>商品列表</p>
          </div>
        </template>
      </itemLists-head>
    </div>
    <!-- 中间内容 -->
    <div class="wrap">
      <!-- 标题栏筛选商品 -->
      <div class="sortTitle">
        <div :class="['price',{ active:active.orderBy === 0 }]" @click="byPrice">
          <span>价格</span>
          <div :class="['angle','up',{ active:active.orderBy === 0 && active.sortBy === 0 }]"></div>
          <div :class="['angle','down',{ active:active.orderBy === 0 && active.sortBy === 1 }]"></div>
        </div>
        <div :class="['sale',{ active:active.orderBy === 1 }]" @click="bySale">
          <span>销量</span>
          <div :class="['angle','up',{ active:active.orderBy === 1 && active.sortBy === 0 }]"></div>
          <div :class="['angle','down',{ active:active.orderBy === 1 && active.sortBy === 1 }]"></div>
        </div>
      </div>
      <!-- 商品展示 -->
      <div class="recommend">
        <div class="recommend-main">
          <div class="item" v-for="item in recommend" :key="item.id" @click="clickItem(item.id)">
            <img :src="item.pic" alt />
            <p>{{item.name}}</p>
            <div class="action">
              <span class="price">{{item.minPrice | currency }}</span>
              <van-icon
                class-prefix="icon"
                color="cadetblue"
                class="iconfont"
                size="20"
                name="jiahao"
              ></van-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ItemListsHead from "@components/ComHead"
import { getItemLists } from "@api"
import { currency } from '@filters'
export default {
  data() {
    //给两个字段来决定筛选按钮的active
    return {
      recommend: [],
      active: {
        orderBy: 0, //0代表价格 1代表销量
        sortBy: 0, // 0代表降序，1代表升序
      },
    }
  },
  filters: {
    currency
  },
  created() {
    this.fetchItems();
  },
  methods: {
    //按价格来排序
    byPrice() {
      this.active.orderBy = 0;
      if(this.active.sortBy === 0) {
        this.active.sortBy = 1
      }else {
        this.active.sortBy = 0
      }
      this.fetchItems()
    },
    //按销量来排序
    bySale() {
      this.active.orderBy = 1;
      if(this.active.sortBy === 0) {
        this.active.sortBy = 1
      }else {
        this.active.sortBy = 0
      }
      this.fetchItems()
    },
    //进入详情页
    clickItem(id) {
      this.$router.push({
        path: '/detail',
        query: {
          id
        }
      })
    },
    back() {
      this.$router.go(-1);
    },
    //获取分类商品列表
    fetchItems() {
      getItemLists({
        //计算属性
        orderBy: this.orderBy,
        //关键字
        k: this.$route.query.word
      }).then((res) => {
        console.log(res);
        this.recommend = res.data.data
      });
    },
  },
  computed: {
    //计算属性来判断orderBy的值,依赖于active的值得变化
    orderBy() {
      let orderBy = "priceUp";
      if (this.active.orderBy === 0 && this.active.sortBy === 0) {
        orderBy = "priceUp";
      } else if (this.active.orderBy === 0 && this.active.sortBy === 1) {
        orderBy = "priceDown";
      } else if (this.active.orderBy === 1 && this.active.sortBy === 0) {
        orderBy = "ordersUp";
      } else {
        orderBy = "ordersDown";
      }
      return orderBy;
    },
  },
  components: {
    ItemListsHead,
  },
};
</script>

<style lang="scss" scoped>
.item-bar {
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background: cadetblue;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  .item-center {
    p {
      font-size: 14px;
    }
  }
}
.sortTitle {
  height: 50px;
  background: #fff;
  display: flex;
  line-height: 50px;
  justify-content: space-around;
  .price,
  .sale {
    position: relative;
    &.active {
      color: cadetblue;
    }
    span {
      font-size: 14px;
    }
  }
  .angle {
    width: 0px;
    height: 0px;
    border: 6px solid transparent;
    position: absolute;
    right: -18px;
    &.up {
      border-bottom-color: #999;
      top: 11px;
      &.active {
        border-bottom-color: cadetblue;
      }
    }
    &.down {
      border-top-color: #999;
      top: 25px;
      &.active {
        border-top-color: cadetblue;
      }
    }
  }
}
.recommend {
  .recommend-main{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 8px 8px;
    box-sizing: border-box;
    .item{
      width: 48%;
      border: 1px solid #ccc;
      border-radius: 10px;
      overflow: hidden;
      margin-bottom: 8px;
      background: #fff;
      p{
        font-size: 14px;
        color: #333;
        line-height: 26px;
        margin-left: 10px;
      }
      img{
        width: 100%;
        height: 188px;
      }
      .action{
        padding: 0px 10px;
        box-sizing: border-box;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .price{
          color: cadetblue;
        }
      }
    }
  }
}
</style>