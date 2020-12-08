import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart/cart'
import order from './order/order'
import address from './address'

//vuex 数据持久化
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cart,
    order,
    address
  },
  plugins: [vuexLocal.plugin]
})
