import { Card } from 'antd'
import './error-403.less'

export default function Error403() {
  return (
    <Card className="exception-wrap">
      <div className="exception-img-wrap">
        <img
          className="exception-img"
          src="@/assets/exception/web-exception.svg"
        />
        <span className="exception-desc">
          抱歉，您没有被授权菜单权限，如有权限需求请联系管理员为您添加权限
        </span>
      </div>
    </Card>
  )
}
