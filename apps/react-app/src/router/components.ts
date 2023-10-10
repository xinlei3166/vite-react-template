// 存放左侧菜单相关的路由，icon不能为空
export default [
  {
    id: 'components',
    path: '/components',
    handle: { title: '常用组件', icon: 'iconreloadtime' },
    element: () => import('@/components/layout/Router'),
    children: [
      {
        id: 'components_router',
        path: '/components/router',
        handle: { title: 'router', icon: 'iconreloadtime' },
        element: () => import('@/views/components/router')
      },
      {
        id: 'components_store',
        path: '/components/store',
        handle: { title: 'store', icon: 'iconunorderedlist' },
        element: () => import('@/views/components/store')
      },
      {
        id: 'components_provide',
        path: '/components/provide',
        handle: { title: 'provide', icon: 'iconappstoreadd' },
        element: () => import('@/views/components/provide')
      },
      {
        id: 'components_bus',
        path: '/components/bus',
        handle: { title: 'bus', icon: 'iconuser' },
        element: () => import('@/views/components/bus')
      },
      {
        id: 'components_table',
        path: '/components/table',
        handle: { title: 'table', icon: 'iconappstore' },
        element: () => import('@/views/components/table')
      },
      {
        id: 'components_fixedtable',
        path: '/components/fixed-table',
        handle: { title: 'fixed-table', icon: 'iconappstore' },
        element: () => import('@/views/components/table/fixed')
      },
      {
        id: 'components_sortable',
        path: '/components/sortable',
        handle: { title: 'sortable', icon: 'iconsetting' },
        element: () => import('@/views/components/sortable')
      }
    ]
  },
  {
    id: 'others',
    path: '/others',
    handle: { title: '其他组件', icon: 'iconappstore' },
    element: () => import('@/components/layout/Router'),
    children: [
      {
        id: 'search',
        path: '/others/search',
        handle: { title: 'search', icon: 'iconsearch' },
        element: () => import('@/components/search/demo')
      },
      {
        id: 'others_react',
        path: '/others/react',
        handle: { title: 'react', icon: 'iconsetting' },
        element: () => import('@/views/others/react')
      },
      {
        id: 'others_hello',
        path: '/others/hello',
        handle: { title: 'hello', icon: 'iconsetting' },
        element: () => import('@/views/others/hello')
      },
      {
        id: 'others_form',
        path: '/others/form',
        handle: { title: 'form', icon: 'iconsetting' },
        element: () => import('@/views/others/form')
      },
      {
        id: 'others_stateup',
        path: '/others/stateup',
        handle: { title: 'stateup', icon: 'iconsetting' },
        element: () => import('@/views/others/stateup')
      },
      {
        id: 'others_combinationinheritance',
        path: '/others/combination-inheritance',
        handle: { title: 'combination-inheritance', icon: 'iconsetting' },
        element: () => import('@/views/others/combination-inheritance')
      },
      {
        id: 'others_todo',
        path: '/others/todo',
        handle: { title: 'todo', icon: 'iconsetting' },
        element: () => import('@/views/others/todo')
      }
    ]
  }
]
