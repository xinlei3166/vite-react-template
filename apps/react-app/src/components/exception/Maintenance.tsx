import './index.less'
import Buttons from './Buttons'
import Maintenance from './images/Maintenance'

export default function ExceptionMaintenance() {
  return (
    <div className="result-container">
      <div className="result-bg-img">
        <Maintenance />
      </div>
      <div className="result-title">系统维护中</div>
      <div className="result-desc">系统维护中，请稍后再试</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
