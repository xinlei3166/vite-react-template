import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ThemeState {
  theme: 'dark' | 'light'
  mode: 'vertical' | 'inline' | 'horizontal'
  width: string | number
  collapsed: boolean
  collapsedWidth: string
  showSubMenuName: boolean
  showBreadcrumb: boolean
}

const initialState: ThemeState = {
  theme: 'dark',
  mode: 'inline',
  width: '208px',
  collapsed: false,
  collapsedWidth: '80px',
  showSubMenuName: true, // 控制左侧菜单折叠时，是否显示文字
  showBreadcrumb: true // 是否显示面包屑
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme(state: ThemeState, action: PayloadAction<ThemeState>) {
      return { ...state, ...action.payload }
    }
  }
})

export const { changeTheme } = themeSlice.actions

export default themeSlice.reducer
