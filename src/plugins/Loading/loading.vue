<template>
  <div class="shade" v-if="showLoading">
    <!-- 全局的loading效果 -->
    <van-loading type="spinner" color="cadetblue" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      showLoading: false
    }
  }
}
</script>

<style lang="scss" scoped>
//定义动画
@keyframes roll {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.shade{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,.6);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>