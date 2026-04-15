import type { PaginationProps } from 'tdesign-react'

export * from './requests'

export interface Pagination extends PaginationProps {
  [key: string]: any
}

// tab list
export interface TabList {
  key: string // component name
  permission?: string
  name?: string // cn name
  tab?: string
  slots?: any
}

// visible
export interface Visible extends Record<string, any> {
  visible: boolean
  title?: string
  id?: number
  mode?: string // 'new' | 'edit'
  data?: any[] | Record<string, any>
}
