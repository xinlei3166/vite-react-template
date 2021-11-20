import { useMount } from 'react-use'
import { Card, Table } from 'antd'
import { usePagination } from '@/hooks/pagination'
import { getData } from '@/api'
import { getTableColumns } from './columns'

export default function FixedTablePage() {
  const tableColumns = getTableColumns([
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
  ])

  const { pagination, setPagination, loading, setLoading, data, setData } =
    usePagination()

  useMount(init)

  async function init(params = {}) {
    setLoading(true)
    const res = await getData({
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...params
    })
    setLoading(false)
    if (res.code !== 0) return
    setData(res.data)
    setPagination(state => ({ ...state, total: res.total }))
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
