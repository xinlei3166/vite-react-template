import { useState, useMemo } from 'react'
import { useMount } from 'react-use'
import { Card, Table, Select } from 'antd'
import Search from '@/components/search'
import { usePagination } from '@/hooks/pagination'
import { getData } from '@/api'
import { getColumns, getTableColumns } from './columns'

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
      getColumns([
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
      getTableColumns([
        {
          key: 'operation',
          render: () => (
            <>
              <span className="btn" onClick={onEdit}>
                编辑
              </span>
              <span className="btn" onClick={onPreview}>
                预览
              </span>
            </>
          )
        }
      ]),
    []
  )

  const { pagination, setPagination, loading, setLoading, data, setData } =
    usePagination()

  useMount(init)

  async function init(params = {}) {
    setLoading(true)
    const res = await getData({
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...search,
      ...params
    })
    setLoading(false)
    if (res.code !== 0) return
    setData(res.data)
    setPagination(state => ({ ...state, total: res.total }))
  }

  async function onSearch(params = {}) {
    if (pagination.current !== 1) {
      setPagination(state => ({ ...state, current: 1 }))
    }
    await init({ pageNum: 1, ...params })
  }

  async function onReset() {
    const _state = { ...search }
    Object.keys(_state).forEach(key => {
      _state[key] = undefined
    })
    setSearch(_state)
    await onSearch(_state)
  }

  async function onTableChange(pag: Record<string, any>) {
    setPagination(state => ({
      ...state,
      current: pag.current,
      pageSize: pag.pageSize
    }))
    await init({ pageNum: pag.current, pageSize: pag.pageSize })
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
