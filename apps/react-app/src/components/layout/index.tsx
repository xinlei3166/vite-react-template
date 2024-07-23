import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import {
  Outlet,
  useLocation,
  useMatches,
  useOutletContext
} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useMount } from 'ahooks'
import classNames from 'classnames'
import Nav from './Nav'
import Siderbar from './Siderbar'
import Breadcrumb from './Breadcrumb'
import Setting from './Setting'
import Logo from './Logo'
import TokenContextHolder from '@packages/token/TokenContextHolder'
import { useAppSelector, useAppDispatch } from '@/store'
import { noUseLayoutPaths } from '@/router/home'
import './index.less'

function BaseLayout() {
  // const props: any = useOutletContext()
  const matchRoutes = useMatches()
  const location = useLocation()
  const theme = useAppSelector(state => state.theme)
  const dispatch = useAppDispatch()

  const configProvider = {
    locale: zhCN,
    theme: { token: theme.token }
  }

  // don't use layout
  if (noUseLayoutPaths.includes(location?.pathname)) {
    return (
      <ConfigProvider {...configProvider}>
        <TokenContextHolder />
        <Outlet />
      </ConfigProvider>
    )
  }

  const route = matchRoutes.at(-1)
  // @ts-ignore
  const routeTitle = route?.route?.title ? `${route?.route?.title} - ` : ''
  const title = `${routeTitle}vite-react-template`

  return (
    <ConfigProvider {...configProvider}>
      <TokenContextHolder />
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Layout id="layout" style={{ overflow: 'auto', height: '100vh' }}>
        <div
          className="layout-fixed-stuff"
          style={{
            width: theme.collapsed ? theme.collapsedWidth : theme.width
          }}
        />
        <Siderbar />
        <Layout>
          {theme.layout === 'mix' ? (
            <header
              className={classNames([
                'layout-header-mix',
                { dark: !theme.headerTheme }
              ])}
              style={{ height: theme.height, lineHeight: theme.height }}
            >
              <Logo />
              <Layout.Header
                className="layout-header"
                style={{ height: theme.height, lineHeight: theme.height }}
              >
                <Nav />
              </Layout.Header>
            </header>
          ) : (
            <Layout.Header
              className="layout-header"
              style={{ height: theme.height, lineHeight: theme.height }}
            >
              <Nav />
            </Layout.Header>
          )}
          <Layout.Content
            className={classNames([
              'layout-content-wrap',
              { 'layout-content-wrap-mix': theme.layout === 'mix' }
            ])}
            style={{
              marginTop: theme.layout === 'mix' ? theme.height : ''
            }}
          >
            {theme.showBreadcrumb ? (
              <div className="layout-breadcrumb">
                <Breadcrumb />
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
