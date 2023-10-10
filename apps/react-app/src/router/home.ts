const routes = [
  {
    id: 'home',
    index: true,
    path: '/',
    handle: { title: '首页', icon: 'iconhome', link: true },
    element: () => import('@/views/home')
  },
  {
    id: 'login',
    path: '/login',
    handle: { title: '登录', hidden: true, noUseLayout: true },
    element: () => import('@/views/login')
  },
  {
    id: '404',
    path: '/404',
    handle: { title: '404', hidden: true, noUseLayout: true },
    element: () => import('@/views/404')
  }
]

export const noUseLayoutPaths = routes
  .filter(r => r.handle?.noUseLayout)
  .map(x => x.path)

export default routes
