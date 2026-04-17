import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

export interface ThemeState {
  theme: 'dark' | 'light'
  layout: 'side' | 'mix'
  expandType: 'normal' | 'popup'
  width: string
  height: string
  collapsed: boolean
  collapsedWidth: string
  headerTheme: boolean
  showBreadcrumb: boolean
  themeColor: string
}

const initialState: ThemeState = {
  theme: 'light', // light, dark
  layout: 'mix', // side, mix
  expandType: 'normal',
  width: '240px',
  height: '56px',
  collapsed: false,
  collapsedWidth: '80px',
  headerTheme: false,
  showBreadcrumb: false, // 是否显示面包屑
  themeColor: '#0077fa'
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
