<template>
  <div>
    <!-- 搜索界面 -->
    <div class="searchHead">
      <van-search
        v-model="searchTxt"
        shape="round"
        label="商品"
        background="cadetblue"
        placeholder="请输入搜索关键词"
        @search="searchRes"
      />
    </div>
    <!-- 中间内容，放历史记录 -->
    <div class="history">
      <h3>历史记录</h3>
      <div class="record">
        <p v-for="history in historyTxt" :key="history">{{ history }}</p>
      </div>
    </div>
    <!-- 底部tabbar -->
    <tabbar></tabbar>
  </div>
</template>

<script>
/* 
缓存存取
存取 数组 （缓存只能存字符串  存JSON.stringify()  取 JSON.parse）
取：考虑 第一次取 (三目 判断 是不是 第一次（没有值），如果是 [])
存： 先取 parse变成数组 变量保存，操作变量，再将变量存回去
历史记录
  searchHis
*/
import Tabbar from "@components/Tabbar";
export default {
  data() {
    return {
      //和文本输入框双向绑定
      searchTxt: "",
      //历史记录的数据
      historyTxt: localStorage.getItem("historyTxt")
        ? JSON.parse(localStorage.getItem("historyTxt"))
        : [],
    };
  },
  components: {
    Tabbar,
  },
  methods: {
    //确认搜索时触发，调用接口拉取数据，同时生成本地存储到历史记录
    searchRes() {
      //将搜索内容存储到本地
      //第一次取历史记录的处理
      let record = localStorage.getItem("historyTxt")
        ? JSON.parse(localStorage.getItem("historyTxt"))
        : [];
      //第一次存历史记录,先判断输入不为空，再进行历史记录数组去重
      if (this.searchTxt !== "") {
        record.unshift(this.searchTxt);
        //数组去重
        record = [...new Set(record)];
        /*
         或者数组去重
         let index = record.indexOf(this.historyTxt)
         if( index !== -1){
          //  说明重复了
          record.splice(index,1)
         } 
         */

        //长度限制
        if (record.length > 10) {
          record.length = 10;
        }

        //再将新数据存进本地存储,存之前需要转成字符串才可以存
        localStorage.setItem("historyTxt", JSON.stringify(record));
        //跳转到搜索结果页
        this.$router.push({
          path: "/searchResult",
          query: {
            word: this.searchTxt,
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.history {
  padding: 10px;
  box-sizing: border-box;
  .record {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    p {
      padding: 8px 8px;
      border-radius: 10px;
      background: #ccc;
      color: cadetblue;
      margin: 10px 10px 0px 0px;
    }
  }
}
</style>