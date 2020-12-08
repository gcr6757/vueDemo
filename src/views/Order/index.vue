<template>
  <div>
    <!-- 头部 -->
    <order-head @back="back" @home="home"></order-head>
    <div class="wrap">
      <!-- 收件人信息 -->
      <div class="contact">
        <!-- 联系人卡片 -->
        <van-contact-card
          @click="editContact"
          :type="cardType"
          :name="nowOrder.contact.name"
          :tel="nowOrder.contact.tel"
        />
      </div>
      <!-- 订单商品信息,从order的vuex中拿数据渲染 -->
      <van-swipe-cell v-for="item in nowOrder.items" :key="item.id">
        <div class="goods">
          <van-card
            :price="( item.minPrice * item.num ).toFixed(2)"
            :title="item.name"
            :num="item.num"
            class="goods-card"
            :thumb="item.pic"
          ></van-card>
        </div>
      </van-swipe-cell>
      <!-- 底部提交栏 -->
      <van-submit-bar
        :price="nowOrder.price*100?nowOrder.price*100:0"
        button-text="去付款"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>

<script>
//引入头部
import OrderHead from "./components/OrderHead";
import { mapState } from "vuex";
import { Toast } from 'vant'
export default {
  data() {
    return {
    }
  },
  computed: {
    cardType () {
      //判断联系人卡片类型为添加还是编辑,可以通过当前订单联系人列表的名字是否能取到来判断
      if( this.nowOrder.contact.name ) {
        return 'edit'
      } else {
        return 'add'
      }
    },
    ...mapState({
      nowOrder: (state) => state.order.nowOrder,
    }),
  },
  methods: {
    //父子通信事件
    back() {
      this.$router.go(-1);
    },
    home() {
      this.$router.push("/home");
    },
    //支付提交
    onSubmit() {
      Toast('钱不够')
    },
    //联系人信息编辑
    editContact() {
      if (this.cardType === "add") {
        //跳转到联系人添加页
        this.$router.push("/contactadd");
      } else {
        //跳转到联系人列表页，编辑也在这里面执行
        this.$router.push("/contactlists");
      }
    },
  },
  components: {
    OrderHead,
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  .contact {
    margin: 10px 0px;
    background: #fff;
    border-radius: 15px;
    overflow: hidden;
  }
  /deep/.van-swipe-cell__wrapper {
    margin-bottom: 10px;
    border-radius: 15px;
    overflow: hidden;
    .goods {
      display: flex;
      align-items: center;
      .goods-card {
        margin-top: 0px;
        flex: 1;
        .van-card__title {
          margin-top: 5px;
        }
      }
    }
  }
  .van-submit-bar {
    box-shadow: 0px 3px 5px #999;
  }
}
</style>