import classNames from 'classnames'
import { Icon } from 'tdesign-icons-react'

const IconFont = ({ url = `${import.meta.env.VITE_APP_BASE || '/'}iconfont.js`, ...rest }) => {
  return (
    <Icon
      {...rest}
      url={url}
      loadDefaultIcons={false}
      className={classNames('iconfont-icon', rest.className)}
    />
  )
}

export default IconFont
