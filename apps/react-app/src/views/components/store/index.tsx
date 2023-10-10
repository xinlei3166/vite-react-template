import { useState } from 'react'
import { useMount } from 'ahooks'
import { Card, Input, Button } from 'antd'
import type { UserState } from '@/store'
import { useAppSelector, useAppDispatch, setUserinfo } from '@/store'

function StorePage() {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const [name, setName] = useState('君惜')
  const onSubmit = () => {
    dispatch(setUserinfo({ userinfo: { ...user.userinfo, name } }))
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
      <div className="title dark:text-color-green">
        当前用户：{user.userinfo.name}
      </div>
    </Card>
  )
}

export default StorePage
