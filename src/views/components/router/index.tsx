import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function RouterPage() {
  const navigate = useNavigate()

  const onRedirect = () => {
    navigate('/')
  }

  return (
    <Card className="h-full">
      <div className="title">Router</div>
      <div className="title cursor-pointer" onClick={onRedirect}>
        点击跳转到首页
      </div>
    </Card>
  )
}
