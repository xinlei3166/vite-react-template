import type { TableChangeData, SortInfo } from 'tdesign-react'
import { useMount } from 'ahooks'
import { useState, useMemo } from 'react'
import { Card, Table, Select, Button } from 'tdesign-react'
import { useData } from '@packages/hooks'
// @ts-ignore
import { getList } from '@/api'
import Search from '../index'
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

  const [sorter, setSorter] = useState<any>({})
  const transformTableParams = (data: TableChangeData) => {
    const sorter = data.sorter as SortInfo
    const sortBy = sorter?.sortBy
      ? sorter.descending
        ? `-${sorter.sortBy}`
        : sorter.sortBy
      : undefined
    return { sortBy }
  }

  const params = useMemo(
    () => ({
      ...search,
      ...transformTableParams({ sorter })
    }),
    [search, sorter]
  )
  const {
    loading,
    data,
    pagination,
    init,
    onSearch,
    onTriggerSearch,
    onTableChange: _onTableChange
  } = useData(getList, {
    params
  })

  const onTableChange = (data: any, context: any) => {
    setSorter(data.sorter)
    const tableParams = transformTableParams(data)
    _onTableChange(data, context, tableParams)
  }

  useMount(init)

  const onReset = async () => {
    const _state = { ...search }
    Object.keys(_state).forEach(key => {
      _state[key] = undefined
    })
    _state['name10'] = []
    setSearch(_state)
    await onSearch(_state)
  }

  const onEdit = () => {
    window.open('https://baidu.com')
  }

  const onPreview = () => {
    window.open('https://baidu.com')
  }

  return (
    <div className="pb-4">
      <Search
        className="mb-4"
        columns={searchColumns}
        model={search}
        labelWidth="42px"
        setModel={setSearch}
        onSearch={onSearch}
        onReset={onReset}
        onTriggerSearch={onTriggerSearch}
        extraBtn={<Button theme="primary">导出</Button>}
      />
      <Card bordered={false} bodyStyle={{ padding: '16px 16px 0' }}>
        <Table
          resizable
          maxHeight="none"
          rowKey="id"
          loading={loading}
          pagination={pagination}
          columns={tableColumns}
          data={data}
          onChange={onTableChange}
        />
      </Card>
    </div>
  )
}
