import { Icon as IconFont } from 'tdesign-icons-react'

const Icon = ({ url = '//at.alicdn.com/t/c/font_2430965_bvv26kwz5ke.js', ...rest }) => {
  return <IconFont {...rest} url={url} loadDefaultIcons={false} />
}

export default Icon
