<template>
  <div>
    <div class="contactEdit">
      <!-- 联系人列表页头部 -->
      <div class="contactEditHead">
        <contactEdit-head>
          <template #left>
            <div class="contactEdit-left" @click="back">
              <van-icon class="iconfont" class-prefix="icon" name="arrow-left"></van-icon>
            </div>
          </template>
          <template #center>
            <div class="contactEdit-center">
              <p>编辑联系人</p>
            </div>
          </template>
          <template #right>
            <div class="contactEdit-right" @click="home">
              <van-icon class="iconfont" class-prefix="icon" name="weibiaoti12"></van-icon>
            </div>
          </template>
        </contactEdit-head>
      </div>
      <!-- 中间内容 -->
      <div class="wrap">
        <van-address-edit
        :area-list="addressInfo"
        :address-info="nowContact"
        show-area
        show-detail
        show-postal
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ContactEditHead from "@components/ComHead";
import { mapState, mapMutations } from "vuex";
export default {
  data () {
    // 收货人信息初始值 address-info
    return {
      
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    home() {
      this.$router.push('/home');
    },
    onSave(edit) {
      //更改保存联系人信息,edit为填写好的数据
      this.editContact(edit)
      this.$router.go(-1)
    },
    ...mapMutations('address', ['editContact'])
  },
  created() {
    console.log(this.$route.params.index); //获取到点击的联系人的下标
    // const nowContact = this.contacts.find(el => el.id - 1 === this.$route.params.index) //在vuex中找到当前联系人,渲染到页面
    // console.log(nowContact);
  },
  computed: {
    nowContact () {
      //通过传参过来的下标去vuex中找对应下标的联系人
      return this.contacts[this.$route.params.index]
    },
    ...mapState({
      contacts: (state) => state.address.contacts,
      addressInfo: (state) => state.address.addressInfo
    })
  },
  components: {
    ContactEditHead,
  },
};
</script>

<style lang="scss" scoped>
.contactEditHead {
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background: cadetblue;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  .contactEdit-center {
    p {
      font-size: 14px;
    }
  }
}
</style>