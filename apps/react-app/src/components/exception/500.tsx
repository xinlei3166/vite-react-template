import './index.less'
import Buttons from './Buttons'

export default function Exception500() {
  return (
    <div className="result-container result">
      <div className="result-title">500 Internal Server Error</div>
      <div className="result-desc">抱歉，服务器出错了</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
