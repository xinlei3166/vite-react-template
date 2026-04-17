import './index.less'
import Buttons from './Buttons'
import BrowserIncompatible from './images/BrowserIncompatible'

export default function ExceptionBrowserIncompatible() {
  return (
    <div className="result-container">
      <div className="result-bg-img">
        <BrowserIncompatible />
      </div>
      <div className="result-title">浏览器不兼容</div>
      <div className="result-desc">抱歉，您正在使用的浏览器版本过低，无法打开当前网页。</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
