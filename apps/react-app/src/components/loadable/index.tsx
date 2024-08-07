// import { lazy, Suspense } from 'react'
import _loadable from '@loadable/component'
import LoadingComponent from './LoadingComponent'

// 过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
const loadable = (Loader: any, Loading = LoadingComponent, delay = 200) => {
  const LoadableComponent = _loadable(() => {
    return Promise.all([
      Loader(),
      new Promise(resolve => setTimeout(resolve, delay))
    ]).then(([moduleExports]) => moduleExports)
  })

  return <LoadableComponent fallback={<Loading />} />
}

export default loadable
