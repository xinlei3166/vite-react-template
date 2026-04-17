import { Icon } from 'tdesign-icons-react'
import './index.less'
import Buttons from './Buttons'

export default function ExceptionSuccess() {
  return (
    <div className="result-container">
      <Icon
        name="check-circle"
        className="result-icon"
        style={{ color: 'var(--td-success-color)' }}
      />
      <div className="result-title" style={{ marginTop: 'var(--td-comp-margin-xxl)' }}>
        创建成功
      </div>
      <div className="result-desc">您的项目已成功创建</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
