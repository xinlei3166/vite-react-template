export default [
  {
    hidden: true,
    breadcrumb: '首页',
    name: 'home',
    noLazy: true,
    index: true,
    element: () => import('@/views/home')
  },
  {
    hidden: true,
    path: '/404',
    element: () => import('@/components/layout/Outlet'),
    children: [
      {
        hidden: true,
        breadcrumb: '404',
        name: '404',
        index: true,
        element: () => import('@/views/404')
      }
    ]
  },
  {
    hidden: true,
    breadcrumb: '登录',
    name: 'login',
    path: '/login',
    element: () => import('@/views/login')
  },
  {
    hidden: true,
    path: '*',
    element: () => import('@/views/404/Navigate')
  }
]
