import { useState } from 'react'
import { useMount, useUnmount } from 'react-use'
import bus from '@/lib/bus'

export default function B() {
  const [number, setNumber] = useState(0)

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
