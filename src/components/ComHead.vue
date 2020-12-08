<template>
  <div class="comHead">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.comHead{
  height: 46px;
  width: 100%;
  display: flex;
  overflow: hidden;
  .left{
    width: 50px;
  }
  .center{
    flex: 1;
  }
  .right{
    width: 60px;
  }
  
}
</style>