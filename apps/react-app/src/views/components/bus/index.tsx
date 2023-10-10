import { Card } from 'antd'
import A from './A'
import B from './B'

export default function BusPage() {
  return (
    <Card className="h-full">
      <div className="title">Bus-相邻组件传值</div>
      <div className="title">
        可以通过点击A组件中的增加按钮，观察B组件的结果显示
      </div>
      <A />
      <div className="title">
        ---------------------------------------------------
      </div>
      <B />
    </Card>
  )
}
