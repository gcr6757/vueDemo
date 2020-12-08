<template>
  <div>
    <!-- 头部 -->
    <home-head></home-head>
    <!-- 中间部分 -->
    <!-- 下拉刷新包裹 -->

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="wrap">
        <!-- baner图 -->
        <home-swiper :banners="banners"></home-swiper>
        <!-- 宫格导航 -->
        <home-grid :catesList="catesList" @click="enterItemList"></home-grid>
        <!-- 精品推荐 -->
        <recommend :recommend="recommend" @click="clickItem" @clickAddCart="add_cart"></recommend>
      </div>
    </van-pull-refresh>
    <!-- 引入tabbar组件 -->
    <tabbar></tabbar>
  </div>
</template>

<script>
// 引入tabbar组件
import Tabbar from "@components/Tabbar";
// 引入home页头部
import HomeHead from "./components/HomeHead";
//引入banner
import HomeSwiper from "./components/HomeSwiper";
//引入宫格导航
import HomeGrid from "./components/HomeGrid";
//引入精品推荐
import Recommend from "./components/Recommend";

import { getBanner, getCates, getRecommend } from "@api";

//引用轻提示组件
import { Toast } from "vant";

//解构出vuex的助手函数
import { mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      isLoading: false,
      banners: [],
      catesList: [],
      recommend: [],
      
    };
  },
  components: {
    Tabbar,
    HomeHead,
    HomeSwiper,
    HomeGrid,
    Recommend,
  },
  created() {
    this.fetchBanner();
    this.fetchCates();
    this.fetchRecommend();
  },
  methods: {
    //点击加号小图标加入购物车,又因为给推荐精品div本身绑定跳转路由到详情页，这里需要事件修饰符，阻止冒泡或者本身
    add_cart(item) {
      // console.log(item); //当前点击的商品加入购物车,调用mutations里的函数
      this.addCart(item);
      //需要给商品数据解决没有默认选中和默认数量num
      (item.isChecked = true), (item.num = 1);
      //轻提示
      Toast({
        duration: 1000,
        message: "添加成功",
        icon: "success",
      });
    },

    
    //点击跳转到分类列表页
    enterItemList(id) {
      // console.log(id); //这里id就是子组件宫格导航传递过来的分类id
      this.$router.push(`/itemLists/${id}`);
    },
    //子父通信的方法
    clickItem(id) {
      //点击精品推荐进入该详情页
      this.$router.push({
        path: "/detail",
        //这里采用地址栏传递id，防止刷新消失
        query: {
          id,
        },
      });
    },
    //下拉刷新
    onRefresh() {
      //数据更新
      this.fetchRecommend();
    },
    fetchBanner() {
      //banner数据获取
      getBanner().then((res) => {
        // console.log(res);
        if (res.data.code === 0) {
          this.banners = res.data.data;
        }
      });
    },
    fetchCates() {
      //分类数据获取
      getCates().then((res) => {
        // console.log(res);
        if (res.data.code === 0) {
          this.catesList = res.data.data;
        }
      });
    },
    fetchRecommend() {
      //获取精品推荐数据
      getRecommend().then((res) => {
        //下拉刷新请求数据成功后设置
        this.isLoading = false;
        // console.log(res);
        if (res.data.code === 0) {
          this.recommend = res.data.data;
        }
      });
    },
    ...mapMutations("cart", ["calc_total"]),
    ...mapActions("cart", ["addCart"]),
  },
};
</script>

<style lang="scss" scoped>
.my-swipe {
  img {
    width: 100%;
  }
}
/*
  //解决scoped
  //van-grid-itemui组件里的类名所以需要穿透
  /deep/ .van-grid-item{
    .van-grid-item__text{
      font-size: 18px;
    }
  }
  */
</style>