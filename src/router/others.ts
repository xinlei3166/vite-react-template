export default [
  // {
  //   hidden: true,
  //   breadcrumb: '首页',
  //   name: 'home',
  //   index: true,
  //   element: () => import('@/views/home')
  // },
  {
    hidden: true,
    breadcrumb: '登录',
    name: 'login',
    path: '/login',
    element: () => import('@/views/login')
  },
  {
    hidden: true,
    breadcrumb: '404',
    name: '404',
    path: '/404',
    element: () => import('@/views/404')
  }
]
