//引入全局loading的样式文件
import LoadingTpl from './loading.vue'

//创建一个loading
const loading = {
  install: (Vue) => {
    //创建一个组件，构造器
    const Loading = Vue.extend(LoadingTpl)
    //new一个组件
    const loadingComponent = new Loading()
    //得到这个模板
    const tpl = loadingComponent.$mount().$el
    document.body.appendChild(tpl)
    Vue.prototype.$showLoading = () => {
      //组件中的属性控制显示影藏
      loadingComponent.showLoading = true
    }

    Vue.prototype.$hideLoading = () => {
      //组件中的属性控制显示影藏
      loadingComponent.showLoading = false
    }
  }
}

export default loading
