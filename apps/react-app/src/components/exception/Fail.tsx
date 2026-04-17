import { Icon } from 'tdesign-icons-react'
import './index.less'
import Buttons from './Buttons'

export default function ExceptionFail() {
  return (
    <div className="result-container">
      <Icon name="error-circle" className="result-icon" />
      <div className="result-title" style={{ marginTop: 'var(--td-comp-margin-xxl)' }}>
        创建失败
      </div>
      <div className="result-desc">抱歉，您的项目创建失败，请重试</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
