import { memo } from 'react'
import { Breadcrumb } from 'antd'
import { Link, useNavigate, useLocation, useMatches } from 'react-router-dom'

function cleanupBreadcrumbs(breadcrumbs: any[]) {
  breadcrumbs[breadcrumbs.length - 1].unlink = true
  if (breadcrumbs.length > 1) {
    return breadcrumbs.slice(1)
  }
  return breadcrumbs
}

function BaseBreadcrumb() {
  const matchRoutes = useMatches()
  const breadcrumbs = cleanupBreadcrumbs(
    matchRoutes.map((r: Record<string, any>) => ({
      name: r.name,
      pathname: r.pathname,
      handle: r.handle
    }))
  )
  // const paths = breadcrumbs.map(
  //   (breadcrumb: BreadcrumbsRoute) => breadcrumb.match.path
  // )
  // const navigate = useNavigate()
  // const location = useLocation()
  // if (!paths.includes(location?.pathname)) {
  //   navigate('/404')
  // }
  const items = breadcrumbs.map(breadcrumb => {
    const title = breadcrumb.unlink ? (
      breadcrumb.handle?.title
    ) : (
      <Link to={breadcrumb.handle.firstChildrenRoutePath || breadcrumb.path}>
        {breadcrumb.handle?.title}
      </Link>
    )
    return { title }
  })

  return <Breadcrumb items={items} />
}

export default memo(BaseBreadcrumb)
