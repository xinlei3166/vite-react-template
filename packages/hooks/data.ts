import { useState, useRef, useEffect } from 'react'
import { MessagePlugin } from 'tdesign-react'
import type { Pagination } from '@packages/types'
import type { ExcelColumn } from '@packages/utils'
import { useExcel } from './excel'
import { usePagination } from './table'

interface DataOptions {
  params?: Record<string, any>
  pagination?: Pagination | false
  callback?: ({ sourceData, data }: { sourceData: any; data: any }) => void
  dataKey?: any
  method?: string
  codeKey?: string
  successCode?: string | number
}

/**
 * get data
 * @param api 请求方法
 * @param params 请求参数，此处应该传一个 ComputedRef 类型的对象
 * @param method 请求方法 get post
 * @param pagination table pagination 分页器参数, false 表示不分页
 * @param dataKey 数据key
 * @param callback
 * @param codeKey 请求响应 codeKey
 * @param successCode 请求响应成功 code
 */
export function useData(api: (...args: any[]) => any, dataOptions: DataOptions = {}) {
  const {
    params,
    pagination,
    dataKey = 'records',
    callback,
    method = 'get',
    codeKey = 'code',
    successCode = 0
  } = dataOptions
  const paramsRef = useRef<Record<string, any>>(params || {})
  useEffect(() => {
    paramsRef.current = params || {}
  }, [params])

  const mergedPagination: Record<string, any> = pagination || {}
  const {
    loading,
    setLoading,
    data,
    setData,
    pagination: pag,
    setPagination
  } = usePagination({ ...mergedPagination })
  const initialPage = pagination ? 1 : undefined
  const [sourceData, setSourceData] = useState<any>()

  const init = async (_params: Record<string, any> = {}) => {
    setLoading(true)
    const page = pagination ? pag.current : undefined
    const pageSize = pagination ? pag.pageSize : undefined
    let mergedParams: Record<string, any> = {
      page,
      page_size: pageSize,
      ...paramsRef.current,
      ..._params
    }
    if (method === 'get') {
      mergedParams = { params: mergedParams }
    }
    console.log('mergedParams', mergedParams)
    const res = await api(mergedParams)
    setLoading(false)
    if (!res || res[codeKey] !== successCode) return
    setSourceData(res.data)
    let d
    if (dataKey) {
      d = res.data[dataKey] || []
    } else {
      d = res.data
    }
    setData(d)
    setPagination((state: any) => ({
      ...state,
      total: res.data?.total || 0
    }))
    callback?.({ sourceData: res.data, data: d })
  }

  const search = async (_params: Record<string, any> = {}) => {
    setPagination((state: any) => ({ ...state, current: 1 }))
    await init({ ..._params, page: initialPage })
  }

  return {
    loading,
    sourceData,
    data,
    pagination: pagination === false ? undefined : pag,
    setPagination,
    init,
    search
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
  api: (...args: any[]) => any,
  {
    params,
    excelFields,
    filename = 'excel.xlsx',
    msg = '导出成功',
    dataKey = 'records',
    codeKey = 'code',
    successCode = 0
  }: ExportOptions
) {
  const getExcelData = async (setDownloadLoading: (...args: any[]) => void) => {
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
    MessagePlugin.success(msg)
  }

  return { downloadLoading, onExport }
}
