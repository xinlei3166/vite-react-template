import { createBrowserRouter } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import loadable from '@/components/loadable'
import home from './home'
import components from './components'
import { typeOf } from '@packages/utils'
import Layout from '@/components/layout'
import Error404 from '@/views/404'

const menus = [...home, ...components]

export function useMenus() {
  return menus
}

export function createRoutes(routes: any[]) {
  const routerRoutes: RouteObject[] = []
  for (const route of routes) {
    const element =
      typeOf(route.element) === 'function'
        ? loadable(route.element)
        : route.element
    const obj = { ...route, element }
    if (route.children && route.children.length > 0) {
      obj.children = createRoutes(route.children)
    }
    routerRoutes.push(obj)
  }
  return routerRoutes as RouteObject[]
}

export const useRouter = () => {
  return createBrowserRouter(
    [
      {
        path: '/',
        Component: Layout,
        children: createRoutes(menus)
      },
      {
        path: '*',
        Component: Error404
      }
    ],
    { basename: import.meta.env.BASE_URL }
  )
}

export default useRouter()
