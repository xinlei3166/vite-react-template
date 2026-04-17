import { useState, useMemo } from 'react'
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
    name5: undefined
  })

  const searchColumns = useMemo(
    () =>
      createSearchColumns([
        {
          label: '性别',
          key: 'name5',
          render: ({ model, onChange }: any) => {
            return (
              <Select
                value={model.name5}
                className="w-full"
                clearable
                placeholder="请选择性别"
                onChange={value => onChange('name5', value)}
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

  const table = useSearchTable()
  const extraParams = useMemo(() => ({ extraParams1: 'test' }), [])

  const onReset = async () => {
    console.log('onReset')
  }

  const onEdit = () => {
    window.open('https://baidu.com')
  }

  const onPreview = () => {
    window.open('https://baidu.com')
  }

  return (
    <>
      <SearchTable
        className="table-card-with-pagination"
        table={table}
        searchColumns={searchColumns}
        searchModel={search}
        setSearchModel={setSearch}
        searchProps={{ extraBtn: <Button theme="primary">导出</Button> }}
        tableColumns={tableColumns}
        requestApi={getList}
        extraParams={extraParams}
        onReset={onReset}
      />
    </>
  )
}
