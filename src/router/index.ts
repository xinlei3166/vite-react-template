import loadingComponent from '@/components/loadable'
import { IRoute } from '@/interface'
import others from './others'
import components from './components'

export function useMenus() {
  return [...components, ...others] as IRoute[]
}

export function createRoutes(routes: IRoute[]) {
  const routerRoutes = []
  for (const route of routes) {
    const obj: any = {
      path: route.path,
      element: loadingComponent(route.element)
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
