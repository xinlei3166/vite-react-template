import { useState, useMemo } from 'react'
import { ConfigProvider, Layout, Menu } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import useBreadcrumbs, { BreadcrumbData } from 'use-react-router-breadcrumbs'
import { useMount } from 'react-use'
import classNames from 'classnames'
import Nav from './Nav'
import Breadcrumb from './Breadcrumb'
import Setting from './Setting'
import { IRoute } from '@/interface'
import { useMenus } from '@/router'
import { RootState } from '@/store'
import logo from '@/assets/logo.svg'
import Icon from '@/components/icon'
import './index.less'

interface MenuItem extends IRoute {}

// const areEqual = (
//   prevProps: PropsWithChildren<any>,
//   nextProps: PropsWithChildren<any>
// ) => {
//   return prevProps.location?.pathname === nextProps.location?.pathname
// }

function BaseLayout() {
  const location = useLocation()
  const routes = useMenus()
  const theme = useSelector((state: RootState) => state.theme)
  const dispatch = useDispatch()
  const [selectedKeys, setSelectedKeys] = useState<any[]>([])
  const [openKeys, setOpenKeys] = useState<any[]>([])

  const onOpenChange = (keys: any[]) => {
    setOpenKeys(keys)
  }

  const onClick = ({ key, keyPath }: Record<string, any>) => {
    setOpenKeys(keyPath.slice(1))
    setSelectedKeys([key])
  }

  const menuRoutes = useMemo(
    () => routes.filter(r => !r.hidden && r.path) as MenuItem[],
    [routes]
  )

  const findMenuRoute = () =>
    menuRoutes.find(m => {
      const pattern = new RegExp(`^${m.path}`)
      return pattern.test(location?.pathname as string)
    })

  const findItemRoute = (menuRoute: MenuItem) =>
    menuRoute.children?.find(r => r.path === (location?.pathname as string))

  // todo 此处暂时硬编码，子路由的path必须包含父路由的path, /parent -> /parent/child
  const changeRoute = () => {
    const menuRoute = findMenuRoute()
    setOpenKeys([menuRoute?.name])
    if (menuRoute && !theme.collapsed) {
      const itemRoute = findItemRoute(menuRoute)
      setSelectedKeys([itemRoute?.name])
    }
  }

  const setTheme = (payload: Record<string, any>) => {
    dispatch({ type: 'theme/changeTheme', payload })
  }

  const onCollapse = () => {
    const collapsed = !theme.collapsed
    setTheme({ collapsed })
    if (collapsed) {
      setOpenKeys([])
    } else {
      changeRoute()
    }
  }

  useMount(() => {
    changeRoute()
  })

  // login layout
  if (location?.pathname === '/login') {
    return (
      <ConfigProvider locale={zhCN}>
        <Outlet />
      </ConfigProvider>
    )
  }

  // menu
  const menuItem = (menu: MenuItem) =>
    location?.pathname === menu.path ? (
      <span className="menu-item-link">
        <Icon type={menu.icon!} className="icon" />
        <span className="menu-item-title">{menu.breadcrumb}</span>
      </span>
    ) : (
      <Link className="menu-item-link" to={menu.path!}>
        <Icon type={menu.icon!} className="icon" />
        <span className="menu-item-title">{menu.breadcrumb}</span>
      </Link>
    )

  const menuItems = (menus: MenuItem[]) =>
    menus.map(menu => <Menu.Item key={menu.name}>{menuItem(menu)}</Menu.Item>)

  const subMenus = (menus: MenuItem[]) =>
    menus.map(menu => (
      <Menu.SubMenu
        key={menu.name}
        title={<span className="menu-item-title">{menu.breadcrumb}</span>}
        icon={<Icon type={menu.icon!} className="icon" />}
      >
        {menu.children &&
          menuItems(menu.children.filter(r => !r.hidden && r.path))}
      </Menu.SubMenu>
    ))

  const _breadcrumbs: any = useBreadcrumbs(
    [
      ...routes.filter(r => r.path),
      {
        breadcrumb: '首页',
        name: 'home',
        path: '/'
      } as any
    ],
    { disableDefaults: true }
  )

  const breadcrumbs = useMemo(() => _breadcrumbs, [location])

  const route = breadcrumbs.find(
    (breadcrumb: BreadcrumbData) =>
      breadcrumb.match.pathname === location?.pathname
  )

  const title = route?.breadcrumb?.props.children
    ? `${route.breadcrumb?.props?.children} - vite-react-template`
    : 'vite-react-template'

  return (
    <ConfigProvider locale={zhCN}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Layout id="layout" style={{ overflow: 'auto', height: '100vh' }}>
        <div
          className="layout-fixed-stuff"
          style={{
            width: theme.collapsed ? theme.collapsedWidth : theme.width
          }}
        ></div>
        <Layout.Sider
          collapsible
          collapsed={theme.collapsed}
          trigger={null}
          theme={theme.theme}
          width={theme.width}
          collapsedWidth={theme.collapsedWidth}
          className={classNames('layout-sider', {
            'show-name': theme.showSubMenuName
          })}
        >
          <div className="logo">
            <Link to="/" className="logo-link">
              <img className="logo-img" src={logo} alt="logo" />
              {!theme.collapsed ? (
                <h1 className="logo-text">React Demo</h1>
              ) : null}
            </Link>
          </div>
          <div className="layout-menu-wrap">
            <Menu
              selectedKeys={selectedKeys}
              openKeys={openKeys}
              className="sider-menu"
              theme={theme.theme}
              mode={theme.mode}
              onOpenChange={onOpenChange}
              onClick={onClick}
            >
              {subMenus(menuRoutes)}
            </Menu>
          </div>
        </Layout.Sider>
        <Layout>
          <Layout.Header className="layout-header">
            {theme.collapsed ? (
              <MenuUnfoldOutlined className="trigger" onClick={onCollapse} />
            ) : (
              <MenuFoldOutlined className="trigger" onClick={onCollapse} />
            )}
            <Nav />
          </Layout.Header>
          <Layout.Content className="layout-content-wrap">
            {theme.showBreadcrumb ? (
              <div className="layout-breadcrumb">
                <Breadcrumb location={location} breadcrumbs={breadcrumbs} />
              </div>
            ) : null}
            <div className="layout-content">
              <Outlet />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
      <Setting />
    </ConfigProvider>
  )
}

export default BaseLayout
