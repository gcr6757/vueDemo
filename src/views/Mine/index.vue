<template>
  <div>
    <!-- 头部 -->
    <div class="MineHead">
      <mine-head>
        <template #left>
          <div class="MineHead-left" @click="back">
            <van-icon class="iconfont" class-prefix="icon" name="arrow-left"></van-icon>
          </div>
        </template>
        <template #center>
          <div class="MineHead-center">
            <p>个人中心</p>
          </div>
        </template>
        <template #right>
          <div class="MineHead-right">
            <van-icon class="iconfont" class-prefix="icon" name="kefu"></van-icon>
          </div>
        </template>
      </mine-head>
    </div>
    <!-- 中间内容 -->
    <div class="wrap">
      <van-cell title="选择日期区间" :value="date" @click="show = true" />
      <van-calendar
        v-model="show"
        type="range"
        @confirm="onConfirm"
        :min-date="minDate"
        :default-date="abc"
      />
    </div>
    <!-- 引入tabbar组件 -->
    <tabbar></tabbar>
  </div>
</template>

<script>
import MineHead from "@components/ComHead";
import Tabbar from "@components/Tabbar";
export default {
  data() {
    return {
      date: "",
      show: false,
      minDate: new Date(2019, 10, 11),
      // maxDate: new Date(2020, 11, 29),
      abc: [new Date(2020, 11, 20), new Date(2020, 11, 30)],
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
    },
  },
  components: {
    Tabbar,
    MineHead,
  },
};
</script>

<style lang="scss" scoped>
.MineHead {
  width: 100%;
  height: 46px;
  line-height: 46px;
  text-align: center;
  background: cadetblue;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
  .MineHead-center {
    p {
      font-size: 14px;
    }
  }
}
</style>