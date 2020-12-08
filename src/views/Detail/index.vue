<template>
  <div>
    <!-- 详情页头部 -->
    <detail-head @back="back" @home="home"></detail-head>
    <!-- 内容 -->
    <div class="wrap">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="cadetblue">
        <van-swipe-item v-for="banner in detail.pics" :key="banner.id">
          <img :src="banner.pic" alt />
        </van-swipe-item>
      </van-swipe>
      <!-- 商品简介 -->
      <div class="part">
        <div class="introduce">
          <!-- 这里h4标签需要进行对basicInfo进行非空判断用到v-if,因为数据刚开始是空的 -->
          <h4 v-if="detail.basicInfo">{{ detail.basicInfo.name }}</h4>
          <van-icon class="iconfont" size="20" class-prefix="icon" name="shoucang"></van-icon>
        </div>
        <div class="info">
          <div class="price">
            <span v-if="detail.basicInfo">{{ detail.basicInfo.minPrice | currency }}</span>
            <del v-if="detail.basicInfo">{{ detail.basicInfo.originalPrice | currency}}</del>
          </div>
          <div class="store" v-if="detail.basicInfo">库存{{ detail.basicInfo.stores }}件</div>
        </div>
      </div>
      <!-- 信息栏 -->
      <div class="infobar">
        <p>
          <strong>花语</strong>
          <span>你准备对我说谎</span>
        </p>
        <p>
          <strong>花语</strong>
          <span>你准备对我说谎</span>
        </p>
        <p>
          <strong>花语</strong>
          <span>你准备对我说谎</span>
        </p>
        <p>
          <strong>花语</strong>
          <span>你准备对我说谎</span>
        </p>
      </div>
      <!-- 富文本 -->
      <p class="txt">图文详情</p>
      <div class="rich" v-html="detail.content"></div>
      <!-- 商品导航 -->
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" dot />
        <van-goods-action-icon icon="cart-o" text="购物车" @click="$router.push('/cart')" :badge="items.length? items.length: ''" />
        <van-goods-action-button color="#c5c5c5" @click="clickAction(0)" type="warning" text="加入购物车" />
        <van-goods-action-button color="cadetblue" @click="clickAction(1)" type="danger" text="立即购买" />
      </van-goods-action>
      <!-- 弹出层 -->
      <van-popup
        v-model="show"
        closeable
        close-icon-position="top-right"
        position="bottom"
        :style="{ height: '35%' }"
      >
        <div class="card">
          <van-card
            :num="item.num"
            :price="(item.minPrice * item.num).toFixed(2)"
            :title="item.name"
            :thumb="item.pic"
          >
            <template #tags>
              <van-stepper v-model="item.num" min="1" max="50" />
            </template>
            <template #footer>
              <van-button @click="sure" size="large" class="btn-shop" color="cadetblue">确认</van-button>
            </template>
          </van-card>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { currency } from "@filters";
import DetailHead from "./components/DetailHead";
//解析出获取详情页数据函数
import { getDetail } from "@api";
//引用轻提示组件
import { Toast } from 'vant'
//解构出mapState助手函数
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      //详情页数据
      detail: {},
      show: false,
      value: 1,
      //要提交的商品数据
      item: {
        num: 1,
        isChecked: true
      },
      action: 0 //用来控制底部组件立即购买和加入购物车 0是加入购物车
    };
  },
  created() {
    this.fetchgetDetail();
  },
  computed: {
    //解决富文本图片格式替换
    content() {
      return this.detail.content.replace(
        /<img/g,
        '<img style="vertical-align:bottom;width:100%"'
      )
    },
    ...mapState({
      items: (state) => state.cart.carts.items
    })
  },
  filters: {
    currency,
  },
  methods: {
    //点击弹出框确认
    sure() {
      // this.$router.push('/cart')
      if( this.action ) {
        //为1就为真,执行立即购买
        alert('立即购买')
        this.show = false
      } else {
        //判断是否存在该商品，items是vuex中的数据
        const isExist = this.items.find(el => el.id === this.item.id)
        if(!isExist) {
          this.addCart(this.item)
          //轻提示
          Toast({
            duration: 1000,
            message: '成功加入购物车',
            icon: 'success',
          });
        } else {
          Toast({
            duration: 1000,
            message: '请勿重复添加',
          });
        }
        //关闭弹出层
        this.show = false
      }
    },
    //点击添加弹出层出现
    clickAction (action) {
      this.show = true
      this.action = action //传递过来的参数action
    },
    //子父通信
    back() {
      this.$router.go(-1);
    },
    home() {
      this.$router.push("/home");
    },
    //获取详情页数据
    fetchgetDetail() {
      //根据地址栏的id来请求数据,获取通过$route.query.id
      getDetail(this.$route.query.id).then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          this.detail = res.data.data;
          this.item = {
            ...this.item,
            ...res.data.data.basicInfo
          }
        }
      });
    },
    ...mapActions('cart', ['addCart'])
  },
  components: {
    DetailHead,
  },
};
</script>

<style lang="scss" scoped>
.my-swipe {
  width: 100%;
  img {
    width: 100%;
    height: 350px;
  }
}
.part {
  padding: 12px 16px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 8px;
  .introduce {
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    h4 {
      font-size: 18px;
      color: #333;
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    .price {
      span {
        font-size: 20px;
        color: orangered;
        margin-right: 5px;
      }
      del {
        font-size: 16px;
        color: #b0b0b0;
      }
    }
    .store {
      font-size: 16px;
    }
  }
}
.infobar {
  padding: 12px 16px;
  box-sizing: border-box;
  background: #fff;
  margin-bottom: 10px;
  p {
    height: 30px;
    line-height: 30px;
    strong {
      margin-right: 20px;
      font-size: 14px;
    }
  }
}
.txt {
  font-size: 18px;
  padding: 0px 16px;
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  background: #fff;
}
.rich {
  width: 100%;
  padding: 0px 0px 10px 0px;
  box-sizing: border-box;
  /deep/img {
    width: 100%;
  }
} 
//弹出层商品卡片
.card{
  padding-top: 20px;
  .van-card__title{
    margin-bottom: 10px;
  }
}
//弹出层按钮
.btn-shop{
  margin-top: 10px;
}
.van-goods-action {
  height: 50px;
  position: fixed;
  left: 0;
  bottom: 0;
  box-shadow: 0px -2px 3px #f1f1f1;
}
.van-button {
  border-radius: 0px;
  height: 35px;
}
</style>