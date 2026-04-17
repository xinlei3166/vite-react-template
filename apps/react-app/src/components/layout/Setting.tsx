import { useState } from 'react'
import { Icon } from 'tdesign-icons-react'
import { Drawer, Select, Switch, Input } from 'tdesign-react'
import { Color } from 'tvision-color'
import { generateColorMap, insertThemeStylesheet } from '@packages/utils'
import './Setting.less'
import type { ThemeState } from '@/store'
import { useAppSelector, useAppDispatch, setTheme } from '@/store'

const colors = [
  { label: '默认', value: '#0077fa' },
  { label: '薄暮', value: '#f5222d' },
  { label: '火山', value: '#fa541c' },
  { label: '日暮', value: '#fa8c16' },
  { label: '金盏花', value: '#faad14' },
  { label: '日出', value: '#fadb14' },
  { label: '青柠', value: '#a0d911' },
  { label: '极光绿', value: '#52c41a' },
  { label: '明青', value: '#13c2c2' },
  { label: '拂晓蓝', value: '#1677ff' }
]

function Setting() {
  const theme = useAppSelector(state => state.theme)
  const dispatch = useAppDispatch()
  const [visible, setVisible] = useState(false)

  function onChange(t: Partial<ThemeState>) {
    dispatch(setTheme(t))
  }

  function onChangeTheme(t: Partial<ThemeState>) {
    onChange({ ...t })
    const el = document.querySelector('html')
    el?.classList.toggle('dark', t.theme === 'dark')
    el?.setAttribute('theme-mode', t.theme!)
    localStorage.theme = t.theme
  }

  function onChangeThemeColor(t: Partial<ThemeState>) {
    onChange({ ...t })

    const mode = theme.theme
    const hex = t.themeColor
    const { colors: newPalette, primary: brandColorIndex } = Color.getColorGradations({
      colors: [hex],
      step: 10,
      remainInput: false // 是否保留输入 不保留会矫正不合适的主题色
    })[0]
    const newColorMap = generateColorMap(hex!, newPalette, mode, brandColorIndex)
    insertThemeStylesheet(hex!, newColorMap, mode)

    document.documentElement.setAttribute('theme-color', hex || '')
  }

  return (
    <>
      <div className="setting-drawer-btn-wrap" onClick={() => setVisible(!visible)}>
        <Icon name="setting-1" className="setting-drawer-btn" />
      </div>
      <Drawer
        visible={visible}
        className="setting-drawer"
        placement="right"
        size="300px"
        header={null}
        footer={null}
        closeBtn={false}
        onClose={() => setVisible(false)}
      >
        {/* {visible && (
          <div
            className="setting-drawer-btn-wrap"
            onClick={() => setVisible(!visible)}
            style={{ right: '300px', zIndex: 2000 }}
          >
            <Icon name="close" className="setting-drawer-btn" />
          </div>
        )} */}
        <div className="setting-drawer-content">
          <h3 className="drawer-title">系统布局配置</h3>
          <div className="drawer-item">
            <span>布局方式</span>
            <Select
              value={theme.layout}
              className="select"
              onChange={(value: any) => onChange({ layout: value })}
            >
              <Select.Option key="side" value="side">
                侧边
              </Select.Option>
              <Select.Option key="mix" value="mix">
                混合
              </Select.Option>
            </Select>
          </div>
          <div className="drawer-item">
            <span>风格</span>
            <Select
              value={theme.theme}
              className="select"
              onChange={(value: any) => onChangeTheme({ theme: value })}
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
            <span>主题色</span>
            <Select
              value={theme.themeColor}
              className="select"
              prefixIcon={
                <span
                  className="inline-block"
                  style={{
                    backgroundColor: theme.themeColor,
                    width: '20px',
                    height: '20px'
                  }}
                ></span>
              }
              onChange={(value: any) =>
                onChangeThemeColor({
                  themeColor: value
                })
              }
            >
              {colors.map((color, index) => (
                <Select.Option key={color.value} value={color.value}>
                  <span style={{ color: index !== 0 ? color.value : 'unset' }}>{color.label}</span>
                </Select.Option>
              ))}
            </Select>
          </div>
          <div className="drawer-item">
            <span>菜单类型</span>
            <Select
              value={theme.expandType}
              className="select"
              onChange={(value: any) => onChange({ expandType: value })}
            >
              <Select.Option key="normal" value="normal">
                平铺
              </Select.Option>
              <Select.Option key="popup" value="popup">
                浮层
              </Select.Option>
            </Select>
          </div>
          <div className="drawer-item">
            <span>顶部高度</span>
            <Select
              value={theme.height}
              className="select"
              onChange={(value: any) => onChange({ height: value })}
            >
              <Select.Option key="48px" value="48px">
                48px
              </Select.Option>{' '}
              <Select.Option key="56px" value="56px">
                56px
              </Select.Option>
              <Select.Option key="64px" value="64px">
                64px
              </Select.Option>
            </Select>
          </div>
          <div className="drawer-item">
            <span>侧边栏宽度</span>
            <Input
              value={theme.width}
              className="select"
              onChange={(value: any) => onChange({ width: value })}
            />
          </div>
          <div className="drawer-item">
            <span>顶部随主题色(混合布局)</span>
            <Switch
              value={theme.headerTheme}
              onChange={(value: any) => onChange({ headerTheme: value })}
            />
          </div>
          <div className="drawer-item">
            <span>侧边栏折叠</span>
            <Switch
              value={theme.collapsed}
              onChange={(value: any) => onChange({ collapsed: value })}
            />
          </div>
          <div className="drawer-item">
            <span>显示面包屑</span>
            <Switch
              value={theme.showBreadcrumb}
              onChange={(value: any) => onChange({ showBreadcrumb: value })}
            />
          </div>
        </div>
      </Drawer>
    </>
  )
}

export default Setting
