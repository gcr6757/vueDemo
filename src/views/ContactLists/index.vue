<template>
  <div>
    <!-- 联系人列表页头部 -->
    <div class="contactListsHead">
      <contactLists-head>
        <template #left>
          <div class="contactLists-left" @click="back">
            <van-icon class="iconfont" class-prefix="icon" name="arrow-left"></van-icon>
          </div>
        </template>
        <template #center>
          <div class="contactLists-center">
            <p>联系人列表</p>
          </div>
        </template>
        <template #right>
          <div class="contactLists-right" @click="home">
            <van-icon class="iconfont" class-prefix="icon" name="weibiaoti12"></van-icon>
          </div>
        </template>
      </contactLists-head>
    </div>
    <!-- 中间内容 -->
    <div class="wrap">
      <!-- 联系人列表展示 -->
      <van-address-list
        v-model="chosenAddressId"
        :list="contacts"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="changeContact"
      />
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import ContactListsHead from "@components/ComHead";
//解构出vuex助手函数
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      chosenAddressId: "1",
    };
  },
  computed: {
    ...mapState({
      contacts: (state) => state.address.contacts,
    }),
  },
  methods: {
    //组件中有默认事件select ，切换默认联系人时触发
    //item: 地址对象，index: 索引
    changeContact(item, index) {
      //切换联系人
      console.log(item, index);
      this.setOrderContact(item);
      this.$router.go(-1);
    },
    onAdd() {
      // alert('添加联系人')
      this.$router.push("/contactAdd");
    },
    onEdit(item, index) {
      // alert('编辑联系人')
      this.$router.push({
        name: "contactEdit",
        params: {
          //把当前点击的下标传递到编辑页
          index,
        },
      });
    
    },
    back() {
      this.$router.go(-1);
    },
    home() {
      this.$router.push("/home");
    },
    ...mapMutations("order", ["setOrderContact"]),
  },
  components: {
    ContactListsHead,
  },
};
</script>

<style lang="scss" scoped>
.contactListsHead {
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background: cadetblue;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  .contactLists-center {
    p {
      font-size: 14px;
    }
  }
}
</style>