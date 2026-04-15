import { useState } from 'react'
import { Button } from 'tdesign-react'
import { useEvent } from '@packages/hooks'

export default function A() {
  const [number, setNumber] = useState(0)
  const event = useEvent()

  const onAdd = () => {
    const newNumber = number + 1
    setNumber(newNumber)
    event.emit('change-number', newNumber)
  }

  return (
    <>
      <div className="title">A组件</div>
      <div className="title">当前结果：{number}</div>
      <Button className="ml-64px" type="primary" size="small" onClick={onAdd}>
        增加
      </Button>
    </>
  )
}
