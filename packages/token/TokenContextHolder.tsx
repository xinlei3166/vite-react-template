import { memo, useRef } from 'react'
import { useMount, useUpdateEffect } from 'ahooks'
import type { GlobalToken } from 'antd/es/theme'
import { theme } from 'antd'
import { generateColorCssVars } from './utils'

function TokenContextHolder() {
  const { token } = theme.useToken()
  const root = useRef<HTMLElement>()

  const handleTokenChange = (t: GlobalToken) => {
    if (!root.current) return
    root.current.style.cssText = generateColorCssVars(t)
  }

  useMount(() => {
    root.current = document.querySelector(':root') as HTMLElement
    handleTokenChange(token)
  })

  useUpdateEffect(() => {
    handleTokenChange(token)
  }, [token])

  return <div className="token-context-holder" style={{ display: 'none' }} />
}

export default memo(TokenContextHolder)
