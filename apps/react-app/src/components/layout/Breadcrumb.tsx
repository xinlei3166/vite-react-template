import type { BreadcrumbProps } from 'tdesign-react'
import { memo } from 'react'
import { Link, useNavigate, useLocation, useMatches } from 'react-router-dom'
import { Breadcrumb } from 'tdesign-react'

function cleanupBreadcrumbs(breadcrumbs: any[]) {
  breadcrumbs[breadcrumbs.length - 1].unlink = true
  breadcrumbs[breadcrumbs.length - 1].to = undefined
  if (breadcrumbs.length > 1) {
    return breadcrumbs.slice(1)
  }
  return breadcrumbs
}

function BaseBreadcrumb() {
  const matchRoutes = useMatches()
  const breadcrumbs = cleanupBreadcrumbs(
    matchRoutes.map((r: Record<string, any>) => ({
      pathname: r.pathname,
      params: r.params,
      handle: r.handle,
      content: r.handle?.title,
      to: r.handle?.firstChildrenRoutePath || r.pathname
    }))
  ) as BreadcrumbProps['options']
  // const paths = breadcrumbs.map((breadcrumb: any) => breadcrumb.to)
  // const navigate = useNavigate()
  // const location = useLocation()
  // if (!paths.includes(location?.pathname)) {
  //   navigate('/404')
  // }

  return <Breadcrumb options={breadcrumbs} />
}

export default memo(BaseBreadcrumb)
