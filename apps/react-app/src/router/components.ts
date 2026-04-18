// 存放左侧菜单相关的路由，icon不能为空
export default [
  {
    id: 'components',
    path: '/components',
    handle: { title: '常用组件', icon: 'icon-reloadtime' },
    element: () => import('@/components/layout/Router'),
    children: [
      {
        id: 'componentsRouter',
        path: '/components/router',
        handle: { title: 'router' },
        element: () => import('@/views/components/router')
      },
      {
        id: 'componentsStore',
        path: '/components/store',
        handle: { title: 'store' },
        element: () => import('@/views/components/store')
      },
      {
        id: 'componentsProvide',
        path: '/components/provide',
        handle: { title: 'provide' },
        element: () => import('@/views/components/provide')
      },
      {
        id: 'componentsBus',
        path: '/components/bus',
        handle: { title: 'bus' },
        element: () => import('@/views/components/bus')
      },
      {
        id: 'componentsSearch',
        path: '/components/search',
        handle: { title: 'search' },
        element: () => import('@packages/components/search/demo')
      },
      {
        id: 'componentsTable',
        path: '/components/table',
        handle: { title: 'table' },
        element: () => import('@packages/components/table/demo')
      },
      {
        id: 'componentsSortable',
        path: '/components/sortable',
        handle: { title: 'sortable' },
        element: () => import('@/views/components/sortable')
      }
    ]
  },
  {
    id: 'others',
    path: '/others',
    handle: { title: '其他组件', icon: 'icon-appstore' },
    element: () => import('@/components/layout/Router'),
    children: [
      {
        id: 'othersReact',
        path: '/others/react',
        handle: { title: 'react' },
        element: () => import('@/views/others/react')
      },
      {
        id: 'othersHello',
        path: '/others/hello',
        handle: { title: 'hello' },
        element: () => import('@/views/others/hello')
      },
      {
        id: 'othersForm',
        path: '/others/form',
        handle: { title: 'form' },
        element: () => import('@/views/others/form')
      },
      {
        id: 'othersStateUp',
        path: '/others/stateup',
        handle: { title: 'stateup' },
        element: () => import('@/views/others/stateup')
      },
      {
        id: 'othersCombinationInheritance',
        path: '/others/combination-inheritance',
        handle: { title: 'combination-inheritance' },
        element: () => import('@/views/others/combination-inheritance')
      },
      {
        id: 'othersTodo',
        path: '/others/todo',
        handle: { title: 'todo' },
        element: () => import('@/views/others/todo')
      }
    ]
  }
]
