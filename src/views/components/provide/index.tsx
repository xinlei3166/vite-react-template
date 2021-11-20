import { useState, createContext } from 'react'
import { Card, Button } from 'antd'
import Child from './Child'

export const ProvideContext = createContext({})

export default function ProvidePage() {
  const [number, setNumber] = useState(0)

  const onAdd = () => {
    setNumber(number + 1)
  }

  return (
    <Card className="h-full">
      <div className="title">Provide</div>
      <div className="title">
        可以通过点击父组件中的增加按钮，观察B组件的结果显示
      </div>
      <div className="title">父组件</div>
      <div className="title">当前结果：{number}</div>
      <Button className="ml-64px" type="primary" size="small" onClick={onAdd}>
        增加
      </Button>
      <div className="title">
        ---------------------------------------------------
      </div>
      <ProvideContext.Provider value={number}>
        <Child />
      </ProvideContext.Provider>
    </Card>
  )
}
