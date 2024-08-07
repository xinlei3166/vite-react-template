import { useState, useMemo, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import type { MenuProps } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useNavigate, useLocation, useMatches } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { useMount } from 'ahooks'
import classNames from 'classnames'
import { useMenus } from '@/router'
import { useAppSelector, useAppDispatch, setTheme } from '@/store'
import Icon from '@/components/icon'
import Logo from './Logo'
import './Siderbar.less'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

function Siderbar() {
  const routes = useMenus() as any[]
  const matchRoutes: any[] = useMatches()
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useAppSelector(state => state.theme)
  const dispatch = useAppDispatch()
  const [selectedKeys, setSelectedKeys] = useState<any[]>([])
  const [openKeys, setOpenKeys] = useState<any[]>([])

  const onOpenChange = (keys: any[]) => {
    setOpenKeys(keys)
  }

  const onClick = ({ item, key, keyPath }: Record<string, any>) => {
    setOpenKeys(keyPath.slice(1))
    setSelectedKeys([key])
    navigate(key)
  }
  const menuRoutes: RouteObject[] = useMemo(
    () => routes.filter(r => !r.handle?.hidden && r.path),
    [routes]
  )

  const changeRoute = (force?: boolean) => {
    const level = matchRoutes.length
    const route = matchRoutes.at(-1)
    const routeKey = level > 3 ? matchRoutes[2]?.pathname : route?.pathname
    if (!selectedKeys.includes(routeKey)) {
      setSelectedKeys([routeKey])
    }
    if (!theme.collapsed || force) {
      setOpenKeys([matchRoutes[1]?.pathname])
    }
  }

  const onCollapse = (collapsed: boolean) => {
    dispatch(setTheme({ collapsed }))
    if (collapsed) {
      setOpenKeys([])
    } else {
      changeRoute(true)
    }
  }

  useEffect(() => {
    changeRoute()
  }, [location])

  const items: MenuItem[] = [
    ...menuRoutes.map(menu => {
      const childRoutes =
        menu.children?.filter(r => !r.handle?.hidden && r.path) || []
      const children = childRoutes.map(c =>
        getItem(
          <span className="ant-menu-title-content">
            <span className="menu-item-title">{c.handle?.title}</span>
          </span>,
          c.path!
          // <Icon type={c.handle?.icon} className="menu-item-icon" />
        )
      )
      const link = menu.handle?.link
      return getItem(
        <span className="ant-menu-title-content">
          <span className="menu-item-title">{menu.handle?.title}</span>
        </span>,
        menu.path!,
        <Icon type={menu.handle?.icon || ''} className="menu-item-icon" />,
        link ? undefined : children
      )
    })
  ]

  return (
    <Layout.Sider
      collapsible
      collapsed={theme.collapsed}
      trigger={
        theme.collapsed ? (
          <MenuUnfoldOutlined className="trigger" />
        ) : (
          <MenuFoldOutlined className="trigger" />
        )
      }
      onCollapse={onCollapse}
      theme={theme.theme}
      width={theme.width}
      collapsedWidth={theme.collapsedWidth}
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
      {theme.layout !== 'mix' && <Logo />}
      <div className="layout-menu-wrap">
        <Menu
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          className="sider-menu"
          theme={theme.theme}
          mode={theme.mode}
          onOpenChange={onOpenChange}
          onClick={onClick}
          items={items}
        />
      </div>
    </Layout.Sider>
  )
}

export default Siderbar
