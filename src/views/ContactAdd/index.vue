<template>
  <div class="contactAdd">
    <!-- 联系人列表页头部 -->
    <div class="contactAddHead">
      <contactAdd-head>
        <template #left>
          <div class="contactAdd-left" @click="back">
            <van-icon class="iconfont" class-prefix="icon" name="arrow-left"></van-icon>
          </div>
        </template>
        <template #center>
          <div class="contactAdd-center">
            <p>添加联系人</p>
          </div>
        </template>
        <template #right>
          <div class="contactAdd-right" @click="home">
            <van-icon class="iconfont" class-prefix="icon" name="weibiaoti12"></van-icon>
          </div>
        </template>
      </contactAdd-head>
    </div>
    <!-- 中间内容 -->
    <div class="wrap">
      <van-address-edit
        :area-list="addressInfo"
        show-postal
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
      />
    </div>
  </div>
</template>

<script>
import ContactAddHead from "@components/ComHead";
import { mapState,mapMutations } from 'vuex'
export default {
  methods: {
    back() {
      this.$router.go(-1);
    },
    home() {
      this.$router.push("/home");
    },
    //保存信息
    onSave(add) {
      //add为填写好的数据
      add.id = Date.now()
      this.addContact(add)
      this.$router.go(-1)
    },
    ...mapMutations('address',['addContact'])
  },
  computed: {
    ...mapState({
      addressInfo: (state) => state.address.addressInfo
    })
  },
  components: {
    ContactAddHead,
  },
};
</script>

<style lang="scss" scoped>
.contactAddHead {
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background: cadetblue;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  .contactAdd-center {
    p {
      font-size: 14px;
    }
  }
}
</style>