import { useState } from 'react'
import { Button } from 'antd'
import bus from '@/lib/bus'

export default function A() {
  const [number, setNumber] = useState(0)
  const onAdd = () => {
    const newNumber = number + 1
    setNumber(newNumber)
    bus.emit('change-number', newNumber)
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
