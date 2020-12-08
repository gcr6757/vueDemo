//这里是购物车的vuex模块
const cart = {
  namespaced: true,
  state: {
    //模拟购物车数据
    carts: {
      //购物车底部提交栏的数据
      total: 0,
      isAllChecked: true,
      //商品展示的数据
      items: [
        // {
        //   id: 565194,
        //   minPrice: 321,
        //   name: "情绪作伴",
        //   originalPrice: 123,
        //   pic: "https://dcdn.it120.cc/2020/09/10/ec078ac0-2024-4931-9e19-9f5dfcab9a54.jpg",
        //   num: 1,
        //   isChecked: true
        // },
        // {
        //   id: 562634,
        //   minPrice: 321,
        //   name: "情绪作伴",
        //   originalPrice: 123,
        //   pic: "https://dcdn.it120.cc/2020/09/07/a4709dde-c1cd-4678-9e26-71c987d83465.jpg",
        //   num: 1,
        //   isChecked: true
        // },
      ]
    }
  },
  mutations: {
    //这里定义好操作数据的方法

    //计算总计的封装
    calcTotal(state, total) {
      // console.log(total);
      state.carts.total = total
    },
    //设置购物车数据
    setCarts(state, carts) {
      state.carts = carts
    },
    //删除商品
    del(state, index) {
      state.carts.items.splice(index, 1)
      //如果购物车商品删除完就改变全选按钮状态
      if (state.carts.items.length === 0) {
        state.carts.isAllChecked = false
      }
    },
    //设置全选状态设置
    setAllChecked(state, allChecked) {
      state.carts.isAllChecked = allChecked
    },
    //切换全选,点击全选影响所有复选框
    changeAll(state, allCheckedState) {
      state.carts.items.forEach(item => {
        //这里改变所有的复选框和全选保持一致
        //allCheckedState是传递过来的全选的状态 true或false
        item.isChecked = allCheckedState
      })
    },
    //主页点击精品推荐的加号开始加入购物车
    addCart(state, item) {
      state.carts.items.push(item)
    },
    //购买数量++
    addItemNum(state, index) {
      state.carts.items[index].num++
    }
  },
  actions: {
    //这里提交具体的方法名到mutations来操作数据

    //加入购物车判断（没有就添加，有就数量++)
    addCart({ state: { carts }, commit }, item) {
      //判断购物车中是否存在该商品
      //解构出商品数组
      const { items } = carts
      //通过商品id来判断是否存在,不存在返回-1,有就返回下标值
      const index = items.findIndex(el => el.id === item.id)
      if (index === -1) {
        //直接加入购物车
        commit('addCart', item)
      } else {
        //数量++
        commit('addItemNum', index)
      }
    },

    //计算总价格
    calc_total({ state: { carts }, commit }) {
      /* 
      已经选中的商品数量价格总和
      */
      //解构出items从carts
      const { items } = carts
      let total = 0
      //删选出已经选中的商品
      const checkedItems = items.filter(item => item.isChecked)
      //累加价格
      checkedItems.forEach(item => {
        total += item.minPrice * item.num
      })
      total = parseFloat(total.toFixed(2))
      commit('calcTotal', total)
    }
  }
}

export default cart