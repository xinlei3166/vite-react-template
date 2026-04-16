// import { Icon } from 'tdesign-icons-react'
import './index.less'
import Buttons from './buttons'

export default function Exception403() {
  return (
    <div className="result-container result">
      {/* <Icon name="error" className="result-icon" /> */}
      <div className="result-title">403 Forbidden</div>
      <div className="result-desc">抱歉，你无权访问该页面</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
