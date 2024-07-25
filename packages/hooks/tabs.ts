import { useState } from 'react'
// @ts-ignore
import router from '@/router'
import type { TabList, } from '@packages/types'
import { auth, typeOf } from '@packages/utils'

export function useTabs(
  tabs: TabList[] ,
  verify = true,
  emptyHandle: Boolean | Function = true
) {
  const tabList = tabs.filter(tab => !verify || auth(tab.permission!))

  const [activeTabKey, setActiveTabKey] = useState(tabList[0]?.key)

  const onTabChange = (key: any) => {
    setActiveTabKey(key)
  }

  const to403 = () => {
    router.navigate('/403')
  }

  if (verify && emptyHandle && !tabList.length) {
    const cb = typeOf(emptyHandle) === 'function' ? emptyHandle : to403
    // @ts-ignore
    cb()
  }

  return { activeTabKey, tabList, onTabChange }
}
