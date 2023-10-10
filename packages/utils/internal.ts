import Cookies from 'js-cookie'

// @ts-ignore
import router from '@/router'
// @ts-ignore
import store, { cleanupUser, cleanupMenu } from '@/store'

const storageKeyPrefix = import.meta.env.VITE_APP_STORAGE_KEY_PREFIX
export const TokenKey = `${storageKeyPrefix}Token`

export const setToken = (token: string) => Cookies.set(TokenKey, token) // { expires: 1 }
export const getToken = () => Cookies.get(TokenKey)
export const removeToken = () => {
  Cookies.remove(TokenKey)
}

// logout
export const logoutCleanup = () => {
  removeToken()
  router.navigate('/login')
  store.dispatch(cleanupUser())
  store.dispatch(cleanupMenu())
}
