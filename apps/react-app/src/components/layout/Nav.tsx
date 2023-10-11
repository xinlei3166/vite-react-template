import { memo } from 'react'
import type { MenuProps } from 'antd'
import { Dropdown, message } from 'antd'
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LoginOutlined
} from '@ant-design/icons'
import { logoutCleanup } from '@packages/utils'
import { logout } from '@/api'
import { useAppSelector } from '@/store'
import avatar from '@/assets/avatar.png'
import './Nav.less'

const items: MenuProps['items'] = [
  {
    key: 'person',
    label: (
      <>
        <UserOutlined className="menu-item-icon" />
        个人中心
      </>
    )
  },
  {
    key: 'setting',
    label: (
      <>
        <SettingOutlined className="menu-item-icon" />
        个人设置
      </>
    )
  },
  {
    key: 'logout',
    label: (
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
    message.success({
      content: '退出登录成功',
      duration: 1,
      onClose: () => {
        logoutCleanup()
      }
    })
  }

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      onLogout()
    }
  }

  return (
    <div className="layout-nav">
      <BellOutlined className="layout-header-icon" />
      <Dropdown
        overlayClassName="layout-nav-dropdown"
        menu={{ items, onClick }}
      >
        <span
          className="dropdown-link"
          style={{ height: theme.height, lineHeight: theme.height }}
        >
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
