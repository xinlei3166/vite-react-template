import type { DropdownProps } from 'tdesign-react'
import { memo } from 'react'
import { Icon } from 'tdesign-icons-react'
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
        <Icon name="user" className="text-4 mr-2" />
        个人中心
      </>
    )
  },
  {
    value: 'setting',
    content: (
      <>
        <Icon name="setting-1" className="text-4 mr-2" />
        个人设置
      </>
    )
  },
  {
    value: 'logout',
    content: (
      <>
        <Icon name="logout" className="text-4 mr-2" />
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
      duration: 1000,
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
      <Icon name="notification" className="layout-header-icon" />
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
