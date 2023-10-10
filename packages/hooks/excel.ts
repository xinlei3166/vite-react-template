import { useState } from 'react'
import type { ExcelColumn } from '@packages/utils'
import { exportExcel as _exportExcel } from '@packages/utils'

interface Options {
  excelFields: ExcelColumn[]
  getExcelData: Function
}

export function useExcel({ excelFields, getExcelData }: Options) {
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [excelData, setExcelData] = useState<any>([])

  const exportExcel = async (filename: string) => {
    const data = await getExcelData(setDownloadLoading)
    setExcelData(data)
    if (!excelData) return
    await _exportExcel({ filename, columns: excelFields, data: excelData })
    return true
  }

  return {
    downloadLoading,
    setDownloadLoading,
    excelData,
    setExcelData,
    exportExcel
  }
}
