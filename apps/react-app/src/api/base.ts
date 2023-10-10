import { message } from 'antd'
import { redirect } from 'react-router-dom'
import { useRequests } from '@packages/lib'
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
export const requests = useRequests({ baseURL, errorHandler })
