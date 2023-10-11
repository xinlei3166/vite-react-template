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
    id: '403',
    path: '/403',
    handle: { title: '403', hidden: true, noUseLayout: true },
    element: () => import('@/components/exception/403')
  },
  {
    id: '404',
    path: '/404',
    handle: { title: '404', hidden: true, noUseLayout: true },
    element: () => import('@/components/exception/404')
  },
  {
    id: '500',
    path: '/500',
    handle: { title: '500', hidden: true, noUseLayout: true },
    element: () => import('@/components/exception/500')
  }
]

export const noUseLayoutPaths = routes
  .filter(r => r.handle?.noUseLayout)
  .map(x => x.path)

export default routes
