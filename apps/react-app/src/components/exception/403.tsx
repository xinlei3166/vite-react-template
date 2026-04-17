import './index.less'
import Buttons from './Buttons'
import Forbidden from './images/Forbidden'

export default function Exception403() {
  return (
    <div className="result-container">
      <div className="result-bg-img">
        <Forbidden />
      </div>
      <div className="result-title">403 Forbidden</div>
      <div className="result-desc">抱歉，您无权限访问此页面，请联系管理员</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
