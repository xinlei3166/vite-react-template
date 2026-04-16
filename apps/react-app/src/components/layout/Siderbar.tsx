import type { RouteObject } from 'react-router-dom'
import type { MenuItemProps } from 'tdesign-react'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useMount } from 'ahooks'
import classNames from 'classnames'
import { useState, useMemo, useEffect } from 'react'
import { useNavigate, useLocation, useMatches } from 'react-router-dom'
import { Layout, Menu } from 'tdesign-react'
import Icon from '@/components/icon'
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
                <Icon name={menu.handle?.icon} className="menu-item-icon" />
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
              <Icon name={menu.handle?.icon} className="menu-item-icon" />
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
      width={theme.width}
      className={classNames([
        'layout-sider',
        {
          'layout-sider-mix': theme.layout === 'mix'
        }
      ])}
      style={{
        paddingTop: theme.layout === 'mix' ? `calc(${theme.height} + 4px)` : ''
      }}
    >
      <div className="layout-menu-wrap">
        <Menu
          width={[theme.width, theme.collapsedWidth]}
          collapsed={theme.collapsed}
          className="sider-menu"
          theme={theme.theme}
          expandType={theme.expandType}
          value={selectedValue}
          onChange={onChange}
          logo={theme.layout !== 'mix' && <Logo />}
          operations={
            theme.collapsed ? (
              <MenuUnfoldOutlined className="trigger" onClick={() => onCollapse(false)} />
            ) : (
              <MenuFoldOutlined className="trigger" onClick={() => onCollapse(true)} />
            )
          }
        >
          {renderMenuItems(menuRoutes)}
        </Menu>
      </div>
    </Layout.Aside>
  )
}

export default Siderbar
