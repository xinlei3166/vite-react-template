import './index.less'
import Buttons from './Buttons'
import NotFound from './images/NotFound'

export default function Exception404() {
  return (
    <div className="result-container">
      <div className="result-bg-img">
        <NotFound />
      </div>
      <div className="result-title">404 Not Found</div>
      <div className="result-desc">抱歉，您访问的页面不存在</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
