import type { TablePaginationConfig } from 'antd'

export * from './requests'

export type Pagination = TablePaginationConfig & Record<string, any>

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
