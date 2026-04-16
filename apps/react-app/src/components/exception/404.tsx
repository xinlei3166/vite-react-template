// import { Icon } from 'tdesign-icons-react'
import './index.less'
import Buttons from './buttons'

export default function Exception403() {
  return (
    <div className="result-container result">
      {/* <Icon name="error" className="result-icon text-error" /> */}
      <div className="result-bg-img"></div>
      <div className="result-title">404 Not Found</div>
      <div className="result-desc">抱歉，你访问的页面不存在</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
