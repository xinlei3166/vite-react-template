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
  const [searchModel, setSearchModel] = useState<Record<string, any>>({
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
          render: ({ model, column, onChange, className }: any) => {
            return (
              <Select
                value={model.name6}
                className={className}
                clearable
                placeholder="请选择性别"
                onChange={(value: any, context: any) => onChange(column, value, context)}
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
  const [filter, setFilter] = useState<any>({})
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
      ...searchModel,
      ...transformTableParams({ sorter })
    }),
    [searchModel, sorter]
  )
  const { loading, data, pagination, setPagination, init, search } = useData(getList, {
    params
  })

  useMount(init)

  const onTableChange = async (data: any, context: any) => {
    console.log('onTableChange', data, context)
    setSorter(data.sorter)
    setFilter(data.filter)
    const tableParams = transformTableParams(data)
    const { pagination } = data
    if (pagination) {
      setPagination((state: any) => ({
        ...state,
        current: pagination.current,
        pageSize: pagination.pageSize
      }))
      await init({
        page: pagination.current,
        page_size: pagination.pageSize,
        ...tableParams
      })
    } else {
      await init({ ...tableParams })
    }
  }

  const onSearch = async (trigger: string, payload: Record<string, any>) => {
    console.log('onSearch', trigger, payload)
    if (trigger === 'reset') {
      await onReset()
    } else {
      const _params: Record<string, any> = {}
      if (trigger === 'change') {
        const { key, value } = payload
        _params[key] = value
      }
      await search(_params)
    }
  }

  const onReset = async () => {
    const _state = { ...searchModel }
    Object.keys(_state).forEach(key => {
      _state[key] = undefined
    })
    _state['name10'] = []
    setSearchModel(_state)
    await search(_state)
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
        model={searchModel}
        setModel={setSearchModel}
        labelWidth="42px"
        onSearch={onSearch}
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
