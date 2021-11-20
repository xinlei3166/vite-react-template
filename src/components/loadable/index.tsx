import { lazy, Suspense } from 'react'

// 通用的过场组件
const LoadingComponent = () => {
  return <div>loading...</div>
}

// 过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
export default (Loader: any, Loading = LoadingComponent) => {
  const LoadableComponent = lazy(Loader)
  return (
    <Suspense fallback={<Loading />}>
      <LoadableComponent />
    </Suspense>
  )
}
