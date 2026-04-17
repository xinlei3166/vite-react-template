import type { RouteObject } from 'react-router-dom'
import type { MenuItemProps } from 'tdesign-react'
import classNames from 'classnames'
import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useLocation, useMatches } from 'react-router-dom'
import { Layout, Menu } from 'tdesign-react'
import Iconfont from '@packages/components/icon'
import { useMenus } from '@/router'
import { useAppSelector, useAppDispatch, setTheme } from '@/store'
import Logo from './Logo'
import './Siderbar.less'

const { SubMenu, MenuItem } = Menu

type MenuItem = Required<MenuItemProps>

function Siderbar() {
  const routes = useMenus() as any[]
  const matchRoutes: any[] = useMatches()
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useAppSelector(state => state.theme)
  const dispatch = useAppDispatch()
  const [selectedValue, setSelectedValue] = useState<any>()

  const onChange = (value: any) => {
    setSelectedValue(value)
    navigate(value)
  }
  const menuRoutes: RouteObject[] = useMemo(
    () => routes.filter(r => !r.handle?.hidden && r.path),
    [routes]
  )

  const changeRoute = () => {
    const level = matchRoutes.length
    const route = matchRoutes.at(-1)
    const routeValue = level > 3 ? matchRoutes[2]?.pathname : route?.pathname
    if (selectedValue !== routeValue) {
      setSelectedValue(routeValue)
    }
  }

  const onCollapse = (collapsed: boolean) => {
    dispatch(setTheme({ collapsed }))
  }

  useEffect(() => {
    changeRoute()
  }, [location])

  const renderMenuItems = (menuRoutes: RouteObject[]) => {
    return menuRoutes.map(menu => {
      const childRoutes = (menu.children?.filter(r => !r.handle?.hidden && r.path) ||
        []) as RouteObject[]
      const link = menu.handle?.link
      if (link || childRoutes.length === 0) {
        return (
          <MenuItem
            key={menu.path!}
            value={menu.path!}
            icon={
              menu.handle?.icon ? (
                <Iconfont name={menu.handle?.icon} className="menu-item-icon" />
              ) : undefined
            }
            onClick={() => navigate(menu.path!)}
          >
            {menu.handle?.title}
          </MenuItem>
        )
      }
      return (
        <SubMenu
          key={menu.path!}
          value={menu.path!}
          title={menu.handle?.title}
          icon={
            menu.handle?.icon ? (
              <Iconfont name={menu.handle?.icon} className="menu-item-icon" />
            ) : undefined
          }
        >
          {renderMenuItems(childRoutes)}
        </SubMenu>
      )
    })
  }

  return (
    <Layout.Aside
      width="auto"
      className={classNames([
        'layout-sider',
        {
          'layout-sider-mix': theme.layout === 'mix',
          'layout-sider-side': theme.layout === 'side',
          'layout-sider-light': theme.theme === 'light'
        }
      ])}
      style={{
        paddingTop: theme.layout === 'mix' ? `calc(${theme.height} - 0px)` : '',
        width: 'fit-content'
      }}
    >
      <div className="layout-menu-wrap">
        <Menu
          width={[theme.width, theme.collapsedWidth]}
          collapsed={theme.collapsed}
          className={classNames('sider-menu')}
          theme={theme.theme}
          expandType={theme.expandType}
          value={selectedValue}
          onChange={onChange}
          logo={theme.layout !== 'mix' && <Logo />}
          operations={
            <div className="trigger-wrap" onClick={() => onCollapse(!theme.collapsed)}>
              {theme.collapsed ? (
                <Iconfont name="icon-indent" className="trigger text-4.5" />
              ) : (
                <Iconfont name="icon-outdent" className="trigger text-4.5" />
              )}
            </div>
          }
        >
          {renderMenuItems(menuRoutes)}
        </Menu>
      </div>
    </Layout.Aside>
  )
}

export default Siderbar
