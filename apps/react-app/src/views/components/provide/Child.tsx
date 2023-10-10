import { useContext } from 'react'
import { ProvideContext } from './index'

export default function Child() {
  const number = useContext(ProvideContext)

  return (
    <>
      <div className="title">子组件</div>
      <div className="title">当前结果：{number}</div>
    </>
  )
}
