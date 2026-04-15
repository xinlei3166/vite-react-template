import { useState } from 'react'
import type { Pagination } from '@packages/types'

const defaultPagination: Pagination = {
  current: 1,
  defaultCurrent: 1,
  pageSize: 20,
  total: 0,
  totalContent: true,
  size: 'medium',
  theme: 'default',
  pageSizeOptions: ['10', '20', '30', '50', '100'],
  showFirstAndLastPageBtn: false,
  showJumper: true,
  showPageNumber: true,
  showPageSize: true,
  showPreviousAndNextBtn: true
}

export function usePagination(_pagination?: Record<string, any>) {
  const pag = _pagination || {}
  const [pagination, setPagination] = useState<Pagination>({
    ...defaultPagination,
    ...pag
  })

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Array<Record<string, any>>>([])

  return {
    loading,
    setLoading,
    data,
    setData,
    pagination,
    setPagination
  }
}

export function useRowSelection() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<any>([])
  const [selectedRows, setSelectedRows] = useState<any>([])

  const cleanup = () => {
    setSelectedRowKeys([])
    setSelectedRows([])
  }

  const onChange = (
    _selectedRowKeys: (string | number)[],
    _selectedRows: any[]
  ) => {
    setSelectedRowKeys(_selectedRowKeys)
    setSelectedRows(_selectedRows)
  }

  const onSelect = (record: any, selected: boolean, selectedRows: any[]) => {}

  const onSelectAll = (
    selected: boolean,
    selectedRows: any[],
    changeRows: any[]
  ) => {}

  return { selectedRowKeys, selectedRows, cleanup, onChange }
}

export function useCustomRow({ rowKey = 'id' }: { rowKey: string }) {
  const [currentRowKey, setCurrentRowKey] = useState(-1)
  const [lastRowKey, setLastRowKey] = useState(-1)
  const [rowKeys, setRowKeys] = useState<any>([])

  const customRow = (record: Record<string, any>) => ({
    onClick() {
      setLastRowKey(currentRowKey)
      setCurrentRowKey(record[rowKey])
      setRowKeys([...rowKeys, record[rowKey]])
    }
  })

  const rowClassName = (record: Record<string, any>) => {
    return rowKeys.includes(record[rowKey]) ? 'clicked' : ''
  }

  return { currentRowKey, lastRowKey, rowKeys, customRow, rowClassName }
}
