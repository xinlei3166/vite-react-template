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
  },
  {
    id: 'browserIncompatible',
    path: '/browser-incompatible',
    handle: { title: '浏览器不兼容', hidden: true, noUseLayout: true },
    element: () => import('@/components/exception/BrowserIncompatible')
  },
  {
    id: 'maintenance',
    path: '/maintenance',
    handle: { title: '系统维护', hidden: true, noUseLayout: true },
    element: () => import('@/components/exception/Maintenance')
  },
  {
    id: 'networkError',
    path: '/network-error',
    handle: { title: '网络异常', hidden: true, noUseLayout: true },
    element: () => import('@/components/exception/NetworkError')
  },
  {
    id: 'success',
    path: '/success',
    handle: { title: '成功', hidden: true, noUseLayout: true },
    element: () => import('@/components/exception/Success')
  },
  {
    id: 'fail',
    path: '/fail',
    handle: { title: '失败', hidden: true, noUseLayout: true },
    element: () => import('@/components/exception/Fail')
  }
]

export const noUseLayoutPaths = routes.filter(r => r.handle?.noUseLayout).map(x => x.path)

export default routes
