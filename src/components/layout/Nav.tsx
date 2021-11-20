import { memo } from 'react'
import { Dropdown, Menu } from 'antd'
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LoginOutlined
} from '@ant-design/icons'
import avatar from '@/assets/avatar.png'
import './Nav.less'

const menu = (
  <Menu>
    <Menu.Item key="person">
      <a href="#">
        <UserOutlined className="menu-item-icon" />
        个人中心
      </a>
    </Menu.Item>
    <Menu.Item key="setting">
      <a href="#">
        <SettingOutlined className="menu-item-icon" />
        个人设置
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="logout">
      <a href="#">
        <LoginOutlined className="menu-item-icon" />
        退出登录
      </a>
    </Menu.Item>
  </Menu>
)

function Nav() {
  return (
    <div className="layout-nav">
      <BellOutlined className="layout-header-icon" />
      <Dropdown overlay={menu}>
        <span className="dropdown-link">
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
