import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入自己封装的rem设置
// import './assets/js/setRem'

//引入字体图标
import './assets/fonts/iconfont.css'
//引入flexible
import 'lib-flexible'
//引入全局遮罩层
import loading from './plugins/Loading'

import './assets/css/base.css'
import { Tabbar, TabbarItem, Icon, Swipe, SwipeItem, Grid, GridItem, PullRefresh, GoodsAction, GoodsActionIcon, GoodsActionButton, Button, Popup, Card, Stepper, SubmitBar, Checkbox, CheckboxGroup, SwipeCell, ContactCard, ContactList, ContactEdit, AddressList, AddressEdit, Sidebar, SidebarItem, Lazyload, Search, Loading, Calendar, Cell } from 'vant'

Vue.use(Tabbar)
  .use(TabbarItem)
  .use(Icon)
  .use(Swipe)
  .use(SwipeItem)
  .use(Grid)
  .use(GridItem)
  .use(PullRefresh)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Button)
  .use(Popup)
  .use(Card)
  .use(Stepper)
  .use(SubmitBar)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(SwipeCell)
  .use(ContactCard)
  .use(ContactList)
  .use(ContactEdit)
  .use(AddressList)
  .use(AddressEdit)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Search)
  .use(Loading)
  .use(Calendar)
  .use(Cell)
Vue.use(Lazyload, {
  preload: '100%',
  loading: '/timg1.gif'
})

Vue.use(loading)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
