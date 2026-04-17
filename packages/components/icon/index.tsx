import classNames from 'classnames'
import { Icon } from 'tdesign-icons-react'

const IconFont = ({ url = '//at.alicdn.com/t/c/font_5154439_uov74vg518a.js', ...rest }) => {
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
