import { useState, forwardRef, useImperativeHandle } from 'react'
import { Tooltip, Button } from 'tdesign-react'
import IconFullscreenExit from './icon/icon-fullscreen-exit.svg'
import IconFullscreen from './icon/icon-fullscreen.svg'

type Props = {
  title?: string
  onDialogFullscreen?: (val: boolean) => void
}

export type DialogHeaderRef = {
  resetState: () => void
}

const DialogHeader = forwardRef<DialogHeaderRef, Props>((props, ref) => {
  const { title = '标题', onDialogFullscreen } = props

  const [fullscreen, setFullscreen] = useState(false)

  const resetState = () => {
    setFullscreen(false)
  }

  const onClickFullscreen = (val: boolean) => {
    setFullscreen(val)
    onDialogFullscreen?.(val)
  }

  useImperativeHandle(ref, () => ({
    resetState
  }))

  return (
    <div className="dialog-header-title">
      <span>{title}</span>

      <div className="dialog-header-btn-group">
        {!fullscreen ? (
          <Tooltip placement="bottom" content="全屏">
            <Button
              theme="default"
              shape="square"
              variant="text"
              onClick={() => onClickFullscreen(true)}
            >
              <img src={IconFullscreen} className="dialog-header-btn" />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip placement="bottom" content="取消全屏">
            <Button
              theme="default"
              shape="square"
              variant="text"
              onClick={() => onClickFullscreen(false)}
            >
              <img src={IconFullscreenExit} className="dialog-header-btn" />
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  )
})

export default DialogHeader
