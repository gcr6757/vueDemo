<template>
  <div id="app">
    <!-- 只对分类页进行保持活性,分类页组件添加name属性来对应这里的include -->
    <keep-alive include='cates'>
      <router-view/>
    </keep-alive>
  </div>
</template>
