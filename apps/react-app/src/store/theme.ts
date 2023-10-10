import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { GlobalToken } from 'antd/es/theme'

export interface ThemeState {
  theme: 'dark' | 'light'
  layout: 'side' | 'mix'
  mode: 'vertical' | 'inline' | 'horizontal'
  width: string
  height: string
  collapsed: boolean
  collapsedWidth: string
  headerTheme: boolean
  showBreadcrumb: boolean
  token: Partial<GlobalToken>
  algorithm: string
}

const initialState: ThemeState = {
  theme: 'light', // light, dark
  layout: 'mix', // side, mix
  mode: 'inline',
  width: '240px',
  height: '64px',
  collapsed: false,
  collapsedWidth: '80px',
  headerTheme: false,
  showBreadcrumb: true, // 是否显示面包屑
  token: {
    colorPrimary: '#0077fa',
    colorInfo: '#0077fa'
  },
  algorithm: 'defaultAlgorithm'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state: ThemeState, action: PayloadAction<Partial<ThemeState>>) {
      return { ...state, ...action.payload }
    }
  }
})

export const { setTheme } = themeSlice.actions

export default themeSlice.reducer
