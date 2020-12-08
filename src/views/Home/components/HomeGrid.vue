<template>
  <div>
    <van-grid :column-num="5" square>
      <van-grid-item
        v-for="cates in catesList"
        :key="cates.id"
        :icon="cates.icon"
        :text="cates.name"
        @click="enterItemList(cates.id)"
        />
    </van-grid>
  </div>
</template>

<script>
export default {
  props: {
    catesList: {
      type: Array,
      required: true,
    },
  },
  methods: {
    enterItemList(id) {
      this.$emit('click',id)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>