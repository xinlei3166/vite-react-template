import { Result } from 'antd'
import Buttons from './buttons'
import './index.less'

export default function Exception404() {
  return (
    <div className="exception-wrap">
      <Result
        status="404"
        title="404"
        subTitle="抱歉，你访问的页面不存在"
        extra={<Buttons />}
      ></Result>
    </div>
  )
}
