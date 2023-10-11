import { Result } from 'antd'
import Buttons from './buttons'
import './index.less'

export default function Exception500() {
  return (
    <div className="exception-wrap">
      <Result
        status="500"
        title="500"
        subTitle="抱歉，服务器出错了"
        extra={<Buttons />}
      ></Result>
    </div>
  )
}
