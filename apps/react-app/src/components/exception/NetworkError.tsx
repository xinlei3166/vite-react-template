import './index.less'
import Buttons from './Buttons'
import NetworkError from './images/NetworkError'

export default function ExceptionNetworkError() {
  return (
    <div className="result-container">
      <div className="result-bg-img">
        <NetworkError />
      </div>
      <div className="result-title">网络异常</div>
      <div className="result-desc">网络异常, 请稍后重试</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
