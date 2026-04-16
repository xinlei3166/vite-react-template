import { useMount } from 'ahooks'
import { useMemo } from 'react'
import { Card, Table, Link } from 'tdesign-react'
import { useData } from '@packages/hooks'
import { getList } from '@/api'
import { createTableColumns } from './columns'

export default function FixedTablePage() {
  const tableColumns = createTableColumns([
    {
      colKey: 'operation',
      render: () => (
        <>
          <Link hover="color" theme="primary" className="t-text-btn" onClick={onEdit}>
            编辑
          </Link>
          <Link hover="color" theme="primary" className="t-text-btn" onClick={onPreview}>
            预览
          </Link>
        </>
      )
    }
  ])

  const params = useMemo(() => ({}), [])
  const { loading, data, pagination, init, onSearch, onTableChange } = useData(getList, {
    params
  })

  useMount(init)

  const onEdit = () => {
    window.open('https://baidu.com')
  }

  const onPreview = () => {
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
