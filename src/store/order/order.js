const order = {
  namespaced: true,
  state: {
    //所有订单
    orders: [],
    //当前订单
    nowOrder: {
      // code: '1599730791821',
      // //商品列表
      // items: [],
      // //联系地址
      // contact: {
      //   name: '阿三',
      //   tel: 18855336699,
      //   address: '天津'
      // },
      // price: 100
    }
  },
  mutations: {
    //生成当前订单 order是购物车中传过来的数据
    setOrder(state, order) {
      state.nowOrder = order
    },
    //切换当前订单的联系人
    setOrderContact(state, contact) {
      state.nowOrder.contact = contact
    }
  },
  actions: {

  }
}

export default order