import type { TableChangeData, SortInfo } from 'tdesign-react'
import { useState, useMemo, useCallback } from 'react'
import { Select, Button } from 'tdesign-react'
// @ts-ignore
import { getList } from '@/api'
import SearchTable, { useSearchTable } from '../index'
import { createSearchColumns, createTableColumns } from './columns'

export default function DemoPage() {
  const [search, setSearch] = useState<Record<string, any>>({
    name1: undefined,
    name2: undefined,
    name3: undefined,
    name4: undefined,
    name5: undefined,
    name6: undefined,
    name7: undefined,
    name8: undefined,
    name9: undefined,
    name10: []
  })

  const searchColumns = useMemo(
    () =>
      createSearchColumns([
        {
          label: '性别',
          key: 'name6',
          render: ({ model, onChange, className }: any) => {
            return (
              <Select
                value={model.name6}
                className={className}
                clearable
                placeholder="请选择性别"
                onChange={value => onChange('name6', value)}
              >
                <Select.Option value="male">男</Select.Option>
                <Select.Option value="female">女</Select.Option>
              </Select>
            )
          }
        }
      ]),
    []
  )
  const tableColumns = useMemo(
    () =>
      createTableColumns([
        {
          colKey: 'operation',
          cell: () => (
            <>
              <span className="text-btn" onClick={onEdit}>
                编辑
              </span>
              <span className="text-btn" onClick={onPreview}>
                预览
              </span>
            </>
          )
        }
      ]),
    []
  )

  const transformTableParams = useCallback((data: TableChangeData) => {
    const sorter = data.sorter as SortInfo
    const sortBy = sorter?.sortBy
      ? sorter.descending
        ? `-${sorter.sortBy}`
        : sorter.sortBy
      : undefined
    return { sortBy }
  }, [])
  const extraParams = useMemo(() => ({ extraParams1: 'test' }), [])

  const table = useSearchTable()

  const onReset = async () => {
    // console.log('onReset')
  }

  const onEdit = () => {
    console.log('table', table)
    window.open('https://baidu.com')
  }

  const onPreview = () => {
    window.open('https://baidu.com')
  }

  return (
    <>
      <SearchTable
        requestOnChange
        transformTableParams={transformTableParams}
        table={table}
        searchColumns={searchColumns}
        searchModel={search}
        setSearchModel={setSearch}
        searchLabelWidth="42px"
        searchShowResetBtn={true}
        searchExtraBtn={<Button theme="primary">导出</Button>}
        toolbar={<div>表格是非常实用的组件</div>}
        tableColumns={tableColumns}
        tableEllipsis={true}
        requestApi={getList}
        extraParams={extraParams}
        onReset={onReset}
      />
    </>
  )
}
