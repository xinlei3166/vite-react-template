import { useState } from 'react'
import { useMount } from 'react-use'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Input, Button } from 'antd'
import { RootState } from '@/store'

function StorePage() {
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  const [name, setName] = useState('君惜')

  const onSubmit = () => {
    dispatch({ type: 'user/changeUserinfo', payload: { name } })
  }

  useMount(onSubmit)

  return (
    <Card className="h-full">
      <div className="title">Store</div>
      <Input
        className="!ml-64px !mr-16px !w-240px"
        value={name}
        placeholder="请输入用户名"
        onChange={e => setName(e.target.value)}
      />
      <Button type="primary" onClick={onSubmit}>
        提交
      </Button>
      <div className="title dark:text-color-green">当前用户：{user.name}</div>
    </Card>
  )
}

export default StorePage
