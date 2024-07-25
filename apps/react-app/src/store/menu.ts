import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserMenu } from '@/api'
// import { errorRoute } from '@/router/common'

const components = import.meta.glob('@/views/**/*.vue')
const features = import.meta.glob('features/**/*.vue')

export interface LeftMenu {
  index: boolean
  path: string
  handle: {
    name: string
    title: string
    icon?: string
    link?: boolean
    hidden?: boolean
    auth?: boolean
    menu?: string
    [key: string]: any
  }
  element?: any
  children?: LeftMenu[]
  caseSensitive?: boolean
  redirect?: any
  [key: string]: any
}
export interface MenuState {
  menus: Record<string, any>[]
  leftMenus: LeftMenu[]
  routeMenus: LeftMenu[]
  hasSetRoutes: boolean
}
const initialState: MenuState = {
  menus: [],
  leftMenus: [],
  routeMenus: [],
  hasSetRoutes: false
}

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenus(state: MenuState, action: PayloadAction<MenuState['menus']>) {
      return { ...state, menus: action.payload }
    },
    setLeftMenus(
      state: MenuState,
      action: PayloadAction<MenuState['leftMenus']>
    ) {
      return { ...state, leftMenus: action.payload }
    },
    setRouteMenus(
      state: MenuState,
      action: PayloadAction<MenuState['routeMenus']>
    ) {
      return { ...state, routeMenus: action.payload }
    },
    cleanupMenu(state: MenuState) {
      return { ...state, menus: [], leftMenus: [], routeMenus: [] }
    },
    setMenuState(state: MenuState, action: PayloadAction<Partial<MenuState>>) {
      return { ...state, ...action.payload }
    }
  }
})

export const {
  setMenus,
  setLeftMenus,
  setRouteMenus,
  cleanupMenu,
  setMenuState
} = menuSlice.actions

export default menuSlice.reducer

export const fetchMenus = createAsyncThunk(
  'menu/fetchMenus',
  async (_, { dispatch }) => {
    const res: any = await getUserMenu()
    if (!res || res.code !== 0) {
      dispatch(setMenuState({ hasSetRoutes: true }))
      return
    }
    const menus: Record<string, any>[] = (res.data || []).filter(
      (m: Record<string, any>) => m.menuType === 1
    )
    menus.sort(sorter)
    dispatch(setMenus(menus))
    let routesMenus: Record<string, any> = []
    routesMenus = routesMenus.concat(generateRouteMenus(menus))
    // routesMenus.push(errorRoute)
    dispatch(setRouteMenus(routesMenus as MenuState['leftMenus']))
    dispatch(
      setLeftMenus(
        routesMenus.filter(
          (r: Record<string, any>) => r.path !== '/:pathMatch(.*)*'
        ) as MenuState['leftMenus']
      )
    )
    dispatch(setMenuState({ hasSetRoutes: true }))
  }
)

// generateRouteMenus
const layouts = {
  layout: () => import('../components/layout/index'),
  routerView: () => import('../components/layout/Router')
}

function _import(path: string) {
  return components['/src/views' + path] || features['../../features' + path]
}

const sorter = (a: Record<string, any>, b: Record<string, any>) =>
  (a.priority || 0) - (b.priority || 0)

const generateRouteMenus = (
  menus: Record<string, any>[],
  parentMenu?: string,
  level = 1
) => {
  menus.sort(sorter)
  return menus.map(menu => {
    const {
      menuName: title,
      icon,
      expand,
      hidden,
      menuCode: name,
      element: _component,
      menuUri: path,
      redirect,
      childMenuList: _childMenuList = []
    } = menu
    const link = !expand
    // 第一级路由使用main layout,其他使用route-view
    const layout = level === 1 ? layouts.layout : layouts.routerView
    const element = _component === 'layout' ? layout : _import(_component)
    const parentMenuName = level === 1 ? parentMenu : undefined
    const routeModel = {
      path,
      handle: { name, title, icon, hidden, link, menu: parentMenuName },
      redirect,
      element
    }

    let hiddenChildren: any[] = []
    const route: Record<string, any> = {
      ...routeModel,
      handle: { ...routeModel.handle },
      children: []
    }
    const childMenuList = _childMenuList.filter(
      (m: Record<string, any>) => m.menuType === 1
    )
    const childrenLength =
      childMenuList?.length ? childMenuList.length : 0
    const needHandleConditions: any[] = [
      level === 1 && link && !hidden,
      level > 1 && link && !hidden && _childMenuList?.length
    ]

    if (needHandleConditions.some(x => x)) {
      hiddenChildren = [
        {
          ...routeModel,
          handle: { ...routeModel.handle, hidden: true, link: false },
          redirect: undefined
        }
      ]
      route.name = name + '__hidden'
      route.layout = layout
      route.children = [...hiddenChildren]
    }

    // 判断是否存在子路由
    if (childrenLength) {
      route.children = [
        ...route.children,
        ...generateRouteMenus(menu.childMenuList, parentMenu, level + 1)
      ]
      if (level === 1 && _component === 'layout') {
        route.handle.firstChildrenRoutePath = route.children[0].path
      }
    }

    return route
  })
}
