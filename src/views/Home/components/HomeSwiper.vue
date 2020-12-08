<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="cadetblue">
      <van-swipe-item v-for="banner in banners" :key="banner.id">
        <img :src="banner.picUrl" alt />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  props: {
    banners: {
      type: Array,
      require: true
    }
  }
};
</script>

<style lang="scss" scoped>
.my-swipe {
  img {
    width: 100%;
  }
}
</style>