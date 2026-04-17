import { useNavigate } from 'react-router-dom'
import { Button } from 'tdesign-react'

export default function Buttons() {
  const navigate = useNavigate()

  const onGoHome = () => {
    navigate('/')
  }

  return (
    <Button theme="primary" onClick={onGoHome}>
      回到首页
    </Button>
  )
}
