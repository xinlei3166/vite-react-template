import { useState, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Drawer, Select, Switch } from 'antd'
import { SettingOutlined, CloseOutlined } from '@ant-design/icons'
import { RootState, ThemeState } from '@/store'
import './Setting.less'

function Setting() {
  const theme = useSelector((state: RootState) => state.theme)
  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)
  const setTheme = (payload: Record<string, any>) => {
    dispatch({ type: 'theme/changeTheme', payload })
  }

  function onChange(t: Partial<ThemeState>) {
    setTheme(t)
  }

  function onChangeTheme(t: Partial<ThemeState>) {
    onChange(t)
    const el = document.querySelector('html')
    el?.classList.toggle('dark', t.theme === 'dark')
    localStorage.theme = t.theme
  }

  return (
    <Drawer
      visible={visible}
      className="setting-drawer"
      placement="right"
      width="280px"
      closable={false}
      handler={
        <div
          className="setting-drawer-btn-wrap"
          onClick={() => setVisible(!visible)}
        >
          {visible ? (
            <CloseOutlined className="setting-drawer-btn" />
          ) : (
            <SettingOutlined className="setting-drawer-btn" />
          )}
        </div>
      }
    >
      <div className="setting-drawer-content">
        <h3 className="drawer-title">系统布局配置</h3>
        <div className="drawer-item">
          <span>侧边栏主题颜色</span>
          <Select
            value={theme.theme}
            className="select"
            onChange={value => onChangeTheme({ theme: value })}
          >
            <Select.Option key="dark" value="dark">
              暗黑
            </Select.Option>
            <Select.Option key="light" value="light">
              明亮
            </Select.Option>
          </Select>
        </div>
        <div className="drawer-item">
          <span>侧边栏菜单类型</span>
          <Select
            value={theme.mode}
            className="select"
            onChange={value => onChange({ mode: value })}
          >
            <Select.Option key="vertical" value="vertical">
              垂直
            </Select.Option>
            <Select.Option key="inline" value="inline">
              内嵌
            </Select.Option>
          </Select>
        </div>
        <div className="drawer-item">
          <span>侧边栏折叠</span>
          <Switch
            checked={theme.collapsed}
            onChange={checked => onChange({ collapsed: checked })}
          />
        </div>
        <div className="drawer-item">
          <span>折叠展示菜单名称</span>
          <Switch
            checked={theme.showSubMenuName}
            onChange={checked => onChange({ showSubMenuName: checked })}
          />
        </div>
        <div className="drawer-item">
          <span>显示面包屑</span>
          <Switch
            checked={theme.showBreadcrumb}
            onChange={checked => onChange({ showBreadcrumb: checked })}
          />
        </div>
      </div>
    </Drawer>
  )
}

export default memo(Setting)
