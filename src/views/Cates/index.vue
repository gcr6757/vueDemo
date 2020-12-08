<template>
  <div class="cates">
    <!-- 头部 -->
    <div class="CatesHead">
      <cates-head>
        <template #left>
          <div class="CatesHead-left">
            <van-icon class="iconfont" @click="back" class-prefix="icon" name="arrow-left"></van-icon>
          </div>
        </template>
        <template #center>
          <div class="CatesHead-center">
            <p>分类展示</p>
          </div>
        </template>
        <template #right>
          <div class="CatesHead-right">
            <van-icon class="iconfont" class-prefix="icon" name="weibiaoti12"></van-icon>
          </div>
        </template>
      </cates-head>
    </div>
    <!-- 中间内容 -->
    <div class="wrap">
      <div class="sideLeft">
        <!-- 分类展示 -->
        <div
          :class="['item',{active: index === flag}]"
          v-for="(cate, index) in cates"
          :key="cate.id"
          @click="changeCate(index)"
        >{{ cate.name }}</div>
      </div>
      <!-- 右边内容切换 -->
      <div class="contentRight">
        <div class="contentImg">
          <img src="https://img02.hua.com/m/category/Classification/plants.png?v" alt />
        </div>
        <div class="good" v-for="good in items" :key="good.id">
          <img v-lazy="good.pic" alt="">
          <p>{{ good.name }}</p>
          <span>${{ good.minPrice }}</span>
        </div>
      </div>
    </div>
    <!-- 引入tabbar组件 -->
    <tabbar></tabbar>
  </div>
</template>

<script>
import CatesHead from "@components/ComHead";
import Tabbar from "@components/Tabbar";
import { getCates, getItemLists } from "@api";
export default {
  name: 'cates',
  data() {
    return {
      //分类数据
      cates: [],
      //定义一个初始值来控制选项卡的类名
      flag: 0,
      //分类下对应的商品
      items: []
    };
  },
  created() {
    //先获取到所有的分类，再加载商品数据，因为商品数据里面用到了this.cates
    this.fetchAllcates()
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    fetchAllcates() {
      //获取分类
      getCates().then((res) => {
        if( res.data.code === 0 ) {
          console.log(res.data.data);
          this.cates = res.data.data
          //等获取到所有分类时，异步
          this.fetchItems()
        }
      })
    },
    //获取分类下的商品列表
    fetchItems() {
      //获取分类下的商品
      getItemLists({
        //切换选项卡时this.flag也变为对应的分类数组的下标值
        categoryId: this.cates[this.flag].id
      }).then(res => {
        // console.log(res);
        console.log(res);
        if( res.data.code === 0 ) {
          this.items = res.data.data
        }
      })
    },
    //切换分类展示商品
    changeCate(index) {
      //通过下标来控制选项卡
      this.flag = index
      //重新获取数据，先清空当前的商品数组数据，this.items
      this.items = []
      this.fetchItems()
    }
  },
  components: {
    Tabbar,
    CatesHead,
  },
};
</script>

<style lang="scss" scoped>
.cates {
  height: calc(100% - 46px - 50px);
}
.CatesHead {
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background: cadetblue;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  .CatesHead-center {
    p {
      font-size: 14px;
    }
  }
}
.wrap {
  display: flex;
  .sideLeft {
    width: 100px;
    display: flex;
    flex-direction: column;
    background: #f9f9f9;
    overflow-y: auto;
    .item {
      flex-shrink: 0;
      height: 40px;
      background: #d4cfcf;
      margin-bottom: 4px;
      line-height: 40px;
      text-align: center;
      &.active {
        background: #333;
        color: cadetblue;
      }
    }
  }
  .contentRight {
    flex: 1;
    background: #f6f6f6;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    .contentImg {
      height: 100px;
      margin-bottom: 8px;
      img {
        width: 100%;
      }
    }
    .good{
      width: 100%;
      height: 220px;
      box-shadow: 0px 3px 5px #ccc;
      margin-bottom: 10px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      padding: 15px;
      box-sizing: border-box;
      /deep/img{
        width: 100%;
        height: 140px;
      }
      p{
        font-size: 16px;
        color: #333;
        line-height: 28px;
      }
      span{
        font-size: 18px;
        color: cadetblue;
      }
    }
  }
}
</style>