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
    name5: undefined
  })

  const searchColumns = useMemo(
    () =>
      createSearchColumns([
        {
          label: '性别',
          key: 'name5',
          render: ({ model, onChange, className }: any) => {
            return (
              <Select
                value={model.name5}
                className={className}
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

  const params = useMemo(
    () => ({
      ...search
    }),
    [search]
  )
  const { loading, data, pagination, init, onSearch, onTableChange } = useData(getList, {
    params
  })

  useMount(init)

  const onReset = async () => {
    const _state = { ...search }
    Object.keys(_state).forEach(key => {
      _state[key] = undefined
    })
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
        setModel={setSearch}
        onSearch={onSearch}
        onReset={onReset}
        extraBtn={<Button theme="primary">导出</Button>}
      />
      <Card bordered={false} className="table-card-with-pagination">
        <Table
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
