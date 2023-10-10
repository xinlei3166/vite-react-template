import { useState } from 'react'
import { message } from 'antd'
import type { UploadProps, UploadFile } from 'antd'

export interface UploadConfig {
  upload?: boolean
  maxCount?: number
  maxSize?: number // MB
  accept?: string // .zip,.jpg
}

export function useUpload({
  maxCount,
  maxSize,
  accept,
  upload = true
}: UploadConfig) {
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [uploading, setUploading] = useState<boolean>(false)

  const beforeUpload: UploadProps['beforeUpload'] = file => {
    if (maxCount && fileList.length === maxCount) {
      message.error(`最多只能上传${maxCount}个文件`)
      return false
    }
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      message.error(`上传文件大小不能超过${maxSize}MB`)
      setFileList(fileList.slice(0, -1))
      return false
    }
    const suffixes = accept?.split(',') || []
    const sIndex = file.name.lastIndexOf('.')
    const suffix = file.name.slice(sIndex).toLowerCase()
    if (suffixes?.length && !suffixes.includes(suffix)) {
      message.error(`文件格式错误，请上传${accept}格式的文件`)
      return false
    }
    if (upload) return true
    setFileList([...fileList, file])
    return false
  }

  const onRemove: UploadProps['onRemove'] = file => {
    const index = fileList?.indexOf(file)
    const newFileList = fileList?.slice()
    newFileList?.splice(index!, 1)
    setFileList(newFileList)
  }

  const onUpload = () => {
    const formData = new FormData()
    fileList?.forEach((file: UploadFile) => {
      formData.append('files[]', file as any)
    })
    setUploading(true)

    // request('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
    //   method: 'post',
    //   data: formData
    // })
    //   .then(() => {
    //     setFileList([])
    //     setUploading(false)
    //     message.success('upload successfully.')
    //   })
    //   .catch(() => {
    //     setUploading(false)
    //     message.error('upload failed.')
    //   })
  }

  return { fileList, uploading, onRemove, beforeUpload, onUpload }
}
