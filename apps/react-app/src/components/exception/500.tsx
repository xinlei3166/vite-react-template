import './index.less'
import Buttons from './Buttons'
import InternalServerError from './images/InternalServerError'

export default function Exception500() {
  return (
    <div className="result-container">
      <div className="result-bg-img">
        <InternalServerError />
      </div>
      <div className="result-title">500 Internal Server Error</div>
      <div className="result-desc">抱歉，服务器出错啦</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
