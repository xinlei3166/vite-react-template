import { message } from 'antd'
import { redirect } from 'react-router-dom'
import { useRequests } from '@packages/lib'
import type { Request } from '@packages/types'
import { removeToken } from '@packages/utils'
import { useAppDispatch, cleanupUser, cleanupMenu } from '@/store'

const errorHandler = (msg: string) => {
  const dispatch = useAppDispatch()
  removeToken()
  dispatch(cleanupUser())
  dispatch(cleanupMenu())
  message.destroy()
  message.error(msg)
  setTimeout(() => {
    redirect('/login')
  }, 50)
}

const baseURL = import.meta.env.VITE_API_URL

// 刷新令牌
const pureRequests = useRequests({
  baseURL,
  errorHandler,
  noRefreshToken: true
})
export const refreshTokenApi = (data?: Request) =>
  pureRequests.post('/user/refresh_token', {
    refresh_token: data?.refreshToken
  })

export const requests = useRequests({ baseURL, errorHandler, refreshTokenApi })
