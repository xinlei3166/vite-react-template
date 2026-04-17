import type { BreadcrumbProps } from 'tdesign-react'
import { memo } from 'react'
import { useNavigate, useLocation, useMatches } from 'react-router-dom'
import { Breadcrumb } from 'tdesign-react'

const { BreadcrumbItem } = Breadcrumb

function cleanupBreadcrumbs(breadcrumbs: any[]) {
  breadcrumbs[breadcrumbs.length - 1].unlink = true
  // breadcrumbs[breadcrumbs.length - 1].to = undefined
  if (breadcrumbs.length > 1) {
    return breadcrumbs.slice(1)
  }
  return breadcrumbs
}

function BaseBreadcrumb() {
  const matchRoutes = useMatches()
  const navigate = useNavigate()
  const onClick = (to: any) => {
    navigate(to)
  }
  const breadcrumbs = cleanupBreadcrumbs(
    matchRoutes.map((r: Record<string, any>) => ({
      pathname: r.pathname,
      params: r.params,
      handle: r.handle,
      content: r.handle?.title,
      to: r.handle?.firstChildrenRoutePath ?? r.pathname
    }))
  ) as BreadcrumbProps['options']
  // console.log('breadcrumbs', breadcrumbs)
  // const paths = breadcrumbs.map((breadcrumb: any) => breadcrumb.to)
  // const navigate = useNavigate()
  // const location = useLocation()
  // if (!paths.includes(location?.pathname)) {
  //   navigate('/404')
  // }

  return (
    <Breadcrumb>
      {breadcrumbs.map((item, index) => {
        return (
          <BreadcrumbItem
            key={item.to + index}
            content={item.content}
            to={item.to}
            onClick={() => onClick(item.to)}
          />
        )
      })}
    </Breadcrumb>
  )
}

export default memo(BaseBreadcrumb)
