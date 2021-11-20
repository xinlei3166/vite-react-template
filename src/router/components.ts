// 存放左侧菜单相关的路由，icon不能为空
export default [
  {
    icon: 'iconreloadtime',
    breadcrumb: '常用组件',
    name: 'components',
    path: '/components',
    element: () => import('@/components/layout/Outlet'),
    children: [
      {
        icon: 'iconreloadtime',
        breadcrumb: 'router',
        name: 'components_router',
        path: '/components/router',
        element: () => import('@/views/components/router')
      },
      {
        icon: 'iconunorderedlist',
        breadcrumb: 'store',
        name: 'components_store',
        path: '/components/store',
        element: () => import('@/views/components/store')
      },
      {
        icon: 'iconappstoreadd',
        breadcrumb: 'provide',
        name: 'components_provide',
        path: '/components/provide',
        element: () => import('@/views/components/provide')
      },
      {
        icon: 'iconuser',
        breadcrumb: 'bus',
        name: 'components_bus',
        path: '/components/bus',
        element: () => import('@/views/components/bus')
      },
      {
        icon: 'iconappstore',
        breadcrumb: 'table',
        name: 'components_table',
        path: '/components/table',
        element: () => import('@/views/components/table')
      },
      {
        icon: 'iconappstore',
        breadcrumb: 'fixed-table',
        name: 'components_fixedtable',
        path: '/components/fixed-table',
        element: () => import('@/views/components/table/fixed')
      },
      {
        icon: 'iconsetting',
        breadcrumb: 'draggable',
        name: 'components_draggable',
        path: '/components/draggable',
        element: () => import('@/views/components/draggable')
      }
    ]
  },
  {
    icon: 'iconappstore',
    breadcrumb: '其他组件',
    name: 'others',
    path: '/others',
    element: () => import('@/components/layout/Outlet'),
    children: [
      {
        icon: 'iconsearch',
        breadcrumb: 'search',
        name: 'search',
        path: '/others/search',
        element: () => import('@/components/search/demo')
      },
      {
        icon: 'iconsetting',
        breadcrumb: 'react',
        name: 'others_react',
        path: '/others/react',
        element: () => import('@/views/others/react')
      },
      {
        icon: 'iconsetting',
        breadcrumb: 'hello',
        name: 'others_hello',
        path: '/others/hello',
        element: () => import('@/views/others/hello')
      },
      {
        icon: 'iconsetting',
        breadcrumb: 'form',
        name: 'others_form',
        path: '/others/form',
        element: () => import('@/views/others/form')
      },
      {
        icon: 'iconsetting',
        breadcrumb: 'stateup',
        name: 'others_stateup',
        path: '/others/stateup',
        element: () => import('@/views/others/stateup')
      },
      {
        icon: 'iconsetting',
        breadcrumb: 'combination-inheritance',
        name: 'others_combinationinheritance',
        path: '/others/combination-inheritance',
        element: () => import('@/views/others/combination-inheritance')
      },
      {
        icon: 'iconsetting',
        breadcrumb: 'todo',
        name: 'others_todo',
        path: '/others/todo',
        element: () => import('@/views/others/todo')
      }
    ]
  }
]
