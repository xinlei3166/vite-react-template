import { memo, PropsWithChildren } from 'react'
import { Breadcrumb } from 'antd'
import { Link, Location } from 'react-router-dom'
import { BreadcrumbData } from 'use-react-router-breadcrumbs'

function cleanupBreadcrumbs(breadcrumbs: any[]) {
  breadcrumbs[breadcrumbs.length - 1].unlink = true
  if (breadcrumbs.length > 1) {
    return breadcrumbs.slice(1)
  }
  return breadcrumbs
}

function BaseBreadcrumb({
  location,
  breadcrumbs
}: PropsWithChildren<{
  location: Location
  breadcrumbs: BreadcrumbData[]
}>) {
  return (
    <Breadcrumb>
      {cleanupBreadcrumbs(breadcrumbs).map(breadcrumb => (
        <Breadcrumb.Item key={breadcrumb.key}>
          {breadcrumb.unlink ? (
            breadcrumb.breadcrumb
          ) : (
            <Link to={breadcrumb.match.pathname}>{breadcrumb.breadcrumb}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default memo(BaseBreadcrumb)
