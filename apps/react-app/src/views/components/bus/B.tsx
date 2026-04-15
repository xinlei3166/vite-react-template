import { useMount, useUnmount } from 'ahooks'
import { useState } from 'react'
import { useEvent } from '@packages/hooks'

export default function B() {
  const [number, setNumber] = useState(0)
  const event = useEvent()

  useMount(() => {
    event.on('change-number', setNumber)
  })

  useUnmount(() => {
    event.off('change-number', setNumber)
  })

  return (
    <>
      <div className="title">B组件</div>
      <div className="title">当前结果：{number}</div>
    </>
  )
}
