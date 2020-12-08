import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    //meta路由源信息
    meta: {
      isNeedLogin: false
    }
  },
  {
    path: '/cates',
    name: 'cates',
    //路由懒加载
    component: () => import('@views/Cates'),
    meta: {
      isNeedLogin: false
    }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@views/Cart'),
    meta: {
      isNeedLogin: false
    }
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('@views/Mine'),
    meta: {
      isNeedLogin: true
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@views/Detail'),
    meta: {
      isNeedLogin: false
    }
  },
  {
    path: '/itemLists/:categoryId',
    name: 'itemLists',
    component: () => import('@views/ItemLists'),
    meta: {
      isNeedLogin: false
    }
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('@views/Order'),
    meta: {
      isNeedLogin: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@views/Login'),
    meta: {
      isNeedLogin: false
    }
  },
  {
    path: '/contactAdd',
    name: 'contactAdd',
    component: () => import('@views/ContactAdd'),
    meta: {
      isNeedLogin: true
    }
  },
  {
    path: '/contactEdit',
    name: 'contactEdit',
    component: () => import('@views/ContactEdit'),
    meta: {
      isNeedLogin: true
    }
  },
  {
    path: '/contactLists',
    name: 'contactLists',
    component: () => import('@views/ContactLists'),
    meta: {
      isNeedLogin: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@views/Search'),
    meta: {
      isNeedLogin: false
    }
  },
  {
    path: '/searchResult',
    name: 'searchResult',
    component: () => import('@views/SearchResult'),
    meta: {
      isNeedLogin: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//登录鉴权 access_token 秘钥 ,全局守卫,to.fullpath来判断路由
router.beforeEach((to, from, next) => {
  // console.log(to,from); //还可以通过to.meta来判断是否需要登录
  if (to.fullPath === '/login' || to.fullPath === '/register') {
    //直接放行
    next()
  } else {
    //这里需要判断前往的路由是否需要登录
    if (to.meta.isNeedLogin) {
      //这里是需要登录的,再判断是否能拿到存储过的token秘钥
      if (localStorage.getItem('access_token')) {
        //如果能取到，放行
        next()
      } else {
        //重定向,并传递参数为重定向之前的路由信息
        next({
          name: 'login',
          params: {
            //向前端返回一个路由信息，登录成功之后去的页面
            from: to.fullPath
          }
        })
      }
    } else {
      next()
    }
  }
})

export default router
