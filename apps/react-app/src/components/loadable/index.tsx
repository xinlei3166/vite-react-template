// import { lazy, Suspense } from 'react'
import loadable from '@loadable/component'

// 通用的过场组件
const LoadingComponent = () => {
  return <div>loading...</div>
}

// 过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (Loader: any, Loading = LoadingComponent, delay = 200) => {
  const LoadableComponent = loadable(() => {
    return Promise.all([
      Loader(),
      new Promise(resolve => setTimeout(resolve, delay))
    ]).then(([moduleExports]) => moduleExports)
  })

  return <LoadableComponent fallback={<Loading />} />
}
