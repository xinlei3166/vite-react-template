import { useMemo } from 'react'
import { useMount } from 'ahooks'
import { Card, Table } from 'antd'
import { useData } from '@packages/hooks'
import { getList } from '@/api'
import { createTableColumns } from './columns'

export default function FixedTablePage() {
  const tableColumns = createTableColumns([
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
  ])

  const params = useMemo(() => ({}), [])
  const { loading, data, pagination, init, onSearch, onTableChange } = useData(
    getList,
    {
      params
    }
  )

  useMount(init)

  function onEdit() {
    window.open('https://baidu.com')
  }

  function onPreview() {
    window.open('https://baidu.com')
  }

  return (
    <Card>
      <Table
        rowKey="id"
        loading={loading}
        pagination={pagination}
        columns={tableColumns}
        dataSource={data}
        scroll={{ y: 'calc(100vh - 94px - 88px - 58px - 56px)' }}
        onChange={onTableChange}
      />
    </Card>
  )
}
