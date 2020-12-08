<template>
  <div class="cart">
    <cart-head @back="back" @home="home"></cart-head>
    <!-- 引入tabbar组件 -->
    <!-- <tabbar></tabbar> -->
    <div class="wrap">
      <van-button v-if="!checkLogin()" @click="goLogin" size="large" color="#333">登录更加精彩</van-button>
      <div class="empty" v-if="!carts.items.length">
        <img src="@assets/timg.jpg" alt />
      </div>
      <van-swipe-cell v-for="(item, index) in carts.items" :key="item.id">
        <div class="goods">
          <van-checkbox @click="singleChange" v-model="item.isChecked" checked-color="cadetblue"></van-checkbox>
          <van-card
            :price="( item.minPrice * item.num ).toFixed(2)"
            :title="item.name"
            class="goods-card"
            :thumb="item.pic"
          >
            <template #tags>
              <van-stepper v-model="item.num" @change="numChange" min="1" max="50" />
            </template>
          </van-card>
        </div>
        <template #right>
          <van-button square text="删除" @click="delItem(index)" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
    <!-- 引入提交订单栏 -->
    <van-submit-bar :price="carts.total*100" button-text="提交订单" @submit="onSubmit">
      <van-checkbox
        @click="allCheckedChange"
        v-model="carts.isAllChecked"
        checked-color="cadetblue"
      >全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
//引用模态弹出框
import { Dialog, Toast } from "vant";

import Tabbar from "@components/Tabbar";
import CartHead from "./components/CartHead";
import { checkLogin } from "@utils/index";
//解构出vuex的助手函数
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      carts: (state) => state.cart.carts,
      contacts: (state) => state.address.contacts
    }),
  },
  methods: {
    //验证是否登录，utils里解构出来的函数
    checkLogin,
    //提交事件
    onSubmit() {
      //先判断有没有登录
      if (this.checkLogin()) {
        if (this.carts.items.length !== 0) {
          //已经登录就去订单页
          this.$router.push("/order");

          //过滤出已经选中的商品从购物车中的vuex数据
          const checkedItem = this.carts.items.filter((el) => el.isChecked);

          /**
           * 生成订单的同时需要生成联系人
           * 1.去联系人列表中查找
           * 2.联系人列表为空，则联系人为空
           * 3.找默认联系人
           * 4.没有就选择第一个
           */

          //联系人
          let contact = {}
          //判断vuex中的联系人列表是否为空
          if(this.contacts.length > 0) {
            //说明联系人列表不为空，就找默认联系人
            let defaultContact = this.contacts.find( el => el.isDefault )
            if( defaultContact ) {
              //有默认联系人
              contact = defaultContact
            } else {
              //没有默认，就选取第一个
              contact = this.contacts[0]
            }
          }
          //生成订单的数据
          let nowOrder = {
            code: Date.now(),
            //商品列表,被选中的，需要过滤一下
            items: checkedItem,
            //联系地址
            contact,
            price: this.carts.total, //购物车模块中的vuex的总价格
          };
          //提交订单，调用mutations里的setorder
          this.setOrder(nowOrder);
        } else {
          Toast('请前往选购商品')
        }
      } else {
        //不允许去订单页
        this.$router.push({
          name: "login",
          params: {
            from: "/cart",
          },
        });
      }
    },
    goLogin() {
      this.$router.push("/login");
    },
    back() {
      this.$router.go(-1);
    },
    home() {
      this.$router.push("/home");
    },
    //切换商品选中状态
    singleChange() {
      // console.log(this.carts.items);//这里是所有的商品
      //改变商品状态，调用mutations里的函数
      this.setCarts(this.carts);
      this.calc_total();
      //判断商品是否都选中来改变总价的全选
      const isAllChecked = this.carts.items.every((item) => item.isChecked);
      //调用函数setAllChecked
      this.setAllChecked(isAllChecked);
    },
    //全选按钮状态
    allCheckedChange() {
      //调用mutations中
      console.log(this.carts.isAllChecked); //这里打印的是全选的状态，通过v-model双向绑定的
      this.changeAll(this.carts.isAllChecked);
      //计算总价格
      this.calc_total();
    },
    //删除商品
    delItem(index) {
      //模态框使用
      Dialog.confirm({
        title: "删除",
        message: "确认删除吗？",
      })
        .then(() => {
          //vuex的mutations中定义的删除函数del
          this.del(index);
          this.calc_total();
        })
        .catch(() => {
          // on cancel
        });
    },
    //修改商品数量
    numChange() {
      //因为数据是双向绑定的，这里只需要传递当前改变过的carts
      this.setCarts(this.carts);
      //改变数量之后在计算总价格
      this.calc_total();
    },
    //mapActions这里vuex使用了模块化，第一个参数是模块名，第二个参数是函数名
    ...mapActions("cart", ["calc_total"]),
    ...mapMutations("cart", ["setCarts", "del", "setAllChecked", "changeAll"]),
    ...mapMutations("order", ["setOrder"]),
  },
  mounted() {
    this.calc_total();
    this.carts.isAllChecked = true;
  },
  components: {
    CartHead,
  },
};
</script>

<style lang="scss" scoped>
/deep/.van-swipe-cell__wrapper {
  margin-bottom: 5px;
  background: #fff;
  .goods {
    display: flex;
    align-items: center;
    .van-icon-success {
      margin: 0px 10px;
    }
    .goods-card {
      margin-top: 0px;
      flex: 1;
      .van-card__title {
        margin-bottom: 10px;
      }
    }
  }
  .delete-button {
    height: 100%;
  }
}
.van-submit-bar {
  box-shadow: 0px -2px 5px #ccc;
}
.wrap {
  background: #e9ecf0;
}
.empty {
  img {
    width: 100%;
    height: 280px;
  }
}
</style>