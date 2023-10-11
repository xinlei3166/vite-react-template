import { Result } from 'antd'
import Buttons from './buttons'
import './index.less'

export default function Exception403() {
  return (
    <div className="exception-wrap">
      <Result
        status="403"
        title="403"
        subTitle="抱歉，你无权访问该页面"
        extra={<Buttons />}
      ></Result>
    </div>
  )
}
