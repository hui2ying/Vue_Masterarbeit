import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('./views/home/Home'),
    meta: {
      requireLogin: true,
    },
    children: [
      {
        path: "",
        component: () => import('./views/home/HomeRight')
      },
      {
        path: 'order',
        component: () => import('./views/order/Order'),
        redirect: 'order/ordered',
        children: [
          {
            path: 'ordered',
            component: () => import('./views/order/Ordered'),
          },
          {
            path: 'shopped',
            component: () => import('./views/order/Shopped'),
          }
        ]
      },
      {
        path: 'table',
        component: () => import('./views/Table')
      },
    ]
  },
  {
    path: '/login',
    component: () => import('./views/Login'),
    beforeEnter(to, from, next) {
      if (localStorage.getItem('order:isLogin') != null) {
        // 登录状态，跳转到首页
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/admin',
    component: () => import('./views/admin/Admin'),
    meta: {
      requireLogin: true,
    },
    redirect: 'admin/category',
    children: [
      {
        path: 'category',
        component: () => import('./views/admin/DishCategory')
      },
      {
        path: 'dish',
        component: () => import('./views/admin/DishEdit')
      },
      {
        path: 'table',
        component: () => import('./views/admin/Table')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'active',
  linkActiveClass: 'ac',
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  // 全局守卫
  const isRequire = to.matched.some(item => item.meta.requireLogin);

  if (isRequire) {
    if (localStorage.getItem('order:isLogin') == null) {
      next('/login')
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router