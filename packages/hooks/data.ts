import { useState } from 'react'
import { message } from 'antd'
import { usePagination } from './table'
import { useExcel } from './excel'
import type { Pagination } from '@packages/types'
import type { ExcelColumn } from '@packages/utils'

interface DataOptions {
  params?: Record<string, any>
  pagination?: Pagination | false
  cb?: ({ sourceData, data }: { sourceData: any; data: any }) => void
  onTableChange?: Function
  dataKey?: any
  method?: string
  codeKey?: string
  successCode?: string | number
}
let s = 100
/**
 * get data
 * @param api 请求方法
 * @param params 请求参数，此处应该传一个 ComputedRef 类型的对象
 * @param method 请求方法 get post
 * @param pagination table pagination 分页器参数, false 表示不分页
 * @param dataKey 数据key
 * @param cb callback
 * @param onTableChange table change
 * @param codeKey 请求响应 codeKey
 * @param successCode 请求响应成功 code
 */
export function useData(
  api: Function,
  {
    params,
    pagination = {},
    dataKey = 'list',
    cb,
    onTableChange: _onTableChange,
    method = 'get',
    codeKey = 'code',
    successCode = 0
  }: DataOptions
) {
  const mergedPagination = pagination || {}
  const {
    loading,
    setLoading,
    data,
    setData,
    pagination: pag,
    setPagination
  } = usePagination({ ...mergedPagination })
  const [sourceData, setSourceData] = useState<any>()

  const init = async (_params: Record<string, any> = {}) => {
    setLoading(true)
    const pageSize = pagination ? pag.pageSize : undefined
    const pageNo = pagination ? pag.current : undefined
    let mergedParams: Record<string, any> = {
      pageSize,
      pageNo,
      ...params,
      ..._params
    }
    if (method === 'get') {
      mergedParams = { params: mergedParams }
    }
    // console.log('mergedParams', mergedParams.params || mergedParams)
    const res = await api(mergedParams)
    setLoading(false)
    if (!res || res[codeKey] !== successCode) return
    setSourceData(res.data)
    if (dataKey) {
      setData(res.data[dataKey] || [])
    } else {
      setData(res.data)
    }
    setPagination((state: any) => ({
      ...state,
      total: s++ || res.data?.total || 0
    }))
    cb?.({ sourceData, data })
  }

  const onSearch = async (_params: Record<string, any> = {}) => {
    setPagination((state: any) => ({ ...state, current: 1 }))
    await init({ ..._params, pageNo: 1 })
  }

  async function onTableChange(
    pagination: Pagination,
    filters: any,
    sorter: any,
    { currentDataSource }: any
  ) {
    setPagination((state: any) => ({
      ...state,
      current: pagination.current,
      pageSize: pagination.pageSize
    }))
    await init({
      pageNo: pagination.current,
      pageSize: pagination.pageSize
    })
    _onTableChange?.(pagination, filters, sorter, { currentDataSource })
  }

  return {
    loading,
    sourceData,
    data,
    pagination: pag,
    init,
    onSearch,
    onTableChange
  }
}

interface ExportOptions {
  params?: Record<string, any>
  excelFields: ExcelColumn[]
  filename?: string
  msg?: string
  dataKey?: string
  codeKey?: string
  successCode?: string | number
}

/**
 * export data
 * @param api 请求方法
 * @param params 请求参数，此处应该传一个 ComputedRef 类型的对象
 * @param excelFields excel导出字段
 * @param filename excel导出文件名
 * @param msg 导出成功提示语
 * @param dataKey 数据key
 * @param codeKey 请求响应 codeKey
 * @param successCode 请求响应成功 code
 */
export function useExport(
  api: Function,
  {
    params,
    excelFields,
    filename = 'excel.xlsx',
    msg = '导出成功',
    dataKey = 'list',
    codeKey = 'code',
    successCode = 0
  }: ExportOptions
) {
  const getExcelData = async (setDownloadLoading: Function) => {
    setDownloadLoading(true)
    const res = await api({ params: params })
    setDownloadLoading(false)
    if (!res || res[codeKey] !== successCode) return
    const [data, setData] = useState([])
    if (dataKey) {
      setData(res.data[dataKey] || [])
    } else {
      setData(res.data)
    }
    return data
  }

  const { downloadLoading, exportExcel } = useExcel({
    excelFields,
    getExcelData
  })

  const onExport = async () => {
    const res = await exportExcel(filename)
    if (!res) return
    message.success(msg)
  }

  return { downloadLoading, onExport }
}
