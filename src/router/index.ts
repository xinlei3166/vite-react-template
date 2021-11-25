import { useRoutes as _useRoutes } from 'react-router-dom'
import loadable from '@/components/loadable'
import { IRoute } from '@/interface'
import others from './others'
import components from './components'
import { typeOf } from '@/utils'

const menus: IRoute[] = [...components, ...others]

export function useMenus() {
  return menus
}

export function createRoutes(routes: IRoute[]) {
  const routerRoutes = []
  for (const route of routes) {
    const element =
      typeOf(route.element) === 'function'
        ? loadable(route.element)
        : route.element
    const obj: any = {
      path: route.path,
      element
    }
    if (route.index) {
      obj.index = true
      delete obj.path
    }
    if (route.children && route.children.length > 0) {
      obj.children = createRoutes(route.children)
    }
    routerRoutes.push(obj)
  }
  return routerRoutes
}

export function useRoutes() {
  // 这里只能有一个首页组件，添加其他组件在routes配置
  const routes: IRoute[] = [
    {
      path: '/',
      element: () => import('@/components/layout'),
      children: menus
    },
    {
      hidden: true,
      path: '*',
      element: () => import('@/views/404/Navigate')
    }
  ]

  return function App() {
    return _useRoutes(createRoutes(routes))
  }
}
