import { useNavigate } from 'react-router-dom'
import { Button } from 'tdesign-react'

export default function Buttons() {
  const navigate = useNavigate()

  const onGoHome = () => {
    navigate('/')
  }

  return (
    <Button type="primary" onClick={onGoHome}>
      返回首页
    </Button>
  )
}
