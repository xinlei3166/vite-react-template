import { useState, useMemo } from 'react'

export function useDialogHeader() {
  const [dialogFullscreen, setDialogFullscreen] = useState(false)

  const mode = useMemo(() => {
    return dialogFullscreen ? 'full-screen' : 'modal'
  }, [dialogFullscreen])

  const resetMode = () => {
    setDialogFullscreen(false)
  }

  const handleDialogFullscreen = (val: boolean) => {
    setDialogFullscreen(val)
  }

  return {
    mode,
    resetMode,
    dialogFullscreen,
    handleDialogFullscreen
  }
}
