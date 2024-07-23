import { useState, useMemo } from 'react'
import { useMount } from 'ahooks'
import { Card, Table, Select, Button } from 'antd'
import Search from '@/components/search'
import { useData } from '@packages/hooks'
import { getList } from '@/api'
import { createColumns, createTableColumns } from './columns'
import Buttons from '@/components/exception/buttons'

export default function DemoPage() {
  const [search, setSearch] = useState<Record<string, any>>({
    name1: undefined,
    name2: undefined,
    name3: undefined,
    name4: undefined,
    name5: undefined
  })

  const columns = useMemo(
    () =>
      createColumns([
        {
          label: '性别',
          key: 'name5',
          render: ({ model, onChange }: any) => {
            return (
              <Select
                value={model.name5}
                className="!w-240px"
                allowClear
                placeholder="请选择性别"
                getPopupContainer={triggerNode => triggerNode.parentNode}
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
          key: 'operation',
          render: () => (
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
  const { loading, data, pagination, init, onSearch, onTableChange } = useData(
    getList,
    {
      params
    }
  )

  useMount(init)

  async function onReset() {
    const _state = { ...search }
    Object.keys(_state).forEach(key => {
      _state[key] = undefined
    })
    setSearch(_state)
    await onSearch(_state)
  }

  function onEdit() {
    window.open('https://baidu.com')
  }

  function onPreview() {
    window.open('https://baidu.com')
  }

  return (
    <>
      <Search
        className="mb-4"
        columns={columns}
        model={search}
        setModel={setSearch}
        onSearch={onSearch}
        onReset={onReset}
        extraBtn={<Button type="primary">导出</Button>}
      />
      <Card>
        <Table
          rowKey="id"
          loading={loading}
          pagination={pagination}
          columns={tableColumns}
          dataSource={data}
          onChange={onTableChange}
        />
      </Card>
    </>
  )
}
