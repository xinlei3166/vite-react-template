import { useMount } from 'ahooks'
import classNames from 'classnames'
import { Helmet } from 'react-helmet'
import { Outlet, useLocation, useMatches, useOutletContext } from 'react-router-dom'
import { Layout } from 'tdesign-react'
import { noUseLayoutPaths } from '@/router/home'
import { useAppSelector, useAppDispatch } from '@/store'
import Breadcrumb from './Breadcrumb'
import Logo from './Logo'
import Nav from './Nav'
import Setting from './Setting'
import Siderbar from './Siderbar'
import './index.less'

function BaseLayout() {
  // const props: any = useOutletContext()
  const matchRoutes = useMatches()
  const location = useLocation()
  const theme = useAppSelector(state => state.theme)
  const dispatch = useAppDispatch()

  // don't use layout
  if (noUseLayoutPaths.includes(location?.pathname)) {
    return <Outlet />
  }

  const route = matchRoutes.at(-1)
  // @ts-ignore
  const routeTitle = route?.handle?.title ? `${route?.handle?.title} - ` : ''
  const title = `${routeTitle}vite-react-template`

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Layout
        id="layout"
        style={
          {
            // flexDirection: theme.layout === 'mix' ? 'row' : 'column',
            flexDirection: 'row',
            overflow: 'auto',
            height: '100vh',
            '--theme-height': theme.height
          } as any
        }
      >
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
              className={classNames(['layout-header-mix', { dark: !theme.headerTheme }])}
              style={{ height: theme.height, lineHeight: theme.height }}
            >
              <Logo />
              <Layout.Header
                className={classNames(['layout-header'])}
                style={{ height: theme.height, lineHeight: theme.height }}
              >
                <Nav />
              </Layout.Header>
            </header>
          ) : (
            <Layout.Header
              className={classNames([
                'layout-header',
                { light: theme.theme === 'light', dark: theme.theme === 'dark' }
              ])}
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
    </>
  )
}

export default BaseLayout
