import { useRef } from 'react'

export interface SearchTableInstance {
  init?: (...args: any[]) => unknown
  onSearch?: (...args: any[]) => unknown
  onReset?: (...args: any[]) => unknown
  onRefresh?: (...args: any[]) => unknown
  getSearchModel?: () => Record<string, any> | undefined
  setSearchModel?: (...args: any[]) => void
  getPagination?: () => Record<string, any> | undefined
  setPagination?: (...args: any[]) => void
  getSorter?: () => Record<string, any> | undefined
  setSorter?: (...args: any[]) => void
  getFilter?: () => Record<string, any> | undefined
  setFilter?: (...args: any[]) => void
}

export default function useSearchTable() {
  const tableRef = useRef<SearchTableInstance>({})

  return tableRef.current
}
