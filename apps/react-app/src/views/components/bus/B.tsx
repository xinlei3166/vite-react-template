import { useState } from 'react'
import { useMount, useUnmount } from 'ahooks'
import { useBus } from '@packages/lib'

export default function B() {
  const [number, setNumber] = useState(0)
  const bus = useBus()

  useMount(() => {
    bus.on('change-number', setNumber)
  })

  useUnmount(() => {
    bus.off('change-number', setNumber)
  })

  return (
    <>
      <div className="title">B组件</div>
      <div className="title">当前结果：{number}</div>
    </>
  )
}
