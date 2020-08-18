import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登陆',
      icon: 'el-icon-setting',
    }
  },

  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '主页',
      icon: 'el-icon-s-home',
    },
  //   children: [
  //     {path: '/child',
  //     name: 'child'}
  // ]
  }
]

const router = new VueRouter({
  routes
})


// 挂载路由守卫实现没有登陆无法访问页面
router.beforeEach((to, from, next) => {
  // 如果访问的是用户登录页，直接放行
  if (to.path === '/login') return next();
  // 如果访问的不是用户登录页，先判断 token 值
  const token = window.sessionStorage.getItem('token')
  // 如果没有token，强制跳转登陆页
  if (!token) {
    return next('/login')
  }
  return next()
})
export default router
