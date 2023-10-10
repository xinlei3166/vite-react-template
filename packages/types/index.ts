import type { ReactNode, ComponentType } from 'react'
import type { TablePaginationConfig } from 'antd'

export * from './requests'

export type Pagination = TablePaginationConfig & {
  [key: string]: any
}

// visible
export interface Visible extends Record<string, any> {
  visible: boolean
  title?: string
  id?: number
  mode?: 'new' | 'edit' | string
  data?: any[] | Record<string, any>
}

// tab list
export interface TabList {
  key: string // component name
  permission?: string
  name?: string // cn name
  tab?: string
  slots?: Object
}
