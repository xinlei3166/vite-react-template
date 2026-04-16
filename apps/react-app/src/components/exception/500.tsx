// import { Icon } from 'tdesign-icons-react'
import './index.less'
import Buttons from './buttons'

export default function Exception500() {
  return (
    <div className="result-container result">
      {/* <Icon name="error" className="result-icon" /> */}
      <div className="result-title">500 Internal Server Error</div>
      <div className="result-desc">抱歉，服务器出错了</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
