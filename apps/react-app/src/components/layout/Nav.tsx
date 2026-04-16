import type { DropdownProps } from 'tdesign-react'
import { BellOutlined, UserOutlined, SettingOutlined, LoginOutlined } from '@ant-design/icons'
import { memo } from 'react'
import { Dropdown } from 'tdesign-react'
import { MessagePlugin } from 'tdesign-react'
import { logoutCleanup } from '@packages/utils'
import { logout } from '@/api'
import avatar from '@/assets/avatar.png'
import { useAppSelector } from '@/store'
import './Nav.less'

const options: DropdownProps['options'] = [
  {
    value: 'person',
    content: (
      <>
        <UserOutlined className="menu-item-icon" />
        个人中心
      </>
    )
  },
  {
    value: 'setting',
    content: (
      <>
        <SettingOutlined className="menu-item-icon" />
        个人设置
      </>
    )
  },
  {
    value: 'logout',
    content: (
      <>
        <LoginOutlined className="menu-item-icon" />
        退出登录
      </>
    )
  }
]

function Nav() {
  const theme = useAppSelector(state => state.theme)

  const onLogout = async () => {
    const res = await logout()
    if (!res || res.code !== 0) return
    MessagePlugin.success({
      content: '退出登录成功',
      duration: 1,
      onClose: () => {
        logoutCleanup()
      }
    })
  }

  const onClick: DropdownProps['onClick'] = ({ value }) => {
    if (value === 'logout') {
      onLogout()
    }
  }

  return (
    <div className="layout-nav">
      <BellOutlined className="layout-header-icon" />
      <Dropdown className="layout-nav-dropdown" options={options} onClick={onClick}>
        <span className="dropdown-link" style={{ height: theme.height, lineHeight: theme.height }}>
          <span className="dropdown-img-wrap">
            <img className="dropdown-img" src={avatar} />
          </span>
          <span className="dropdown-text">君惜</span>
        </span>
      </Dropdown>
    </div>
  )
}

export default memo(Nav)
