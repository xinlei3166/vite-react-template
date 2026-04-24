import { useState, useMemo, useRef } from 'react'
import type { DialogHeaderRef } from './index'

export function useDialogHeader() {
  const dialogHeaderRef = useRef<DialogHeaderRef>(null)
  const [dialogFullscreen, setDialogFullscreen] = useState(false)

  const mode = useMemo(() => {
    return dialogFullscreen ? 'full-screen' : 'modal'
  }, [dialogFullscreen])

  const resetMode = () => {
    setDialogFullscreen(false)
  }

  const handleDialogFullscreen = (val: boolean) => {
    dialogHeaderRef.current?.resetState()
    setDialogFullscreen(val)
  }

  return {
    dialogHeaderRef,
    mode,
    resetMode,
    dialogFullscreen,
    handleDialogFullscreen
  }
}
