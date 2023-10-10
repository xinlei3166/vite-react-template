//@ts-nocheck
import store, { setPermissions } from '@/store'

export const auth = (permission: string) => {
  const userStore = store.getState().user
  const arr = userStore.permissions
  const permissions = arr.map(x => x.menuCode)
  return permissions.includes(permission)
}

export const pageAuth = async (permission: string) => {
  const userStore = store.getState().user
  let arr = userStore.permissions
  if (!arr.length) {
    await store.dispatch(setPermissions())
    arr = userStore.permissions
  }
  const permissions = arr.map(x => x.menuCode)
  return permissions.includes(permission)
}
