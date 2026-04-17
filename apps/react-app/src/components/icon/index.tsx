import classNames from 'classnames'
import { Icon } from 'tdesign-icons-react'

const IconFont = ({ url = '//at.alicdn.com/t/c/font_5154439_dm7zch8l5sn.js', ...rest }) => {
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
