import { Icon } from 'tdesign-icons-react'
import './index.less'
import Buttons from './Buttons'

export default function Exception403() {
  return (
    <div className="result-container result">
      <Icon
        name="check-circle"
        className="result-icon"
        style={{ color: 'var(--td-success-color)' }}
      />
      <div className="result-title" style={{ marginTop: 'var(--td-comp-margin-xxl)' }}>
        403 Forbidden
      </div>
      <div className="result-desc">抱歉，你无权访问该页面</div>
      <div>
        <Buttons />
      </div>
    </div>
  )
}
